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
			ref: 'UDC' // Categoria 'Rubros'
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
		precios: [
			{
				lugar: {
					type: mongoose.Schema.Types.ObjectId,
					required: [ true, 'Property lugar of preciosEquipo is required' ],
					ref: 'Lugar'
				},
				anio: {
					type: Number,
					required: [ true, 'Property anio of preciosEquipo is required' ],
					validate: {
						validator: (val: string): boolean => {
							return /^20[0-9][0-9]$/.test(val);
						},
						message: 'Invalid anio format. Must be: yyyy.'
					}
				},
				semestre: {
					type: Number,
					required: [ true, 'Property semestre of preciosEquipo is required' ],
					validate: {
						validator: (val: string): boolean => {
							return /^[1-2]$/.test(val);
						},
						message: 'Invalid semestre format. Must be: number 1 or 2.'
					}
				},
				precio: {
					type: Number,
					required: [ true, 'Property precio of preciosEquipo is required' ],
					min: 0
				}
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
