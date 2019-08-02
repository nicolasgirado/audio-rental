const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/user.router');
const loginRouter = require('./routers/login.router');

const app = express();

// Puerto
const port = process.env.PORT;

// Parser
app.use(express.json());

// Routers
app.use(userRouter);
app.use(loginRouter);

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
