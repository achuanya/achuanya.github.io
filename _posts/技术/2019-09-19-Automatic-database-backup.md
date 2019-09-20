---
comments: true
layout: post
title: 在CentOS下实现MySQL数据库定时自动备份
description: 在CentOS下实现MySQL数据库定时自动备份
category: 技术
---

```shell
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

# 
$ vim gupiaocl188.sh

    #!/bin/bash
    mysqldump -u project gupiaocl188 | gzip > /DatabaseBackup/gupiaocl188__$(date +%Y-%m-%d__%H:%M:%S).sql.gz

# 赋值可执行权限
$ sudo chmod u+x gupiaocl188.sh

# 配置 MySQL [mysqldump]
$ my.ini

    [mysqldump]
    user     = project
    password = HiGirl0921

# 执行 Shell脚本测试
$ ./gupiaocl188.sh

```

## Crontab
```bash

# 安装 Crontab
$ yum install -y vixie-cron

# 设置 Crontab 开启启动
$ chkconfig –level 35 crond on

#　启动 Crontab
$ service crond start

# 查看 Crontab 服务状态
$ service crond status
# 
$ crontab -e

    #
    # 每俩小时自动备份 www_gupiaocl188_ 数据库
    #
    */120 * * * * /DatabaseBackup/www_gupiaocl188_.sh
```