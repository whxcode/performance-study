# 基于构建工具优化
## Tree-shaking(减少代码)   
    1、上下文为用到的代码(dead code)
    2、基于 es6 import export
    3、package.json中配置 sideEffects 忽略那些不需要优化的字段。
    4、组合以 Babel 默认配置影响
## Js 压缩
    1、wbpack 4后引入了 uglifyjs-webpack-plugin
        自动回做作用域提升
        代码体积减小
        需要注意 babel 的 module 为 false
    2、支持 es6 替换为 terser-webpack-plugin
    3、减少js文件体积
## webpack 的依赖优化
    1、noParse 属性 告诉 webpack 有一些库不需要解析
        被忽略的库不能有 import、require、define 的引入方式
    2、diiplugin 避免打包时对不变的库重复构建
        比如说 react、reactdom 这个库从开发到部署应该是不会更变
        提高构建速度
## 基于 webpack 的资源压缩
   Minification
    terser 压缩 js
    mini-css-extract-plugin 压缩css
    html-webpack-plugin-minify 压缩 html
    

## webpack 的资源持久化缓存。
- 每个打包的资源文件有唯一的 hash 值 (hash 值可以用文件的内容计算出来)。
- 修改后只有受影响的文件 hash 变化。
- 充分利用浏览器的 caches 缓存。
- 推荐使用 content hash 值[content hash]

## 监测与分析
    Stats 分析与可视化图
    webpack-bundle-analyzer 进行体积分析
    speed-measure-weboack-plugun 速度分析
## React 按需加载
    React router 基于 wbpack 动态引入
    使用 Reloadable 高级组件 类似于 react的 lazy and suplayz
