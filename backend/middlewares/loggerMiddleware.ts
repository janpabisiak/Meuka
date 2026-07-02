import crypto from 'crypto';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import { IS_PRODUCTION, LOG_LEVEL, LOG_TO_FILE } from '../config';

const targets: pino.TransportTargetOptions[] = [];

if (LOG_TO_FILE) {
	targets.push(
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
	);
}

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

const transports = targets.length > 0 ? pino.transport({ targets }) : undefined;

export const logger = pino(
	{
		level: LOG_LEVEL,
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
