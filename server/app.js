const express = require('express');
const mongoose = require('mongoose');
const usuarioRoutes = require('./routes/usuario.routes');
const loginRoutes = require('./routes/login.routes');
const rubroRoutes = require('./routes/rubro.routes');
const equipoRoutes = require('./routes/equipo.routes');
const equipoPrecioRoutes = require('./routes/equipoPrecio.routes');
const lugarRoutes = require('./routes/lugar.routes');
const salonRoutes = require('./routes/salon.routes');
const salonPackRoutes = require('./routes/salonPack.routes');
const eventoRoutes = require('./routes/evento.routes');
const excelRoutes = require('./routes/excel.routes');

const app = express();

// Puerto
const port = process.env.PORT;

// Parser
app.use(express.json());

// CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

// Routes
app.use(usuarioRoutes);
app.use(loginRoutes);
app.use(rubroRoutes);
app.use(equipoRoutes);
app.use(equipoPrecioRoutes);
app.use(lugarRoutes);
app.use(salonRoutes);
app.use(salonPackRoutes);
app.use(eventoRoutes);
app.use(excelRoutes);

// MongoDB
mongoose.connection.openUri(
	process.env.MONGODB_URL,
	{ useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
	(err, client) => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		console.log('Conexión con MongoDB: \x1b[36m%s\x1b[0m', 'online');
	}
);

// Inicializar
app.listen(port, () => {
	console.log('Express app corriendo en el puerto ' + port + ': \x1b[36m%s\x1b[0m', 'online');
});
