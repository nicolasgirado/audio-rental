const mongoose = require('mongoose');

/*------------------
	Schema Rubro
-------------------*/

const rubroSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			unique: true
		},
		usuario: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Usuario'
		}
	},
	{
		timestamps: true
	}
);

const Rubro = mongoose.model('Rubro', rubroSchema);
module.exports = Rubro;
