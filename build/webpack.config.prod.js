"use strict";
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = merge(baseConfig, {
	mode: "production",
	optimization: {
		// splitChunks: {
		// 	cacheGroups: {
		// 		commons: {
		// 			test: /[\\/]node_modules[\\/]/,
		// 			name: "vendor",
		// 			chunks: "all"
		// 		}
		// 	}
		// }
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
		new MiniCssExtractPlugin({
			filename: "main.css"
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: "development",
			API_HOST: '"http://test.xx.com:8083"'
		})
	]
});
