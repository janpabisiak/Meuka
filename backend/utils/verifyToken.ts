import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import TokenPayload from '../interfaces/TokenPayload';
import sendResponse from './sendResponse';

// Function to verify JWT token
const verifyToken = (req: Request, res: Response): TokenPayload | null => {
	const token = req.headers['authorization']?.split(' ')[1];
	if (!token) {
		sendResponse(res, 403, 'failed', 'Not authorized');
		return null;
	}
	try {
		return jwt.verify(token, process.env.JWT_SECRET_KEY!) as TokenPayload;
	} catch {
		sendResponse(res, 401, 'failed', 'Invalid token');
		return null;
	}
};

export default verifyToken;
