const mongoose = require('mongoose');

/*------------------
	Schema Lugar
-------------------*/

const lugarSchema = new mongoose.Schema(
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

const Lugar = mongoose.model('Lugar', lugarSchema, 'lugares');

module.exports = Lugar;
