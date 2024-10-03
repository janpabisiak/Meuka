import express, { Express } from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';

const app: Express = express();

app.use(bodyParser.json());

app.use('/api/users', userRoute);

export default app;
