const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    /**
     * 确定项目的根目录，与项目相关时配置
     * 当前后台在同一域名下时，后台服务器定向在项目中，通过定义根目录可以将前端项目放在后台程序中，访问 '/' 根目录下的某一目录即可访问
     * **/
    // baseUrl: 'public/home',

    /**
     * 如有需要请配合后台使用
     * 输出目录
     * **/
    outputDir: 'dist',

    /**
     * 静态资源即 public 中的内容放置相对于 outputDir 的相对路径
     * **/
    assetsDir: '',

    /**
     * 哈希管理
     * **/
    filenameHashing: true,

    /**
     * eslint 开发编译管理
     * boolean 是否使用   'error' 强制在编译时使用，错误即报错
     * **/
    lintOnSave: false,

    /**
     * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
     * **/
    productionSourceMap: false,

    /**
     * 开发环境下配置
     * **/
    devServer: {
        host: '0.0.0.0',
        port: 9527,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3000/api/',
        //         // 'http://192.168.31.212:8021/api/',
        //         // secure: false,  // 如果是https接口，需要配置这个参数
        //         changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        //         ws: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // },
    },

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.devtool = 'source-map'
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.css|\.html$/,
                        threshold: 10240,
                        deleteOriginalAssets: false
                    })
                ]
            }
        } else {
            // 为开发环境修改配置...
        }
    },

    css: {
        loaderOptions: {
            less: {
                globalVars: {
                    'menuBg': ' #304156',
                    'subMenuBg': '#1f2d3d',
                    'menuHover': '#001528',

                    //主题颜色
                    /** 登录页面 **/
                    //  项目名颜色
                    'loginLogoTitleColor': 'red',
                    //背景颜色
                    'loginBackgroundColor': '#283443',

                    //主页面
                    'mainBackgroundColor': '#f8f8f8',

                    /** layout 相关 **/
                    'navBar-height': '50px',
                    'main-height': 'calc(100vh - 50px)',
                    'sidebar-width': '180px',
                    'sidebar-item-height': '56px',
                    'hide-sidebar-width': '36px',
                    'sidebar-logo-background': '#ffffff',
                    'sidebar-logo-color': '#333',

                    // 行间隔高度
                    'white-space': '20px',

                }
            }
        }
    },

    chainWebpack: config => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .test(/\.(svg)(\?.*)?$/)
            .include.add(resolve('src/icons')).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'icon-[name]' })
            .end()

        const imgRule = config.module.rule('images')
        imgRule
            .uses.clear()
        imgRule
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .exclude.add(resolve('src/icons')).end()
            .use('url-loader')
            .loader('url-loader')
            .options({
                limit: 10000,
                name: 'img/[name].[hash:8].[ext]',
            })

    },
}
