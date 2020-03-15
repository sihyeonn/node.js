const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, 'main.js')
  },
  module: {
    }]
  },
  plugins: [],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'build')
  }
};
