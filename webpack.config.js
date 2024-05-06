const path = require('path');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');

module.exports = {
  // webpack でバンドルする js のファイルを指定する
  entry: {
    desktop: './src/js/desktop.js',
    mobile: './src/js/mobile.js',
    config: './src/js/config.js',
  },
  // webpack でバンドルしたファイルが出力する先を指定する
  output: {
    path: path.resolve(__dirname, 'plugin', 'js'),
    filename: '[name].js',
  },
  // プラグインのパッケージングに必要なファイルのパスを設定する
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './plugin/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: './dist/plugin.zip'
    }),
  ],
};