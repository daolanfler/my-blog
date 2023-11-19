# My Blog

## TODO

- [ ] ui index 页面使用 [static endpoints](https://docs.astro.build/en/core-concepts/endpoints/#static-file-endpoints)
      获取页面子路由

## 升级 Astro 3.0

- 图片使用 Sharp , GFW 下，安装有点问题，需要解决。如果是 pnpm (需要手动添加 sharp 依赖，as it's more strict
  as a package manager ) 安装的时候如果在 sharp 的 post install script 的时
  候取消了安装，那么就是安装不成功的，即使你再运行 `pnpm install` 马上就提示成功，实际上还是没有装好的。  
  需要清除缓存然后再安装：

  ```bash
  pnpm store prune && rm -rf node_modules && pnpm i
  ```

  所以注意配置好 `.npmrc` 但是 npm 太 TM 慢了, 还是用 pnpm 吧:

  ```plaintext
  registry=https://registry.npmmirror.com
  disturl=https://registry.npmmirror.com/-/binary/node/
  # node-sass预编译二进制文件下载地址
  sass_binary_site=https://registry.npmmirror.com/-/binary/node-sass
  # sharp预编译共享库, 截止2022-09-20 sharp@0.31.0的预编译共享库并未同步到镜像, 入安装失败可切换到sharp@0.30.7使用
  sharp_libvips_binary_host=https://registry.npmmirror.com/-/binary/sharp-libvips
  python_mirror=https://registry.npmmirror.com/-/binary/python/
  electron_mirror=https://registry.npmmirror.com/-/binary/electron/
  electron_builder_binaries_mirror=https://registry.npmmirror.com/-/binary/electron-builder-binaries/
  # 无特殊配置参考{pkg-name}_binary_host_mirror={mirror}
  canvas_binary_host_mirror=https://registry.npmmirror.com/-/binary/canvas
  node_sqlite3_binary_host_mirror=https://registry.npmmirror.com/-/binary/sqlite3
  better_sqlite3_binary_host_mirror=https://registry.npmmirror.com/-/binary/better-sqlite3
  # canvas_binary_host_mirror=https://npm.taobao.org/mirrors/node-canvas-prebuilt/

  ```

- Maybe I should not use taobao's npm registry, see [this article](https://juejin.cn/post/7062592728621645854)
