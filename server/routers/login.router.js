const express = require('express');
const User = require('../models/user.model');
const auth = require('../middlewares/auth');

const router = new express.Router();

/* Login normal */

// Iniciar sesión
router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);

		const token = await user.generateAuthToken();

		res.send({ user, token });
	} catch (e) {
		res.status(400).send({ error: e.message });
	}
});

module.exports = router;

// Cerrar sesión actual
router.post('/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});

		await req.user.save();

		res.status(200).send({ message: 'Successful logout!' });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Cerrar todas las sesiones abiertas
router.post('/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];

		await req.user.save();

		res.status(200).send({ message: 'Successful logouts!' });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});
