/* global __dirname, require, module */
const path = require('path')

const config = {
  entry: __dirname + '/src/Tooltip/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'react-tippy.js',
    library: 'reactTippy',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties']
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ],
    extensions: ['.json', '.js'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
    'popper.js': {
      root: 'Popper',
      commonjs2: 'popper.js',
      commonjs: 'popper.js',
      amd: 'popper.js',
      umd: 'popper.js',
    },
    'tippy.js/dist/tippy.standalone.js': {
      root: 'tippy',
      commonjs2: 'tippy.js/dist/tippy.standalone.js',
      commonjs: 'tippy.js/dist/tippy.standalone.js',
      amd: 'tippy.js/dist/tippy.standalone.js',
      umd: 'tippy.js/dist/tippy.standalone.js',
    }
  },
}

module.exports = config