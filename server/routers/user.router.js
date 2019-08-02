const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middlewares/auth');
const User = require('../models/user.model');

const router = new express.Router();

// Crear usuario
router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();

		res.status(201).send(user);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

// Obtener usuarios
router.get('/users', auth, async (req, res) => {
	try {
		const users = await User.find();

		if (!users) {
			return res.status(404).send({ error: 'No user was found!' });
		}

		res.send(users);
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Obtener perfil de usuario
router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

// Actualizar usuario por id
router.patch('/users/:id', auth, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'name', 'email', 'password', 'age' ];
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Invalid id!' });
	}

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const user = await User.findOne({ _id });

		if (!user) {
			return res.status(404).send({ error: 'The user with the id ' + _id + ' was not found!' });
		}

		updates.forEach((update) => (user[update] = req.body[update]));

		await user.save();

		res.status(200).send(user);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

// Borrar usuario por id
router.delete('/users/:id', auth, async (req, res) => {
	const _id = req.params.id;

	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Invalid id!' });
	}

	try {
		const user = await User.findOneAndDelete({ _id });

		if (!user) {
			return res.status(404).send({ error: 'The user with the id ' + _id + ' was not found!' });
		}

		await user.remove();

		res.status(200).send(user);
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

/** Avatar **/

// Multer
const upload = multer({
	limits: { fileSize: 1000000 },
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Invalid file format. Please upload .jpg, .jpeg or .png images'));
		}

		cb(undefined, true);
	}
});

// Subir avatar propio
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
	try {
		const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

		req.user.avatar = buffer;

		await req.user.save();

		res.status(200).send({ message: 'Avatar successfully uploaded!' });
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

// Borrar avatar propio
router.delete('/users/me/avatar', auth, async (req, res) => {
	try {
		req.user.avatar = undefined;

		await req.user.save();

		res.status(200).send({ message: 'Avatar successfully deleted!' });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Obtener avatar por id
router.get('/users/:id/avatar', auth, async (req, res) => {
	const _id = req.params.id;

	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Invalid id!' });
	}

	try {
		const user = await User.findById(_id);

		if (!user || !user.avatar) {
			throw new Error('User id or avatar not found!');
		}

		res.set('Content-Type', 'image/png');
		res.send(user.avatar);
	} catch (e) {
		res.status(404).send({ error: e.message });
	}
});

module.exports = router;
