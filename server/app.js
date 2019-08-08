const express = require('express');
const mongoose = require('mongoose');
const usuarioRoutes = require('./routes/usuario.routes');
const equipoRoutes = require('./routes/equipo.routes');
const rubroRoutes = require('./routes/rubro.routes');
const lugarRoutes = require('./routes/lugar.routes');
const excelRoutes = require('./routes/excel.routes');

const app = express();

// Puerto
const port = process.env.PORT;

// Parser
app.use(express.json());

// Routes
app.use(usuarioRoutes);
app.use(equipoRoutes);
app.use(rubroRoutes);
app.use(lugarRoutes);
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
