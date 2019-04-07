"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const utils = require("./utils");

module.exports = {
	resolve: {
		extensions: [".js", ".vue", ".json"],
		alias: {
			vue$: "vue/dist/vue.esm.js",
			"@": utils.resolve("src"),
			common: utils.resolve(__dirname, "/src/common"),
			base: utils.resolve("src/base"),
			assets: utils.resolve("assets"),
			views: utils.resolve("src/views"),
			static: utils.resolve("static"),
			components: utils.resolve("src/components")
		}
	},

	module: {
		rules: [
			// {
			//   test: /\.(js|vue)$/,
			//   use: 'eslint-loader',
			//   enforce: 'pre'
			// },
			{
				test: /\.vue$/,
				use: "vue-loader"
			},
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						//预设
						presets: ["@babel/preset-env"],
						//插件
						plugins: ["@babel/plugin-syntax-dynamic-import"]
					}
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						name: utils.assetsPath("img/[name].[hash:7].[ext]")
					}
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						name: utils.assetsPath("media/[name].[hash:7].[ext]")
					}
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10000,
						name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
					}
				}
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
			inject: true,
			//html-webpack-plugin 遇到 throw new Error('Cyclic dependency' + nodeRep)
			chunksSortMode: "none"
		}),
		new VueLoaderPlugin(),
		new CopyWebpackPlugin([
			{
				from: utils.resolve("static/img"),
				to: utils.resolve("dist/static/img"),
				toType: "dir"
			}
		])
	]
};
