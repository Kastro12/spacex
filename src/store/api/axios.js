import axios from 'axios';
import assign from 'lodash/assign';

const a = (settings = {}) =>
	axios.create(
		assign(
			{
				baseURL: process.env.APP_DBP_API_URL || 'https://api.spacexdata.com',
				timeout: 1000,
				headers: {
					'Content-type': 'application/json',
					Accept: 'application/json',
				},
				timeout: 10000,
			},
			settings
		)
	);

export default a();
