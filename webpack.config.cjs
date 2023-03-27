const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/test/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
       { test: /\.tsx?$/, loader: "ts-loader" },
       { test: /\.css$/, use: ['style-loader', 'css-loader'] },
       { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ]
  },
  resolve: {
     extensions: ["*", ".ts", ".tsx", ".js", ".css", ".scss"]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devServer: {
    port: 9000,
  },
};