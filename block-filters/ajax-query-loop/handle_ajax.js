(function ($, window, undefined) {
	$(function () {
		if (!window.core_query_ajax_handler || !window.core_query_ajax_handler.url) {
			return;
		}
		function loadPage($queryBlock, pageRequest = 1, scrollTo = false) {
			if (!$queryBlock.jquery) {
				$queryBlock = $($queryBlock);
			}
			var $template = $queryBlock.find('.wp-block-post-template');
			var $pagination = $queryBlock.find('.wp-block-query-pagination');

			if ($queryBlock.length && $template.length) {
				var queryId = $queryBlock.attr('data-query-id');
				$queryBlock.addClass('is-loading');
				var request = $.ajax({
					method: 'POST',
					url: window.core_query_ajax_handler.url,
					dataType: 'html',
					data: {
						action: 'query_render_more_pagination',
						queryId: queryId,
						paged: pageRequest,
						block: $queryBlock.attr('data-block')
					}
				});
				request.done(function (data) {
					$queryBlock.removeClass('is-loading');
					if (data) {
						var $newHtml = $(data);
						if ($newHtml.length) {
							if (scrollTo) {
								$queryBlock[0].scrollIntoView({
									behavior: 'smooth',
									block: 'start',
								});
							}

							// Replace class names since there are styles
							// associated with the originals that don't come
							// with the new data.
							$newHtml[0].className = $queryBlock[0].className;
							$newHtml.find('.wp-block-post-template')[0].className = $template[0].className;
							var $newPagination = $newHtml.find('.wp-block-query-pagination')
							$newPagination[0].className = $pagination[0].className;

							// Pagination may be returned with admin-ajax.php as the page!
							$newPagination.find('a').each(function () {
								this.href = this.href.replace('/wp-admin/admin-ajax.php', window.location.pathname);
							});
							$queryBlock.replaceWith($newHtml);
						}
					}
				});
				return request;
			}
		}

		// Handle ajaxified query block pagination clicks
		$(window).on('click', function (e) {
			var $target = $(e.target);
			if (!$target.is('.wp-block-query.uses-ajax .wp-block-query-pagination a')) {
				return;
			}
			var queryRegexp = new RegExp(/query\-([^\-]+)\-page=(\d+)/);
			var targetQuery = $target.attr('href').match(queryRegexp);
			var $queryBlock = $target.closest('.wp-block-query.uses-ajax');
			if ($queryBlock.length) {
				e.preventDefault();
				var paged = 1;
				if (targetQuery && targetQuery.length > 1) {
					paged = parseInt(targetQuery[2]);
				}
				var request = loadPage($queryBlock, paged, true);
				request.done(function (data) {
					if (data && data.length) {
						if (window.history.pushState) {
							// Replace query in URL
							if (targetQuery && targetQuery.length) {
								var newUrl = new URL(window.location.href);
								newUrl.search = newUrl.search.match(queryRegexp) ? newUrl.search.replace(/query\-[^\-]+\-page=\d+/, targetQuery[0]) : targetQuery[0];
								window.history.pushState(null, null, newUrl);
							}
						}
					}
				});
				request.fail(function () {
					// All else fails, load window
					window.location.href = $target.attr('href');
				});
			}
		});

		// Handle back/forward buttons
		$(window).on('popstate', function () {
			var query = window.location.search.match(/query\-([^\-]+)\-page=(\d+)/);
			if (query && query.length > 1) {
				var queryId = query[1];
				var paged = query[2];
				var $queryBlock = $('.wp-block-query.uses-ajax[data-query-id="' + queryId + '"]');
				if ($queryBlock.length) {
					$queryBlock.each(function () {
						loadPage($(this), paged);
					});
				}
			} else {
				// No query in url? we need to set any ajax'd query blocks to page 1
				$queryBlock = $('.wp-block-query.uses-ajax[data-paged!="1"]');
				$queryBlock.each(function () {
					loadPage($(this), paged);
				});
			}
		});
	});
})(jQuery, window.self);