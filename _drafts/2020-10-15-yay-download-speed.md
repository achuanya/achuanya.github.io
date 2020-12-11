---
comments: true
layout: post
title: V2ray + Polipo全局代理yay
description: V2ray + Polipo全局代理yay
category: 技术
---

我经常使用yay太慢了，搞了好久





## 安装


```shell
$ yay -S polipo
```

## 配置

```shell
# 复制config配置文件
$ cd /etc/polipo/
$ sudo cp config.sample config
$ sudo vim config

socksParentProxy = "127.0.0.1:1088"
socksProxyType = socks5

# 创建pid与log文件
$ sudo touch pid log
# 赋予权限
$ sudo chmod +x pid log

$ systemctl start polipo
# 设置为自启动
$ systemctl disable polipo
```

