const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(
	{
		cliente: {
			type: String
		},
		lugar: {
			type: String
		},
		fechaEvento: {
			type: Date,
			required: true
		},
		DJ: {
			type: String
		},
		Responsable: {
			type: String
		},
		promoViernes: {
			type: Boolean
		},
		precioPack: Number
	},
	{
		timestamps: true
	}
);

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;
