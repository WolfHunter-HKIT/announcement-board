import express from 'express';
import select from '../components/Get.js';
import selectOne from '../components/GetOne.js';
import selectByColumn from '../components/GetByColumn.js';
import insert from '../components/Post.js';
import update from '../components/Put.js';
import remove from '../components/Delete.js';
import bcrypt from 'bcrypt';
import axios from 'axios';

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

	// Verify user credentials
	router.post('/verify', async (req, res) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ success: false, message: 'Email and password are required.' });
		}

		try {
			const user = await selectByColumn(db, 'users', 'email', email);

			if (!user) {
				return res.status(404).json({ success: false, message: 'User not found.' });
			}

			const match = await bcrypt.compare(password, user.password);

			if (match) {
				res.status(200).json({ success: true, message: 'Authentication successful', userID: user.userID });
			} else {
				res.status(401).json({ success: false, message: 'Incorrect password.' });
			}
		} catch (err) {
			console.error('Error in /verify:', err);
			res.status(500).json({ success: false, message: 'Internal server error.' });
		}
	});

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

	// Get a single entry
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
			const data = { ...req.body };

			// Hash password and store in password_hash for users table
			if (table === 'users' && data.password) {
				const saltRounds = 10;
				const hashedPassword = await bcrypt.hash(data.password, saltRounds);
				delete data.password;
				data.password_hash = hashedPassword;
			}

			const result = await insert(db, table, key, data);
			res.json({ success: true, insertedId: result.insertId });
		} catch (err) {
			res.status(500).json(err);
		}
	});

	// Update table entry
	router.put('/:table/:id', async (req, res) => {
		const table = req.params.table;
		const id = req.params.id;
		const key = primaryKeys[table] || 'id';
		if (!validate(table, res)) return;

		try {
			const data = { ...req.body };

			// Hash password if updating users table
			if (table === 'users' && data.password) {
				const saltRounds = 10;
				data.password = await bcrypt.hash(data.password, saltRounds);
			}

			const result = await update(db, table, key, id, data);
			res.json({ success: true, affectedRows: result.affectedRows });
		} catch (err) {
			res.status(500).json(err);
		}
	});

	// Delete table entry
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
