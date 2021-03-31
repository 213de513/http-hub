const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './lib'),//输出路径
    publicPath: '/lib/',
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          'postcss-loader',
          {
            loader: 'less-loader', options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 500 * 1024
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  }
};
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
if (process.env.NODE_ENV === 'development') {
  let devConfig = {
    mode: "development",
    watch: true,
    //只有开启监听模式时，watchOptions才有意义
    watchOptions: {
      //默认为空，不监听的文件或者文件夹，支持正则匹配
      ignored: /node_modules/,
      //监听到变化发生后会等300ms再去执行，默认300ms
      aggregateTimeout: 300,
      //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
      poll: 1000
    }
  }
  module.exports = Object.assign(module.exports, devConfig)
}
