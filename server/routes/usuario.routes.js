const express = require('express');
const router = new express.Router();

// Autenticación y modelo de usuarios
const Usuario = require('../models/usuario.model');
const auth = require('../middlewares/auth');

// Plugins para subir y editar imágenes
const multer = require('multer');
const sharp = require('sharp');

/*------------------
	CRUD Usuario
-------------------*/

// Crear usuario
router.post('/usuarios', [ auth.verificaToken, auth.verificaAdminUsuario ], async (req, res) => {
	const usuario = new Usuario(req.body);
	try {
		await usuario.save();
		res.status(201).send(usuario);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

// Obtener todos los usuarios
router.get('/usuarios', [ auth.verificaToken, auth.verificaAdminUsuario ], async (req, res) => {
	try {
		const usuarios = await Usuario.find();
		if (!usuarios) {
			return res.status(404).send({ error: 'No se encontraron usuarios!' });
		}
		res.send(usuarios);
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Obtener usuario por id
router.get('/usuarios/:id', [ auth.verificaToken, auth.verificaAdminUsuario ], async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de usuario inválido!' });
	}
	try {
		const usuario = await Usuario.findOne({ _id });
		if (!usuario) {
			return res.status(404).send({ error: 'Usuario con el id ' + _id + ' no encontrado!' });
		}
		res.send(usuario);
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Actualizar usuario por id
router.patch('/usuarios/:id', [ auth.verificaToken, auth.verificaAdminUsuario ], async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'nombre', 'email', 'password' ];
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de usuario inválido!' });
	}
	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Actualización de usuario inválida!' });
	}
	try {
		const usuario = await Usuario.findOne({ _id });
		if (!usuario) {
			return res.status(404).send({ error: 'Usuario con el id ' + _id + ' no encontrado!' });
		}
		updates.forEach((update) => (usuario[update] = req.body[update]));
		await usuario.save();
		res.status(200).send(usuario);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

// Borrar usuario por id
router.delete('/usuarios/:id', [ auth.verificaToken, auth.verificaAdminUsuario ], async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Id de usuario inválido!' });
	}
	try {
		const usuario = await Usuario.findOneAndDelete({ _id });
		if (!usuario) {
			return res.status(404).send({ error: 'Usuario con el id ' + _id + ' no encontrado!' });
		}
		await usuario.remove();
		res.status(200).send(usuario);
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

/*------------------
	CRUD Avatar
-------------------*/
const upload = multer({
	limits: { fileSize: 1000000 },
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Invalid file format. Please upload .jpg, .jpeg or .png images'));
		}
		cb(undefined, true);
	}
});

// Subir avatar
router.post(
	'/usuarios/me/avatar',
	[ auth.verificaToken, auth.verificaAdminUsuario ],
	upload.single('avatar'),
	async (req, res) => {
		try {
			const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
			req.usuario.avatar = buffer;
			await req.usuario.save();
			res.status(200).send({ message: 'Avatar successfully uploaded!' });
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	}
);

// Borrar avatar
router.delete('/usuarios/me/avatar', [ auth.verificaToken, auth.verificaAdminUsuario ], async (req, res) => {
	try {
		req.usuario.avatar = undefined;
		await req.usuario.save();
		res.status(200).send({ message: 'Avatar successfully deleted!' });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Obtener avatar por id
router.get('/usuarios/:id/avatar', [ auth.verificaToken, auth.verificaAdminUsuario ], async (req, res) => {
	const _id = req.params.id;
	if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
		return res.status(400).send({ error: 'Invalid id!' });
	}
	try {
		const usuario = await Usuario.findById(_id);
		if (!usuario || !usuario.avatar) {
			throw new Error('Usuario id or avatar not found!');
		}
		res.set('Content-Type', 'image/png');
		res.send(usuario.avatar);
	} catch (e) {
		res.status(404).send({ error: e.message });
	}
});

module.exports = router;
