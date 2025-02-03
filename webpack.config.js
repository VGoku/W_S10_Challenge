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
const PUBLIC_PATH = '/'
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
      publicPath: PUBLIC_PATH,
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
      publicPath: PUBLIC_PATH,
      serveIndex: true,
      watch: true
    },
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /^\/static\/.*/, to: context => context.parsedUrl.pathname },
        { from: /./, to: '/index.html' }
      ]
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    compress: true,
    port: FRONTEND_PORT,
    client: { logging: 'none' },
    hot: true,
    open: true
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
          IS_DEV ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: PUBLIC_PATH }
          },
          {
            loader: CSS_LOADER,
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: IS_DEV ? '[name]__[local]--[hash:base64:5]' : '[hash:base64]'
              }
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
        },
        generator: {
          filename: 'static/media/[name].[hash:8][ext]',
          publicPath: PUBLIC_PATH
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        },
        generator: {
          filename: 'static/media/[name].[hash:8][ext]',
          publicPath: PUBLIC_PATH
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
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 20000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Get the package name
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            // Replace @ symbols and slashes with hyphens for cleaner chunk names
            return `vendor.${packageName.replace('@', '').replace('/', '-')}`
          },
          priority: 20
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimize: !IS_DEV,
    usedExports: true,
    sideEffects: true
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    hints: !IS_DEV ? 'warning' : false
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
