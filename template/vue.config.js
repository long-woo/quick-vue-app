module.exports = {
  publicPath: '{{name}}',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/variables.scss";'
      }
    }
  }{{#devProxyUrl}},
  devServer: {
    proxy: {
      '/api': {
        target: '{{devProxyUrl}}',
        // ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': 'api'
        // }
      }
    }
  }
  {{/devProxyUrl}}
}
