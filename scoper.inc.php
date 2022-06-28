<?php

declare( strict_types=1 );

$composer = \json_decode( \file_get_contents( 'composer.json' ), true );

$wp_functions = \str_getcsv( \file_get_contents( __DIR__ . '/phpcs-tokens/tokens/wp-functions.csv' ) );
$wp_classes   = \str_getcsv( \file_get_contents( __DIR__ . '/phpcs-tokens/tokens/wp-classes.csv' ) );
$wp_consts    = \str_getcsv( \file_get_contents( __DIR__ . '/phpcs-tokens/tokens/wp-consts.csv' ) );

return [
	// The prefix configuration. If a non null value will be used, a random prefix will be generated.
	'prefix' => 'CUMULUS\Gutenberg\Vendors',

	// By default when running php-scoper add-prefix, it will prefix all relevant code found in the current working
	// directory. You can however define which files should be scoped by defining a collection of Finders in the
	// following configuration key.
	//
	// For more see: https://github.com/humbug/php-scoper#finders-and-paths
	'finders' => [
		//Finder::create()->files()->in( 'vendor' ),
		\Isolated\Symfony\Component\Finder\Finder::create()
			->files()
			->ignoreVCS( true )
			->notName( '/LICENSE|.*\\.md|.*\\.dist|Makefile|composer\\.json|composer\\.lock/' )
			->exclude( [
				'doc',
				'test',
				'test_old',
				'tests',
				'Tests',
				'vendor-bin',
				'php-cs-fixer',
				'friendsofphp',
			] )
			->notPath( \array_keys( $composer['require-dev'] ) )
			->notPath( 'friendsofphp' )
			->notPath( 'bin' )
			->in( 'vendor' ),
		\Isolated\Symfony\Component\Finder\Finder::create()->append( [
			'composer.json',
			'composer.lock',
		] ),
	],

	// If `true` then the user defined constants belonging to the global namespace will not be prefixed.
	//
	// For more see https://github.com/humbug/php-scoper#constants--constants--functions-from-the-global-namespace
	'expose-global-constants' => true,

	// If `true` then the user defined classes belonging to the global namespace will not be prefixed.
	//
	// For more see https://github.com/humbug/php-scoper#constants--constants--functions-from-the-global-namespace
	'expose-global-classes' => true,

	// If `true` then the user defined functions belonging to the global namespace will not be prefixed.
	//
	// For more see https://github.com/humbug/php-scoper#constants--constants--functions-from-the-global-namespace
	'expose-global-functions' => true,

	'exclude-classes'   => $wp_classes,
	'exclude-functions' => \array_merge(
		[
			'wp_count_terms',
		],
		\array_map( 'strtolower', $wp_functions )
	),
	'exclude-constants' => $wp_consts,
];
