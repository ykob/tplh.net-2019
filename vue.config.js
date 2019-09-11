module.exports = {
  chainWebpack: config => {
    config.module
      .rule('glsl')
      .test(/\.(glsl|fs|vs)$/)
      .use('glslify-import-loader')
        .loader('glslify-import-loader')
        .end()
      .use('raw-loader')
        .loader('raw-loader')
        .end()
      .use('glslify-loader')
        .loader('glslify-loader')
        .end()
  }
}
