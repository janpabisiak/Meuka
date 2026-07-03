import 'dotenv/config';

export enum EnvironmentVariableTypes {
	String = 'string',
	Number = 'number',
	Boolean = 'boolean',
	StringArray = 'stringArray',
}

interface EnvironmentVariableMapping {
	[EnvironmentVariableTypes.String]: string;
	[EnvironmentVariableTypes.Number]: number;
	[EnvironmentVariableTypes.Boolean]: boolean;
	[EnvironmentVariableTypes.StringArray]: string[];
}

interface TransformerSignatures {
	[EnvironmentVariableTypes.String]: (value: string) => string;
	[EnvironmentVariableTypes.Number]: (value: string) => number;
	[EnvironmentVariableTypes.Boolean]: (value: string, compareTo: unknown) => boolean;
	[EnvironmentVariableTypes.StringArray]: (value: string) => string[];
}

const environmentVariableTransformers: {
	[K in EnvironmentVariableTypes]: TransformerSignatures[K];
} = {
	[EnvironmentVariableTypes.String]: (value: string): string => value,
	[EnvironmentVariableTypes.Number]: (value: string): number => {
		const transformedValue = Number(value);
		if (isNaN(transformedValue)) {
			throw new Error(`${value} is not a number and cannot be transformed to the number.`);
		}
		return transformedValue;
	},
	[EnvironmentVariableTypes.Boolean]: (value: string, compareTo: unknown): boolean => value === compareTo,
	[EnvironmentVariableTypes.StringArray]: (value: string): string[] => value.split(','),
};

const getEnvironmentVariable = <T extends EnvironmentVariableTypes = EnvironmentVariableTypes.String>(
	name: string,
	type: T = EnvironmentVariableTypes.String as T,
	compareTo?: unknown,
): EnvironmentVariableMapping[T] => {
	const value = process.env[name];

	if (value === undefined) {
		throw new Error(`There is no value for ${name} variable.`);
	}

	/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any */

	if (type === EnvironmentVariableTypes.Boolean) {
		return (environmentVariableTransformers[type] as any)(value, compareTo);
	}

	return (environmentVariableTransformers[type] as any)(value);

	/* eslint-enable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any */
};

export const IS_PRODUCTION = getEnvironmentVariable('NODE_ENV', EnvironmentVariableTypes.Boolean, 'production');

export const DNS_SERVERS = getEnvironmentVariable('DNS_SERVERS', EnvironmentVariableTypes.StringArray);

export const API_PORT = getEnvironmentVariable('API_PORT', EnvironmentVariableTypes.Number);
export const API_WHITELIST = getEnvironmentVariable('API_WHITELIST', EnvironmentVariableTypes.StringArray);
export const API_METHODS = getEnvironmentVariable('API_METHODS', EnvironmentVariableTypes.StringArray);

export const API_RATE_LIMIT_TIME = getEnvironmentVariable('API_RATE_LIMIT_TIME', EnvironmentVariableTypes.Number);
export const API_RATE_LIMIT_REQUESTS = getEnvironmentVariable('API_RATE_LIMIT_REQUESTS', EnvironmentVariableTypes.Number);

export const DATABASE_URL = getEnvironmentVariable('DATABASE_URL');
export const DATABASE_PASSWORD = getEnvironmentVariable('DATABASE_PASSWORD');

export const JWT_SECRET_KEY = getEnvironmentVariable('JWT_SECRET_KEY');
export const JWT_EXPIRES_IN = getEnvironmentVariable('JWT_EXPIRES_IN');

export const BCRYPT_ROUNDS = getEnvironmentVariable('BCRYPT_ROUNDS', EnvironmentVariableTypes.Number);

export const LOG_LEVEL = getEnvironmentVariable('LOG_LEVEL');
export const LOG_TO_FILE = getEnvironmentVariable('LOG_TO_FILE', EnvironmentVariableTypes.Boolean, 'true');
