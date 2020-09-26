---
comments: true
layout: post
title: Docker Compose快速构建LNMP笔记
description: Docker Compose快速构建LNMP笔记
category: 技术
---

## 目录结构

```shell
/
├── data                        数据库数据目录
│   ├── esdata                  ElasticSearch 数据目录
│   ├── mongo                   MongoDB 数据目录
│   ├── mysql                   MySQL8 数据目录
│   └── mysql5                  MySQL5 数据目录
├── services                    服务构建文件和配置文件目录
│   ├── elasticsearch           ElasticSearch 配置文件目录
│   ├── mysql                   MySQL8 配置文件目录
│   ├── mysql5                  MySQL5 配置文件目录
│   ├── nginx                   Nginx 配置文件目录
│   ├── php                     PHP5.6 - PHP7.3 配置目录
│   ├── php54                   PHP5.4 配置目录
│   └── redis                   Redis 配置目录
├── logs                        日志目录
├── docker-compose.sample.yml   Docker 服务配置示例文件
├── env.smaple                  环境配置示例文件
└── www                         PHP 代码目录
```

## 快速使用

如果当前用户不是root，为了避免频繁输入root密码，需要将当前用户加入docker组

```shell
# 创建Docker组  注：安装Docker时就自动创建了，如果没有则手动创建
$ sudo groupadd docker
# 当前用户加入Docker组
$ sudo gpasswd -a ${USER} docker
# 将当前用户的group切换到docker用户组
$ newgrp docker
```

### Clone项目

```shell
$ gh repo clone achuanya/dnmp
```

### 拷贝文件

```shell
$ cd dnmp
# 复制环境变量文件
$ cp env,sample .env
# 复制docker-compose配置文件
$ cp docker-compose.sample.yml docker-compose.yml
# 创建并后台运行
$ docker-compose up -d
```

## PHP与扩展

### 切换Nginx使用的PHP版本

1. 比如，从php切换到php56，那就先在`docker-compose.yml`文件中查看PHP56有没有被注释掉，删掉注释后启动，再更改Nginx配置文件：

```shell
fastcgi_pass   php:9000;
更改为：
fastcgi_pass   php56:9000;
```

其中`php`和`php56`是`docker-compose.yml`文件中`容器的NAME名称`

2. 让其配置生效还需再重新加载Nginx配置文件

```shell
$ docker exec -it nginx nginx -s reload
```

这里有两个`Nginx`，第一个是容器NAME名称，第二个是容器中的Nginx程序

### 安装PHP扩展

1. 如果要安装更多PHP扩展，在根目录找到`.env`环境配置文件，如以下PHP扩展配置

```shell
# 安装扩展应当使用英文逗号隔开
PHP56_EXTENSIONS=pdo_mysql,mysqli,mbstring,gd,curl,opcache,redis
```

2. 保存完成后，重新构建镜像

```shell
$ docker-compose build php
```

### 快速安装扩展

```shell
$ docker exec -it php /bin/sh
# 安装redis扩展
$ install-php-extensions redis
```

#### 支持快速安装扩展列表

<!-- START OF EXTENSIONS TABLE -->
<!-- ########################################################### -->
<!-- #                                                         # -->
<!-- #  DO NOT EDIT THIS TABLE: IT IS GENERATED AUTOMATICALLY  # -->
<!-- #                                                         # -->
<!-- #  EDIT THE data/supported-extensions FILE INSTEAD        # -->
<!-- #                                                         # -->
<!-- ########################################################### -->

|                    Extension                    | PHP 5.5 | PHP 5.6 | PHP 7.0 | PHP 7.1 | PHP 7.2 | PHP 7.3 | PHP 7.4 | PHP 8.0 |
| :---------------------------------------------: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: |
|                      amqp                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                      apcu                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     apcu_bc                     |         |         | &check; | &check; | &check; | &check; | &check; | &check; |
|                     bcmath                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                       bz2                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                    calendar                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      cmark                      |         |         | &check; | &check; | &check; | &check; | &check; |         |
|                       dba                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     decimal                     |         |         | &check; | &check; | &check; | &check; | &check; |         |
|  enchant[*](#special-requirements-for-enchant)  | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      exif                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                       ffi                       |         |         |         |         |         |         | &check; | &check; |
|                       gd                        | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     gettext                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     gmagick                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                       gmp                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      grpc                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                      http                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                    igbinary                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     imagick                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                      imap                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                    interbase                    | &check; | &check; | &check; | &check; | &check; | &check; |         |         |
|                      intl                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      ldap                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                    mailparse                    | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     mcrypt                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                    memcache                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                    memcached                    | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      mongo                      | &check; | &check; |         |         |         |         |         |         |
|                     mongodb                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                     msgpack                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                      mssql                      | &check; | &check; |         |         |         |         |         |         |
|                      mysql                      | &check; | &check; |         |         |         |         |         |         |
|                     mysqli                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      oauth                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                      odbc                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                     opcache                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                   opencensus                    |         |         | &check; | &check; | &check; | &check; | &check; |         |
| parallel[*](#special-requirements-for-parallel) |         |         |         | &check; | &check; | &check; | &check; |         |
|                      pcntl                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      pcov                       |         |         | &check; | &check; | &check; | &check; | &check; | &check; |
|                    pdo_dblib                    | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                  pdo_firebird                   | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                    pdo_mysql                    | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                    pdo_odbc                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                    pdo_pgsql                    | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                   pdo_sqlsrv                    |         |         | &check; | &check; | &check; | &check; | &check; |         |
|                      pgsql                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     propro                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                    protobuf                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     pspell                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
| pthreads[*](#special-requirements-for-pthreads) | &check; | &check; | &check; |         |         |         |         |         |
|                      raphf                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     rdkafka                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                     recode                      | &check; | &check; | &check; | &check; | &check; | &check; |         |         |
|                      redis                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      shmop                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      snmp                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                  snuffleupagus                  |         |         | &check; | &check; | &check; | &check; | &check; |         |
|                      soap                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     sockets                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      solr                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     sqlsrv                      |         |         | &check; | &check; | &check; | &check; | &check; |         |
|                      ssh2                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                    sybase_ct                    | &check; | &check; |         |         |         |         |         |         |
|                     sysvmsg                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     sysvsem                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     sysvshm                     | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|    tdlib[*](#special-requirements-for-tdlib)    |         |         | &check; | &check; | &check; | &check; | &check; |         |
|                      tidy                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                   timezonedb                    | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      uopz                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                      uuid                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      wddx                       | &check; | &check; | &check; | &check; | &check; | &check; |         |         |
|                     xdebug                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                     xhprof                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                     xmlrpc                      | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                       xsl                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                      yaml                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |
|                       zip                       | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
|                    zookeeper                    | &check; | &check; | &check; | &check; | &check; | &check; | &check; |         |

<!-- END OF EXTENSIONS TABLE -->

## 在宿主机中使用命令行
### PHP CLI

1. 参考根目录[bash.alias.sample](https://github.com/achuanya/dnmp/blob/master/bash.alias.sample)示例文件，将PHP CLI函数拷贝到`/etc/profile`系统环境变量文件

```shell
# 刷新系统环境变量
$ source /etc/profile
```

2 . 在宿主机中执行PHP命令了

```shell
 ~ [06:24:00]
achuan$ php -v
PHP 7.4.7 (cli) (built: Jun 11 2020 19:07:15) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.7, Copyright (c), by Zend Technologies
    
 ~ [06:24:04]
achuan$ php56 -v
PHP 5.6.40 (cli) (built: Jan 31 2019 01:30:45) 
Copyright (c) 1997-2016 The PHP Group
Zend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
    with Zend OPcache v7.0.6-dev, Copyright (c) 1999-2016, by Zend Technologies
```

### Composer

1. 首先确定Composer缓存目录，Composer配置文件在根目录中的`data/composer`

2. 参考根目录[bash.alias.sample](https://github.com/achuanya/dnmp/blob/master/bash.alias.sample)示例文件，将PHP CLI函数拷贝到`/etc/profile`系统环境变量文件

```shell
# 刷新系统环境变量
$ source /etc/profile
```

3. 之后就可以在宿主机使用Composer命令了

```shell
$ cd /work/dnmp/www
$ composer -V
Composer version 1.10.13 2020-09-09 11:46:34
```

4. 第一次使用Composer后`data/composer`目录下会生成`config.json`全局配置文件，可指定镜像，例如中国全量镜像：

```shell
{
    "config": {},
    "repositories": {
        "packagist": {
            "type": "composer",
            "url": "https://packagist.phpcomposer.com"
        }
    }
}
```

或使用命令修改Composer的全局配置文件

```shell
$ composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

## 管理命令

### 容器的创建、启动与构建

```shell
$ docker-compose
	up # 创建并且启动所有容器
	up -d # 创建并且后台运行所有容器
	up nginx php mysql # 创建并且启动多个容器
	
	start # 启动容器
	stop # 停止容器
	restart # 重启容器
	build # 构建容器
	
	rm # 停止并且删除容器
	down # 停止并且删除容器、网络、图像与挂载卷
```

### 快捷命令

1. 参考根目录[bash.alias.sample](https://github.com/achuanya/dnmp/blob/master/bash.alias.sample)示例文件，将Composer函数拷贝到`/etc/profile`系统环境变量文件

```shell
# 刷新系统环境变量
$ source /etc/profile
```

2. 例如，进入php容器

```shell
$ dphp
```