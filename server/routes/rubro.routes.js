const express = require('express');
const router = new express.Router();

// Autenticación y modelo de rubros
const auth = require('../middlewares/auth');
const Rubro = require('../models/rubro.model');

/*------------------
	CRUD Rubro
-------------------*/

// Crear rubro
router.post('/rubros', auth.verificaToken, async (req, res) => {
	try {
		const rubros = [];
		const body = req.body;
		body.forEach((item) => {
			rubros.push({
				nombre: item.nombre,
				usuario: req.usuario._id
			});
		});
		await Rubro.insertMany(rubros);
		res.status(201).send(rubros);
	} catch (e) {
		res.status(400).send({ error: 'Error al crear el rubro!', mensaje: e.message });
	}
});

// Obtener todos los rubros
router.get('/rubros', auth.verificaToken, async (req, res) => {
	try {
		const rubros = await Rubro.find().populate('usuario', 'nombre').exec();
		if (!rubros) {
			return res.status(404).send({ error: 'No se encontraron rubros!' });
		}
		res.send(rubros);
	} catch (e) {
		res.status(500).send({ error: 'Error al obtener los rubros!', mensaje: e.message });
	}
});

// Actualizar rubro por id
router.patch('/rubros/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'nombre', 'rubro' ];
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de rubro inválida!' });
	}
	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Actualización de rubro inválida!' });
	}
	try {
		const rubro = await Rubro.findOne({ _id });
		if (!rubro) {
			return res.status(404).send({ error: 'Rubro con id ' + _id + ' no encontrado!' });
		}
		updates.forEach((update) => (rubro[update] = req.body[update]));
		await rubro.save();
		res.status(200).send(rubro);
	} catch (e) {
		res.status(400).send({ error: 'Error al actualizar el rubro!', mensaje: e.message });
	}
});

// Borrar rubro por id
router.delete('/rubros/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de rubro inválida!' });
	}
	try {
		const rubro = await Rubro.findOneAndDelete({ _id });
		if (!rubro) {
			return res.status(404).send({ error: 'Rubro con id ' + _id + ' no encontrado!' });
		}
		await rubro.remove();
		res.status(200).send(rubro);
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar el rubro!', mensaje: e.message });
	}
});

// Borrar todos los rubros
router.delete('/rubros', auth.verificaToken, async (req, res) => {
	try {
		await Rubro.deleteMany({});
		res.status(200).send({ message: 'Rubros eliminados!' });
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar los rubros!', mensaje: e.message });
	}
});

module.exports = router;
