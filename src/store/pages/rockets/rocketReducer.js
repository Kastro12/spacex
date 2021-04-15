import * as types from './actions/rocketActionTypes';
import merge from 'lodash/merge';
import assign from 'lodash/assign';

const initialState = {
	rockets: {},
	rocketsAreLoading: false,
	rocketsAreLoaded: false,
};

const reducer = (state = initialState, { type: actionType, payload: actionPayload }) => {
	switch (actionType) {
		case types.ROCKETS_ARE_LOADING: {
			return setRocketsAreLoading(state, actionPayload);
		}
		case types.ROCKET_ARE_LOADING: {
			return setRocketAreLoading(state, actionPayload);
		}

		case types.ROCKETS_ARE_LOADING_BY_FILTER: {
			return setRocketAreLoadingByFilter(state, actionPayload);
		}

		default:
			return { ...state };
	}
};

const setRocketsAreLoading = (state, rockets) => {
	return merge({}, state, { rockets: rockets.rockets });
	// return assign({}, state, { rockets: rockets.rockets.filter((r) => r.active != false) });
};

const setRocketAreLoading = (state, rocket) => {
	return merge({}, state, { rocket });
};

const setRocketAreLoadingByFilter = (state, data) => {
	const filteredState = assign(data, {
		rockets: data.rockets.filter((rocket) => {
			let searchedRocket;
			if (data.filter.search) {
				searchedRocket = false;
				if (rocket.rocket_name.toLowerCase().includes(data.filter.search.toLowerCase()) != false) {
					searchedRocket = true;
				}
			}

			let activeR;
			if (data.filter.active === undefined) {
				activeR = false;
			} else {
				activeR = data.filter.active;
			}

			let showThisRocket = false;
			if (rocket.active == activeR) {
				showThisRocket = true;
			}

			if (searchedRocket != false && showThisRocket != false) return rocket;
		}),
	});

	console.log(filteredState);

	if (data.filter.sortBy) {
		if (data.filter.sortBy == 'height_ASC') filteredState.rockets.sort((a, b) => (a.height.meters < b.height.meters ? 1 : -1));
		if (data.filter.sortBy == 'height_DESC') filteredState.rockets.sort((a, b) => (a.height.meters > b.height.meters ? 1 : -1));

		if (data.filter.sortBy == 'diameter_ASC')
			filteredState.rockets.sort((a, b) => (a.diameter.meters < b.diameter.meters ? 1 : -1));
		if (data.filter.sortBy == 'diameter_DESC')
			filteredState.rockets.sort((a, b) => (a.diameter.meters > b.diameter.meters ? 1 : -1));

		console.log(filteredState);
	}

	return assign(state, { rockets: filteredState.rockets });
};

export const reducerName = 'rocketReducer';
export default reducer;
