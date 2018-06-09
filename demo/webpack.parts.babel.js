const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.devServer = ({ host, port } = {}) => ({
	devServer: {
		historyApiFallback: true,
		stats: 'errors-only',
		host, // Defaults to `localhost`
		port, // Defaults to 8080
		overlay: {
			errors: true,
			warnings: true
		}
	}
})

export const htmlPlugin = ({
  filename
}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      title: 'redux-form-auto-antd demo',
      template: require('html-webpack-template'),
      filename,
      appMountId: 'root',
      inject: false,
    })
  ]
})

const cssLoader = {
	loader: 'css-loader',
	options: {
		importLoaders: true,
		sourceMap: true
	}
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    javascriptEnabled: true
  }
}

exports.loadCSS = ({ include, exclude } = {}) => ({
	module: {
		rules: [
			{
				test: /\.less$/,
				include,
				exclude,

				use: [ 'style-loader', cssLoader, lessLoader ]
			}
		]
	}
})

exports.extractCSS = ({ include, exclude } = {}) => {
	// Output extracted CSS to a file
	const plugin = new ExtractTextPlugin({
		filename: '[name].[contenthash:8].css'
	})

	return {
		module: {
			rules: [
				{
					test: /\.(css|less)$/,
					include,
					exclude,

					use: plugin.extract({
						use: [ cssLoader, lessLoader ]
					})
				}
			]
		},
		plugins: [ plugin ]
	}
}

exports.purifyCSS = ({ paths }) => ({
	plugins: [
		new PurifyCSSPlugin({ paths })
	]
})

exports.loadImages = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg|svg)$/,
				include,
				exclude,

				use: {
					loader: 'url-loader',
					options
				}
			}
		]
	}
})

exports.loadFonts = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				// Capture eot, ttf, woff, and woff2
				test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				include,
				exclude,

				use: {
					loader: 'file-loader',
					options
				}
			}
		]
	}
})

exports.loadJavascript = ({ include, exclude }) => ({
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include,
        exclude,

        loader: 'babel-loader',
        // options: {
        //   presets: [
        //     'react',
        //     'env'
        //   ],
        //   plugins: [
        //     'transform-class-properties',
        //     'transform-object-rest-spread',
        //     ['import', {
        //       libraryName: 'antd',
        //       libraryDirectory: 'es',
        //       style: 'css'
        //     }]
        //   ]
        // }
			},
		],
	},
})

exports.loadSourceMaps = () => ({
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ['source-map-loader'],
				enforce: 'pre'
			}
		]
	}
})

exports.externals = (externals) => ({ externals })

// FIXME There's no way I can get this to work
exports.optimization = () => ({
	optimization: {
		splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /node_modules/,
          enforce: true
        }
      }
		},
		noEmitOnErrors: true,
    runtimeChunk: 'single'
	}
})

exports.generateSourceMaps = ({ type }) => ({
	devtool: type
})

exports.clean = (path) => ({
	plugins: [
		new CleanWebpackPlugin([path])
	]
})

exports.minifyJavascript = () => ({
	plugins: [
		new BabiliPlugin()
	]
})

exports.minifyCSS = ({ options }) => ({
	plugins: [
		new OptimizeCSSAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: options,
			canPrint: false
		})
	]
})

exports.setFreeVariable = (key, value) => {
	const env = {}
	env[key] = JSON.stringify(value)

	return {
		plugins: [
			new webpack.DefinePlugin(env)
		]
	}
}

