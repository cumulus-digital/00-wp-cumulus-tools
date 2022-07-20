const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// Ensure CleanWebpackPlugin doesn't remove composer build dir from php-scoper
let plugins = defaultConfig.plugins;
for (let i in plugins) {
	if (plugins[i] instanceof CleanWebpackPlugin) {
		plugins[i] = new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: [
				'!fonts/**',
				'!images/**',
				'!composer/**',
			],
			cleanOnceBeforeBuildPatterns: ['**/*', '!composer/**'],
		});
	}
}
defaultConfig.plugins = plugins;

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(process.cwd(), 'src', 'index.js')
	}
};
