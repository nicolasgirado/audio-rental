const mongoose = require('mongoose');

/*------------------
	Schema Salon
-------------------*/

const salonSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			trim: true,
			required: true,
			minlength: 2,
			unique: true
		},
		imagen: {
			type: Buffer
		},
		lugar: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Lugar'
		},
		usuario: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Usuario'
		}
	},
	{
		timestamps: true
	}
);

const Salon = mongoose.model('Salon', salonSchema, 'salones');

module.exports = Salon;
