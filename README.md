# wdui单页面应用项目模版

## 维护

clone项目后，切换到需要维护的分支

1、npm install 安装依赖，如果装了淘宝镜像的cnpm，建议用cnpm install，安装会特别快

```
//安装淘宝镜像
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

//安装依赖，相当于npm install,但是cnpm install快很多
cnpm install

```


2、npm run dev 开发调试

3、npm run build 打包发布，发布的文件夹是dest，打包好的文件都在这文件夹里面。


单页面应用的例子

## 引入组件库，配置打包

package.json里安装"wdui": "^0.6.10"

example里的index引入文件进行开发

```
import * as wdui from 'wdui' //整体引入
import 'wdui/lib/styles/theme-default/index.css' //引入样式文件
Vue.use(wdui)

```


打包文件配置了dev和build,详细见配置



## 开发绿色肤色和蓝色肤色


example的index引入相关肤色文件，覆盖之前的红色服色

```
import './assets/reset.css'
import './assets/iconfont/iconfont.css'
import './assets/green.scss'
// import './assets/blue.scss'

```


打包文件配置scss的处理，进行autoprefixer和px2rem

```
{
        test: /\.(scss|sass)$/,
        loaders: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'postcss-loader', options: {
            plugins: function() {
              return [autoprefixer({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']}), px2rem({remUnit: 75})]
            }
          }},
          {loader: 'sass-loader'},
        ]
}
```

px2rem插件由postcss-px2rem替换成[postcss-plugins-px2rem](https://npm.taobao.org/package/postcss-plugins-px2rem)，原因postcss-px2rem由注释来标示转换规则，webpack执行压缩会去掉注释，或者是用vscode编辑器格式化代码，注释会换行，都会使换算不正确

postcss-plugins-px2rem的css书写说明：

（1）对字体大小不使用rem，使用dpx (dpr px) 这个单位,按照dpr来放大 1px, 2px, 3*px 大小的字体,再按照屏幕dpr缩小, 这样就达到了字体 不缩放, 各种屏幕的字体看起来都差不多,也与屏幕宽度无关


（2）边框一般不使用rem , 使用rpx (real px), 来表示物理像素


（3）默认情况下 px 被babel-plugin-px2rem或postcss-plugins-px2rem插件转化成rem



## 代理配置

为了方便联调与开发工作，需要配置代理 

webpack 的devServer带有 http-proxy-middleware 的代理功能
在devServer中配置proxy属性，属性值为需要配置代理的路径







