"use strict";
const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const webpack = require("webpack");

const utils = require("./utils");
const api = require("./dev.env")

const plugins = [
	new HtmlWebpackPlugin({
		filename: "index.html",
		template: "index.html",
		inject: true,
		chunksSortMode: "none"
	}),
	new CleanWebpackPlugin(["dist"], {
		root: path.resolve(__dirname, "../")
	}),
	new VueLoaderPlugin(),
	new CopyWebpackPlugin([
		{
			from: utils.resolve("static/img"),
			to: utils.resolve("dist/static/img"),
			toType: "dir"
		}
	])
];
const files = fs.readdirSync(path.resolve(__dirname, "../dll"));
files.forEach(file => {
	if (/.*\.dll.js/.test(file)) {
		plugins.push(
			new AddAssetHtmlWebpackPlugin({
				filepath: path.resolve(__dirname, "../dll", file)
			})
		);
	}
	if (/.*\.manifest.json/.test(file)) {
		plugins.push(
			new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, "../dll", file)
			})
		);
	}
});
console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
module.exports = {
	context: path.resolve(__dirname, "../"),
	entry: {
		app: "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		publicPath: process.env.NODE_ENV === "production" ? `${api.test}` : "/"
	},
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
				// exclude: path.resolve(__dirname, '/node_modules'),
				exclude: /node_modules/,
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
			// {
			// 	test: /\.(sa|sc)ss$/,
			// 	use: [
			// 		{
			// 			loader: "sass-loader",
			// 			options: {
			// 				data: `@import "@nutui/nutui/dist/styles/index.scss";@import "@/components/scss/skin.scss";@import "@/components/scss/common.scss"; `
			// 			}
			// 		}
			// 	]
			// },
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
	plugins
};
