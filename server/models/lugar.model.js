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
		salones: [
			{
				nombre: {
					type: String,
					trim: true,
					required: true,
					minlength: 2
				},
				imagen: {
					type: Buffer
				},
				preciosPack: [
					{
						anio: { type: Number, required: true },
						// Cada quincena es un arreglo con los precios de los 12 meses del año
						primeraQuincena: {
							type: [ Number ],
							required: true,
							validate: [ arrayLimit, '{PATH} El arreglo ingresado no tiene 12 precios' ]
						},
						segundaQuincena: {
							type: [ Number ],
							required: true,
							validate: [ arrayLimit, '{PATH} El arreglo ingresado no tiene 12 precios' ]
						}
					}
				]
			}
		],
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

/*-----------------------
	Métodos y funciones
------------------------*/

function arrayLimit(val) {
	return val.length === 12;
}

const Lugar = mongoose.model('Lugar', lugarSchema, 'lugares');

module.exports = Lugar;
