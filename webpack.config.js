const path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const srcPath = path.resolve(__dirname, 'src')
const distPath = path.resolve(__dirname, 'dist')


module.exports = {
	context: path.resolve(__dirname, './src'),
	resolve: {
		alias: {
			components: path.resolve(srcPath, 'components'),
			api: path.resolve(srcPath, 'api'),
			images: path.resolve(distPath, 'images'),
			state: path.resolve(srcPath,'state')
		}
	},
	entry: {
		index: './index.jsx',
		vendor: ['react', 'react-dom']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js',
			minChuncks: 2
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    'es2015', {
                                        modules: false
                                    }
                                ],
                                'react'
                            ]
							//plugins: ['lodash']
                        }
                    }
                ]
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	devServer: {
		contentBase: distPath,
		compress: true,
		port: 8888
	},
	devtool: 'cheap-source-map'
};
