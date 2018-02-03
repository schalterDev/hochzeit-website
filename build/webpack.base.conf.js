const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const utils = require('./utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const src_folder = path.join(__dirname, '../src');

const generatePage = template => {
    const pageContent = fs.readFileSync(template, { encoding: 'utf-8' });
    let site = pageContent.replace('{{ URL }}', config.build.assetsSubDirectory + config.build.assetsPublicPath);
    return site;
};

var pages = fs.readdirSync(src_folder).filter(file => {
    return path.extname(file) === '.html';
});
pages = pages.map(file => {
   return 'src/' + file;
});

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: isDev
            ? config.dev.assetsPublicPath
            : config.build.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src'),
        },
    },
    module: {
        rules: [
            // {
            //   test: /\.js/,
            //   loader: 'eslint-loader',
            //   enforce: 'pre',
            //   include: [resolve('src'), resolve('test')], // eslint-disable-line global-require
            //   options: {
            //     formatter: require('eslint-friendly-formatter')
            //   }
            // },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
            },
            // {
            //   test: /\.pug$/,
            //   loader: 'pug-loader',
            //   options: {
            //     root: resolve('src/views'),
            //     pretty: true
            //   }
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                },
            },
        ],
    },
    plugins: [
        /*
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'geschenke.html',
            template: './src/geschenke.html',
        }),*/

        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
            },
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: 'exports-loader?Util!bootstrap/js/dist/util',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        }),
    ].concat(
        pages.map(page => new HtmlWebpackPlugin({
            template: './' + page,
            templateContent: generatePage(page),
            filename: page.replace('src/', ''),
            hash: true
        })),
    ),
};
