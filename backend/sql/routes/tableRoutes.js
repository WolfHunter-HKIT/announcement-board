import express from 'express';
import select from '../components/Get.js';
import selectOne from '../components/GetOne.js';
import insert from '../components/Post.js';
import update from '../components/Put.js';
import remove from '../components/Delete.js';

const router = express.Router();

const primaryKeys = {
	users: 'userID',
	comments: 'commentID',
	announcements: 'announcementID',
	likes: 'likeID',
};

export default (db) => {
	const validate = (table, res) => {
		if (!/^[a-zA-Z0-9_]+$/.test(table)) {
			res.status(400).json({ error: 'Invalid table name' });
			return false;
		}
		return true;
	};

	// Get whole table
	router.get('/:table', async (req, res) => {
		const table = req.params.table;
		const key = primaryKeys[table] || 'id';

		if (!validate(table, res)) return;
		try {
			const data = await select(db, table, key);
			res.json(data);
		} catch (err) {
			res.status(500).json(err);
		}
	});

	// Get a single entry from a table
	router.get('/:table/:id', async (req, res) => {
		const table = req.params.table;
		const id = req.params.id;

		if (!validate(table, res)) return;
		const key = primaryKeys[table] || 'id';

		try {
			const data = await selectOne(db, table, key, id);
			if (!data) return res.status(404).json({ error: 'Not found' });
			res.json(data);
		} catch (err) {
			res.status(500).json(err);
		}
	});

	// Insert into a table
	router.post('/:table', async (req, res) => {
		const table = req.params.table;
		const key = primaryKeys[table] || 'id';
		if (!validate(table, res)) return;
		try {
			const result = await insert(db, table, key, req.body);
			res.json({ success: true, insertedId: result.insertId });
		} catch (err) {
			res.status(500).json(err);
		}
	});

	// Delete from a table
	router.put('/:table/:id', async (req, res) => {
		const table = req.params.table;
		const id = req.params.id;
		const key = primaryKeys[table] || 'id';
		if (!validate(table, res)) return;
		try {
			const result = await update(db, table, key, id, req.body);
			res.json({ success: true, affectedRows: result.affectedRows });
		} catch (err) {
			res.status(500).json(err);
		}
	});

	router.delete('/:table/:id', async (req, res) => {
		const table = req.params.table;
		const id = req.params.id;
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
