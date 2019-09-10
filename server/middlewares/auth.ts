import * as jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model';

// Verificar Token
export const tokenValidationAuth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
		const usuario = await Usuario.findOne({ _id: decodedToken.usuario._id, 'tokens.token': token });
		if (!usuario) {
			throw Error('User authentication failed!');
		}
		req.token = token;
		req.usuario = usuario;
		next();
	} catch (e) {
		res.status(401).send({ error: 'User authentication error: ' + e.message });
	}
};

// Verificar si es ADMIN o mismo usuario
export const sameUserOrAdminAuth = async (req, res, next) => {
	try {
		const usuario = req.usuario;
		const id = req.params.id;

		if (usuario.role === 'ADMIN' || usuario._id.toString() === id) {
			next();
			return;
		} else {
			console.log(id);
			console.log(usuario._id);
			throw Error('Not enough permissions!');
		}
	} catch (e) {
		res.status(401).send({ error: 'Authentication error: ' + e.message });
	}
};
