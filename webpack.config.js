const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Our own personal resolves
const resolves = {
	resolve: {
		...defaultConfig?.resolve,
		alias: {
			...defaultConfig?.resolve?.alias,
			Icons: path.resolve( __dirname, 'global/icons' ),
			Utilities: path.resolve( __dirname, 'global/utilities' ),
			wpBlockLibrary: path.resolve(
				__dirname,
				'node_modules/@wordpress/block-library'
			),
		},
	},
};

// Force block.json matches to copy to the build/blocks block folder
defaultConfig.plugins = defaultConfig.plugins.map( ( plugin ) => {
	if ( plugin.patterns ) {
		plugin.patterns = plugin.patterns.map( ( pattern ) => {
			if ( pattern.from.includes( 'block.json' ) ) {
				return {
					...pattern,
					to: path.resolve( process.cwd(), 'build/blocks' ),
				};
			}
		} );
	}
	return plugin;
} );

// Make block asset resources go in their block's folder
const blockModuleRules = defaultConfig.module.rules.map( ( rule ) => {
	if ( rule.type === 'asset/resource' ) {
		const filename = ( pathData ) => {
			if ( pathData.filename.match( /^blocks\// ) ) {
				const filename = pathData.filename.replace(
					/^[.\/]?blocks\/(.*\/).*$/,
					'$1'
				);
				return `${ filename }[name].[hash:8][ext]`;
			}
		};
		if ( filename ) {
			rule.generator.filename = filename;
		}
	}
	return rule;
} );

// Allow direct importing from node_modules
const allowNodeModulesRule = defaultConfig.module.rules.filter( ( rule ) => {
	if (
		rule?.test.toString() === '/\\.(j|t)sx?$/' &&
		rule?.exclude.toString().includes( 'node_modules' )
	) {
		delete rule.exclude;
	}
	return rule;
} );

module.exports = [
	// Blocks
	{
		...defaultConfig,
		module: {
			...defaultConfig.module,
			rules: blockModuleRules,
		},
		...resolves,
		stats:
			defaultConfig.mode == 'production' ? 'normal' : 'errors-warnings',
		output: {
			filename: '[name].js',
			path: path.resolve( process.cwd(), 'build/blocks' ),
		},
	},
	// CPTs

	// Block filters get a special entry since they may directly include node_modules stuff...
	{
		...defaultConfig,
		module: {
			...defaultConfig.module,
			rules: [ ...allowNodeModulesRule ],
		},
		...resolves,
		entry: {
			'block-filters': './global/block-filters.js',
		},
		stats:
			defaultConfig.mode == 'production' ? 'normal' : 'errors-warnings',
	},

	// Plugin core
	{
		...defaultConfig,
		...resolves,
		entry: {
			editor: './global/editor.js',
		},
		stats:
			defaultConfig.mode == 'production' ? 'normal' : 'errors-warnings',
	},
];
