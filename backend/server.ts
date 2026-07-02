import mongoose from 'mongoose';
import app from './app';
import { API_PORT, DATABASE_PASSWORD, DATABASE_URL } from './config';
import { logger } from './middlewares/loggerMiddleware';

const DB = DATABASE_URL.replace('<PASSWORD>', DATABASE_PASSWORD);

mongoose
	.connect(DB)
	.then(() => {
		logger.info('Successfully connected to database.');
		app.listen(API_PORT, () => {
			logger.info(`Listening on port ${String(API_PORT)}...`);
		});
	})
	.catch((err: unknown) => {
		logger.fatal({ err }, 'Failed to connect to the database.');
		process.exit(1);
	});
