const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

// Verificar Token
exports.verificaToken = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const usuario = await Usuario.findOne({ _id: decoded._id, 'tokens.token': token });
		if (!usuario) throw Error('Token o id inválido.');
		req.token = token;
		req.usuario = usuario;
		next();
	} catch (e) {
		res.status(401).send({ error: 'Error de autenticación. ' + e.message });
	}
};

// Verificar si es ADMIN o mismo usuario
exports.verificaAdminUsuario = async (req, res, next) => {
	try {
		const usuario = req.usuario;
		const id = req.params.id;

		if (usuario.role === 'ADMIN_ROLE' || usuario._id.toString() === id) {
			next();
			return;
		} else {
			console.log(id);
			console.log(usuario._id);
			throw Error('No tiene los permisos suficientes.');
		}
	} catch (e) {
		res.status(401).send({ error: 'Error de autenticación. ' + e.message });
	}
};
