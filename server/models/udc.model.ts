import * as mongoose from 'mongoose';

/*------------------
	Schema Rubro
-------------------*/

const udcSchema = new mongoose.Schema(
	{
		descripcion: {
			type: String,
			required: [ true, 'Property descripcion of udc is required' ],
			trim: true,
			minlength: 2,
			maxlength: 50,
			unique: true
		},
		categoria: {
			type: String,
			required: [ true, 'Property categoria of udc is required' ],
			trim: true,
			minlength: 2,
			maxlength: 50
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

const UDC = mongoose.model('UDC', udcSchema, 'udcs');

export default UDC;
