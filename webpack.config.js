const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, "src/main.js"),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loaders: "babel-loader",
                // include: [path.resolve('src'), path.resolve('node_modules/vue-echarts-v3/src')]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
            {
                test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.css', '.less'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'system manger',
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            chunksSortMode: 'none',
            hash: true, //为了更好的 cache，可以在文件名后加个 hash。
        })
    ],
    devServer: {
        //contentBase: path.resolve(__dirname, 'public'),/*设置基本目录结构，也就是你想要使用服务的目录地址*/
        host: 'localhost', /*服务器的IP地址，可以使用IP也可以使用localhost*/
        //compress: false,/*服务端压缩是否开启，目前开不开都行，想关你就关*/
        port: 80  /*配置服务端口号，建议别用80，很容易被占用，你要是非要用也是可以的。*/
    }
}

if (module.hot) {
    module.hot.accept();
}