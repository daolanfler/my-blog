---
title: Unreasonable js
date: 2023-11-21 14:17:00
tags:
  - javascript
---

当你忘记了在 switch case 的 case 里面写 break 的时候，这是一个危险的信号。及时你非常自信地认为如果在某个case throw 一个 error 就没有必要 break ，但是我建议保险起见还是 break 一下，毕竟这不会犯错

```js
let word = "theDoors";

switch (word) {
  case "theDoors": {
    if (word === "random") {
      console.log("impossible");
    }
  }
  case "random": {
    console.log("I don't expect this to happen");
  }
  default: {
    console.log("here goes the default");
  }
}
```

以上的错误示例会输出：

```plaintext
I don't expect this to happen
here goes the default
```
我能理解没写 break 会逃逸到 default, 但是我无法理解为什么会连 random 分支也执行
