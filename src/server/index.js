import bodyParser from 'body-parser';
import consolidate from 'consolidate';
import { renderReactApp } from './ssr';
import i18n from '../client/i18n';

const express = require('express');
const app = express();
const cookieParserMiddleware = require('cookie-parser');
const i18nextMiddleware = require('i18next-http-middleware');
const i18nextFsBackendMiddleware = require('i18next-node-fs-backend');

// use Twigjs with consolidate extension template engine
app.engine('html', consolidate.twig);

// set .html as the default extension
app.set('view engine', 'html');

// set view folder
app.set('views', '/var/www/html/src/server/views');

// use cookie parser middleware
app.use(cookieParserMiddleware());

// set static serving folder
app.use(express.static('public'));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// for reacti18n language
i18n
	.use(i18nextFsBackendMiddleware)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		debug: false,
		preload: ['en', 'sr'],
		backend: {
			loadPath: `${__dirname}/../public/locales/{{lng}}/{{ns}}.json`,
		},
	});
app.use(i18nextMiddleware.handle(i18n));

// register routes
app.get('*', renderReactApp);

// listen for incoming requests
const port = process.env.NODE_PORT || 9000;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
