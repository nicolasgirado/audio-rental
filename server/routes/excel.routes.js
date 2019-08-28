const express = require('express');
const multer = require('multer'); // subida de archivos (excel)
const XLSX = require('xlsx'); // lectura y exportación de archivos excel

const Rubro = require('../models/rubro.model');
const Equipo = require('../models/equipo.model');
const Salon = require('../models/salon.model');
const SalonPack = require('../models/salonPack.model');
const EquipoPrecio = require('../models/equipoPrecio.model');
const auth = require('../middlewares/auth');

const router = new express.Router();

const upload = multer({
	limits: { fileSize: 1000000 },
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(xlsx|xls)$/)) {
			return cb(new Error('Archivo inválido. Sólo se aceptan los formatos .xlsx y .xls'));
		}
		cb(undefined, true);
	}
});

// Objetivo: Actualización batch y exportación a excel de colecciones (ej. lista de precios)

// Excel-Import
// Notar que se realiza un insertMany en la collección (ingresar el id es opcional)
router.post(
	'/excel-import/:coll',
	[ auth.verificaToken, auth.verificaAdminUsuario ],
	upload.single('excel'),
	async (req, res) => {
		try {
			const coll = req.params.coll;
			const buffer = req.file.buffer;
			const wb = XLSX.read(buffer, { type: 'buffer', cellDates: true });
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
				case 'salonPacks':
					await SalonPack.insertMany(data);
					const salonPacks = await SalonPack.find({});
					res.status(200).send(salonPacks);
					break;
				case 'equipoPrecios':
					await EquipoPrecio.insertMany(data);
					const equipoPrecios = await EquipoPrecio.find({});
					res.status(200).send(equipoPrecios);
					break;
				default:
					res.status(400).send({ error: 'La tabla/colección no es válida' });
			}
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	}
);

// Excel-Export
router.get('/excel-export/:coll', [ auth.verificaToken, auth.verificaAdminUsuario ], async (req, res) => {
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
			case 'salones':
				const salones = await Salon.find().populate('lugar', 'nombre').exec();
				salones.forEach((salon) => {
					data.push({
						_id: salon._id.toString(),
						nombre: salon.nombre,
						lugar: salon.lugar._id.toString(),
						lugar_nombre: salon.lugar.nombre
					});
				});
				await exportarExcel(data, 'salones_exp');
				break;
			case 'salonPacks':
				const salonPacks = await SalonPack.find()
					.populate({
						path: 'salon',
						select: 'nombre',
						populate: { path: 'lugar', select: 'nombre' }
					})
					.exec();
				salonPacks.forEach((salonPack) => {
					data.push({
						_id: salonPack._id.toString(),
						lugar: salonPack.salon.lugar._id.toString(),
						lugar_nombre: salonPack.salon.lugar.nombre,
						salon: salonPack.salon._id.toString(),
						salon_nombre: salonPack.salon.nombre,
						mesanio: salonPack.mesanio,
						quincena1: salonPack.quincena1,
						quincena2: salonPack.quincena2
					});
				});
				await exportarExcel(data, 'salonPacks_exp');
				break;
			case 'equipoPrecios':
				const equipoPrecios = await EquipoPrecio.find()
					.populate('lugar', 'nombre')
					.populate('equipo', 'nombre')
					.exec();
				equipoPrecios.forEach((equipoPrecio) => {
					data.push({
						_id: equipoPrecio._id.toString(),
						lugar: equipoPrecio.lugar._id.toString(),
						lugar_nombre: equipoPrecio.lugar.nombre,
						equipo: equipoPrecio.equipo._id.toString(),
						equipo_nombre: equipoPrecio.equipo.nombre,
						anio: equipoPrecio.anio,
						semestre1: equipoPrecio.semestre1,
						semestre2: equipoPrecio.semestre2
					});
				});
				await exportarExcel(data, 'salonPacks_exp');
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
	XLSX.utils.book_append_sheet(wb, ws, nombre);
	XLSX.writeFile(wb, './server/assets/excel-exports/' + nombre + '.xlsx');
}

module.exports = router;
