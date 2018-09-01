---
layout: post
title: ubuntu调教日记之Sublime Texet3
description: ubuntu18.04下安装 Sublime Texet3 并解决它的一些“疑难杂症”
category: 技术
---

接触linux这段时间真的是各种折腾，我几乎所有把流行的发行版都装了一遍，最终停留在ubuntu18.04，毕竟ui强迫症，但社区比较强大，遇到毛病解决不会太难，初次接触它的过程中也是遇到各种问题，没办法。生命在于折腾吧。

好了，我们直接入正题，按顺序执行下面命令开始安装！

## 一.安装篇

1.通过终端运行命令安装密钥：

    wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
    
2.安装apt-transport-https软件包

    sudo apt-get install apt-transport-https

3.将Sublime Text稳定库添加到您的软件源中：

    echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list

4.更新软件源为最新版

    sudo apt-get update

5.安装Sublime Text 耐心等待一会儿

    sudo apt-get install sublime-text

以上5步就安装成功了！接下来是解决Ubuntu下Sublime不能输入中文的问题！
按顺序执行一下命令！

1.Git克隆项目到本地Clone

    git clone https://github.com/lyfeyaj/sublime-text-imfix.git

2.运行脚本

    cd sublime-text-imfix && ./sublime-imfix

执行完”运行脚本“命令后重启Sublime，就可以输入中文了！
如果还不行，你下方请留言咱们再讨论...

## 二.插件篇

Sublime Text是一个非常强大的轻量级编辑器。它不仅具有大量的功能，而且还有很多主题，这让它看起来很漂亮。一下介绍的这些插件都是我个人比较喜欢的，看一看说不定你也会深深爱上它。

1.首先我们打开Sublime Text，按Ctrl+`（它和qq输入法快捷键冲突）

2.复制粘贴以下代码添加至命令行，然后回车（它用来安装插件的工具）

    import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())

3.重启**Sublime Text**，查看 **Perferences > Package settings** 中是否有 **Package control（命令面板）** 这一项，如果有，则安装成功

Package control 安装成功。方便以后更新、卸载Sublime插件啦。

Package control 安装好之后打开它快捷键：**Ctrl+Shift+P**

输入 Install Package （**输入简写 IP 也可以**）找到一下对应的提示，选择安装包，下载安装稍等片刻（**左下角 状态栏**），

下载好后会自动弹出该插件的配置信息，无需保存，关闭即可。
**Perferences > Package settings 中看到对应的包名。**

如果想要删除插件，调出命令面板输入， **remove**， 调出 **Remove Package** 选项并回车，选择你要删除的插件即可。

更新插命令：**upgrade packages**


汉化Sublime，用**Package conntrol**装第一个插件**“localization”**
英文好的请略过...

调出命令面板并输入：**Install Package**
然后在输入框中输入：**localization**
就会发现汉化语音的相关插件，稍微等待，自动弹出插件安装信息

好了，折腾了半会儿，接下来的就是大家最喜欢的“皮肤主题和代码插件”

AutoFileName　　　**路径提示插件**，如 <img src=”” />　就会出现提示，就不上图了...

ConvertToUTF-8　　支持不被Sublime支持的文件，特别是中日韩用户使用的GB2312，GBK等

Boxy Theme　　　拥有四个**高品质**的**主题**和多个**配色方案**

BracketHighlighter　　　一个**显示颜色代码**{ **"#000000"** }的视觉颜色的插件,含颜色值的LESS,Sass,和Stylus变量,它是一个帮助您更直观处理颜色的插件。

**修改配置方法如下:**

    Preferences -> Package Settings -> Color Highlighter -> Settings - User,
    
    // 配置成如下内容： 
    
    {
    "search_colors_in": {
        "all_content": {
            "enabled": true,
            "color_highlighters": {
                "color_scheme": {
                    // 主要是修改这两项
                    "enabled": true,
                    "highlight_style": "filled" // 填充的意思
                    }
                }
            }
        }
    }
然后重启 Sublime 就可以了。

Color Highlight　　　**缩进**，代码高亮等转换为 html 代码 　

Colorsublime　　　直接从Sublime Text更改主题

DocBlockr　　　DocBlockr很好用，不仅仅可以**自动生成注释**，还可**以手动编辑注释的格式**
**修改配置方法如下:**

    Preferences -> Package Settings -> Color Highlighter -> Settings - User,
    
    // 配置成如下内容：
    
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
Emmet　　　可以帮助 html css **快速输入代码** 如快速新建html头部 **！** 或 **html:5**，
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;然后按下 **Tab** 键或 **Ctrl+E**

Material Theme　　　多个**高品质**的**主题**和多个**配色方案**

Package Control　　　命令面板，Sublime 最重要的功能之一

SublimeLinter　　　**检查语法**是否有错误

View inBrowser　　　快捷浏览 html 文件，可以配置快捷键


若我有哪里写的不好，还请多多指教，
最后再秀一下我的 Sublime 字体很棒 看着很舒服 嘿嘿

![](/images/2018-08-30-sublime/sublime.png)

<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?d8fde0d2545d1e76dfb50dddb897df5c";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
