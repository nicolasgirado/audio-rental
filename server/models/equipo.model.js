const mongoose = require('mongoose');

/*------------------
	Schema Equipo
-------------------*/

const equipoSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			unique: true
		},
		imagen: {
			type: Buffer
		},
		rubro: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Rubro'
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

// Eliminar info innecesaria en los json response
equipoSchema.methods.toJSON = function() {
	const equipo = this;
	const equipoObject = equipo.toObject();
	delete equipoObject.picture;
	return equipoObject;
};

const Equipo = mongoose.model('Equipo', equipoSchema);
module.exports = Equipo;
