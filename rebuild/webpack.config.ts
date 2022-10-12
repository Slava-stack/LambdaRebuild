// import path from 'path';
import { Configuration } from 'webpack';
import slsw from 'serverless-webpack';

const config: Configuration = {
	target: 'node',
	mode: 'production',
	entry: slsw.lib.entries,
	// devtool: 'source-map',
	// output: {
	// 	path: path.resolve(__dirname, 'bundle'),
	// 	filename: 'bundle.js',
	// },

};

export = config;
