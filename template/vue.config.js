module.exports = {
{{#isSubApp}}publicPath: '/{{name}}/',{{/isSubApp}}
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/variables.scss";'
      }
    }
  }{{#if_neq devProxyUrl ""}},
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
  }{{/if_neq}}
}
