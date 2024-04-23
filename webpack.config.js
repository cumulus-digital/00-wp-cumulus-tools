const glob = require( 'glob' );
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

// Ensure CleanWebpackPlugin doesn't remove composer build dir from php-scoper
let plugins = defaultConfig.plugins;
for ( let i in plugins ) {
	if ( plugins[ i ] instanceof CleanWebpackPlugin ) {
		plugins[ i ] = new CleanWebpackPlugin( {
			cleanAfterEveryBuildPatterns: [
				'!fonts/**',
				'!images/**',
				'!composer/**',
			],
			cleanStaleWebpackAssets: false,
			cleanOnceBeforeBuildPatterns: [ '*/', '!composer/**' ],
		} );
	}
}
defaultConfig.plugins = plugins;

// Our own personal resolves
defaultConfig.resolve = {
	...defaultConfig?.resolve,
	alias: {
		...defaultConfig?.resolve?.alias,
		Icons: path.resolve( __dirname, 'global/icons' ),
		Utilities: path.resolve( __dirname, 'global/utilities' ),
		Components: path.resolve( __dirname, 'global/components' ),
		wpBlockLibrary: path.resolve(
			__dirname,
			'node_modules/@wordpress/block-library'
		),
		wpEditor: path.resolve( __dirname, 'node_modules/@wordpress/editor' ),
		wpBlockEditor: path.resolve(
			__dirname,
			'node_modules/@wordpress/block-editor'
		),
	},
};

// Force block.json matches to copy to the build/blocks block folder
defaultConfig.plugins = defaultConfig.plugins.map( ( plugin ) => {
	if ( plugin instanceof CopyWebpackPlugin && plugin.patterns ) {
		plugin.patterns = plugin.patterns.map( ( pattern ) => {
			if ( pattern.from.includes( 'block.json' ) ) {
				return {
					...pattern,
					to: path.resolve( process.cwd(), 'build/blocks' ),
				};
			}
			return pattern;
		} );
	}
	return plugin;
} );

// Make block asset resources go in their block's folder
const blockModuleRules = defaultConfig.module.rules.map( ( rule ) => {
	if ( rule.type === 'asset/resource' ) {
		const filename = ( pathData ) => {
			if ( pathData.filename.match( /^blocks\// ) ) {
				const blockname = pathData.filename.replace(
					/^[.\/]?blocks\/(.*\/).*$/,
					'$1'
				);
				const newPattern = `${ blockname }[name].[hash:8][ext]`;
				return newPattern;
			}
			return rule.generator.filename;
		};
		rule.generator.filename = filename;
	}
	return rule;
} );

// Allow direct importing from node_modules
const allowNodeModulesRule = defaultConfig.module.rules.filter( ( rule ) => {
	if (
		//rule?.test.toString() === '/\\.(j|t)sx?$/' &&
		rule?.test.toString() === '/\\.m?(j|t)sx?$/' &&
		rule?.exclude.toString().includes( 'node_modules' )
	) {
		delete rule.exclude;
	}
	return rule;
} );

module.exports = [
	// Plugin core, cleans entire build dir
	{
		...defaultConfig,
		entry: {
			editor: './global/editor.js',
		},
		output: {
			...defaultConfig.output,
			clean: true,
		},
		stats:
			defaultConfig.mode == 'production' ? 'normal' : 'errors-warnings',
	},

	// Block filters get a special entry since they may directly include node_modules stuff...
	{
		...defaultConfig,
		module: {
			...defaultConfig.module,
			rules: [ ...allowNodeModulesRule ],
		},
		entry: {
			'block-filters': './global/block-filters.js',
		},
		stats:
			defaultConfig.mode == 'production' ? 'normal' : 'errors-warnings',
	},

	// Blocks
	{
		...defaultConfig,
		module: {
			...defaultConfig.module,
			rules: [
				...blockModuleRules,
				{
					test: /\.psx$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-react',
								'@babel/preset-env',
							],
							plugins: [
								[ '@babel/plugin-transform-runtime' ],
								[
									'@babel/plugin-transform-react-jsx',
									{
										pragma: 'h',
										pragmaFrag: 'Fragment',
									},
								],
							],
						},
					},
				},
			],
		},
		stats:
			defaultConfig.mode == 'production' ? 'normal' : 'errors-warnings',
		output: {
			filename: '[name].js',
			path: path.resolve( process.cwd(), 'build/blocks' ),
			clean: true,
		},
	},

	// CPTs

	// Utilities
	{
		...defaultConfig,
		plugins: [
			new MiniCSSExtractPlugin( { filename: '[name]/index.css' } ),
			! process.env.WP_NO_EXTERNALS &&
				new DependencyExtractionWebpackPlugin(),
		],
		entry: glob
			.sync( './utilities/**/assets/index.js' )
			.reduce( ( acc, path ) => {
				const entry = path
					.replace( '/utilities', '' )
					.replace( '/assets/index.js', '' );
				acc[ entry ] = path;
				return acc;
			}, {} ),
		output: {
			path: path.resolve( process.cwd(), 'build/utilities' ),
			filename: './[name]/index.js',
			clean: true,
		},
	},
];
