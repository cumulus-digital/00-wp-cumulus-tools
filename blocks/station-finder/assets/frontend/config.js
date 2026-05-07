export default {
	loading_message: 'Loading…',
	error_message: `We're having trouble loading live station listings right now. Try refreshing the page or searching again in a few minutes.`,

	headers: new Headers( {
		Accept: 'application/json',
	} ),
	baseURL: 'https://player.cumulusmedia.com/stations.ashx',
	refreshTime: 14400000,
};
