import * as mongoose from 'mongoose';

/*-----------------------
	Schema EquipoPrecio
-------------------------*/

const equipoPrecioSchema = new mongoose.Schema(
	{
		equipo: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property lugar of equipoPrecio is required' ],
			ref: 'Equipo'
		},
		lugar: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property lugar of equipoPrecio is required' ],
			ref: 'Lugar'
		},
		anio: {
			type: Number,
			required: [ true, 'Property anio of equipoPrecio is required' ],
			validate: {
				validator: (val: string): boolean => {
					return /^20[0-9][0-9]$/.test(val);
				},
				message: 'Invalid anio format. Must be: yyyy.'
			}
		},
		semestre: {
			type: Number,
			required: [ true, 'Property semestre of equipoPrecio is required' ],
			validate: {
				validator: (val: string): boolean => {
					return /^[1-2]$/.test(val);
				},
				message: 'Invalid semestre format. Must be: number 1 or 2.'
			}
		},
		precio: {
			type: Number,
			required: [ true, 'Property precio of equipoPrecio is required' ],
			min: 0
		},
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

const EquipoPrecio = mongoose.model('EquipoPrecio', equipoPrecioSchema, 'equipoPrecios');

export default EquipoPrecio;
