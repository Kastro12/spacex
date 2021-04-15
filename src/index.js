import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from '../src/store/store';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
	<Provider store={store()}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);
