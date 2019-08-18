const os = require('os');
const webpack = require('webpack');
const prodLocalConfig = require('./prod-local.config');
const prodConfig = require('./prod.config');
const testConfig = require('./test.config');
const devConfig = require('./dev.config');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
let config = null;
const entrys = {
    admin: {
        // page 的入口
        entry: './src/entry/index.js',
        // 模板来源
        template: './src/entry/admin.html',
        // 在 dist/index.html 的输出
        filename: 'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: '城北党建',
    }
}
switch (process.env.NODE_ENV) {
    case 'development':
        config = devConfig;
        break;
    case 'production':
        // config = prodConfig;
        if (process.env.VUE_APP_TYPE == 'prod') {
            config = prodConfig;
        } else if (process.env.VUE_APP_TYPE == 'prod-local') {
            config = prodLocalConfig;
        } else {
            config = testConfig;
        }
        break;
    default:
        config = devConfig;
        break;
}
const productionGzipExtensions = ['js', 'css'];
const gzipPlugin = config.gzip ? [new CompressionWebpackPlugin({
    algorithm: 'gzip',
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false // 删除原文件
})] : [];
module.exports = {
    pages: entrys,
    // 基本路径
    baseUrl: config.baseUrl,
    // 输出文件目录
    outputDir: config.outputDir,
    assetsDir: config.assetsDir,
    indexPath: 'index.html',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    runtimeCompiler: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        // 修复HMR
        // config.resolve.symlinks(true);
        config
            .entry('index')
            .add('babel-polyfill')
            .end();
        config.plugins.delete('prefetch-admin')
            // 移除 preload 插件
        config.plugins.delete('preload-admin');

    },
    configureWebpack: {
        mode: 'development',
        output: {
            filename: 'static/js/[id].js',
            chunkFilename: 'static/js/[chunkhash:8].js',
        },
        plugins: [
            new webpack.DefinePlugin(config.globalvariable),
            ...gzipPlugin,
        ],
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            // 'signalR': 'signalR',
            'echarts': 'echarts' // 配置使用CDN
        }
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: config.productionSourceMap,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        port: 8082,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                // target: 'http://192.168.20.119:21000',

                // target: 'http://192.168.20.119:21024',
                // target: 'http://182.139.182.231:7220'
                // target: 'http://192.168.20.119:9000'
                target: 'http://192.168.99.178:21021'
                    // target: 'http://192.168.20.66:8011'
                    // target: 'http://192.168.20.183:8055'
                    // target: 'http://192.168.20.119:21024'
                    // target: 'http://192.168.99.175:7200'
            },
            '/file': {
                // target: 'http://192.168.100.131:7017',
                // target: 'http://192.168.20.119:8082'
                target: 'http://182.139.182.231:7221'
            }
        }, // 设置代理
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}