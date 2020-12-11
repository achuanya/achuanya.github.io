---
comments: true
layout: post
title: Manjaro KDE Shell脚本
description: Manjaro KDE Shell脚本
category: 技术
---

```bash
#!/bin/bash

# sudo pacman -Sy
# sudo pacman-mirrors -i -c china -m rank
# sudo pacman -Syu


echo '--------正在添加Arch源--------';

sed -i '$a [archlinuxcn]' 423423423.php
sed -i '$a SigLevel = Optional TrustedOnly' 423423423.php
sed -i '$a Server   = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch' /etc/pacman.conf


```