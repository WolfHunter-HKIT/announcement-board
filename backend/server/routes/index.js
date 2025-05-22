import express from 'express';
import authRoutes from './auth/index.js';
import crudRoutes from './snippets/index.js';

const router = express.Router();

export const primaryKeys = {
	users: 'userID',
	comments: 'commentID',
	announcements: 'announcementID',
	likes: 'likeID',
};

export default (db) => {
	router.use(authRoutes(db));
	router.use(crudRoutes(db));
	return router;
};
