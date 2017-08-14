var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'antd', 'underscore', 'echarts', 'moment']
  },
  output: {
    path: path.join(__dirname, '../dist', 'dll'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist/dll', '[name]-manifest.json'),
      name: '[name]_library',
      context: '/'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      comments: false,
      beautify: false,
      sourceMap: false
    })
  ]
};