// import * as path from 'path';
import { Configuration, IgnorePlugin } from 'webpack';
import slsw from 'serverless-webpack';

const config: Configuration = {
	target: 'node',
	mode: 'production',
	entry: slsw.lib.entries,
	// output: {
	// 	filename: 'main.js',
	// 	path: path.resolve(__dirname, 'dist'),
	// },
	plugins: [new IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
};

export = config;
