import * as types from './rocketActionTypes';

import util from '../../../../client/util';
import get from 'lodash/get';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import head from 'lodash/head';

export const loadRocketsList = (data) => (dispatch, getState, { api }) => {
	return api
		.get(`/v3/rockets`)
		.then((response) => {
			dispatch({ type: types.ROCKETS_ARE_LOADING, payload: { rockets: response.data } });
			return response;
		})
		.catch((responseError) => {
			dispatch({ type: types.ROCKETS_FAILED_TO_LOAD, payload: responseError.data });
			const handledErrors = util.axios.handleResponseError(responseError);
			const errors = merge(
				{ _error: 'Form submit error.' },
				handledErrors.fieldErrors,
				isEmpty(handledErrors.generalErrors) ? {} : { _error: head(handledErrors.generalErrors).detail }
			);
		});
};

export const loadRocket = (id) => (dispatch, getState, { api }) => {
	return api
		.get(`/v3/rockets/${id}`)
		.then((response) => {
			dispatch({ type: types.ROCKET_ARE_LOADING, payload: get(response, 'data', []) });
			return response;
		})
		.catch((responseError) => {
			dispatch({ type: types.ROCKET_FAILED_TO_LOAD, payload: responseError.data });
			const handledErrors = util.axios.handleResponseError(responseError);
			const errors = merge(
				{ _error: 'Form submit error.' },
				handledErrors.fieldErrors,
				isEmpty(handledErrors.generalErrors) ? {} : { _error: head(handledErrors.generalErrors).detail }
			);
		});
};

export const loadRocketsListByFilter = (filter) => (dispatch, getState, { api }) => {
	return api
		.get(`/v3/rockets`)
		.then((response) => {
			dispatch({ type: types.ROCKETS_ARE_LOADING_BY_FILTER, payload: { rockets: response.data, filter: filter } });
			return response;
		})
		.catch((responseError) => {
			dispatch({ type: types.ROCKETS_FAILED_TO_LOAD_BY_FILTER, payload: responseError.data });
			const handledErrors = util.axios.handleResponseError(responseError);
			const errors = merge(
				{ _error: 'Form submit error.' },
				handledErrors.fieldErrors,
				isEmpty(handledErrors.generalErrors) ? {} : { _error: head(handledErrors.generalErrors).detail }
			);
		});
};
