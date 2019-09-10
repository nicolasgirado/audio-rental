import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import setRoutes from './routes';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connection.openUri(
	process.env.MONGODB_URL,
	{ useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
	(err, client) => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		setRoutes(app);
		console.log('\x1b[36m%s\x1b[0m', 'Connected to MongoDB');
	}
);

app.listen(port, () => {
	console.log('\x1b[36m%s\x1b[0m', 'Express listening on port: ' + port);
});

export { app };
