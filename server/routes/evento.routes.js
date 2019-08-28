const express = require('express');

const auth = require('../middlewares/auth');
const Evento = require('../models/evento.model');

const router = new express.Router();

/*------------------
	CRUD Evento
-------------------*/

// Crear evento
router.post('/eventos', auth.verificaToken, async (req, res) => {
	try {
		const evento = new Evento({
			...req.body,
			usuario: req.usuario._id
		});
		await evento.save();
		res.status(201).send(evento);
	} catch (e) {
		res.status(400).send({ error: 'Error al crear el evento!', mensaje: e.message });
	}
});

// Obtener todos los eventos
router.get('/eventos', auth.verificaToken, async (req, res) => {
	try {
		const eventos = await Evento.find().populate('lugar', 'nombre').populate('salon', 'nombre').exec();
		if (!eventos) {
			return res.status(404).send({ error: 'No se encontraron eventos!' });
		}
		res.send(eventos);
	} catch (e) {
		res.status(500).send({ error: 'Error al obtener los eventos!', mensaje: e.message });
	}
});

// Actualizar evento por id
router.patch('/eventos/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'lugar', 'salon', 'fechaEvento', 'precioPack' ];
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de evento inválida!' });
	}
	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Actualización de evento inválida!' });
	}
	try {
		const evento = await Evento.findOne({ _id });
		if (!evento) {
			return res.status(404).send({ error: 'Evento con id ' + _id + ' no encontrado!' });
		}
		updates.forEach((update) => (evento[update] = req.body[update]));
		await evento.save();
		res.status(200).send(evento);
	} catch (e) {
		res.status(400).send({ error: 'Error al actualizar el evento!', mensaje: e.message });
	}
});

// Borrar evento por id
router.delete('/eventos/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de evento inválida!' });
	}
	try {
		const evento = await Evento.findOneAndDelete({ _id });
		if (!evento) {
			return res.status(404).send({ error: 'Evento con id ' + _id + ' no encontrado!' });
		}
		await evento.remove();
		res.status(200).send(evento);
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar el evento!', mensaje: e.message });
	}
});

// Borrar todos los eventos
router.delete('/eventos', auth.verificaToken, async (req, res) => {
	try {
		await Evento.deleteMany({});
		res.status(200).send({ mensaje: 'Equipos eliminados!' });
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar los eventos!', mensaje: e.message });
	}
});

module.exports = router;
