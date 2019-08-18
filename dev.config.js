//开发环境配置
module.exports = {
    baseUrl: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    gzip: true,
    productionSourceMap: false,
    globalvariable: {
        'API_PATH': JSON.stringify(''),
        'UPLOAD_PATH': JSON.stringify(''),
        'PREFIX': JSON.stringify('lhyj_dev_'),
        'ADMIN_PREFIX': JSON.stringify('lhyj_dev_admin_'),    
        //高德地图密钥
        'AMAP_KEY': JSON.stringify('3e2fe09b64ba28506acda9729430bdc3'),
        'ROUTER_TYPE': JSON.stringify('hash'),
        'BASE_ROUTE': JSON.stringify('/'),
        'WX_STATE': JSON.stringify('Extranet')
    }    
}