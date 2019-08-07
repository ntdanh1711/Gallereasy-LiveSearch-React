const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    // publicPath: path.resolve(__dirname, 'build'),
  },
  devServer: {
    inline: true,
    contentBase: "./build",
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // {
      //   test: /\.svg$/, loader: 'svg-loader'
      // },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000,    
              name: "./fonts/[name].[ext]"
            },
          },
        ],
      },
      // {
      //   test: /\.(ico|gif|png|jpe?g|svg)$/,
      //   loaders: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[path][name].[ext]',
      //         context: './src'     
      //       }
      //     }          
      //   ]
      // },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};