const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(
	{
		lugar: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Lugar'
		},
		salon: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Salon'
		},
		fechaEvento: {
			type: Date,
			required: true
		},
		precioPack: Number
	},
	{
		timestamps: true
	}
);

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;
