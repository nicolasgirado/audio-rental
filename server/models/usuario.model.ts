import * as mongoose from 'mongoose';
import * as validator from 'validator';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

/*------------------
	Schema Usuario
-------------------*/

const rolesValidos = {
	values: [ 'ADMIN', 'NIVEL1', 'NIVEL2' ],
	message: '{VALUE} no es un rol permitido'
};

const usuarioSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [ true, 'Property nombre of usuario is required' ],
			trim: true,
			minlength: 3
		},
		email: {
			type: String,
			required: [ true, 'Property email of usuario is required' ],
			trim: true,
			lowercase: true,
			unique: true,
			validate: {
				validator: (val: string): boolean => {
					if (!validator.isEmail(val)) {
						return false;
					}
				},
				msg: 'Email validation failed'
			}
		},
		password: {
			type: String,
			required: [ true, 'Property password of usuario is required' ],
			trim: true,
			minlength: 7
		},
		role: {
			type: String,
			required: [ true, 'Property role of usuario is required' ],
			default: 'NIVEL2',
			enum: rolesValidos
		},
		tokens: [
			{
				token: {
					type: String,
					required: [ true, 'Property token of usuario is required' ]
				}
			}
		],
		avatar: {
			type: Buffer
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

/*-----------------------
	Métodos y funciones
------------------------*/

// Hashear contraseña previo al save del usuario
usuarioSchema.pre('save', async function(next, req, cb) {
	const usuario = this;
	if (usuario.isModified('password')) {
		usuario.password = await bcrypt.hash(usuario.password, 8);
	}
});

// Buscar usuario por credenciales (email y password)
usuarioSchema.statics.findByCredentials = async (email, password) => {
	const usuario = await Usuario.findOne({ email });
	if (!usuario) {
		throw new Error('Wrong credentials!');
	}
	const isMatch = await bcrypt.compare(password, usuario.password);
	if (!isMatch) {
		throw new Error('Wrong credentials!');
	}
	return usuario;
};

// Ocultar password y tokens de los envíos JSON
usuarioSchema.methods.toJSON = function() {
	const usuario = this;
	const usuarioObject = usuario.toObject();

	delete usuarioObject.password;
	delete usuarioObject.tokens;

	return usuarioObject;
};

// Generar token de autenticación
usuarioSchema.methods.generateAuthToken = async function() {
	const usuario = this;
	const token = jwt.sign({ usuario }, process.env.JWT_SECRET, {
		expiresIn: 604800
	});
	usuario.tokens = usuario.tokens.concat({ token });
	await usuario.save();
	return token;
};

// Generar y exportar modelo
const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

export default Usuario;
