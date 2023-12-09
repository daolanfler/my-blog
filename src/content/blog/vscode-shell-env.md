---
title: 以不同的方式启动 VSCode Shell 环境是如何 Resolve 的
date: 2023-12-09 11:21:00
tags:
  - vscode
---

启动一个 vscode 的方式有很多种，比如你可以在命令行中输入 `code .`，或者你可以在 vscode 中按下 `F5` 启动 Debug Launcher，
那么这些不同的启动方式会导致 vscode 的 shell 环境不同吗？根据我的经验来看，确实不同。

## 文档中的描述

### UI 和 命令行启动

根据 [文档 FAQ - Resolving Shell Environment Fails](https://code.visualstudio.com/docs/supporting/FAQ#_resolving-shell-environment-fails)
的描述:

> _This section applies to macOS and Linux environments only._

> When VS Code is launched from a terminal (for example, via code .), it has access to environment settings defined in your .bashrc or .zshrc files. This means features like tasks or debug targets also have access to those settings.

> However, when launching from your platform's user interface (for example, the VS Code icon in the macOS dock), you normally are not running in the context of a shell and you don't have access to those environment settings. This means that depending on how you launch VS Code, you may not have the same environment.

### Debug Launcher 启动

[Why Do I Get Command Not Found When Running Task](https://code.visualstudio.com/docs/editor/tasks#_why-do-i-get-command-not-found-when-running-a-task):

> The message "command not found" happens when the task command you're trying to run is not recognized by your terminal as something runnable. Most often, this occurs because the command is configured as part of your shell's startup scripts. Tasks are run as non-login and non-interactive, which means that the startup scripts for your shell won't be run. nvm in particular is known to use startup scripts as part of its configuration.

可以看到 **startup scripts** 不会运行，导致如果你的系统环境变量中并没有 nodejs，只是安装了 nvm/fnm 之类的基于启动脚本的 nodejs 版本管理器，那么
在 Debug Lanuch vscode 的时候就会找不到 node 命令（比如你在编写一个 vscode 插件，这个插件假设你已经安装了 nodejs ）。

下面是一个企图在从 node v20.10.0 的 shell 中使用 `code . ` 打开的 vscode 并运行一个不支持 node 20 版本的 `npm run dev` task 执行出错的 log:

```bash

 *  Executing task: yarn run dev

executing bashrc # 表明有加载 .bashrc

.....
Node.js v20.10.0
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
ERROR: "main:dev" exited with 1.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

 *  The terminal process "C:\Program Files\Git\bin\bash.exe '--login', '-i', '-c', 'yarn run dev'" terminated with exit code: 1.
```

vscode 对这个 integrated terminal 的简介：

```plaintext
Process ID (PID): 42524

Command line: C:\Program Files\Git\bin\bash.exe '--login' '-i' '-c' 'yarn run dev'

Shell integration activated

The following extensions have contributed to this terminal's environment:

Git: Enables the following features: git auth provider
```

前面 vscode 文档上不是说 "Tasks are run as non-login and non-interactive" 吗？
但是这里咋还是 ` bash.exe '--login' '-i' '-c'` ，令人疑惑

## Windows 下的表现（根据实际观测）

前置条件： windows 系统安装上使用 nodejs 官方下载的安装包安装了一个 v20.10.0 版本的 node.
同时安装了 [fnm](https://github.com/Schniz/fnm) 用来管理多版本 node, 注意要使用 fnm 需要在相应的 shell
中添加初始化配置。

### Powershell

我的 powershell 的启动文件中写入和 fnm 初始化配置:

```powershell
# ~/Documents/WindowsPowerShell/Microsoft.PowerShell_profile.ps1 默认启动文件位置
fnm env --use-on-cd | Out-String | Invoke-Expression
```

此时我的 Powershell 中的环境如下：

```powershell
# windows terminal 中的 powershell
F:\projects\i18n-ally main ❯ fnm list
* v14.20.0
* v16.17.0 default # 当前 shell 中的版本
* v18.16.0 lts-latest
* system # 系统中的版本 也就是 20.10.0
F:\projects\i18n-ally main ❯ node -v
v16.17.0
```

此时我在命令行输入 `code .` 启动了 vscode, 在 vscode 中的终端中输入 `node -v` 输出的是 `v16.17.0`

```bash
# vscode 中的 integrated terminal
FANG Qi@Helloween MINGW64 /f/projects/i18n-ally (main)
$ node -v
v16.17.0
```

可以看到虽然我默认的 windows 中的 integrated terminal 是 Git Bash, 但是它还是继承了 启动 vscode 的 Powershell 中的环境变量。
（此时我的 .bashrc 中没有 fnm 初始化配置）

```bash
# vscode 中的 integrated terminal
FANG Qi@Helloween MINGW64 /f/projects/i18n-ally (main)
$ echo $PATH | tr ":" "\n" # 查看 $PATH
/c/Users/FANG Qi/AppData/Local/fnm_multishells/49108_1702086516404 # fnm 添加的
/c/Program Files/nodejs
/c/Users/FANG Qi/AppData/Roaming/npm
```

如果此时在 powershell 中输入 `fnm use 18`，再输入 `code .` 那么 vscode 中的 integrated terminal 中的 node 版本就变成了 18.16.0

### Git Bash

作为对照的是 Git Bash, 在我的 .bashrc 中我注释掉了 fnm 初始化的配置 :

```bash
# 这里注释掉了原先的配置
# https://github.com/Schniz/fnm the Node.js version mananger
# eval $(fnm env | sed 1d)
# export PATH=$(cygpath "${FNM_MULTISHELL_PATH}"):$PATH
# export PATH=$(cygpath "${PNPM_HOME}"):$PATH

# if [[ -f .node-version || -f .nvmrc ]]; then
#     fnm use
# fi

# if [[ -f ~/.bash-completion/fnm.bash ]]; then
#     . ~/.bash-completion/fnm.bash
# fi

# 为了让我能够随时启用 fnm, 这里加了一个 alias 方法
activate_fnm() {
    eval $(fnm env | sed 1d)
    export PATH=$(cygpath "${FNM_MULTISHELL_PATH}"):$PATH
    export PATH=$(cygpath "${PNPM_HOME}"):$PATH
    if [[ -f .node-version || -f .nvmrc ]]; then
        fnm use
    fi
    if [[ -f ~/.bash-completion/fnm.bash ]]; then
        . ~/.bash-completion/fnm.bash
    fi
}
```

此时 Git Bash 中的 node 环境如下：

```bash
# windows terminal 中的 Git Bash
FANG Qi@Helloween MINGW64 /f/projects/i18n-ally (main)
$ fnm list # fnm 作为一个命令还是可以用的
* v14.20.0
* v16.17.0 default
* v18.16.0 lts-latest
* system # 系统中的版本 也就是 20.10.0

FANG Qi@Helloween MINGW64 /f/projects/i18n-ally (main)
$ node -v
v20.10.0

FANG Qi@Helloween MINGW64 /f/projects/i18n-ally (main)
$ which node
/c/Program Files/nodejs/node
```

此时在命令行输入 `code .` 启动了 vscode, 在 vscode 中的终端中输入 `node -v` 输出的是 `v20.10.0`

```bash
# vscode 中的 integrated terminal
FANG Qi@Helloween MINGW64 /f/projects/i18n-ally (main)
$ node -v
v20.10.0
```

## 额外的情景

在 windows 平台，你正在 debug 一个 vscode 插件，这个插件需要 node 16 版本进行开发，而且这个插件的运行也依赖于 nodejs
但是你不想把 node16 做为你的默认版本，你可以这样做：

1. 在 windows terminal 中启动一个 shell, 切换当前 shell 中 nodejs 版本到 16
2. cd 到项目目录，使用 `code .` 打开，那么这个时候你的 integrated terminal 中的 node 版本就是 16 了
   而且执行 vscode task 中也是这个版本
3. Debug Launch 一个 extensionHost (在开发 vsocde 插件时常用到) 的 vscode 进程，以这个模式启动的 vscode
   没有执行任何 startup scripts, 所以需要你的环境变量 `$PATH` 中有 node ，这个 node 是啥版本，就是你的 vscode 插件运行时的 node 版本。  
   **注意**: 这里说的并不是 vscode 中的 integrated terminal 的 node 版本，而是 vscode 插件运行的 node 版本

## 其他

还有从 wsl 中打开，从一个 wsl vscode 使用打开最近项目中的 windows 上的项目，等等情况。  
通过查看 `$PATH` 环境变量大概就可以知道是怎么解析的了，注意 `PATH` 优先级是从前往后的，所以如果你的 `$PATH` 中有多个 nodejs 的安装路径，那么
第一个 nodejs 的安装路径就是 vscode 中的 nodejs 版本。

## 总结

说了这么多主要就是一个 **startup scripts** 有没有执行的问题，以及**loign shell** vs **non-login shell** 的区别。
