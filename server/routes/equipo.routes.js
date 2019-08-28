const express = require('express');
const router = new express.Router();

// Autenticación y modelo de equipos
const auth = require('../middlewares/auth');
const Equipo = require('../models/equipo.model');

/*------------------
	CRUD Equipo
-------------------*/

// Crear equipo
router.post('/equipos', auth.verificaToken, async (req, res) => {
	try {
		const equipo = new Equipo({
			...req.body,
			usuario: req.usuario._id
		});
		await equipo.save();
		res.status(201).send(equipo);
	} catch (e) {
		res.status(400).send({ error: 'Error al crear el equipo!', mensaje: e.message });
	}
});

// Obtener todos los equipos
router.get('/equipos', auth.verificaToken, async (req, res) => {
	try {
		const equipos = await Equipo.find().populate('usuario', 'nombre').populate('rubro', 'nombre').exec();
		if (!equipos) {
			return res.status(404).send({ error: 'No se encontraron equipos!' });
		}
		res.send(equipos);
	} catch (e) {
		res.status(500).send({ error: 'Error al obtener los equipos!', mensaje: e.message });
	}
});

// Actualizar equipo por id
router.patch('/equipos/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'nombre', 'rubro' ];
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de equipo inválida!' });
	}
	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Actualización de equipo inválida!' });
	}
	try {
		const equipo = await Equipo.findOne({ _id });
		if (!equipo) {
			return res.status(404).send({ error: 'Equipo con id ' + _id + ' no encontrado!' });
		}
		updates.forEach((update) => (equipo[update] = req.body[update]));
		await equipo.save();
		res.status(200).send(equipo);
	} catch (e) {
		res.status(400).send({ error: 'Error al actualizar el equipo!', mensaje: e.message });
	}
});

// Borrar equipo por id
router.delete('/equipos/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de equipo inválida!' });
	}
	try {
		const equipo = await Equipo.findOneAndDelete({ _id });
		if (!equipo) {
			return res.status(404).send({ error: 'Equipo con id ' + _id + ' no encontrado!' });
		}
		await equipo.remove();
		res.status(200).send(equipo);
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar el equipo!', mensaje: e.message });
	}
});

// Borrar todos los equipos
router.delete('/equipos', auth.verificaToken, async (req, res) => {
	try {
		await Equipo.deleteMany({});
		res.status(200).send({ mensaje: 'Equipos eliminados!' });
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar los equipos!', mensaje: e.message });
	}
});

module.exports = router;
