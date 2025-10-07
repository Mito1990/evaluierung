const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundledev.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/evaluation"
  },
    devServer: {
    static: {
        directory: path.join(__dirname, "public"),
    },
    devMiddleware: {
      writeToDisk: true
    },
    port: 8023,
    historyApiFallback: {
      index: '/evaluation/index.html',
    },
    proxy: [
        {
        context: ['/api'],
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        },
    ],
    },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.s?css$/, use: ["style-loader", "css-loader", "sass-loader"] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
