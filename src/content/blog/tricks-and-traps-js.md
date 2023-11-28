---
title: Traps and Tricks of JavaScript or TypeScript
date: 2023-11-21 14:17:00
tags:
  - JavaScript
  - TypeScript
---

### 当你忘记了 break

当你忘记了在 switch case 的 case 里面写 break 的时候，这是一个危险的信号。及时你非常自信地认为如果在某个case throw
一个 error 就没有必要 break ，但是我建议保险起见还是 break 一下，毕竟这不会犯错

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

### finally and return

```js
function fin_ret() {
  try {
    return "done";
  } catch (e) {
    console.log(e);
  } finally {
    console.log("final is logged");
  }
}
```

您猜怎么着，即使在 try 中 return 了，finally 也会执行，这是一个很好的特性，但是如果你不知道的话，
你可能会认为 finally 会在 return 之前执行，这是不对的

### TypeScript try catch and return type

```TypeScript
async function throw_or_return(x: number) {
  //           ^?
  try {
    if (x > 10) {
      throw_if_x_greater_than_12(x);
    }
    return x + "";
  } catch (error) {
    // 函数的返回类型是 Promise<string>
    // 如果移除这一行，返回类型则变成 Promise<string | undefined>
    throw error;
  }
}

function throw_if_x_greater_than_12(x: number) {
  if (x > 12) {
    throw new Error("x cannot be greater than 12");
  }
}
```

如果你想指明某个函数只会抛出错误，显示地标注返回类型为 `never` 即可:

```TypeScript
function definitelyThrows(): never {
  throw new Error("I throws")
}
```

stripe 一个 `T | undefined | null` 中的空值：(with 
[assert functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions))

```TypeScript
export function assertExists<T>(
  v: T | null | undefined,
  message: Error | string = "val does not exist"
): asserts v is T {
  if (v === null || v === undefined) {
    if (message instanceof Error) {
      throw message;
    }
    throw new Error(message);
  }
}
```
