import mongoose from 'mongoose';
import app from './app';
import { API_PORT, DATABASE_PASSWORD, DATABASE_URL } from './config';

const DB = DATABASE_URL.replace('<PASSWORD>', DATABASE_PASSWORD);

// Connect to database and start server
mongoose
	.connect(DB)
	.then(() => {
		console.log('Successfully connected to database.');
		app.listen(API_PORT, () => {
			console.log(`Listening on port ${API_PORT}...`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
