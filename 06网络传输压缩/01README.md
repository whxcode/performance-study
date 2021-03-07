## 启用压缩 Gzip
### gzip配置的常用参数
- gzip on|off; #是否开启gzip
- gzip_buffers 32 4K| 16 8K #缓冲(压缩在内存中缓冲几块? 每块多大?)
- gzip_comp_level [1-9] #推荐6 压缩级别(级别越高,压的越小,越浪费CPU计算资源)
- gzip_disable #正则匹配UA 什么样的Uri不进行gzip
- gzip_min_length 200 # 开始压缩的最小长度(再小就不要压缩了,意义不在)
- gzip_http_version 1.0|1.1 # 开始压缩的http协议版本(可以不设置,目前几乎全是1.1协议)
- gzip_proxied # 设置请求者代理服务器,该如何缓存内容
- gzip_types text/plain application/xml # 对哪些类型的文件用压缩 如txt,xml,html ,css
- gzip_vary on|off # 是否传输gzip压缩标志

## 启用 Keep Alive
    一个持久的 tcp 链接，节省了链接创建时间。
    keepalive-timeout 0; 表示不服用 tcp链接 每次一起请求都去简历一次链接
    keepalive-timeout 65; 表示等待65s后
    keepalive-requests 100; 表示这次链接可以复用多少次
## HTTP 缓存
    提高重复访问时间资源加载的速度
    nginx 做缓存配置
    if($request_filename ~* .*\.(?:html|html)$) {
        add_header Cache-Control "no-cache,must-revalidate";
        add_header "Pragma" "no-cache";
        add_header "Expires" "0";
    }
    if($request_filename ~* .*\.(?:js|css)$) {
        expires 7d;
    }
    if($request_filename ~* .*\.(?:jpg|jpeg|gif)) {
        expires 7d;
    }
## Service Workers 作用
- 加速重复访问。
- 离线支持。
- 注意兼容性。
## HTTP/2 的提升
- 二进制传输
- 请求响应多路复用 可以同时打开多个请求
- server push
## SSR 服务端渲染
    
