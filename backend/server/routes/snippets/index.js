import express from 'express';
import createRoute from './create.js';
import readRoute from './read.js';
import updateRoute from './update.js';
import deleteRoute from './delete.js';

const router = express.Router();

export default (db) => {
	router.use(createRoute(db));
	router.use(readRoute(db));
	router.use(updateRoute(db));
	router.use(deleteRoute(db));
	return router;
};
