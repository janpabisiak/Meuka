import compression from 'compression';
import cors from 'cors';
import { setServers } from 'dns/promises';
import express, { Express, NextFunction, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import path from 'path';
import { API_METHODS, API_RATE_LIMIT_REQUESTS, API_RATE_LIMIT_TIME, API_WHITELIST } from './config';
import { authMiddleware } from './middlewares/authMiddleware';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import orderRoute from './routes/orderRoute';
import productRoute from './routes/productRoute';
import userRoute from './routes/userRoute';
import { HttpError } from './utils/httpError';
import sendResponse from './utils/sendResponse';
import { IHttpRequest } from './types/IHttpRequest';

setServers(['1.1.1.1', '8.8.8.8']);

const app: Express = express();

app.set('trust proxy', 1);

const corsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
		if (!origin || API_WHITELIST.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: API_METHODS.split(','),
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
	windowMs: API_RATE_LIMIT_TIME * 1000,
	limit: API_RATE_LIMIT_REQUESTS,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
});
app.use(limiter);

app.use(loggerMiddleware);

app.use(helmet());
app.use(hpp());

app.use(compression());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', authMiddleware, orderRoute);
app.use(
	'/data',
	express.static(path.resolve(__dirname, 'data'), {
		setHeaders: (res) => {
			res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
		},
	}),
);

app.use('*', (_: IHttpRequest, res: Response) => {
	res.status(404).json();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: IHttpRequest, res: Response, next: NextFunction) => {
	if (err instanceof HttpError) {
		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		return sendResponse(res, err.type, err.status, err.message);
	}

	req.log.error({ err }, 'An unexpected error happened.');
	// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
	return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
});

export default app;
