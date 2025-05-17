// server.js

import express from 'express';
import cors from 'cors';
import { createPool } from 'mysql2';
import tableRoutes from './routes/tableRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const db = createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'annpage',
});

app.use('/', tableRoutes(db));

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
