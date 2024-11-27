import express, { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

const app: Express = express();

const whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5173'];

// CORS configuration
const corsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
		if (!origin || whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PATCH'],
};

app.use(cors(corsOptions));

// Rate limiting configuration
const limiter = rateLimit({
	windowMs: 10 * 1000,
	limit: 10000,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
});

app.use(limiter);
app.use(morgan('dev')); // Logging
app.use(helmet()); // Security headers
app.use(hpp()); // HTTP Parameter Pollution protection
app.use(bodyParser.json()); // JSON body parser

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use(
	'/api/products/images',
	express.static('data', {
		setHeaders: (res, path) => {
			res.set('Cross-Origin-Resource-Policy', 'cross-origin');
		},
	})
);
app.use('/api/orders', orderRoute);
app.use(function (req, res) {
	res.status(404).json({
		status: 'error',
		message: 'Error 404: Not found',
	});
});

export default app;
