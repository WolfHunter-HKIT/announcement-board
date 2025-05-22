import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createPool } from 'mysql2';
import routes from './routes/index.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);
app.use(cookieParser());

// MySQL connection
const db = createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'annpage',
});

// Routes
app.use('/', routes(db));

// Start server
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
