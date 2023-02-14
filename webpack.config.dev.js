const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dontenv = require('dotenv-webpack');

module.exports = {
    entry: `./src/index.js`,
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: `[name].[contenthash].js`,
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    resolve: {
        extensions: [`.js`],
        alias: {
            '@utils' : path.resolve(__dirname, 'src/utils/'),
            '@templates' : path.resolve(__dirname, 'src/templates/'),
            '@styles' : path.resolve(__dirname, 'src/styles/'),
            '@images' : path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
  rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: `babel-loader`
            }
        },
        {
            test: /\.css|.styl$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'assets/images'
                }
              }
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
              filename: "assets/fonts/[hash][ext]",
            }
        }
    ]

 },
 plugins: [
    new HtmlWebpackPlugin({
        inject: true,
        template: `./public/index.html`,
        filename: `./index.html`
    }),
    new MiniCssExtractPlugin({
        filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
            }
        ]
    }),
    new Dontenv(),
 ],
 devServer: {
    stats: {
        errorDetails: true
    }
 }
}