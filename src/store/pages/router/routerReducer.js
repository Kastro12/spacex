import { LOCATION_CHANGE } from 'connected-react-router';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import has from 'lodash/has';

const initialState = {
	currentLocation: {},
	locationHistory: [],
};

const reducer = (state = initialState, { type: actionType, payload: actionPayload }) => {
	switch (actionType) {
		case LOCATION_CHANGE: {
			return setLocationChanged(state, {
				location: actionPayload.location,
				action: actionPayload.action,
				isFirstRendering: actionPayload.isFirstRendering,
			});
		}

		default:
			return { ...state };
	}
};

const setLocationChanged = (state, locationChangedPayload) => {
	console.log(state);
	return assign({}, state, {
		currentLocation: locationChangedPayload,
		locationHistory: state.locationHistory.concat(locationChangedPayload),
	});
};

export const reducerName = 'routerReducer';
export default reducer;
