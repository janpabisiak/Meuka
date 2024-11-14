import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/products/images', express.static('data'));
app.use('/api/orders', orderRoute);

export default app;
