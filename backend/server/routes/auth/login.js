import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { selectByColumn } from '../../utils/Get.js';
import { JWT_SECRET } from './index.js';

const router = express.Router();

export default (db) => {
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
				// Generate JWT
				const token = jwt.sign(
					{ userID: user.userID, email: user.email, isAdmin: user.isAdmin, displayName: user.displayName },
					JWT_SECRET,
					{ expiresIn: '30d' } // token valid for 1 month
				);

				//Set token in HTTP-only cookie
				res.cookie('token', token, {
					httpOnly: true,
					// secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
					sameSite: 'Strict',
					maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
				});

				res.status(200).json({
					success: true,
					message: 'Authentication successful',
				});
			} else {
				res.status(401).json({ success: false, message: 'Incorrect password.' });
			}
		} catch (err) {
			console.error('Error in /verify:', err);
			res.status(500).json({ success: false, message: 'Internal server error.' });
		}
	});

	return router;
};
