//生产环境配置
module.exports = {
    baseUrl: '/',
    outputDir: 'dist-prod-local',
    assetsDir: 'static',
    gzip: true,
    productionSourceMap: false,
    globalvariable: {
        // 'API_PATH': JSON.stringify('http://182.139.182.231:7220'),
        'API_PATH':JSON.stringify('//10.1.239.182'),
        // 'API_PATH': JSON.stringify('//new.cddyjy.com'),
        // 'UPLOAD_PATH': JSON.stringify('http://182.139.182.231:7221'),
        // 'UPLOAD_PATH': JSON.stringify('//10.1.239.182'),
        'UPLOAD_PATH': JSON.stringify('//upload.cddyjy.com/UploadCore'),
        'PREFIX': JSON.stringify('lhyj_pro_local'),
        'ADMIN_PREFIX': JSON.stringify('lhyj_pro_admin_local'),
        'AMAP_KEY': JSON.stringify('3e2fe09b64ba28506acda9729430bdc3'),
        'ROUTER_TYPE': JSON.stringify('history'),
        'BASE_ROUTE': JSON.stringify('/'),
        'WX_STATE': JSON.stringify('Intranet')
    }
}