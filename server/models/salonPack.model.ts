import * as mongoose from 'mongoose';

/*--------------------
	Schema SalonPack
---------------------*/

const salonPackSchema = new mongoose.Schema(
	{
		salon: {
			type: mongoose.Schema.Types.ObjectId,
			required: [ true, 'Property salon of salonPack is required' ],
			ref: 'Salon'
		},
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

const SalonPack = mongoose.model('SalonPack', salonPackSchema, 'salonPacks');

export default SalonPack;
