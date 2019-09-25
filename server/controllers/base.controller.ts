abstract class BaseCtrl {
	abstract model: any;

	// Create
	create = async (req, res) => {
		try {
			const doc = await new this.model({ ...req.body, createdBy: req.usuario._id }).save();
			res.status(201).send(doc);
		} catch (err) {
			return res.status(400).send({ error: err.message });
		}
	};

	// Read all
	readAll = async (req, res) => {
		try {
			const docs = await this.model.find({});
			res.status(200).send(docs);
		} catch (err) {
			return res.status(400).send({ error: err.message });
		}
	};

	// Read by id
	read = async (req, res) => {
		try {
			const doc = await this.model.findOne({ _id: req.params.id });
			if (!doc) {
				return res.status(404).send({ error: `Document with id ${req.params.id} was not found!` });
			}
			res.status(200).send(doc);
		} catch (err) {
			return res.status(500).send({ error: err.message });
		}
	};

	// Update by id
	update = async (req, res) => {
		try {
			const doc: any = await this.model.findOneAndUpdate(
				{ _id: req.params.id },
				{ ...req.body, updatedBy: req.usuario._id }
			);
			if (!doc) {
				return res.status(404).send({ error: `Document with id ${req.params.id} was not found!` });
			}
			res.status(200).send();
		} catch (err) {
			return res.status(400).send({ error: err.message });
		}
	};

	// Delete by id
	delete = async (req, res) => {
		try {
			const doc = await this.model.findOneAndRemove({ _id: req.params.id });
			if (!doc) {
				return res.status(404).send({ error: `Document with id ${req.params.id} was not found!` });
			}
			res.status(200).send();
		} catch (err) {
			return res.status(400).send({ error: err.message });
		}
	};

	// Count all
	count = async (req, res) => {
		try {
			const count = await this.model.count();
			res.status(200).send(count);
		} catch (err) {
			return res.status(400).send({ error: err.message });
		}
	};
}

export default BaseCtrl;
