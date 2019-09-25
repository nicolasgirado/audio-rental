import * as mongoose from 'mongoose';

/*----------------------------
	Schema EventoAdicional
-----------------------------*/

const eventoAdicionalSchema = new mongoose.Schema(
	{
		evento: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property evento of eventoAdicional is required' ],
			ref: 'Evento'
		},
		cantidad: {
			type: Number,
			required: [ true, 'Property cantidad of eventoAdicional is required' ],
			min: 0
		},
		equipo: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property equipo of eventoAdicional is required' ],
			ref: 'Equipo'
		},
		observaciones: {
			type: String,
			minlength: 3,
			maxlength: 50,
			trim: true
		},
		pcioUnit: {
			type: Number,
			required: [ true, 'Property pcioUnit of eventoAdicional is required' ],
			min: 0
		},
		subtotal: {
			type: Number,
			required: [ true, 'Property subtotal of eventoAdicional is required' ],
			min: 0
		},
		pcioVtaDJ: {
			type: Number,
			required: [ true, 'Property pcioVtaDJ of eventoAdicional is required' ],
			min: 0
		},
		markUp: {
			type: Number,
			required: [ true, 'Property markUp of eventoAdicional is required' ],
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

const EventoAdicional = mongoose.model('EventoAdicional', eventoAdicionalSchema, 'eventoAdicionales');

export default EventoAdicional;
