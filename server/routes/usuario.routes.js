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
router.post('/usuarios', async (req, res) => {
	const usuario = new Usuario(req.body);
	try {
		await usuario.save();
		res.status(201).send(usuario);
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

// Obtener todos los usuarios
router.get('/usuarios', auth, async (req, res) => {
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

// Obtener perfil del usuario
router.get('/usuarios/me', auth, async (req, res) => {
	try {
		res.send(req.usuario);
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Actualizar usuario por id
router.patch('/usuarios/:id', auth, async (req, res) => {
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
router.delete('/usuarios/:id', auth, async (req, res) => {
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
router.post('/usuarios/me/avatar', auth, upload.single('avatar'), async (req, res) => {
	try {
		const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
		req.usuario.avatar = buffer;
		await req.usuario.save();
		res.status(200).send({ message: 'Avatar successfully uploaded!' });
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

// Borrar avatar
router.delete('/usuarios/me/avatar', auth, async (req, res) => {
	try {
		req.usuario.avatar = undefined;
		await req.usuario.save();
		res.status(200).send({ message: 'Avatar successfully deleted!' });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Obtener avatar por id
router.get('/usuarios/:id/avatar', auth, async (req, res) => {
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

/*------------------
	Login y Logout
-------------------*/

// Iniciar sesión
router.post('/login', async (req, res) => {
	try {
		const usuario = await Usuario.findByCredentials(req.body.email, req.body.password);
		const token = await usuario.generateAuthToken();
		res.send({ usuario, token });
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

// Cerrar sesión actual
router.post('/logout', auth, async (req, res) => {
	try {
		req.usuario.tokens = req.usuario.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.usuario.save();
		res.status(200).send({ message: 'Successful logout!' });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Cerrar todas las sesiones abiertas
router.post('/logoutAll', auth, async (req, res) => {
	try {
		req.usuario.tokens = [];
		await req.usuario.save();
		res.status(200).send({ message: 'Successful logouts!' });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

module.exports = router;
