const path = require('path');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  entry: {
    configViewer: './src/view/app/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'configViewer'),
    filename: '[name].js',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      }),
    ],
  },
  performance: {
    hints: false,
  },
};
