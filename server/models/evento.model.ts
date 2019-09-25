import * as mongoose from 'mongoose';

/*------------------
	Schema Evento
-------------------*/

const eventoSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [ true, 'Property nombre of evento is required' ],
			minlength: 3,
			maxlength: 50,
			trim: true
		},
		tipoDeEvento: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property tipoDeEvento of evento is required' ],
			ref: 'UDC' // Categoria 'TiposDeEventos'
		},
		cliente: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property cliente of evento is required' ],
			ref: 'Cliente'
		},
		salon: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property salon of salones is required' ],
			ref: 'Salon'
		},
		fechaEvento: {
			type: Date,
			required: [ true, 'Property fechaEvento of evento is required' ]
		},
		fechaArmado: {
			type: Date
		},
		fechaDevolucion: {
			type: Date
		},
		promoViernes: {
			type: Boolean,
			required: [ true, 'Property promoViernes of evento is required' ],
			default: false
		},
		dj: {
			type: String,
			minlength: 3,
			maxlength: 50,
			trim: true
		},
		responsable: {
			type: String,
			minlength: 3,
			maxlength: 50,
			trim: true
		},
		valorPack: {
			type: Number,
			required: [ true, 'Property valorPack of evento is required' ],
			min: 0
		},
		totalSubtotal: {
			type: Number,
			required: [ true, 'Property totalSubtotal of evento is required' ],
			min: 0
		},
		totalPcioVtaDJ: {
			type: Number,
			required: [ true, 'Property totalPcioVtaDJ of evento is required' ],
			min: 0
		},
		totales: {
			totPack_Tecnica: { type: Number },
			totPack_DJ: { type: Number },
			totPack_Comision: { type: Number },
			totAdic_Tecnica: { type: Number },
			totAdic_DJ: { type: Number },
			totAdic_Comision: { type: Number },
			totPackyAdic_Tecnica: { type: Number },
			totPackyAdic_DJ: { type: Number },
			totPackyAdic_Comision: { type: Number }
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

eventoSchema.pre('find', function() {
	this.populate('tipoDeEvento')
		.populate('cliente')
		.populate('salon')
		.populate({ path: 'adicionales.equipo', model: 'Equipo' });
});

const Evento = mongoose.model('Evento', eventoSchema, 'eventos');

export default Evento;
