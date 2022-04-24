# Cumulus Wordpress Blocks

A collection of custom Wordpress blocks for use with Cumulus Media websites.

## Project Structure



## Installation

Download the latest release zip file and install plugin manually. This plugin uses Git Updater for updates.

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
npm run format:js
npm run build
```

Update packages:
```
npm run full-upgrade
composer upgrade
```

## Blocks

* ### Anchor

	A separate block for in-page anchors so they can be repositioned by the theme

* ### Family Links

	List children of a hierarchical post type (e.g. Pages) as a menu.

* ### Collapsable Group

	A group block which can 'collapse' on mobile to a single-level accordion as well as 'stick' on scroll to a parent container.

* ### Donut Graph

	A simple donut graph block.

## Filters

Filters extending blocks include:

* core/post-terms: Added support for custom taxonoomies
* core/separator: Added margin support
