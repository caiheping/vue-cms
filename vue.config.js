const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/admin' : '/',
  lintOnSave: true,
  // 打包时不生成.map文件
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 配置静态资源图片
    config.module.rules.delete('images')
    // 清除svg默认的处理方式
    config.module.rules.delete('svg')
    config.plugin('html').tap(args => {
      args[0].title = '后台管理系统'
      return args
    })
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 当引入文件时默认先找.js后缀的文件，没找到再从左往右继续
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    },
    performance: {
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          include: [resolve('src/static/icons')],
          options: {
            symbolId: 'icon-[name]'
          }
        },
        {
          test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
          exclude: [resolve('src/static/icons')],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'img/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        }
      ]
    }
  },
  devServer: {
    // https: true,
    host: '0.0.0.0',
    port: 9528,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '/api/v1'
        }
      },
      '/img_url': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/img_url': ''
        }
      }
    }
  }
}
