const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'main.[hash].min.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        port: '3000',
        compress: true,
        open: true,
        hot: true,
        proxy: {
            '/': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true
            }
        }
    },
    // 配置WEBPACK的插件
    plugins: [
        new HtmlWebpackPlugin({
            template: `./public/index.html`,
            filename: `index.html`
        })
    ]
};