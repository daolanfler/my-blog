---
title: Array
date: 2023-12-01 14:38:00
tags:
  - JavaScript
---

众所周知，js 中的 array 并不是真正的数组，而是一种特殊的对象。那么在 js 中，有哪些真正的数组呢？
下面是一些常见的和 array 有关的数据类型：

`Array`
`ArrayBuffer`
`Buffer`
`TypedArray`
`DataView`
`Float32Array` ...

what's the difference between them?

Answer by chatGPT:

Certainly! In the context of Node.js and browser-based JavaScript, let's explore these concepts:

1. **Array:**

   - In JavaScript, an array is a built-in object that stores multiple values in a single variable.
   - It is a dynamic, ordered collection that can hold elements of different data types.

2. **ArrayBuffer:**

   - In both Node.js and browser JavaScript, `ArrayBuffer` is a built-in object representing a fixed-size, raw binary data buffer.
   - It is often used as the underlying storage for TypedArrays.

3. **Buffer (Node.js):**

   - In Node.js, `Buffer` is a built-in module that provides a way to work with binary data directly.
   - It is Node.js specific and is commonly used for tasks like reading from or writing to the file system or network.

4. **TypedArray:**

   - TypedArrays, such as `Uint8Array` or `Float32Array`, are available both in Node.js and browser JavaScript.
   - They provide a view on `ArrayBuffer` and allow for more efficient manipulation of binary data.
   - TypedArrays have a fixed size and are designed to work with specific data types.

5. **DataView:**

   - `DataView` is available in both Node.js and browsers.
   - It provides a flexible way to read and write data of different types at arbitrary byte offsets within an `ArrayBuffer`.
   - It's particularly useful when dealing with complex binary data formats.

6. **Float32Array (TypedArray):**
   - `Float32Array` is a specific TypedArray available in both Node.js and browsers.
   - It represents an array of 32-bit floating-point numbers and is useful for tasks requiring precise control over numeric data.

In summary, these concepts are part of the JavaScript language, and their availability and usage are consistent across both Node.js and browser environments. They provide tools for efficient manipulation of binary data, ranging from simple arrays to more specialized constructs like TypedArrays and DataViews. The usage may vary depending on specific use cases, such as handling network data, file I/O, or processing complex binary formats.
