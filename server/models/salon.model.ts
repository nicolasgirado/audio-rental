import * as mongoose from 'mongoose';

/*------------------
	Schema Salon
-------------------*/

const salonSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			minlength: 2,
			maxlength: 50,
			unique: true,
			required: [ true, 'Property nombre of salon is required' ]
		},
		lugar: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property lugar of salon is required' ],
			ref: 'Lugar'
		},
		imagenes: [
			{
				type: Buffer
			}
		],
		packs: [
			{
				mesanio: {
					type: String,
					validate: {
						validator: (val: string): boolean => {
							return /^(0[1-9]|10|11|12)-20[0-9][0-9]$/.test(val);
						},
						message: 'Invalid mesanio format. Must be: mm-yyyy.'
					}
				},
				quincena: {
					type: Number,
					validate: {
						validator: (val: string): boolean => {
							return /^[1-2]$/.test(val);
						},
						message: 'Invalid quincena format. Must be: number 1 or 2.'
					}
				},
				valorPack: {
					type: Number,
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

salonSchema.pre('find', function() {
	this.populate('lugar');
});

const Salon = mongoose.model('Salon', salonSchema, 'salones');

export default Salon;
