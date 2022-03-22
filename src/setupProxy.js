const {
    createProxyMiddleware
} = require('http-proxy-middleware');


/*
    changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
    changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
    changeOrigin默认值为false，但我们一般将changeOrigin值设为true
*/
module.exports = function (app) {
    app.use(
        '/api1', //前缀，代表某一个proxy配置
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: {
                '^/api1': ''
            } //在请求的时候去掉请求的/api前缀
        })
    )
};