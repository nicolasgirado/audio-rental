const express = require('express');
const router = new express.Router();

// Autenticación y modelo de salonPacks
const auth = require('../middlewares/auth');
const SalonPack = require('../models/salonPack.model');

/*------------------
	CRUD SalonPack
-------------------*/

// Crear salonPack
router.post('/salonPacks', auth.verificaToken, async (req, res) => {
	try {
		const salonPack = new SalonPack({
			...req.body,
			usuario: req.usuario._id
		});
		await salonPack.save();
		res.status(201).send(salonPack);
	} catch (e) {
		res.status(400).send({ error: 'Error al crear el salonPack!', mensaje: e.message });
	}
});

// Obtener todos los salonPacks
router.get('/salonPacks', auth.verificaToken, async (req, res) => {
	try {
		const salonPacks = await SalonPack.find({})
			.populate('usuario', 'nombre')
			.populate('lugar', 'nombre')
			.exec();
		if (!salonPacks) {
			return res.status(404).send({ error: 'No se encontraron salonPacks!' });
		}
		res.send(salonPacks);
	} catch (e) {
		res.status(500).send({ error: 'Error al obtener los salonPacks!', mensaje: e.message });
	}
});

// Actualizar salonPack por id
router.patch('/salonPacks/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'mesanio', 'quincena1', 'quincena2', 'salon' ];
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de salonPack inválida!' });
	}
	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Actualización de salonPack inválida!' });
	}
	try {
		const salonPack = await SalonPack.findOne({ _id });
		if (!salonPack) {
			return res.status(404).send({ error: 'SalonPack con id ' + _id + ' no encontrado!' });
		}
		updates.forEach((update) => (salonPack[update] = req.body[update]));
		await salonPack.save();
		res.status(200).send(salonPack);
	} catch (e) {
		res.status(400).send({ error: 'Error al actualizar el salonPack!', mensaje: e.message });
	}
});

// Borrar salonPack por id
router.delete('/salonPacks/:id', auth.verificaToken, async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de salonPack inválida!' });
	}
	try {
		const salonPack = await SalonPack.findOneAndDelete({ _id });
		if (!salonPack) {
			return res.status(404).send({ error: 'SalonPack con id ' + _id + ' no encontrado!' });
		}
		await salonPack.remove();
		res.status(200).send(salonPack);
	} catch (e) {
		res.status(500).send({ error: 'Error al borrar el salonPack!', mensaje: e.message });
	}
});

module.exports = router;
