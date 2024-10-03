import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE_URL!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);

mongoose
	.connect(DB)
	.then(() => {
		console.log('Successfully connected to database.');
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}...`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
