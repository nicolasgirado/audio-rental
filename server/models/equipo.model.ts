import * as mongoose from 'mongoose';

/*------------------
	Schema Equipo
-------------------*/

const equipoSchema = new mongoose.Schema(
	{
		descripcion: {
			type: String,
			required: [ true, 'Property descripcion of equipo is required' ],
			trim: true,
			minlength: 2,
			maxlength: 50,
			unique: true
		},
		rubro: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property rubro of evento is required' ],
			ref: 'Udc' // Categoria 'Rubros'
		},
		observaciones: {
			type: String,
			trim: true,
			minlength: 2,
			maxlength: 70
		},
		imagenes: [
			{
				type: Buffer
			}
		],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuario'
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuario'
		}
	},
	{
		timestamps: true
	}
);

equipoSchema.pre('find', function() {
	this.populate('rubro');
});

const Equipo = mongoose.model('Equipo', equipoSchema, 'equipos');

export default Equipo;
