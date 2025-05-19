import express from 'express';
import { selectAll, selectOne } from '../../utils/Get.js';
import validate from '../../utils/Validate.js';
import { primaryKeys } from '../index.js';

const router = express.Router();

export default (db) => {
	// Get all
	router.get('/:table', async (req, res) => {
		const table = req.params.table;
		const key = primaryKeys[table] || 'id';

		if (!validate(table, res)) return;

		try {
			const data = await selectAll(db, table, key);
			res.json(data);
		} catch (err) {
			res.status(500).json(err);
		}
	});

	// Get one by ID
	router.get('/:table/:id', async (req, res) => {
		const { table, id } = req.params;
		const key = primaryKeys[table] || 'id';

		if (!validate(table, res)) return;

		try {
			const data = await selectOne(db, table, key, id);
			if (!data) return res.status(404).json({ error: 'Not found' });
			res.json(data);
		} catch (err) {
			res.status(500).json(err);
		}
	});

	return router;
};
