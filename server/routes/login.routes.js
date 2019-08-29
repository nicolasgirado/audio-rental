const express = require('express');

const Usuario = require('../models/usuario.model');
const auth = require('../middlewares/auth');

const router = new express.Router();

/*------------------
	Login y Logout
-------------------*/

// Iniciar sesión
router.post('/login', async (req, res) => {
	try {
		const usuario = await Usuario.findByCredentials(req.body.email, req.body.password);
		const token = await usuario.generateAuthToken();
		res.status(200).send({
			usuario,
			token,
			menu: obtenerMenu(usuario.role)
		});
	} catch (e) {
		res.status(400).send({ error: 'Error al iniciar sesión. ' + e.message });
	}
});

// Cerrar sesión actual
router.post('/logout', auth.verificaToken, async (req, res) => {
	try {
		req.usuario.tokens = req.usuario.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.usuario.save();
		res.status(200).send({
			message: 'Logout exitoso!'
		});
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

// Cerrar todas las sesiones abiertas
router.post('/logoutAll', auth.verificaToken, async (req, res) => {
	try {
		req.usuario.tokens = [];
		await req.usuario.save();
		res.status(200).send({ message: 'Logout exitoso!' });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

/*------------------
	Obtener Menu
-------------------*/

function obtenerMenu(role) {
	var menu = [
		{
			titulo: 'Home',
			icono: 'home',
			url: '/home'
		},
		{
			titulo: 'Eventos',
			icono: 'event',
			url: '/eventos'
		},
		{
			titulo: 'Mantenimientos',
			icono: 'build',
			submenu: [
				{
					titulo: 'Equipos',
					icono: 'speaker',
					url: '/equipos'
				}
			]
		}
	];

	if (role === 'ADMIN_ROLE') {
		menu[2].submenu.unshift({
			titulo: 'Usuarios',
			icono: 'supervisor_account',
			url: '/usuarios'
		});
	}

	return menu;
}

module.exports = router;
