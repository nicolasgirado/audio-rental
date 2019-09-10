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
		fechaHoraEvento: {
			type: Date,
			required: [ true, 'Property fechaHoraEvento of evento is required' ]
		},
		promoViernes: {
			type: Boolean,
			required: [ true, 'Property promoViernes of evento is required' ],
			default: false
		},
		valorPack: {
			type: Number,
			required: [ true, 'Property valorPack of evento is required' ],
			min: 0
		},
		totalAdicionales: {
			type: Number,
			required: [ true, 'Property totalAdicionales of evento is required' ],
			min: 0
		},
		fechaHoraArmado: {
			type: Date
		},
		fechaHoraDevolucion: {
			type: Date
		},
		DJ: {
			type: String,
			minlength: 3,
			maxlength: 50,
			trim: true
		},
		Responsable: {
			type: String,
			minlength: 3,
			maxlength: 50,
			trim: true
		},
		adicionales: [
			{
				cantidad: {
					type: Number,
					required: [ true, 'Property cantidad of adicional is required' ],
					min: 0
				},
				equipo: {
					type: mongoose.Schema.Types.ObjectId,
					required: [ true, 'Property equipo of adicional is required' ],
					ref: 'Equipo'
				},
				pcioUnit: {
					type: Number,
					required: [ true, 'Property pcioUnit of adicional is required' ],
					min: 0
				},
				subtotal: {
					type: Number,
					required: [ true, 'Property subtotal of adicional is required' ],
					min: 0
				},
				pcioVtaDJ: {
					type: Number,
					required: [ true, 'Property pcioVtaDJ of adicional is required' ],
					min: 0
				},
				observaciones: {
					type: String,
					minlength: 3,
					maxlength: 50,
					trim: true
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

eventoSchema.pre('find', function() {
	this.populate('tipoDeEvento')
		.populate('cliente')
		.populate('salon')
		.populate({ path: 'adicionales.equipo', model: 'Equipo' });
});

const Evento = mongoose.model('Evento', eventoSchema, 'eventos');

export default Evento;
