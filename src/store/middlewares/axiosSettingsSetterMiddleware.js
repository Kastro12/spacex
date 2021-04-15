const axiosSettingsSetterMiddleware = (store) => (next) => (action) => {
	try {
		const result = next(action);

		return result;
	} catch (e) {
		console.error('Error Reporter Middleware: Exception not caught!', e);
		throw e;
	}
};

export default axiosSettingsSetterMiddleware;
