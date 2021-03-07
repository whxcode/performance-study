## 从输入 URL 到页面加载显示完成都发生了什么
### 分析
    - 知识点广，区分度高
    - 自己擅长的点可以适当展开
    - 渲染过程是重点
### 解答
#### 网络线程
    1、Ui thread: 搜索 or URL -> 搜索引擎 or 请求站点
        http://user:pass@site.com:80:/path/?q=val#hash
    2、发起网球浏览器
        1、dns 查找 ip
        2、设置 UA 等信息，发送 get 请求
                如果 https 要简历 tls 链接
                或者收到 301，再来
        3、web server 上的应用处理请求
        4、读取 Response 分析数据类型
        5、安全检查
        6、通知 UI 数据装备就绪
#### render process
    1、浏览器进程会告诉渲染进程
    2、main thread
        解析html文本 构架 dom 
        变解析 dom 边加载 子资源
        js 阻塞解析 async/defer (当html解释器遇见 script 标签就暂停解析)
            如果这个js里面没有操作dom 也可以使用 异步解析。
        解析 css，计算 computed styles 
        构造布局树(位置&大小)
    3、Raster Thread & Compositor Thread
        创建绘制记录，确定绘制顺序
        将页面拆分图层构建图层树
        复合线程像素化图层创建一个复合帧
        
    
## 首屏加载
    1、web增加加载的特点决定了首屏性能不会完美
    2、过长的白屏影响用户体验和留存
    3、首屏(above thte fold) 初次印象
### 解答
    1、这个网站发生了什么
    2、

    
### javascript 内存管理
    1、内存泄露严重影响性能
    2、高级语言 不代表 不需要管理内存
- 变量创建时自动分配内存，使用时 “自动” 释放内存 GC(内存管理工具)。
- 所有的 gc 都是近似实现，只能通过判断变量是否还能再次访问到。
    - 局部变了、函数执行完、没有闭包引用 就会被标签回收
    - 全局变量 直至浏览器卸载页面时释放
    - 引用计数 -- 无法解决循环引用的问题
    - 标签清除 1、标签过程 清除过程。
                单独一个线程 在一定的间隔时间标记那些可以被清除
### 解决
    避免意外全局变量产生
    避免返回运行引发大量闭包
        function outer() {
            var largetData = new Array(1000)
            var prevStore = store
            return function() {}
        }
        setInterval(() => { 
            store = outer()  // 根据作用域链 outer 里面的匿名函数 会导致它的作用域保存下来 
        })
    避免脱离的 DOM 元素
    将删除元素的时候不光光是要从页面上删除
    但是js变量可能还存在，导致无法回收
    // eg
        let div = createElement
        body.appendChild(div)
        // sometimes
        body.remove(div)
        // 要这样
        div = null
