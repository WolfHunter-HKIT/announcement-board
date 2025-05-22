import express from 'express';
import remove from '../../utils/Delete.js';
import validate from '../../utils/Validate.js';
import { primaryKeys } from '../index.js';

const router = express.Router();

export default (db) => {
	router.delete('/:table/:id', async (req, res) => {
		const { table, id } = req.params;
		const key = primaryKeys[table] || 'id';

		if (!validate(table, res)) return;

		try {
			const result = await remove(db, table, key, id);
			res.json({ success: true, affectedRows: result.affectedRows });
		} catch (err) {
			res.status(500).json(err);
		}
	});

	return router;
};
