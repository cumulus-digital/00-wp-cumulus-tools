export default {
	loading_message: 'Loading…',
	error_message: 'Failed to load stations! Please try again later.',

	headers: new Headers( {
		Accept: 'application/json',
	} ),
	baseURL: 'https://player.cumulusmedia.com/stations.ashx',
	refreshTime: 14400000,
};
