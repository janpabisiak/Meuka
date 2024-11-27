import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
dotenv.config();

const API_PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE_URL!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);

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
