---
comments: true
layout: post
title: Ubuntu调教日记之Sublime Text3
description: Ubuntu18.04下安装 Sublime Text3 并解决它的一些“疑难杂症”
category: 技术
---

接触linux这段时间真的是各种折腾，我几乎所有把流行的发行版都装了一遍，最终选择了ubuntu18.04，毕竟ui强迫症，还好社区比较强大，遇到毛病解决不会太难，初次接触它的过程中也是遇到各种问题，不过通过这几个月的学习，现在已经我可以熟练敲出各种命令并解决一些日常小毛病。没办法，生命在于折腾吧。

Sublime Text3 是一款轻量级的编辑器，它干净、实用、漂亮，还有它那强大全面的插件库。不过我比较喜欢它的四个方面：跨平台、启动快、多行编辑和VIM模式。

好了，我们直接入正题，按顺序执行下面命令开始安装！

## 一.安装篇

1.通过终端运行命令安装密钥：

```bash
$ wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
```

2.安装apt-transport-https软件包

```bash
$ sudo apt-get install apt-transport-https
```

3.将Sublime Text稳定库添加到您的软件源中：

```bash
$ echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
```

4.更新软件源为最新版

```bash
$ sudo apt-get update
```

5.安装Sublime Text 耐心等待一会儿

```bash
$ sudo apt-get install sublime-text
```

以上5步就安装成功了！接下来是解决Ubuntu下Sublime不能输入中文的问题！
按顺序执行一下命令！

1.Git克隆项目到本地Clone

```bash
$ git clone https://github.com/lyfeyaj/sublime-text-imfix.git
```

2.运行脚本

```bash
$ cd sublime-text-imfix && ./sublime-imfix
```

执行完”运行脚本“命令后重启Sublime，就可以输入中文了！
如果还不行，你下方请留言咱们再讨论...

## 二.插件篇

如果说安装给予Sublime生命，那插件就是它的灵魂。Sublime拥有的插件非常全面且实用。做为一个UI强迫症的我，界面好不好看直接影响到工作的效率。下面这些插件都是我比较喜欢的，看一看说不定你也会深深爱上它。

1.首先我们打开Sublime Text，按Ctrl+`（它和qq输入法快捷键冲突）

2.复制粘贴以下代码添加至命令行，然后回车（它用来安装插件的工具）

```bash
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

3.重启`Sublime Text`，查看 `Perferences > Package settings` 中是否有 `Package control` （命令面板）这一项，如果有，则安装成功

Package control 安装成功。方便以后更新、卸载Sublime插件啦。

Package control 安装好之后打开它快捷键`Ctrl+Shift+P`

输入`Install Package`输入简写 IP 也可以找到一下对应的提示，选择安装包，下载安装稍等片刻左下角 状态栏

下载好后会自动弹出该插件的配置信息，无需保存，关闭即可。
`Perferences > Package settings`中看到对应的包名

如果想要删除插件，调出命令面板输入`remove` 调出 `Remove Package` 选项并回车，选择你要删除的插件即可。

更新插命令`upgrade packages`


汉化Sublime，用`Package conntrol`装第一个插件`localization`
英文好的请略过...

调出命令面板并输入`Install Package`
然后在输入框中输入`localization`
就会发现汉化语音的相关插件，稍微等待，自动弹出插件安装信息

好了，折腾了半会儿，接下来的就是大家最喜欢的“皮肤主题和代码插件”

```bash
# 路径提示插件，如 <img src="" />　就会出现提示，就不上图了...
AutoFileName

# 支持不被Sublime支持的文件，特别是中日韩用户使用的GB2312，GBK等
ConvertToUTF-8

# 拥有四个**高品质**的**主题**和多个配色方案
Boxy Theme

# 一个显示颜色代码的视觉颜色的插件,含颜色值的LESS,Sass,和Stylus变量,它是一个帮助您更直观处理颜色的插件
BracketHighlighter

# 修改配置路径方法如下:
Preferences -> Package Settings -> Color Highlighter -> Settings - User,
# 配置成如下内容： 
    {
    "search_colors_in": {
        "all_content": {
            "enabled": true,
            "color_highlighters": {
                "color_scheme": {
                    # 主要是修改这两项
                    "enabled": true,
                    # 填充的意思
                    "highlight_style": "filled"
                    }
                }
            }
        }
    }
# 然后重启 Sublime 就可以了。

# 缩进，代码高亮等转换为 html 代码
Color Highlight

# 直接从Sublime Text更改主题
Colorsublime

# DocBlockr很好用，不仅仅可以自动生成注释，还可以自定义注释的格式
DocBlockr

# 修改配置路径方法如下:
Preferences -> Package Settings -> DocBlockr -> Settings - User,

# 配置成如下内容：
    {
    "jsdocs_extra_tags":[
        "@Author Hybrid",
        "@DateTime {{date}}",
        "@copyright ${1:[copyright]}",
        "@license ${1:[license]}",
        "@version ${1:[version]}"
    ],
    "jsdocs_function_description": false
    }

# 可以帮助 html 快速输入代码，如快速新建html头部,打出"!" 或者 html:5，然后按下 Tab 键或 Ctrl+E
Emmet

# 多个高品质的主题和多个配色方案
Material Theme

# 命令面板，Sublime 最重要的功能之一
Package Control

# 检查语法是否有错误
SublimeLinter

# 快捷浏览 html 文件，可以配置快捷键
View inBrowser
```
## 三.快捷键篇

熟练的掌握的快捷键，事半功倍！下面是一些是我认为较为实用的，并不全面。

### 选择类：

```bash
# 选中光标所占的文本，继续操作则会选中下一个相同的文本
Ctrl+D

# 选中文本按下快捷键，即可一次性选择全部的相同文本进行同时编辑
Alt+F3
# 先选中多行，再按下快捷键，会在每行行尾插入光标，即可同时编辑这些行
Ctrl+Shift+L

# 光标移动至括号内结束或开始的位置
Ctrl+M

# 在下一行插入新行，即使光标不在行尾，也能快速向下插入一行
Ctrl+Enter
# 在上一行插入新行。举个栗子：即使光标不在行首，也能快速向上插入一行
Ctrl+Shift+Enter

# 选中代码，按下快捷键，折叠代码
Ctrl+Shift+[
# 选中代码，按下快捷键，展开代码
Ctrl+Shift+]

# 展开所有折叠代码
Ctrl+K+0
```

### 编辑类
```bash
# 合并选中的多行代码为一行
Ctrl+J

# 向右缩进
Tab
# 向左缩进
Shift+Tab

# 注释单行
Ctrl+/
# 注释多行
Ctrl+Shift+/ 

# 撤销
Ctrl+Z
# 恢复撤销
Ctrl+Y

# 保存
Ctrl+S
# 另存为
Ctrl+Shift+S

# 关闭文件
ctrl+W
# 重新打开最近关闭的文件
Ctrl+Shift+T
```

### 搜索类
```bash
# 打开底部搜索框，查找关键字
Ctrl+F
# 打开搜索框，输入项目文件名，快速搜索文件，输入@和关键字，查找文件中函数名，输入：和数字跳转到文件中该行代码，输入#和关键字，查找变量名
Ctrl+P

# 打开命令面板
Ctrl+Shift+P

# 退出光标多行选择，退出搜索框，命令面板等
Esc
```

### 显示类
```bash
# 按文件浏览过的顺序，切换当前窗口的标签页
Ctrl+Tab

# 窗口分屏，恢复默认1屏（非小键盘的数字）
Alt+Shift+1
# 左右分屏-2列
Alt+Shift+2
# 左右分屏-3列
Alt+Shift+3
# 左右分屏-4列
Alt+Shift+4

# 等分4屏
Alt+Shift+5

# 垂直分屏-2屏
Alt+Shift+8
# 垂直分屏-3屏
Alt+Shift+9
# 开启/关闭侧边栏
Ctrl+K+B

# 全屏模式
F11
# 免打扰模式
Shift+F11
```

如有写的不足之处，还请您多多指教！  
最后再秀一下我的 Sublime 感觉字体很棒，看着很舒服 嘿嘿

![抱拳](https://lhasa-1253887673.cos.ap-shanghai.myqcloud.com/assets%2Farticle%2F2018-08-30-Ubuntu-set-up-sublime%2Fsublime.png "抱拳")
