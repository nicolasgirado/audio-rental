import * as express from 'express';

import ClienteCtrl from './controllers/cliente.controller';
import EquipoCtrl from './controllers/equipo.controller';
import EquipoPrecioCtrl from './controllers/equipoPrecio.controller';
import EventoCtrl from './controllers/evento.controller';
import EventoAdicionalCtrl from './controllers/eventoAdicional.controller';
import LugarCtrl from './controllers/lugar.controller';
import UDCCtrl from './controllers/udc.controller';
import SalonCtrl from './controllers/salon.controller';
import SalonPackCtrl from './controllers/salonPack.controller';
import UsuarioCtrl from './controllers/usuario.controller';

import { uploadImg } from './middlewares/multer';
import { tokenValidationAuth, sameUserOrAdminAuth } from './middlewares/auth';

export default function setRoutes(app) {
	const router = express.Router();

	const clienteCtrl = new ClienteCtrl();
	const equipoCtrl = new EquipoCtrl();
	const equipoPrecioCtrl = new EquipoPrecioCtrl();
	const eventoCtrl = new EventoCtrl();
	const eventoAdicionalCtrl = new EventoAdicionalCtrl();
	const lugarCtrl = new LugarCtrl();
	const udcCtrl = new UDCCtrl();
	const salonCtrl = new SalonCtrl();
	const salonPackCtrl = new SalonPackCtrl();
	const usuarioCtrl = new UsuarioCtrl();

	// Login
	router.route('/login').post(usuarioCtrl.login);
	router.route('/logout').post(tokenValidationAuth, usuarioCtrl.logout);
	router.route('/logoutAll').post(tokenValidationAuth, usuarioCtrl.logoutAll);

	// Usuario
	router.route('/usuarios').post(tokenValidationAuth, sameUserOrAdminAuth, usuarioCtrl.create);
	router.route('/usuarios').get(tokenValidationAuth, sameUserOrAdminAuth, usuarioCtrl.readAll);
	router.route('/usuarios/:id').get(tokenValidationAuth, sameUserOrAdminAuth, usuarioCtrl.read);
	router.route('/usuarios/:id').put(tokenValidationAuth, sameUserOrAdminAuth, usuarioCtrl.update);
	router.route('/usuarios/:id').delete(tokenValidationAuth, sameUserOrAdminAuth, usuarioCtrl.delete);
	router.route('/usuarios/count').get(tokenValidationAuth, sameUserOrAdminAuth, usuarioCtrl.count);

	// Avatar
	router
		.route('/usuarios/:id/avatar')
		.post(tokenValidationAuth, sameUserOrAdminAuth, uploadImg.single('avatar'), usuarioCtrl.createAvatar);
	router
		.route('/usuarios/:id/avatar')
		.get(tokenValidationAuth, sameUserOrAdminAuth, usuarioCtrl.readAvatar);
	router
		.route('/usuarios/:id/avatar')
		.delete(tokenValidationAuth, sameUserOrAdminAuth, usuarioCtrl.deleteAvatar);

	// Cliente
	router.route('/clientes').post(tokenValidationAuth, clienteCtrl.create);
	router.route('/clientes').get(tokenValidationAuth, clienteCtrl.readAll);
	router.route('/clientes/:id').get(tokenValidationAuth, clienteCtrl.read);
	router.route('/clientes/:id').put(tokenValidationAuth, clienteCtrl.update);
	router.route('/clientes/:id').delete(tokenValidationAuth, clienteCtrl.delete);

	// Equipo
	router.route('/equipos').post(tokenValidationAuth, equipoCtrl.create);
	router.route('/equipos').get(tokenValidationAuth, equipoCtrl.readAll);
	router.route('/equipos/:id').get(tokenValidationAuth, equipoCtrl.read);
	router.route('/equipos/:id').put(tokenValidationAuth, equipoCtrl.update);
	router.route('/equipos/:id').delete(tokenValidationAuth, equipoCtrl.delete);

	// EquipoPrecio
	router.route('/equipoPrecios').post(tokenValidationAuth, equipoPrecioCtrl.create);
	router.route('/equipoPrecios').get(tokenValidationAuth, equipoPrecioCtrl.readAll);
	router.route('/equipoPrecios/:id').get(tokenValidationAuth, equipoPrecioCtrl.read);
	router.route('/equipoPrecios/:id').put(tokenValidationAuth, equipoPrecioCtrl.update);
	router.route('/equipoPrecios/:id').delete(tokenValidationAuth, equipoPrecioCtrl.delete);

	// Evento
	router.route('/eventos').post(tokenValidationAuth, eventoCtrl.create);
	router.route('/eventos').get(tokenValidationAuth, eventoCtrl.readAll);
	router.route('/eventos/:id').get(tokenValidationAuth, eventoCtrl.read);
	router.route('/eventos/:id').put(tokenValidationAuth, eventoCtrl.update);
	router.route('/eventos/:id').delete(tokenValidationAuth, eventoCtrl.delete);

	// EventoAdicional
	router.route('/eventoAdicionales').post(tokenValidationAuth, eventoAdicionalCtrl.create);
	router.route('/eventoAdicionales').get(tokenValidationAuth, eventoAdicionalCtrl.readAll);
	router.route('/eventoAdicionales/:id').get(tokenValidationAuth, eventoAdicionalCtrl.read);
	router.route('/eventoAdicionales/:id').put(tokenValidationAuth, eventoAdicionalCtrl.update);
	router.route('/eventoAdicionales/:id').delete(tokenValidationAuth, eventoAdicionalCtrl.delete);

	// Lugar
	router.route('/lugares').post(tokenValidationAuth, lugarCtrl.create);
	router.route('/lugares').get(tokenValidationAuth, lugarCtrl.readAll);
	router.route('/lugares/:id').get(tokenValidationAuth, lugarCtrl.read);
	router.route('/lugares/:id').put(tokenValidationAuth, lugarCtrl.update);
	router.route('/lugares/:id').delete(tokenValidationAuth, lugarCtrl.delete);

	// Salon
	router.route('/salones').post(tokenValidationAuth, salonCtrl.create);
	router.route('/salones').get(tokenValidationAuth, salonCtrl.readAll);
	router.route('/salones/lugar/:lugarId').get(tokenValidationAuth, salonCtrl.readSalonesByLugar);
	router.route('/salones/:id').get(tokenValidationAuth, salonCtrl.read);
	router.route('/salones/:id').put(tokenValidationAuth, salonCtrl.update);
	router.route('/salones/:id').delete(tokenValidationAuth, salonCtrl.delete);

	// SalonPack
	router.route('/salonPacks').post(tokenValidationAuth, salonPackCtrl.create);
	router.route('/salonPacks').get(tokenValidationAuth, salonPackCtrl.readAll);
	router.route('/salonPacks/:id').get(tokenValidationAuth, salonPackCtrl.read);
	router.route('/salonPacks/:id').put(tokenValidationAuth, salonPackCtrl.update);
	router.route('/salonPacks/:id').delete(tokenValidationAuth, salonPackCtrl.delete);

	// UDC
	router.route('/udcs').post(tokenValidationAuth, udcCtrl.create);
	router.route('/udcs').get(tokenValidationAuth, udcCtrl.readAll);
	router.route('/udcs/:id').get(tokenValidationAuth, udcCtrl.read);
	router.route('/udcs/:id').put(tokenValidationAuth, udcCtrl.update);
	router.route('/udcs/:id').delete(tokenValidationAuth, udcCtrl.delete);

	// Apply the routes to our application with the prefix /api
	app.use('/api', router);
}
