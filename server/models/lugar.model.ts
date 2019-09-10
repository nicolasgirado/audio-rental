import * as mongoose from 'mongoose';
import * as validator from 'validator';

/*------------------
	Schema Lugar
-------------------*/

const lugarSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [ true, 'Property nombre of lugar is required' ],
			minlength: 2,
			maxlength: 50,
			unique: true
		},
		direccion: {
			type: String,
			required: [ true, 'Property direccion of lugar is required' ],
			minlength: 2,
			maxlength: 70,
			trim: true
		},
		contacto: {
			type: String,
			minlength: 2,
			maxlength: 50,
			trim: true
		},
		telefonos: [
			{
				type: String,
				minlength: 2,
				maxlength: 50,
				trim: true
			}
		],
		email: {
			type: String,
			trim: true,
			lowercase: true,
			validate: {
				validator: (val: string): boolean => {
					if (!validator.isEmail(val)) {
						return false;
					}
				},
				msg: 'Email validation failed'
			}
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

const Lugar = mongoose.model('Lugar', lugarSchema, 'lugares');

export default Lugar;
