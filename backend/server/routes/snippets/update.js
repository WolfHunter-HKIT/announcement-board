import express from 'express';
import bcrypt from 'bcrypt';
import update from '../../utils/Put.js';
import validate from '../../utils/Validate.js';
import { primaryKeys } from '../index.js';

const router = express.Router();

export default (db) => {
	router.put('/:table/:id', async (req, res) => {
		const { table, id } = req.params;
		const key = primaryKeys[table] || 'id';

		if (!validate(table, res)) return;

		try {
			const data = { ...req.body };

			if (table === 'users' && data.password) {
				data.password = await bcrypt.hash(data.password, 10);
			}

			const result = await update(db, table, key, id, data);
			res.json({ success: true, affectedRows: result.affectedRows });
		} catch (err) {
			res.status(500).json(err);
		}
	});

	return router;
};
