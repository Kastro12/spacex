import * as url from './urlUtils';

const util = {
	url,
	isServer: () => !(typeof window !== 'undefined' && window.document && window.document.createElement),
};

export default util;
