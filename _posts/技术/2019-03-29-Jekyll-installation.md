---
comments: true
layout: post
title: Jekyll环境搭建(Windows 10)
description: Jekyll环境搭建(Windows 10)
category: 技术
---

&emsp;最近想把想博客改版需要在本地用到Jekyll，不过搭建的过程真的心累...过程中真的是各种问题谷歌百度各种乱七八糟的文章一点都不靠谱，折腾一天给重要给搭建成功了...  
整个搭建过程需要用到的软件/安装依赖我先列下
 * Rubyinstaller-2.3.3-x64
 * DevKit-mingw64-64-4.7.2
 * Gem
 * Bundler

## 安装Ruby
&emsp;因为Jekyll是基于ruby开发的，首先下载安装ruby，我不推荐下载Ruby2.3以上的版本，不知道怎么回事2.4、2.5、2.6我都试过感觉他们跟自带BUG似的，总是出现一堆莫名其妙的问题。  
ruby官网下载地址（下载速度奇慢）
 * 官网链接：https://rubyinstaller.org/downloads?achuan.io

我用的ruby 2.3.3这里给大家发出来微云的链接
 * 微云链接：https://share.weiyun.com/5vv4fjt?achuan.io
 * 微云密码：achuan

再次声明一下，这里我用的是ruby 2.3.3，其他版本我并不保证。
 1. 双击ruby应用程序，进行安装  
 注意：默认如果有已勾选项，它会自动帮你配置环境变量，但是环境变量如果不立即生效可以用cmd命令刷新环境变量，如果还不行就重启。
 
        echo %PATH%

  2. 安装完成后测试一下是否安装成功，若输出版本信息即安装成功。

         ruby -v

## 更换源
通过gem sources查看当前源
      
        gem sources -l

删除源默认源，我这个里默认有一个源，官方源，因为它太慢了，我们删掉它

        gem sources -r https://rubygems.org/

以前还有淘宝源可以用，不过现在也就已经凉了，下面是我们要替换成国内RubyGems镜像站点

        gem sources -a http://gems.ruby-china.com

## 安装Jekyll
&emsp;通过gem install安装jekyll

        gem install jekyll

        # 分页
        gem install jekyll-paginate

        # 查看版本号。出现就ok
        jekyll -v

## DevKit的安装与配置
&emsp;这里我用的是DevKit 64-4.7.2，这里依然提供微云存储
 * 微云链接：https://share.weiyun.com/5sROg49?achuan.io
 * 微云密码：achuan
 1. 双击DevKit应用程序，运行它解压到你想要的位置，尽量url短一点因为等会要用到比如；C:DevKit  

 2. 初始化与配置

        # 初始化生成config.yml
        ruby dk.rb init

        进入DevKit目录并编辑config.yml

        # 用cmd命令记事本来编辑config.yml
        notepad config.yml

              # Example:
              #
              # ---
              # - C:/ruby19trunk
              # - C:/ruby192dev
              #
              # ---
              - C:\Ruby23-x64

              注意：“- C:\Ruby23-x64”，其中的“-”也是符号！配置config.yml这一步非常重要，还请您仔细检查！
              
 3. 检查与安装依赖

        # 检查添加DevKit支持的Ruby列表是否有错误(可略过)
        ruby dk.rb init

        # 安装
        ruby dk.rb install

## Bundler的安装
&emsp;Bundler是管理Gem一个依赖工具
注意：minima是我在创建Jekyll项目的时候出现的问题，当我使用 jekyll new achuan.io 创建Jjekyll项目时，命令卡死了，随后Ctrl + C 强行停止后 cd achuan.io 使用 bundler show 查看缺少依赖文件

        Could not find gem 'minima (~> 2.0) x64-mingw32' in any of the gem sources
        listed in your Gemfile.

        # 它说我在gem源中找不到 “minima”, 然后我就安装了，不过装好后又出现这样的tzinfo-data和wdm...提前列出以防大家走弯路。

        gem install bundler

        # gem 依赖文件
        gem install minima
        gem install tzinfo-data
        gem install wdm

 下面是gem依赖列表

  * addressable (2.6.0)  
  * bundler (2.0.1)  
  * colorator (1.1.0)  
  * concurrent-ruby (1.1.5)
  * em-websocket (0.5.1)
  * eventmachine (1.2.7)
  * ffi (1.10.0)
  * forwardable-extended (2.6.0)
  * http_parser.rb (0.6.0)
  * i18n (0.9.5)
  * jekyll (3.8.5)
  * jekyll-feed (0.12.1)
  * jekyll-sass-converter (1.5.2)
  * jekyll-seo-tag (2.6.0)
  * jekyll-watch (2.2.1)
  * kramdown (1.17.0)
  * liquid (4.0.3)
  * listen (3.1.5)
  * mercenary (0.3.6)
  * minima (2.5.0)
  * pathutil (0.16.2)
  * public_suffix (3.0.3)
  * rb-fsevent (0.10.3)
  * rb-inotify (0.10.0)
  * rouge (3.3.0)
  * ruby_dep (1.5.0)
  * safe_yaml (1.0.5)
  * sass (3.7.4)
  * sass-listen (4.0.0)
  * tzinfo (2.0.0)
  * tzinfo-data (1.2019.1)
  * wdm (0.1.1)

## 启动Jekyll
&emsp;写到这里真的不容易，以前在Linux搭建Jekyll没有这么心累，今windows搭建真的...几十个bug疯狂涌出...算了...留着幸福的泪，码着命令...

        # 生成一个Jekyll模板并进入它
        jekyll new achuan.io && achuan.io

        # 启动Jeykll，默认端口4000
        jekyll serve

        # 成功后显示如下
        Configuration file: H:/git/achuan.io/_config.yml
            Source: H:/git/achuan.io
       Destination: H:/git/achuan.io/_site
       Incremental build: disabled. Enable with --incremental
       Generating... 
                     done in 1.885 seconds.
       Auto-regeneration: enabled for 'H:/git/achuanio'
       Server address: http://127.0.0.1:4000/
       Server running... press ctrl-c to stop.

打开浏览器输入：127.0.0.1:4000  
本地ip：127.0.0.1，端口：4000。感觉IP+端口麻烦的话，去VirtualHost配置。  
如果不太熟悉VirtualHost配置，可以看我以前的文章：[Ubuntu Server部署日记](https://achuan.io/2018-11-08-Ubuntu-Deployment.html 'Ubuntu Server部署日记')。