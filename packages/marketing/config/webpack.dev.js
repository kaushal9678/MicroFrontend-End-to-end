const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const moduleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const devConfig = {
    mode:'development',
   devServer:{
        port:8081,
        historyApiFallback:{
            index:'index.html'
        }
    },
    plugins:[
        new moduleFederationPlugin({
            name:'marketing',
            filename:'remoteEntry.js',
            exposes:{
                './MarketingApp':'./src/bootstrap'
            },
            shared:{
                react:{
                    singleton:true,
                    requiredVersion:require('../package.json').dependencies.react
                },
                'react-dom':{
                    singleton:true,
                    requiredVersion:require('../package.json').dependencies['react-dom']
                }
            }
        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
};
   module.exports = merge(commonConfig,devConfig);
