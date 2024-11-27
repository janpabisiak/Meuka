/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_LINK: string;
	readonly VITE_API_TIMEOUT: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
