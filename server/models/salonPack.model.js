const mongoose = require('mongoose');

/*---------------------
	Schema SalonPack
----------------------*/

const salonPackSchema = new mongoose.Schema(
	{
		mesanio: { type: Date, required: true }, //Fecha 1 del mes-año
		quincena1: {
			type: Number,
			required: true
		},
		quincena2: {
			type: Number,
			required: true
		},
		salon: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Salon'
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

/*-----------------------
	Métodos y funciones
------------------------*/

const SalonPack = mongoose.model('SalonPack', salonPackSchema, 'salonPacks');

module.exports = SalonPack;
