const mongoose = require('mongoose');

/*-----------------------
	Schema EquipoPrecio
------------------------*/

const equipoPrecioSchema = new mongoose.Schema(
	{
		lugar: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Lugar'
		},
		equipo: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Equipo'
		},
		anio: {
			type: Number,
			required: true
		},
		semestre1: {
			type: Number,
			required: true
		},
		semestre2: {
			type: Number,
			required: true
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

const EquipoPrecio = mongoose.model('EquipoPrecio', equipoPrecioSchema);
module.exports = EquipoPrecio;
