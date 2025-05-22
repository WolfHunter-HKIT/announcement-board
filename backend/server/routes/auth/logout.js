import express from 'express';

const router = express.Router();

export default (db) => {
	router.post('/logout', (req, res) => {
		res.clearCookie('token', {
			httpOnly: true,
			// secure: process.env.NODE_ENV === 'production',
			sameSite: 'Strict',
		});

		res.status(200).json({ success: true, message: 'Logged out successfully.' });
	});
	return router;
};
