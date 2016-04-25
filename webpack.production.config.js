var webpack = require("webpack");

// differentiate between build and start
var build = './src/index.js'
var start = './app.min.js'

module.exports = {	
  entry: [
    './src/index.js'
  ],
  plugins: [
         // put the app in production mode
         new webpack.DefinePlugin({
           'process.env.NODE_ENV': '"production"'
         }),
         // minimize and uglify the code
		 new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
             minimize: true,
             compress: {
                 warnings: false
             }
         })
  ],
  output: {
    path: __dirname + '/build',
    publicPath: 'http://0.0.0.0:3000/zFilter',
    filename: 'app.min.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loaders: ['babel']
    }]
  },   
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
