const path = require('path');
const webpack = require('webpack');
//打包遇到的问题： 打包vue插件的时候，dll会自动打包出vue.js,造成项目引用两次vuejs文件，这样是不合理的。

module.exports = {
	mode: "production",
	entry: {
		vendors: [
			"lodash",
			"axios",
			"fastclick",
			"google-protobuf",
			"moment",
			"protobufjs",
			"swiper",
		],
		jquery: ["jquery"]
	},
	output: {
		filename: "[name].dll.js",
		path: path.resolve(__dirname, "../dll"),
		library: "[name]"
	},
	plugins: [
		new webpack.DllPlugin({
			name: "[name]",
			path: path.resolve(__dirname, "../dll/[name].manifest.json")
		})
	]
};