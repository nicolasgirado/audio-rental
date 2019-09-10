import BaseCtrl from './base.controller';
import Evento from '../models/evento.model';

export default class EventoCtrl extends BaseCtrl {
	model = Evento;
}
