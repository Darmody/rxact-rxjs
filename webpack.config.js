const webpack = require('webpack')
const path = require('path')
const srcPath = path.resolve(__dirname, 'src')

const env = process.env.NODE_ENV

const rxactExternal = {
  root: 'Rxact',
  commonjs2: 'rxact',
  commonjs: 'rxact',
  amd: 'rxact'
}

const rxjsExternal = {
  root: 'Rxjs',
  commonjs2: 'rxjs',
  commonjs: 'rxjs',
  amd: 'rxjs'
}

const config = {
  externals: {
    rxact: rxactExternal,
    rxjs: rxjsExternal,
  },
  entry: './src/index.js',
  resolve: {
    modules: [
      'node_modules',
      srcPath,
    ],
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
      include: srcPath,
    }],
  },
  output: {
    library: 'rxcat-rxjs',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ],
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

module.exports = config
