---
comments: true
layout: post
title: 步步深入Java底层原理——源码编译执行
description: 步步深入Java底层原理——源码编译执行
category: 技术
---
前几次系统数据老是出问题，前几天经理让我给写个数据库自动备份，Shell能力有限，周六日再改改..

## 编写 Shell
```shell
# 查看磁盘空间
$ df -h

    Filesystem      Size  Used Avail Use% Mounted on
    /dev/vda1        79G   36G   40G  48% /
    devtmpfs        3.9G     0  3.9G   0% /dev
    tmpfs           3.9G  1.1M  3.9G   1% /dev/shm
    tmpfs           3.9G  592K  3.9G   1% /run
    tmpfs           3.9G     0  3.9G   0% /sys/fs/cgroup
    tmpfs           783M     0  783M   0% /run/user/0

# 进入根目录，创建 DatabaseBackup 文件夹并进入
$ cd /
$ mkdir DatabaseBackup
$ cd DatabaseBackup

# 创建 gupiaocl188.sh 文件并编辑
$ vim gupiaocl188.sh

    #!/bin/bash
    mysqldump -u project gupiaocl188 | gzip > /DatabaseBackup/gupiaocl188__$(date +%Y-%m-%d__%H:%M:%S).sql.gz

    #生成格式
    www_gupiaocl188__2019-09-17__12:00:01.sql.gz

# 赋值可执行权限
$ sudo chmod u+x gupiaocl188.sh
```