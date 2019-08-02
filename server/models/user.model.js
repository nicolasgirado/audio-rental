const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email is invalid');
				}
			}
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 7,
			validate(value) {
				if (value.toLowerCase().includes('password')) {
					throw new Error('Password cannot contain "password"');
				}
			}
		},
		age: {
			type: Number,
			default: 0,
			validate(value) {
				if (value < 0) {
					throw new Error('Age must be a positive number');
				}
			}
		},
		tokens: [
			{
				token: {
					type: String,
					required: false // cambiar a true cuando se implementen
				}
			}
		],
		avatar: {
			type: Buffer
		}
	},
	{
		timestamps: true
	}
);

// Función para encriptar la contraseña previo al guardado del usuario
userSchema.pre('save', async function(next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

// Método para evitar que los response devuelvan información privada (password, etc.)
userSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject.avatar;

	return userObject;
};

// Método estático para encontrar un usuario por credenciales (email y password)
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Wrong credentials! Unable to login');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) throw new Error('Wrong credentials! Unable to login');

	return user;
};

// Método para generar token de autenticación (viene luego de chequear credenciales)
userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: 28800 });

	user.tokens = user.tokens.concat({ token });

	await user.save();

	return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
