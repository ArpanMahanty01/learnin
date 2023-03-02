const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    codemirror: './public/client.js'
  },
  output: {
    globalObject: 'self',
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].bundle.js',
    publicPath: '/pf/dist/'
  }
}