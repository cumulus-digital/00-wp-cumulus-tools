import './scss/index.scss';

(function ($, window, undefined) {

	const tabRegexp = new RegExp('\!tab=([^&]+)');
	let tab = window.location.hash.match(tabRegexp);

	$('.wp-settings-builder.use-tabs').on('change', '.wp-settings-tab', (e) => {
		if (e.currentTarget.checked) {
			tab = window.location.hash.match(tabRegexp);
			const newTab = '!tab=' + e.currentTarget.id
			if (tab?.length) {
				window.location.hash = window.location.hash.replace(tabRegexp, newTab);
			} else {
				if (window.location.hash.length) {
					window.location.hash += '&';
				}
				window.location.hash += '!tab=' + e.currentTarget.id
			}
			const referer = $('.wp-settings-builder > form input[name="_wp_http_referer"');
			const referer_url = new URL(referer.val(), window.location.origin);
			referer_url.hash = '!tab=' + e.currentTarget.id;
			referer.val(referer_url.pathname + referer_url.search + referer_url.hash);
		}
	});
	if (tab?.length) {
		$('.wp-settings-tab[id="' + tab[1] + '"]').trigger('click');
	}

})(jQuery, window.self);