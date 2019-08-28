const express = require('express');

const auth = require('../middlewares/auth');
const Salon = require('../models/salon.model');

const router = new express.Router();

/*------------------
	CRUD Salon
-------------------*/

// Crear salon
router.post('/salones', auth.verificaToken, async (req, res) => {
	try {
		const salon = new Salon({
			...req.body,
			usuario: req.usuario._id
		});
		await salon.save();
		res.status(201).send(salon);
	} catch (e) {
		res.status(400).send({ error: 'Error al crear el salon!', mensaje: e.message });
	}
});

// Obtener todos los salones
router.get('/salones', auth.verificaToken, async (req, res) => {
	try {
		const salones = await Salon.find({}).populate('usuario', 'nombre').populate('lugar', 'nombre').exec();
		if (!salones) {
			return res.status(404).send({ error: 'No se encontraron salones!' });
		}
		res.send(salones);
	} catch (e) {
		res.status(500).send({ error: 'Error al obtener los salones!', mensaje: e.message });
	}
});

// Actualizar salon por id
router.patch('/salones/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'nombre', 'lugar' ];
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de salon inválida!' });
	}
	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Actualización de salon inválida!' });
	}
	try {
		const salon = await Salon.findOne({ _id });
		if (!salon) {
			return res.status(404).send({ error: 'Salon con id ' + _id + ' no encontrado!' });
		}
		updates.forEach((update) => (salon[update] = req.body[update]));
		await salon.save();
		res.status(200).send(salon);
	} catch (e) {
		res.status(400).send({ error: 'Error al actualizar el salon!', mensaje: e.message });
	}
});

// Borrar salon por id
router.delete('/salones/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de salon inválida!' });
	}
	try {
		const salon = await Salon.findOneAndDelete({ _id });
		if (!salon) {
			return res.status(404).send({ error: 'Salon con id ' + _id + ' no encontrado!' });
		}
		await salon.remove();
		res.status(200).send(salon);
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar el salon!', mensaje: e.message });
	}
});

module.exports = router;
