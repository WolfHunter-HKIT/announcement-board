import express from 'express';
import { selectAll, selectOne, selectAllByAnnouncementID } from '../../utils/Get.js';
import validate from '../../utils/Validate.js';
import { primaryKeys } from '../index.js';

const router = express.Router();

export default (db) => {
	// Get all comments (or related data) by announcementID
	router.get('/comments/announcement/:announcementID', async (req, res) => {
		const { announcementID } = req.params;
		const table = 'comments'; // Assuming your comments table is named 'comments'

		if (!announcementID) return res.status(400).json({ error: 'Announcement ID is required' });

		try {
			// Fetch all comments related to the specific announcementID
			const comments = await selectAllByAnnouncementID(db, table, announcementID);
			if (comments.length === 0) {
				return res.status(404).json({ error: 'No comments found for this announcement.' });
			}
			res.json(comments); // Return all comments related to the announcementID
		} catch (err) {
			res.status(500).json(err);
		}
	});

	// Get a single comment by commentID
	router.get('/comment/:commentID', async (req, res) => {
		const { commentID } = req.params;
		const table = 'comments'; // Assuming your comments table is named 'comments'

		if (!commentID) return res.status(400).json({ error: 'Comment ID is required' });

		try {
			// Fetch the comment related to the specific commentID
			const comment = await selectOne(db, table, 'commentID', commentID);
			if (!comment) {
				return res.status(404).json({ error: 'Comment not found' });
			}
			res.json(comment); // Return the single comment by commentID
		} catch (err) {
			res.status(500).json(err);
		}
	});

	// Get all rows from a table
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

	// Get one row by ID
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
