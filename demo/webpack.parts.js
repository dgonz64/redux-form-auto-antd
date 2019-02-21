const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
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

exports.htmlPlugin = ({
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
	const plugin = new MiniCssExtractPlugin({
		filename: '[name].[hash:8].css'
	})

	return {
		module: {
			rules: [
				{
					test: /\.less$/,
					include,
					exclude,

          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
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

exports.generateSourceMaps = ({ type }) => ({
	devtool: type
})

exports.clean = (path) => ({
	plugins: [
		new CleanWebpackPlugin([path])
	]
})

exports.minifyJavascript = () => ({
  optimization: {
    minimize: true
  }
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
