import './frontend.scss';
import jQuery from 'jquery';
const $ = jQuery.noConflict();

$(() => {
	$('.wp-block-cumulus-gutenberg-category-slideshow').crsgCategorySlideshow();
} );
