import express from 'express';
import bcrypt from 'bcrypt';
import insert from '../../utils/Post.js';
import validate from '../../utils/Validate.js';
import { primaryKeys } from '../index.js';

const router = express.Router();

export default (db) => {
	// Insert into a table
	router.post('/:table', async (req, res) => {
		const table = req.params.table;
		const key = primaryKeys[table] || 'id';

		if (!validate(table, res)) return;

		try {
			const data = { ...req.body };

			if (table === 'users' && data.password) {
				const hashedPassword = await bcrypt.hash(data.password, 10);
				delete data.password;
				data.password = hashedPassword;
			}

			const result = await insert(db, table, key, data);
			res.json({ success: true, insertedId: result.insertId });
		} catch (err) {
			res.status(500).json(err);
		}
	});

	return router;
};
