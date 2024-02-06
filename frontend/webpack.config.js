/**
 * Main file of webpack config.
 * Please do not modified unless you know what to do
 */
const path = require("path");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackRTLPlugin = require("webpack-rtl-plugin");
const WebpackMessages = require("webpack-messages");
const del = require("del");

// theme name
const themeName = "arrowai";
// global variables
const rootPath = path.resolve(__dirname);
const distPath = rootPath + "/src/assets";

const entries = {
	"css/style.angular": "./src/assets/sass/style.angular.scss"
};

// remove older folders and files
(async () => {
	await del.sync(distPath + "/css", {force: true});
})();

const mainConfig = function () {
	return {
		mode: "production",
		stats: "errors-only",
		performance: {
			hints: false
		},
		entry: entries,
		output: {
			// main output path in assets folder
			path: distPath,
			// output path based on the entries' filename
			filename: "[name].js"
		},
		resolve: {extensions: ['.scss']},
		plugins: [
			new CleanWebpackPlugin(),
			// webpack log message
			new WebpackMessages({
				name: themeName,
				logger: str => console.log(`>> ${str}`)
			}),
			// create css file
			new MiniCssExtractPlugin({
				filename: "[name].css",
			}),
			{
				apply: (compiler) => {
					// hook name
					compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
						(async () => {
							await del.sync(distPath + "/css/*.js", {force: true});
						})();
					});
				}
			},
		],
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						{
							loader: "sass-loader",
							options: {
								sourceMap: false,
							}
						},
					]
				},
			]
		},
		optimization: {
			minimize: true,
			minimizer: [
				new CssMinimizerPlugin({
					minimizerOptions: {
						preset: [
							'default',
							{
								discardComments: {
									removeAll: true
								},
							},
						],
					},
				}),
			],
		},
	}
};

module.exports = function () {
	return [mainConfig()];
};
