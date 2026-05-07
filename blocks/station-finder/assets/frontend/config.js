export default {
	loading_message: 'Loading…',
	error_message: `Our station directory is temporarily unavailable. Please try searching again in a few moments.`,

	headers: new Headers( {
		Accept: 'application/json',
	} ),
	baseURL: 'https://player.cumulusmedia.com/stations.ashx',
	refreshTime: 14400000,
};
