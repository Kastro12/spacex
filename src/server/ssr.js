import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { matchRoute } from '../Router';
import App from '../App';
import { store } from '../store/store';
import jsesc from 'jsesc';

const fs = require('fs');
const path = require('path');

/**
 * Render React SSR application
 *
 * @param {*} request
 * @param {*} response
 */
export const renderReactApp = async (request, response) => {
	// allow only GET request
	if (request.method !== 'GET') {
		response.status(400).set('Content-Type', 'text/html').send('Bad request');
		return;
	}

	try {
		const reduxStore = store();
		const reactRouterContext = {};

		try {
			await handleDataPreload(request, response, reduxStore);
		} catch (e) {
			console.error(e);
		}

		const rendered = handleReactAppRender(request, reduxStore, reactRouterContext);

		if (reactRouterContext.status === 404) {
			response.status(404);
		}

		if (reactRouterContext.url) {
			return response.redirect(302, reactRouterContext.url);
		}

		// send response
		response.set('Content-Type', 'text/html').render('ssr', {
			helmet: rendered.helmet,
			webpackAssets: JSON.parse(fs.readFileSync(path.join(__dirname, '../public/webpack-assets.json'), 'utf8')),
			cssBundles: [],
			jsBundles: [],
			reactApp: rendered.reactApp,
			script: generateScript(request, reduxStore),
		});
	} catch (e) {
		console.error(e);
		response.status(500).set('Content-Type', 'text/html').send('Internal server error');
	}
};

/**
 * Get data requirements
 *
 * @param {*} request
 * @param {*} response
 * @param {*} reduxStore
 */
const handleDataPreload = async (request, response, reduxStore) => {
	const route = matchRoute(request.path);
	if (route && route.route.component && route.route.component.preInitStore) {
		return await route.route.component.preInitStore(reduxStore, route);
	}
};

/**
 * Render React app
 *
 * @param {*} request
 * @param {*} reduxStore
 * @param {*} reactRouterContext
 */
const handleReactAppRender = (request, reduxStore, reactRouterContext) => {
	const jsx = (
		<Provider store={reduxStore}>
			<StaticRouter context={reactRouterContext} location={request.url}>
				<App />
			</StaticRouter>
		</Provider>
	);

	return {
		reactApp: renderToString(jsx),
		helmet: Helmet.renderStatic(),
	};
};

const generateScript = (request, reduxStore) => {
	const __PRELOADED_STATE__ = jsesc(JSON.stringify(reduxStore.getState()), {
		json: true,
		isScriptContext: true,
		quotes: 'single',
	});

	const __INITIAL_I18N_STORE__ = jsesc(JSON.stringify(getPreloadedTranslations(request)), {
		json: true,
		isScriptContext: true,
		quotes: 'single',
	});

	return [
		`window.__PRELOADED_STATE__ = JSON.parse(${__PRELOADED_STATE__});`,
		`window.__INITIAL_I18N_STORE__ = JSON.parse(${__INITIAL_I18N_STORE__});`,
		`window.__INITIAL_I18N_LANGUAGE__ = '${request.i18n.language}';`,
	].join('\n');
};

const getPreloadedTranslations = (request) =>
	request.i18n.languages.reduce((accumulator, currentValue) => {
		accumulator[currentValue] = request.i18n.services.resourceStore.data[currentValue];
		return accumulator;
	}, {});
