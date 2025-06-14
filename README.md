# Cumulus Wordpress Tools

A collection of custom WordPress blocks, filters, and utilities for use with Cumulus Media websites.

**This plugin is not licensed for use outside of Cumulus Media, and no warranty or support is offered.**

## Project Structure

Structure is fairly self-explanatory...

* block-filters - Filters for core and 3rd party blocks
* blocks - Custom blocks
* cpts - Custom post types
* shortcodes - Custom shortcodes
* utilities - Custom utility plugins
* global - Helpers, custom components, icon SVGs
* phpcs-tokens - Used by PHPCS for automatically root-namespacing WP functions/classes

This project uses [@wordpress/scripts](https://github.com/WordPress/gutenberg/tree/trunk/packages/scripts) webpack config, with some customization (mainly for output paths).

## Installation

Download the a zip file and install plugin manually. [Git Updater](https://github.com/afragen/git-updater) headers are includes for updating.

## Development

Development requires PHP, node/npm, and composer.

Setup:
```
npm install
composer install
./.php-cs-fixer/refresh.sh
```

Building:
```
npm run format:js # Optional
npm run build
```

Update packages:
Upgrades npm packages, composer packages, and phpcs-tokens, runs strauss
```
npm run full-upgrade
```

## Blocks

* ### Anchor

	A separate block for in-page anchors so they can be repositioned by the theme

* ### Big Feature

	A 3-column, mobile-responsive grid of linked featured images.

* ### Collapsable Group

	A group block which can 'collapse' on mobile to a single-level accordion as well as 'stick' on scroll to a parent container.

* ### Donut Graph

	A simple donut graph block.

* ### Family Links

	List children of a hierarchical post type (e.g. Pages) as a menu.

* ### Station Finder

	Provides a frontend UI for searching the CSRG station database.

* ### Category Slideshow

	Displays a simple slideshow of images in a given category.

* ### Flip Card

	A card that flips in 3d when hovered/tapped.

* ### Current Date

	Displays the current date using a PHP date format string.

## Block Filters

Filters extending blocks include:

* core/*: Adds margin support to several core blocks.
* core/post-terms: Adds support for custom taxonomies.
* core/query: Adds ajax pagination and the ability to exclude post IDs for query loop blocks.
* core/search: Adds post-type and taxonomy filters for search fields.

## Shortcodes

* post-table: Inserts a simple table of posts with their pubdate.

* current-date: Inserts the current date using a PHP date format string.

## Utilities

Custom utilities for Wordpress include:

* collapse-hierarchical: Adds a collapsing tree UI to hierarchical posts and terms.
* jetpack-extras: Adds options to expose jetpack's modules menu, and toggles to disable its video and image sitemaps.
* obscure-feed-authors: Replace all feed items' "creator" with site name.

## What's with the weird repo name?

Wordpress plugins load alphabetically, and it can be advantageous to load first.