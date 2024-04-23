import jQuery from 'jquery';
const $ = jQuery.noConflict();

$.fn.crsgCategorySlideshow = function ( ajaxurl ) {
	return this.each( function () {
		const that = this,
			$this = $( this );

		function attr( id, val ) {
			if ( val === undefined ) {
				return $this.attr( id );
			}
			return $this.attr( id, val );
		}
		function data( id, val ) {
			if ( val === undefined ) {
				return $.data( that, id );
			}
			return $.data( that, id, val );
		}

		const cat = attr( 'data-category' ),
			timeout = attr( 'data-timeout' ) * 1000;

		data( 'lastswap', null );

		window.cancelAnimationFrame( data( 'anim' ) );

		$this.html(
			$( '<div/>', { class: 'crsg-category_slideshow-loading' } )
		);

		if ( ! cat ) {
			$this.html(
				'<div class="crsg-category_slideshow-error">No category defined.</div>'
			);
			return;
		}

		// Cancel any currently loading op
		if ( $this.data( 'loading' ) && $this.data( 'loading' ).abort ) {
			$this.data( 'loading' ).abort();
		}

		function load() {
			$this.data(
				'loading',
				$.ajax( {
					url: ajaxurl,
					data: {
						action: 'get_media_by_category',
						category: cat,
					},
					type: 'GET',
					dataType: 'json',
				} ).done( function ( ret ) {
					const images = [];
					ret.forEach( function ( img, i ) {
						if ( img.hasOwnProperty( 'guid' ) ) {
							try {
								const url = new URL( img.guid ).pathname;
								images.push(
									$( '<img/>', {
										alt: img.hasOwnProperty( 'post_title' )
											? img.post_title
											: '',
										src:
											i < 1
												? url
												: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
										'data-src': url,
										class: i < 1 ? 'current' : '',
									} )
								);
							} catch ( e ) {
								console.warn(
									'Category Slideshow',
									'Chosen category contains an invalid image',
									img
								);
							}
						}
					} );
					if ( images.length ) {
						const container = $( '<div/>' );
						container.append( images );
						$this.html( container );
						data(
							'anim',
							window.requestAnimationFrame( nextImage )
						);
					} else {
						$this.html(
							'<div class="crsg-category_slideshow-error">No images found.</div>'
						);
					}
				} )
			);
		}

		function nextImage() {
			if ( ! data( 'lastswap' ) ) {
				data( 'lastswap', new Date().getTime() );
			}
			const now = new Date().getTime(),
				runtime = now - data( 'lastswap' );
			if ( runtime > timeout ) {
				const $current = $this.find( '.current' );
				let $next = $current.next( 'img' );
				if ( ! $next.length ) {
					$next = $current.siblings( 'img' ).eq( 0 );
				}
				$next.attr( 'src', $next.attr( 'data-src' ) );
				$current.removeClass( 'current' );
				$next.addClass( 'current' );
				data( 'lastswap', new Date().getTime() );
			}
			data( 'anim', window.requestAnimationFrame( nextImage ) );
		}

		load();
		return this;
	} );
};
