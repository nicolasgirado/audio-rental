import * as sharp from 'sharp';
import BaseCtrl from './base.controller';
import Usuario from '../models/usuario.model';

export default class UserCtrl extends BaseCtrl {
	model = Usuario;

	login = async (req, res) => {
		try {
			const usuario = await Usuario.findByCredentials(req.body.email, req.body.password);
			const token = await usuario.generateAuthToken();
			res.status(200).send({ token });
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};

	logout = async (req, res) => {
		try {
			req.usuario.tokens = req.usuario.tokens.filter((token) => {
				return token.token !== req.token;
			});
			await req.usuario.save();
			res.status(200).send({ message: 'Succesfull logout!' });
		} catch (e) {
			res.status(500).send({ error: e.message });
		}
	};

	logoutAll = async (req, res) => {
		try {
			req.usuario.tokens = [];
			await req.usuario.save();
			res.status(200).send({ message: 'Succesfull logout!' });
		} catch (e) {
			res.status(500).send({ error: e.message });
		}
	};

	createAvatar = async (req, res) => {
		try {
			const usuario = await Usuario.findById(req.params.id);
			usuario.avatar = await sharp(req.file.buffer)
				.resize({ width: 250, height: 250 })
				.png()
				.toBuffer();
			await usuario.save();
			res.status(200).send({ message: 'Avatar successfully uploaded!' });
		} catch (e) {
			res.status(400).send({ error: e.message });
		}
	};

	readAvatar = async (req, res) => {
		try {
			const usuario = await Usuario.findById(req.params.id);
			res.set('Content-Type', 'image/png').send(usuario.avatar);
		} catch (e) {
			res.status(404).send({ error: e.message });
		}
	};

	deleteAvatar = async (req, res) => {
		try {
			const usuario = await Usuario.findById(req.params.id);
			usuario.avatar = undefined;
			await usuario.save();
			res.status(200).send({ message: 'Avatar successfully deleted!' });
		} catch (e) {
			res.status(500).send({ error: e.message });
		}
	};
}
