const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const DEVELOPMENT = 'development'
const ENV = process.env.NODE_ENV || DEVELOPMENT
const IS_DEV = ENV === DEVELOPMENT

const HTML_LOADER = 'html-loader'
const CSS_LOADER = 'css-loader'
const BABEL_LOADER = 'babel-loader'
const STRING_REPLACE_LOADER = 'string-replace-loader'

const SERVER_URL = /http:\/\/localhost:9009/g
const FRONTEND_PORT = 3003

const DIST_PATH = 'dist'
const PUBLIC_PATH = IS_DEV ? '/' : './'
const INDEX_HTML_PATH = './frontend/index.html'
const INDEX_JS_PATH = './frontend/index.js'

const config = {
  entry: {
    main: INDEX_JS_PATH
  },
  mode: ENV,
  output: {
    path: path.resolve(__dirname, DIST_PATH),
    filename: IS_DEV ? '[name].js' : 'static/js/[name].[contenthash:8].js',
    chunkFilename: IS_DEV ? '[name].chunk.js' : 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: PUBLIC_PATH,
    clean: true,
    assetModuleFilename: 'static/media/[name].[hash:8][ext]'
  },
  devtool: IS_DEV ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: INDEX_HTML_PATH,
      inject: true,
      publicPath: '/',
      minify: !IS_DEV && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? '[name].css' : 'static/css/[name].[contenthash:8].css',
      chunkFilename: IS_DEV ? '[name].chunk.css' : 'static/css/[name].[contenthash:8].chunk.css'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, DIST_PATH),
      publicPath: '/'
    },
    historyApiFallback: true,
    compress: true,
    port: FRONTEND_PORT,
    client: { logging: 'none' },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: BABEL_LOADER,
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            plugins: ['babel-plugin-styled-components'],
            cacheDirectory: true,
            cacheCompression: false
          }
        }
      },
      {
        test: /\.html$/i,
        loader: HTML_LOADER
      },
      {
        test: /\.css$/i,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: CSS_LOADER,
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'frontend')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 20
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    runtimeChunk: 'single'
  }
}

if (!IS_DEV) {
  config.module.rules.push({
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: STRING_REPLACE_LOADER,
      options: {
        search: SERVER_URL,
        replace: ''
      }
    }
  })
}

module.exports = config
