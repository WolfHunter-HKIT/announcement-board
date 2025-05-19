import express from 'express';
import loginRoute from './login.js';
import logoutRoute from './logout.js';
import verifyToken from './verifyToken.js';

const router = express.Router();

export const JWT_SECRET =
	process.env.JWT_SECRET ||
	'3b1dc75eb86c65b804812c791ee576be3f8f1cb88ed40784d0ab2154e3694715c5cfd8c947348b63a3e9bfd76c6dcca712b34905f12c5a1ae2e2d18a16c26a489df368ee1ba3973731846cdad85e94fc93f30f5638becc4fcf230ad1b8c2f9033923177e5287b99487f9e25fce22e0dc7bffdd25d55613c0774e651ee0868f10b4e927db59f5f5f17870dccc0529220bebde079f98c3da3ba9d12a21b4b625465c31a7d382d6e6e0f181eb32767642e32200bb6573df10faa0a2ad42dc37a6b0662a2bf26bc039a5b1d2ab45ccad997389d1bb02ed3223a527d35cf5d182e48e1c07a0f2e6baced83cdd8c14759e4f04a2dc1408b9e6a43cb553c723478f02ce'; // use env var in production

export default (db) => {
	router.use(loginRoute(db));
	router.use(logoutRoute(db));
	router.use(verifyToken(db));
	return router;
};
