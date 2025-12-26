const {merge} = require('webpack-merge');
const moduleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const devConfig = {
    mode:'development',
   devServer:{
        port:8080,
        historyApiFallback:{
            index:'index.html'
        }
    },
    plugins:[
        new moduleFederationPlugin({
            name:'container',
            remotes:{
                marketing:'marketing@http://localhost:8081/remoteEntry.js'
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
        
    ]
};
   module.exports = merge(commonConfig,devConfig);
