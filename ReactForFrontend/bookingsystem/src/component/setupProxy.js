// // setupProxy.js
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '', // Specify the path that you want to proxy
//     createProxyMiddleware({
//       target: 'http://localhost:3001', // Specify the backend server URL
//       changeOrigin: true,
//     })
//   );
// };
