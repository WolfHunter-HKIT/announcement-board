import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './index.js';

const router = express.Router();

const authMiddleware = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded; // you can access user info later
		next();
	} catch (err) {
		return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
	}
};

export default (db) => {
	router.get('/protected', authMiddleware, async (req, res) => {
		res.json({ success: true, message: 'You have access', user: req.user });
	});
	return router;
};
