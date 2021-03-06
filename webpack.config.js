const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require('webpack');

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      auto: () => true,
      localIdentContext: path.resolve(__dirname, 'src'),
      localIdentName: '[path][name]__[local]',
    },
  },
};

const dev = !process.argv.includes('--mode=production');

const styleLoader = dev ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {

  mode: dev ? 'development' : 'production',
  devtool: 'source-map',
  target: 'web',

  entry: './src/index.tsx',

  module: {
    rules: [

      {
        test: /\.po$/,
        // use: [{
        //   loader: path.resolve('po-loader.js'),
        // }],
        use: ['json5-loader', 'po-gettext-loader']
      },

      {
        test: /\.ts(x?)$/,
        include: path.resolve(__dirname, './src'),
        use: 'ts-loader',
        // use: {
        //   loader: 'ts-loader',
        //   options: {plugins: [['ttag', { extract: { output: 'template.pot'} }]]}
        // }
      },

      {
        test: /\.css$/,
        use: [styleLoader, cssLoader],
      },

      {
        test: /\.scss$/,
        use: [styleLoader, cssLoader, 'sass-loader'],
      },

    ]
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    // alias: {
    //   'react': path.resolve(__dirname, 'node_modules/react'),
    //   'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    // }
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // chunkFilename: ({ chunk, contentHashType }) => {
    //   console.log(chunk);
    //   return 'file.js';
    // }
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new MiniCssExtractPlugin(),

    new ProvidePlugin({
      t: ['ttag', 't'],
      jt: ['ttag', 'jt'],
      msgid: ['ttag', 'msgid'],
      ngettext: ['ttag', 'ngettext'],
    }),

  ],

  //watch: true,

  // optimization: {
  //   chunkIds: 'named',
  //   moduleIds: 'named',
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       vendor: {
  //         test: /node_modules/,
  //         name: 'vendor'
  //       }
  //     }
  //   }
  // },

  optimization: {
    chunkIds: 'named',
    splitChunks: {
      chunks: 'async',
      //minSize: 20000,
      //minRemainingSize: 0,
      //maxSize: 0,
      //minChunks: 1,
      //maxAsyncRequests: 30,
      //maxInitialRequests: 30,
      //automaticNameDelimiter: '~',
      //enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
      }
    }
  },

  devServer: {
    port: 3000,
    historyApiFallback: true
  }
};