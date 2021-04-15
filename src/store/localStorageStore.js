import store2 from 'store2';
import merge from 'lodash/merge';

const storage = store2.namespace('_localStorage');
const reduxStorage = store2.namespace('_reduxLocalStorage');

export default {
	get: (key, defaultValue = undefined) => {
		try {
			let value = storage.local.get(key);
			if (value === undefined) {
				return defaultValue;
			}

			return value;
		} catch (e) {
			console.error(`Problem with loading local storage key ${key}.`);
			console.error(e);
			return undefined;
		}
	},
	set: (key, value) => {
		try {
			storage.local.set(key, value);
		} catch (e) {
			console.error(`Problem with setting local storage key: ${key}.`);
			console.error(e);
		}
	},
	getReduxState: (defaultValue = undefined) => {
		try {
			let value = reduxStorage.local.getAll();
			if (value === undefined) {
				return defaultValue;
			}
			return value;
		} catch (e) {
			console.error(`Problem with loading local storage redux state.`);
			console.error(e);
			return undefined;
		}
	},
	getReduxStateForReducer: (reducerName, defaultValue = undefined) => {
		try {
			let value = reduxStorage.local.get(reducerName);
			if (value === undefined) {
				return defaultValue;
			}
			return value;
		} catch (e) {
			console.error(`Problem with loading local storage redux state, key: ${reducerName}.`);
			console.error(e);
			return undefined;
		}
	},
	setReduxStateForReducer: (reducerName, state) => {
		try {
			const mergedState = merge(reduxStorage.local.get(reducerName), state);
			reduxStorage.local.set(reducerName, mergedState);
		} catch (e) {
			console.error(`Problem with setting local storage redux state, key: ${reducerName}.`);
			console.error(e);
		}
	},
};
