const errorReporterMiddleware = (store) => (next) => (action) => {
	try {
		return next(action);
	} catch (e) {
		console.error('Error Reporter Middleware: Exception not caught!', e);
		throw e;
	}
};

export default errorReporterMiddleware;
