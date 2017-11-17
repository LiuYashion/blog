const path      = require('path')
const webpack   = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: [
      './src/index.js'
    ],

    output: {
        publicPath: '',
        path: path.resolve(__dirname, './build'),
        // pathinfo: true,
        filename: '[name]/entry.[chunkhash].js',
        chunkFilename:'js/[name].chunk.js' 
    }

};