const express = require('express');

const auth = require('../middlewares/auth');
const EquipoPrecio = require('../models/equipoPrecio.model');

const router = new express.Router();

/*---------------------
	CRUD EquipoPrecio
----------------------*/

// Crear equipoPrecio
router.post('/equipoPrecios', auth.verificaToken, async (req, res) => {
	try {
		const equipoPrecio = new EquipoPrecio({
			...req.body,
			usuario: req.usuario._id
		});
		await equipoPrecio.save();
		res.status(201).send(equipoPrecio);
	} catch (e) {
		res.status(400).send({ error: 'Error al crear el equipoPrecio!', mensaje: e.message });
	}
});

// Obtener todos los equipoPrecios
router.get('/equipoPrecios', auth.verificaToken, async (req, res) => {
	try {
		const equipoPrecios = await EquipoPrecio.find({})
			.populate('usuario', 'nombre')
			.populate('lugar', 'nombre')
			.populate('equipo', 'nombre')
			.exec();
		if (!equipoPrecios) {
			return res.status(404).send({ error: 'No se encontraron equipoPrecios!' });
		}
		res.send(equipoPrecios);
	} catch (e) {
		res.status(500).send({ error: 'Error al obtener los equipoPrecios!', mensaje: e.message });
	}
});

// Actualizar equipoPrecio por id
router.patch('/equipoPrecios/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'lugar', 'equipo', 'anio', 'semestre1', 'semestre2' ];
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de equipoPrecio inválida!' });
	}
	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Actualización de equipoPrecio inválida!' });
	}
	try {
		const equipoPrecio = await EquipoPrecio.findOne({ _id });
		if (!equipoPrecio) {
			return res.status(404).send({ error: 'EquipoPrecio con id ' + _id + ' no encontrado!' });
		}
		updates.forEach((update) => (equipoPrecio[update] = req.body[update]));
		await equipoPrecio.save();
		res.status(200).send(equipoPrecio);
	} catch (e) {
		res.status(400).send({ error: 'Error al actualizar el equipoPrecio!', mensaje: e.message });
	}
});

// Borrar equipoPrecio por id
router.delete('/equipoPrecios/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de equipoPrecio inválida!' });
	}
	try {
		const equipoPrecio = await EquipoPrecio.findOneAndDelete({ _id });
		if (!equipoPrecio) {
			return res.status(404).send({ error: 'EquipoPrecio con id ' + _id + ' no encontrado!' });
		}
		await equipoPrecio.remove();
		res.status(200).send(equipoPrecio);
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar el equipoPrecio!', mensaje: e.message });
	}
});

module.exports = router;
