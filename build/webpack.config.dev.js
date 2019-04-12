"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const HOST = "localhost";
const PORT = 8080;

module.exports = merge(baseConfig, {
	mode: "development",

	devServer: {
		clientLogLevel: "warning",
		hot: true,
		contentBase: "dist",
		compress: true,
		host: HOST,
		port: PORT,
		open: false,
		overlay: { warnings: false, errors: true },
		publicPath: "/",
		quiet: true,
		watchOptions: {
			poll: true
		}
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"]
			},
			{
				test: /\.styl(us)?$/,
				use: ["vue-style-loader", "css-loader", "stylus-loader"]
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 2
						}
					},
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							data: `@import "@nutui/nutui/dist/styles/index.scss";@import "@/components/scss/skin.scss";@import "@/components/scss/common.scss"; `
						}
					}
				]
			},
			// {
			// 	test: /\.(sa|c)ss$/,
			// 	use: [
            //         {
            //             loader: "style-loader"
            //         },
			// 		{
			// 			loader: "css-loader"
			// 		},
			// 		{
			// 			loader: "postcss-loader"
			// 		},
			// 		{
			// 			loader: "sass-loader",
			// 			options: {
			// 				excludePaths: [path.resolve(__dirname, "./node_modules")]
			// 			}
			// 		}
			// 	]
			// },
			{
				test: /\.less$/,
				use: [
					"vue-style-loader",
					"style-loader",
					"css-loader",
					"less-loader",
					"postcss-loader"
				]
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});
