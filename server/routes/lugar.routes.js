const express = require('express');

const auth = require('../middlewares/auth');
const Lugar = require('../models/lugar.model');

const router = new express.Router();

/*------------------
	CRUD Lugar
-------------------*/

// Crear lugar
router.post('/lugares', auth.verificaToken, async (req, res) => {
	try {
		const lugar = new Lugar({
			...req.body,
			usuario: req.usuario._id
		});
		await lugar.save();
		res.status(201).send(lugar);
	} catch (e) {
		res.status(400).send({ error: 'Error al crear el lugar!', mensaje: e.message });
	}
});

// Obtener todos los lugares
router.get('/lugares', auth.verificaToken, async (req, res) => {
	try {
		const lugares = await Lugar.find({}).populate('usuario', 'nombre').exec();
		if (!lugares) {
			return res.status(404).send({ error: 'No se encontraron lugares!' });
		}
		res.send(lugares);
	} catch (e) {
		res.status(500).send({ error: 'Error al obtener los lugares!', mensaje: e.message });
	}
});

// Actualizar lugar por id
router.patch('/lugares/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'nombre' ];
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de lugar inválida!' });
	}
	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Actualización de lugar inválida!' });
	}
	try {
		const lugar = await Lugar.findOne({ _id });
		if (!lugar) {
			return res.status(404).send({ error: 'Lugar con id ' + _id + ' no encontrado!' });
		}
		updates.forEach((update) => (lugar[update] = req.body[update]));
		await lugar.save();
		res.status(200).send(lugar);
	} catch (e) {
		res.status(400).send({ error: 'Error al actualizar el lugar!', mensaje: e.message });
	}
});

// Borrar lugar por id
router.delete('/lugares/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de lugar inválida!' });
	}
	try {
		const lugar = await Lugar.findOneAndDelete({ _id });
		if (!lugar) {
			return res.status(404).send({ error: 'Lugar con id ' + _id + ' no encontrado!' });
		}
		await lugar.remove();
		res.status(200).send(lugar);
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar el lugar!', mensaje: e.message });
	}
});

module.exports = router;
