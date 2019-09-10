import * as mongoose from 'mongoose';
import * as validator from 'validator';

/*------------------
	Schema Cliente
-------------------*/

const clienteSchema = new mongoose.Schema(
	{
		razonSocial: {
			type: String,
			required: [ true, 'Property razonSocial of cliente is required' ],
			minlength: 2,
			maxlength: 50,
			trim: true,
			unique: true
		},
		direccion: {
			type: String,
			required: [ true, 'Property direccion of cliente is required' ],
			minlength: 2,
			maxlength: 70,
			trim: true
		},
		contactos: [
			{
				nombre: {
					type: String,
					minlength: 2,
					maxlength: 50,
					required: [ true, 'Property nombre of contacto is required' ],
					trim: true
				},
				telefono: {
					type: String,
					minlength: 2,
					maxlength: 50,
					trim: true
				},
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
				}
			}
		],
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

const Cliente = mongoose.model('Cliente', clienteSchema, 'clientes');

export default Cliente;
