export default {
	loading_message: 'Loading…',
	error_message: `We're sorry, this service is currently unavailable. Please try again later.`,

	headers: new Headers( {
		Accept: 'application/json',
	} ),
	baseURL: 'https://player.cumulusmedia.com/stations.ashx',
	refreshTime: 14400000,
};
