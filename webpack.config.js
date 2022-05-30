const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

function assetFilename(subdir = '') {
  if (subdir) subdir += '/';
  return `assets/${subdir}[name].${isDev ? '' : '[hash:8]'}[ext][query]`;
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: './src/index.ts',
  },
  output: {
    filename: `[name].${isDev ? '' : '[contenthash].'}bundle.js`,
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: assetFilename(),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.json', '.css', '.scss'],
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    // static: './dist',
    static: './src/index.html',
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.ts$/i,
        exclude: /node_modulese/,
        use: {loader: 'ts-loader'},
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: assetFilename('images')
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: assetFilename('fonts')
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'assets',
          globOptions: {ignore: ['**/images/css/**']}
        },
      ]
    }),
  ]
};