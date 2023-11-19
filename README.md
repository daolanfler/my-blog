# My Blog

## TODO

- [ ] ui index 页面使用 [static endpoints](https://docs.astro.build/en/core-concepts/endpoints/#static-file-endpoints)
获取页面子路由

## 升级 Astro 3.0 

- 图片使用 Sharp , GFW 下，安装有点问题，需要解决。如果是 pnpm 安装的时候如果在 sharp 的 post install script 的时
候取消了安装，那么就是安装不成功的，即使你再运行 `pnpm install` 马上就提示成功，实际上还是没有装好的。
所以注意配置好 `.npmrc`: 

    ```plaintext

    registry=https://r.npm.taobao.org
    disturl=https://npm.taobao.org/dist
    sass_binary_site=https://npm.taobao.org/mirrors/node-sass
    electron_mirror=https://npm.taobao.org/mirrors/electron/
    ELECTRON_MIRROR=https://cdn.npm.taobao.org/dist/electron/
    puppeteer_download_host=https://npm.taobao.org/mirrors
    chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
    operadriver_cdnurl=https://npm.taobao.org/mirrors/operadriver
    phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs
    selenium_cdnurl=https://npm.taobao.org/mirrors/selenium
    node_inspector_cdnurl=https://npm.taobao.org/mirrors/node-inspector
    sharp_binary_host=https://npm.taobao.org/mirrors/sharp
    sharp_libvips_binary_host=https://npm.taobao.org/mirrors/sharp-libvips

    ```