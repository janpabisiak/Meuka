import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../sass/app.scss';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
