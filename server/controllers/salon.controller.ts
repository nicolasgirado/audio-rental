import BaseCtrl from './base.controller';
import Salon from '../models/salon.model';

export default class SalonCtrl extends BaseCtrl {
	model = Salon;

	readSalonesByLugar = async (req, res) => {
		try {
			const docs = await this.model.find({ lugar: req.params.lugarId });
			if (!docs) {
				return res
					.status(404)
					.send({ error: `Documents with lugarId ${req.params.lugarId} not found!` });
			}
			res.status(200).send(docs);
		} catch (err) {
			return res.status(500).send({ error: err.message });
		}
	};
}
