import BaseCtrl from './base.controller';
import Lugar from '../models/lugar.model';

export default class LugarCtrl extends BaseCtrl {
	model = Lugar;
}
