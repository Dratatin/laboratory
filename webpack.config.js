const path = require('path');
const fs = require('fs');

const pagesDir = path.resolve(__dirname, 'pages');
const entryPoints = {};

// Récupérer tous les fichiers main.js dans les répertoires des pages
fs.readdirSync(pagesDir).forEach(page => {
  const pagePath = path.resolve(pagesDir, page);
  const mainScript = path.resolve(pagePath, 'script', 'main.js');

  if (fs.existsSync(mainScript)) {
    entryPoints[page] = mainScript;
  }
});

module.exports = {
  entry: entryPoints,
  output: {
    filename: (pathData) => `${pathData.chunk.name}/dist/bundle.js`,
    path: path.resolve(__dirname, 'pages'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
