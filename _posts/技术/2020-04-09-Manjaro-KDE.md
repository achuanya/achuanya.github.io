---
comments: true
layout: post
title: Manjaro KDE 调教日记
description: Manjaro KDE 调教日记
category: 技术
---

## 更换源

```bash
# 更新包数据库
$ sudo pacman -Sy
# 选清华源 mirrors.tuna.tsinghua.edu.cn
$ sudo pacman-mirrors -i -c China -m rank
# 或者自动设置最快单源
$ sudo pacman-mirrors -g
$ sudo pacman -Sy
```

## vim git yay

~~~bash
$ sudo pacman -S vim git yay
~~~

## 添加Arch源

```bash
$ sudo vim /etc/pacman.conf
# 把下面这几行写进去
    [archlinuxcn]
    SigLevel = Optional TrustedOnly
    Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch

# 让arch生效需要archlinuxcn-keyring包
$ sudo pacman -S archlinuxcn-keyring
$ sudo pacman -Sy
```
## 自动挂载NTFS硬盘

```bash
# 查看磁盘分区的UUID
$ sudo blkid - K`o list
# 5016CF88CCD20C21 就是我的UUID，同时要记录一下device和fs_type等会要用
device                   fs_type    label       mount point                  UUID
-------------------run----------------------------------------------------------------------------------------------
/dev/sdb1                ntfs       File        /run/media/achuan/File          5016CF88CCD20C21

# /dev/sdb1挂载点
$ mkdir ~/File
# 打开fastab文件，看到以下文件内容
$ sudo vim /etc/fstab
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a device; this may
# be used with UUID= as a more robust way to name devices that works even if
# disks are added and removed. See fstab(5).
#
# <file system>             <mount point>  <type>  <options>  <dump>  <pass>
UUID=8a9b74b7-c33a-413b-b654-80f3a16b5e12 /home          ext4    defaults,noatime,discard 0 2
UUID=b23b3470-26c1-4b39-9358-43278c73763e /              ext4    defaults,noatime,discard 0 1
UUID=ad103e33-78b7-4b33-8632-03c3fe6364fc /boot          ext4    defaults,noatime,discard 0 2
UUID=b0d5e88d-136a-4fa6-b164-5d70e5073b5d /opt           ext4    defaults,noatime,discard 0 2
tmpfs                                     /tmp           tmpfs   defaults,noatime,mode=1777 0 0

# 从这个文件内容可以看出文件有6列
 - 第一列file system选项是UUID
 - 第二列mount point选项是挂载点
 - 第三列type选项是所要挂载设备的文件系统或者文件系统类型
 - 第四列options选项是挂载选项，常见参数如下
 
|  配置选项    | 选项说明                                            
|-------------|-----------------------------------------------------
| async/sync  | 设置是否为同步方式运行，默认为async
| auto/noauto | 当下载mount -a命令时，此系统是否被主动挂载，默认为auto
| rw/ro       | 是否以只读或读写模式挂载
| exec/noexec | 限制此文件系统内是否能够进行“执行”操作
| user/nouser | 是否允许用户使用mount命令挂载
| suid/nosuid | 是否允许SUID的存在
| userquota   | 启动文件系统支持磁盘配额模式
| grpquota    | 启动文件系统对群组磁盘配额模式的支持
| defaults    | 同时具有rw、suid、suid、dev、exec、auto、nouser、async等默认参数的设置
 
 - 第五列dump选项是文件系统备份选项。0备份，1备份
 - 第六列pass选项是磁盘检查设置，其值是一个顺序，0不检查，１检查（根目录永远都为1）其它分区从2开始，数字越小越先检查，如果有两个分区的数字相同，同时检查

# 这是挂载/dev/sdb1的挂载配置，插入一行保存退出
UUID=5016CF88CCD20C21                     /home/achuan/File ntfs   defaults 0 0

# 如果/etc/fstab配置不对，会导致系统无法启动！一定要检查一下是否能正确挂载！如果改挂了，找个U盘改回来就行了。
$ sudo mount -a
```

## 常用软件

### Vim配置

```bash
# Lightline
$ git clone https://github.com/itchyny/lightline.vim ~/.vim/pack/plugins/start/lightline

# 更换 PaperColor_dark.vim
$　mv -f ~/.vim/pack/plugins/start/lightline/autoload/lightline/colorscheme/PaperColor_dark.vim ~/.vim/pack/plugins/start/lightline/plugin/lightline.vim

# 编辑全局配置并写入以下配置 # 用户个人配置 ~/.vimrc
$ sudo vim /etc/vimrc

" 语法高亮
syntax on
" 底部状态显示
set showmode
" 支持鼠标
set mouse=a
" 使用UTF-8编码
set encoding=utf-8  
" 启用256色
set t_Co=256
" 开启文件类型检查，并且载入与该类型对应的缩进规则
filetype indent on
" 按回车后，下一行缩进自动同上
set autoindent
" 按TAB，Vim显示的空格数量
set tabstop=4
" 在文本上按下>>（增加一级缩进）、<<（取消一级缩进）或者==（取消全部缩进）时，每一级的字符数
set shiftwidth=4
" 由于 TAB 键在不同的编辑器缩进不一致，该设置自动将 TAB 转为空格
set expandtab
" TAB转为多少个空格
set softtabstop=4
" 显示行号
set number
" 光标所在当前行高亮
set cursorline
" 设置行宽，即一行显示多少个字符
set textwidth=80
" 自动折行，即太长的行分成几行显示
set wrap
" 只有遇到指定的符号（比如空格、连词号和其他标点符号），才发生折行。也就是说，不会在单词内部折行
set linebreak
" 是否显示状态栏。0 表示不显示，1 表示只在多窗口时显示，2 表示显示
set laststatus=2
" 在状态栏显示光标的当前位置（位于哪一行哪一列）
set  ruler
" 搜索时，高亮显示匹配结果
set hlsearch
" 输入搜索模式时，每输入一个字符，就自动跳到第一个匹配的结果
set incsearch
" 搜索时忽略大小写
set ignorecase
" 如果有一个大写字母，则切换到大小写敏感查找
set smartcase 
" 保存撤销历史
set undofile
" 出错时，发出视觉提示
set visualbell
" 保存Vim历史操作次数
set history=1000
" 打开文件监视。如果在编辑过程中文件发生外部改变（比如被别的编辑器编辑了），就会发出提示
set autoread
" 如果行尾有多余的空格（包括 Tab 键），该配置将让这些空格显示成可见的小方块
set listchars=tab:»■,trail:■
set list
" 命令模式下，底部操作指令按下 Tab 键自动补全。第一次按下 Tab，会显示所有匹配的操作指令的清单；第二次按下 Tab，会依次选择各个指令
set wildmenu
set wildmode=longest:list,full
```

### 安装zsh

```bash
$ sudo pacman -S zsh
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# 切换到zsha
$ chsh -s /bin/zsha
# 安装3den主题
$ sudo vim ~/.zshrc
    ZSH_THEME="3den"
```

### 安装搜狗输入法

```bash
# 安装时提示选择安装，保持默认选择全部
$ sudo pacman -S fcitx-im fcitx-sogoupinyin fcitx-configtool
$ yay -S fcitx-qt4
# 编辑系统环境变量并写入以下配置（如果文件不存在，就创建）
$ sudo vim /etc/profile
    GTK_IM_MODULE=fcitx
    QT_IM_MODULE=fcitx
    XMODIFIERS="@im=fcitx"

# 刷新环境变量
$ source /etc/profile
# 注销或重启后再登录，打开fcitx设置，选择输入法，选择搜狗输入法
```
### 开发

```bash
# 谷歌浏览器
$ sudo pacman -S google-chrome
# 360安全浏览器
$ sudo yay -S browser360
# Typora
$ sudo pacman -S typora
# phpstorm
$ yay -S phpstorm
# Visual Studio Code
$ sudo pacman -S visual-studio-code-bin
# Postman
$ sudo pacman -S postman-bin
# Mycli (支持MySQL、MariaDB和Percona命令行界面自动补全和语法高亮，安装好直接mycli -uroot哦~起飞)
$ sudo pacman -S mycli
# 开源图形化的Redis客户端管理软件
$ sudo pacman -S redis-desktop-manager
# 开源跨平台，基本支持所有流行的数据库的图形管理软件
$ sudo pacman -S dbeaver
# jdk8
$ sudo pacman -S jdk8-openjdk
# 显示java版本
$ archlinux-java status
Available Java environments:
  java-14-jdk
  java-8-openjdk (default)
$ sudo archlinux-java set java-8-openjdk

# Navicat Premium 150.0.10
# 链接: https://pan.baidu.com/s/1ihWcDY2Vs9igWuDfKh5giA  密码: nnft
$ chmod +x navicat15-premium-cs.AppImage
$ ./navicat15-premium-cs.AppImage

# Jekyll
$ sudo pacman -S ruby
$ gem install jekyll bundler
$ sudo vim /etc/profile
# 把ruby写入到系统环境变量
	export PATH="$PATH:/home/achuan/.gem/ruby/2.7.0/bin"
$ source /etc/profile
```

### 办公

```bash
#　Thunderbird (邮件收发和RSS订阅，KDE预装)
$ sudo pacman -S thunderbird thunderbird-i18n-zh-cn
# XMind思维导图 (需要JAVA8)
$ yay -S xmind
# KDE下最好用的PDF阅读器
$ sudo pacman -S okular
# WPS\字体\中文语言包
$ sudo pacman -S wps-office ttf-wps-fonts wps-office-mui-zh-cn
# 如果WPS不能输入中文
$ sudo vim /usr/bin/wps
# 写入以下配置
    export GTK_IM_MODULE=fcitx
    export QT_IM_MODULE=fcitx
    export XMODIFIERS="@im=fcitx"
```

### 娱乐

```bash
# Spotify
$ sudo pacman -S spotify
# 网易云音乐
$ yay -S netease-cloud-music
# Telegram
$ sudo pacman -S telegram-desktop
# Asciinema 在云端记录并分享你的终端会话
$ sudo pacman -S asciinema
# TIM（wine）
$ sudo pacman -S deepin.com.qq.office
# QQ（wine）
$ sudo pacman -S deepin.com.qq.im
# 微信（wine）
$ yay -S deepin-wine-wechat
# 微信（Electronic开源）
$ sudo pacman -S electronic-wechat
# 安装gnome-settings-daemon
$ sudo pacman -S gnome-settings-daemon
# 软连接设置为启动，之后重启Linux就可以了
$ sudo ln -s /usr/lib/gsd-xsettings ~/.config/autostart-scripts/
# 相关设置调整
# QQ
$ env WINEPREFIX="$HOME/.deepinwine/Deepin-QQ" winecfg
# TIM
$ env WINEPREFIX="$HOME/.deepinwine/Deepin-TIM" winecfg
# 微信
$ env WINEPREFIX="$HOME/.deepinwine/Deepin-WeChat" winecfg
# 迅雷
$ env WINEPREFIX="$HOME/.deepinwine/Deepin-ThunderSpeed" winecfg
```

### 工具

```bash
# 百度网盘
$ wget http://issuecdn.baidupcs.com/issue/netdisk/LinuxGuanjia/3.0.1/baidunetdisk_linux_3.0.1.2.deb
$ sudo debtap baidunetdisk_linux_3.0.1.2.deb
$ sudo pacman -U baidunetdisk-3.0.1-1-x86_64.pkg.tar.xz
# 坚果云
$ sudo pacman -S nutstore
# 迅雷
$ yay -S deepin-wine-thunderspeed
# Teamviewer
$ sudo pacman -S teamviewer
# 如果无法打开或不能联网执行
$ sudo teamviewer --daemon enable
# Shadowsocks
$ sudo pacman -S shadowsocks-qt5
# 支持快捷键下拉的终端模拟器 (KDE预装默认F12唤醒)
$ sudo pacman -S yakuake
# 深度取色器
$ sudo pacman -S deepin-picker
# 深度录屏
$ sudo pacman -S deepin-screen-recorder
# 深度截图
$ sudo pacman -S deepin-screenshot
# Motrix (支持下载 HTTP、FTP、BT、磁力链、百度网盘等资源)
$ sudo pacman -S motrix
$ git clone git@github.com:sbwtw/deepin-repair-tools.git
# 全平台多线程下载管理器，恢复断/死下载、安排和转换下载、内置视频转换器、支持各大流行浏览器插件
$ yay -S xdman

# 腾讯播放器
$ yay -S debtap
# 升级 debtap
$ sudo debtap -u
$ wget https://dldir1.qq.com/qqtv/linux/Tenvideo_universal_1.0.10_amd64.deb
# 将deb包转换成pkg包
$ sudo debtap Tenvideo_universal_1.0.10_amd64.deb
# 安装pkg包
$ sudo pacman -U sogoupinyin-2.3.1.0112-1-x86_64.pkg.tar.xz
```

## Docker

```bash
$ sudo pacman -S docker
# 设置Docker开机启动服务
$ sudo systemctl enable docker
# 更换为国内网易镜像并写入一下配置
$ sudo vim /etc/docker/daemon.json
    {
        "registry-mirrors": ["http://f136db2.daocloud.io"]
    }

# 重载配置文件
$ sudo systemctl daemon-reload
# 添加一个Docker组
$ sudo groupadd docker
# 将登录用户加入到Docker用户组中
$ sudo gpasswd -a ${USER} docker
# 更新用户组
$ newgrp docker
# 启动Docker
$ sudo systemctl start docker

```

## 开发环境

### Apache

```bash
# APACHE
$ sudo pacman -S apache
# 查看Apache状态和版本信息
$ sudo systemctl status httpd
# 启动apache服务
$ sudo systemctl start httpd
# 设置Apache开机启动服务
$ sudo systemctl enable httpd
```

### PHP

```bash
# 依赖
$ yay -S pcre pcre-devel openssl openssl-devel libicu-devel gcc gcc-c++ autoconf libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel glibc glibc-devel glib2 glib2-devel ncurses ncurses-devel curl curl-devel krb5-devel libidn libidn-devel openldap openldap-devel nss_ldap jemalloc-devel cmake boost-devel bison automake libevent libevent-devel gd gd-devel libtool* libmcrypt libmcrypt-devel mcrypt mhash libxslt libxslt-devel readline readline-devel gmp gmp-devel libcurl libcurl-devel openjpeg-devel

$ cd /usr/src
$ wget https://www.php.net/distributions/php-7.2.29.tar.gz
# 解压文件
tar xvf php-7.2.29.tar.gz
cd php-7.2.29
# 配置编译参数
$ sudo ./configure --prefix=/usr/local/php-7.2.29 \
--with-config-file-path=/usr/local/php-7.2.29/etc \
--enable-fpm \
--with-fpm-user=www \
--with-fpm-group=www \
--enable-mysqlnd \
--with-mysqli=mysqlnd \
--with-pdo-mysql=mysqlnd \
--enable-mysqlnd-compression-support \
--with-iconv-dir \
--with-freetype-dir \
--with-jpeg-dir \
--with-png-dir \
--with-zlib \
--with-libxml-dir \
--enable-xml \
--disable-rpath \
--enable-bcmath \
--enable-shmop \
--enable-sysvsem \
--enable-inline-optimization \
--with-curl \
--enable-mbregex \
--enable-mbstring \
--enable-intl \
--with-libmbfl \
--enable-ftp \
--with-gd \
--enable-gd-jis-conv \
--with-openssl \
--with-mhash \
--enable-pcntl \
--enable-sockets \
--with-xmlrpc \
--enable-zip \
--enable-soap \
--with-gettext \
--disable-fileinfo \
--enable-opcache \
--with-pear \
--enable-maintainer-zts \
--with-ldap=shared \
--without-gdbm \
--with-webp-dir \
--with-xpm-dir \
--with-apxs2 \
--enable-roxen-zts \

# 编译检查安装
$ sudo make -j 4
$ make test
$ sudo make install
# 复制配置文件
$ sudo cp /usr/local/php-7.2.29/etc/php-fpm.conf.default /usr/local/php-7.2.29/etc/php-fpm.conf
$ sudo cp /usr/local/php-7.2.29/etc/php-fpm.d/www.conf.default /usr/local/php-7.2.29/etc/php-fpm.d/www.conf
$ sudo cp php.ini-production /usr/local/php-7.2.29/etc/php.ini
# 我安装后php-v没有生效，需要把php添加到系统环境变量
$ sudo vim /etc/profile
	PATH=/usr/local/php-7.2.29/bin:/usr/local/php-7.2.29/sbin:$PATH
	
# 刷新系统环境变量
$ source /etc/profile
# 让apache支持php
$ sudo /etc/httpd/conf/httpd.conf
	LoadModule php7_module modules/libphp7.so
	
	<IfModule mime_module>
        TypesConfig conf/mime.types
        AddType application/x-compress .Z
        AddType application/x-gzip .gz .tgz
        AddType application/x-httpd-php .php
        AddType application/x-httpd-php-source .phps    
    </IfModule>

# 配置php.ini参数
$ sudo vim /usr/local/php-7.2.29/etc/php.ini
    expose_php = Off
    short_open_tag = On
    display_errors = On
	display_startup_errors = On
    max_execution_time = 300
    max_input_time = 300
    memory_limit = 128M
    post_max_size = 32M
    date.timezone = Asia/Shanghai
    extension = mysqli
	extension = curl

# 配置OPcache缓存
	[opcache]
    zend_extension = /usr/local/php-7.2.29/lib/php/extensions/no-debug-zts-20170718/opcache.so
    ; Zend Optimizer + 共享内存的大小, 总共能够存储多少预编译的 PHP 代码(单位:MB)
    opcache.memory_consumption = 128
    ; Zend Optimizer + 暂存池中字符串的占内存总量.(单位:MB)
    opcache.interned_strings_buffer = 8
    ; 最大缓存的文件数目 200  到 100000 之间
    opcache.max_accelerated_files = 4000
    ; 2s检查一次文件更新 注意:0是一直检查不是关闭
    opcache.revalidate_freq = 60
    ; 打开快速关闭, 打开这个在PHP Request Shutdown的时候会收内存的速度会提高
    opcache.fast_shutdown = 1
    ; Zend Optimizer + 的开关, 关闭时代码不再优化
    opcache.enable_cli = 1

# 编译php扩展
# 后来发现好多必备php扩展没有编译完成，还好源码包没有删除
$ cd /usr/src/php-7.2.29/ext/mysqli
# 搭建动态模块的环境
$ /usr/local/php-7.2.29/bin/phpize
# 获取php配置信息
$ ./configure --with-php-config=/usr/local/php-7.2.29/bin/php-config
# 编译并安装
$ sudo make -j 4 && sudo make install
/usr/local/php-7.2.29/bin/phpize && ./configure --with-php-config=/usr/local/php-7.2.29/bin/php-config && sudo make -j 4 && sudo make install
```

### Composer
```bash
$ curl -sS https://getcomposer.org/installer | php

# 全局调用
$ sudo mv composer.phar /usr/local/bin/composer

# 使用阿里云镜像
$ composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

```

### Redis\MySQL

```bash
# Redis
$ sudo pacman -S redis
$ git clone  https://github.com/phpredis/phpredis.git
$ cd phpredis && phpize
./configure --with-php-config=/usr/local/php-7.2.29/bin/php-config
# 获取php配置信息
$ ./configure --with-php-config=/usr/local/php-7.2.29/bin/php-config
$ sudo make -j 4 && sudo make install
# 设置Redis开机启动服务
$ sudo systemctl enable redis

# MySQL
$ sudo pacman -S mysql
# 初始化
$ sudo mysqld --initialize --user=mysql --basedir=/usr --datadir=/var/lib/mysql
# 我遇到了问题，初始化没有提供密码，不管它直接改。
$ sudo vim /etc/mysql/my.cnf
在[mysqld]中写入
	skip-grant-tables
	
$ sudo systemctl restart mysqld
$ mysql -uroot -p
# 设置MySQL开机启动服务
$ sudo systemctl enable mysqld
# 改密码
# 在这我遇到个问题，如果不先刷新权限，SQL语句就会报错
ERROR 1290 (HY000): The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.01 sec)

mysql> ALTER user 'root'@'localhost' IDENTIFIED BY 'achuan.io';
Query OK, 0 rows affected (0.02 sec)

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.01 sec)

> QUIT
Bye
```

## Pacman命令

### 更新

```bash
# 更新整个系统
$ pacman -Syu
# 更新包数据库
$ pacman -Sy
# 更新已安装的包
$ pacman -Su
```

### 搜索安装

```bash
# 安装
$ pacman -S
# 搜索含关键字的包
$ pacman -Ss
# 同步包数据库后再执行安装
$ pacman -Sy
# 安装本地包 (扩展名：pkg.tar.gz)
$ pacman -U
# 搜索已安装的包
$ pacman -Qs
# 查看有关包信息
$ pacman -Qi
# 升级全部包
$ pacman -Syu
# 只下载，不安装
$ pacman -Sw
```

### 显示删除

```bash
# 删除包，不会删除其依赖
$ pacman -R
# 删除包，及其所有没有被其它包使用的依赖
$ pacman -Rs
# 删除一个包，包括所有依赖
$ pacman -Rsc
# 清理未安装的包 (包文件目录：/var/cache/pacman/pkg/)
$ pacman -Sc
# 清理所有缓存文件
$ pacman -Scc
# 显示包信息
$ pacman -Si
# 查询本地包的详情信息
$ pacman -Qi
# 列出所有不再作为依赖的包
$ pacman -Qdt
# 列出所有明确安装而且不被其他包依赖的包
$ pacman -Qet
```

最后再来一张图啊哈哈哈～

![抱拳]({{ site.article }}2020-04-09-Manjaro-KDE/My desktop.png?achuan.io "我的桌面")