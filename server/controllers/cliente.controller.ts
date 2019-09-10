import BaseCtrl from './base.controller';
import Cliente from '../models/cliente.model';

export default class ClienteCtrl extends BaseCtrl {
	model = Cliente;
}
