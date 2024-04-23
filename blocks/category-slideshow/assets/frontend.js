import './frontend.scss';
import jQuery from 'jquery';
const $ = jQuery.noConflict();

$( () => {
	if ( window?.crsg_category_slideshow?.ajaxUrl ) {
		$(
			'.wp-block-cumulus-gutenberg-category-slideshow'
		).crsgCategorySlideshow( window.crsg_category_slideshow.ajaxUrl );
	} else {
		console.error( 'Category Slideshow', 'Could not find ajaxurl' );
	}
} );
