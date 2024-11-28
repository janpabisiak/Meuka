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

app.set('trust proxy', 1);

const whitelist = process.env.API_WHITELIST?.split(',')!;

// CORS configuration
const corsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
		console.log(origin);
		console.log('API_WHITELIST:', process.env.API_WHITELIST);
		console.log(
			'Normalized Whitelist:',
			whitelist.map((url) => url.replace(/\/$/, ''))
		);
		if (!origin || whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: process.env.API_METHODS?.split(',')!,
};

app.use(cors(corsOptions));

// Rate limiting configuration
const limiter = rateLimit({
	windowMs: +process.env.API_RATE_LIMIT_TIME! * 1000,
	limit: +process.env.API_RATE_LIMIT_REQUESTS!,
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
