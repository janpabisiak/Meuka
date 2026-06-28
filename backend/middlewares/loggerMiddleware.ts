import crypto from 'crypto';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import { IS_PRODUCTION } from '../config';

const targets: pino.TransportTargetOptions[] = [
	{
		target: 'pino-roll',
		level: 'info',
		options: { file: './logs/info.log', frequency: 'daily', mkdir: true, limit: { count: 15 }, dateFormat: 'dd-MM-yyyy' },
	},
	{
		target: 'pino-roll',
		level: 'error',
		options: { file: './logs/error.log', frequency: 'daily', mkdir: true, limit: { count: 15 }, dateFormat: 'dd-MM-yyyy' },
	},
];

if (!IS_PRODUCTION) {
	targets.push({
		target: 'pino-pretty',
		level: 'debug',
		options: {
			colorize: true,
			sync: true,
		},
	});
}

const transports = pino.transport({ targets });

export const logger = pino(
	{
		level: IS_PRODUCTION ? 'info' : 'debug',
		timestamp: pino.stdTimeFunctions.isoTime,
	},
	transports,
);

export const loggerMiddleware = pinoHttp({
	logger,
	genReqId: (req, res) => {
		const headerValue = req.headers['x-request-id'];
		const id = headerValue ? (Array.isArray(headerValue) ? headerValue[0] : headerValue) : crypto.randomUUID();
		res.setHeader('X-Request-Id', id);
		return id;
	},
});
