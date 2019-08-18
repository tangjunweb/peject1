//生产环境配置
module.exports = {
    baseUrl: '/',
    outputDir: 'dist-test',
    assetsDir: 'static',
    gzip: true,
    productionSourceMap: false,
    globalvariable: {
        'API_PATH': JSON.stringify('http://182.139.182.231:7220'),
        'UPLOAD_PATH': JSON.stringify('http://182.139.182.231:7221'),
        'PREFIX': JSON.stringify('lhyj_pro_'),
        'ADMIN_PREFIX': JSON.stringify('lhyj_pro_admin_'),
        'AMAP_KEY': JSON.stringify('3e2fe09b64ba28506acda9729430bdc3'),
        'ROUTER_TYPE': JSON.stringify('history'),
        'BASE_ROUTE': JSON.stringify('/'),
        'WX_STATE': JSON.stringify('Intranet')
    }
}