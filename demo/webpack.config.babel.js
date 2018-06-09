const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const parts = require('./webpack.parts.babel')

const root = process.cwd()
const PATHS = {
  app: path.join(root, 'src'),
  build: path.join(root, 'build')
}

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      filename: '[name].js',
      path: PATHS.build,
    },
    resolve: {
      mainFields: ['main'],
      extensions: ['.js', '.jsx', '.json', '*'],
      modules: ['node_modules'],
      alias: {
        'react': path.resolve('node_modules', 'react'),
        'redux-form': path.resolve('node_modules', 'redux-form'),
        'antd': path.resolve('node_modules', 'antd'),

        // FIXME why?
        'prop-types': path.resolve('node_modules', 'prop-types'),
        'deep-extend': path.resolve('node_modules', 'deep-extend')
      }
    },
  },
  parts.loadFonts({
    options: {
      name: '[name].[hash:8].[ext]'
    }
  }),
  parts.loadJavascript({ exclude: /node_modules/ })
])

const productionConfig = merge([
  {
    // mode: 'production',
    // FIXME Get splitting to work
    // performance: {
    //   hints: 'warning',
    //   maxEntrypointSize: 100000,
    //   maxAssetSize: 450000
    // },
    context: PATHS.app,
    output: {
      chunkFilename: '[name]_[chunkhash:8].bundle.js',
      filename: '[name]_[chunkhash:8].bundle.js',
      path: path.join(root, 'build'),
    }
  },
  parts.clean(PATHS.build),
  parts.htmlPlugin({ filename: 'demo.html' }),
  parts.minifyJavascript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  }),
  parts.extractCSS(),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:8].[ext]'
    }
  }),
  // parts.optimization(),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  )
])

const developmentConfig = merge([
  {
    // mode: 'development',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    output: {
      devtoolModuleFilenameTemplate: 'webpack'
    },
  },
  parts.htmlPlugin({ filename: 'index.html' }),
  parts.loadSourceMaps(),
  parts.generateSourceMaps({ type: 'inline-source-map' }),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCSS(),
  parts.loadImages()
])

module.exports = (env = {}) => {
  process.env.BABEL_ENV = env

  if (env.target === 'production') {
    return merge(commonConfig, productionConfig)
  }

  return merge(commonConfig, developmentConfig)
}
