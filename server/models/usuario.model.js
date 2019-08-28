const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*------------------
	Schema Usuario
-------------------*/

const rolesValidos = {
	values: [ 'ADMIN_ROLE', 'USER_ROLE' ],
	message: '{VALUE} no es un rol permitido'
};

const usuarioSchema = new mongoose.Schema(
	{
		nombre: {
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
					throw new Error('Email inválido');
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
					throw new Error('La contraseña no puede contener la palabra "password"');
				}
			}
		},
		role: {
			type: String,
			required: true,
			default: 'USER_ROLE',
			enum: rolesValidos
		},
		tokens: [
			{
				token: {
					type: String,
					required: true
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

/*-----------------------
	Métodos y funciones
------------------------*/

// Hasheo de contraseña previo al guardado del usuario
usuarioSchema.pre('save', async function(next) {
	const usuario = this;
	if (usuario.isModified('password')) {
		usuario.password = await bcrypt.hash(usuario.password, 8);
	}
	next();
});

// Borrar info privada cuando pasa a JSON
usuarioSchema.methods.toJSON = function() {
	const usuario = this;
	const usuarioObject = usuario.toObject();
	delete usuarioObject.password;
	delete usuarioObject.tokens;
	delete usuarioObject.avatar;
	return usuarioObject;
};

// Chequeo de credenciales (email y password)
usuarioSchema.statics.findByCredentials = async (email, password) => {
	const usuario = await Usuario.findOne({ email });
	if (!usuario) {
		throw new Error('Credenciales incorrectas!');
	}
	const isMatch = await bcrypt.compare(password, usuario.password);
	if (!isMatch) throw new Error('Credenciales incorrectas!');
	return usuario;
};

// Generar token de autenticación
usuarioSchema.methods.generateAuthToken = async function() {
	const usuario = this;
	const token = jwt.sign({ _id: usuario._id.toString() }, process.env.JWT_SECRET, {
		expiresIn: 86400
	});
	usuario.tokens = usuario.tokens.concat({ token });
	await usuario.save();
	return token;
};

// Generar y exportar modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
