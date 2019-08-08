const express = require('express');
const router = new express.Router();
const multer = require('multer');
const XLSX = require('xlsx');

// Autenticación y modelos
const auth = require('../middlewares/auth');
const Rubro = require('../models/rubro.model');
const Equipo = require('../models/equipo.model');

const upload = multer({
	limits: { fileSize: 1000000 },
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(xlsx|xls)$/)) {
			return cb(new Error('Archivo inválido. Sólo se aceptan los formatos .xlsx y .xls'));
		}
		cb(undefined, true);
	}
});

// Excel-Import
// Importante: Notar que se realiza un insertMany en la collection (ingresar el id es opcional)
router.post('/excel-import/:coll', auth, upload.single('excel'), async (req, res) => {
	try {
		const coll = req.params.coll;
		const buffer = req.file.buffer;
		const wb = XLSX.read(buffer, { type: 'buffer' });
		let data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
		data.forEach((item) => {
			item.usuario = req.usuario._id;
		});
		switch (coll) {
			case 'rubros':
				await Rubro.insertMany(data);
				const rubros = await Rubro.find({});
				res.status(200).send(rubros);
				break;
			case 'equipos':
				await Equipo.insertMany(data);
				const equipos = await Equipo.find({});
				res.status(200).send(equipos);
				break;
			default:
				res.status(400).send({ error: 'La tabla/colección no existe' });
		}
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

// Excel-Export
router.get('/excel-export/:coll', auth, async (req, res) => {
	try {
		const data = [];
		switch (req.params.coll) {
			case 'rubros':
				const rubros = await Rubro.find().exec();
				rubros.forEach((rubro) => {
					data.push({
						_id: rubro._id.toString(),
						nombre: rubro.nombre
					});
				});
				await exportarExcel(data, 'rubros_exp');
				break;
			case 'equipos':
				const equipos = await Equipo.find().populate('rubro', 'nombre').exec();
				equipos.forEach((equipo) => {
					data.push({
						_id: equipo._id.toString(),
						nombre: equipo.nombre,
						rubro: equipo.rubro._id.toString(),
						rubro_nombre: equipo.rubro.nombre
					});
				});
				await exportarExcel(data, 'equipos_exp');
				break;
			default:
				res.status(400).send({ error: 'La tabla/colección no existe' });
		}
		res.status(200).send({ message: 'Archivo exportado!' });
	} catch (e) {
		res.status(500).send({ error: 'Error al exportar el archivo!', mensaje: e.message });
	}
});

function exportarExcel(data, nombre) {
	const ws = XLSX.utils.json_to_sheet(data);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'rubros');
	XLSX.writeFile(wb, './server/assets/excel-exports/' + nombre + '.xlsx');
}

module.exports = router;
