<?php
// PHP-CS-Fixer project configuration
$config = new PhpCsFixer\Config();

require_once __DIR__ . '/vendor/autoload.php';
$RuleSet = new vena\WordPress\PhpCsFixer\WordPressRuleSet();

// Load WP core classes/functions/constants for qualifying
$wp_core      = \str_getcsv( \file_get_contents( __DIR__ . '/phpcs-tokens/tokens/wp-core.csv' ) );
$NFI_includes = \array_filter( \array_merge(
	array( '@compiler_optimized' ),
	array( '@internal' ),
	$wp_core
) );

return $config
	->registerCustomFixers( $RuleSet->getCustomFixers() )
	->setRiskyAllowed( true )
	->setIndent( "\t" )
	->setRules( \array_merge(
		$RuleSet->getRules(),
		array(
			'binary_operator_spaces' => array( 'default' => 'align_single_space_minimal' ),
			// Replace non multibyte-safe functions with corresponding mb function.
			'mb_str_functions' => true,
			// Add leading `\` before constant invocation of internal constant to speed up resolving. Constant name match is case-sensitive, except for `null`, `false` and `true`.
			'native_constant_invocation' => true,
			// Add leading `\` before function invocation to speed up resolving.
			'native_function_invocation' => array(
				'strict'  => false,
				'include' => $NFI_includes,
			),
			// Master language constructs shall be used instead of aliases.
			'no_alias_language_construct_call' => true,
		),
	) )
	->setFinder(
		PhpCsFixer\Finder::create()
			->exclude( 'vendor' )
			->exclude( 'build/composer' )
			->in( __DIR__ )
	)
;
