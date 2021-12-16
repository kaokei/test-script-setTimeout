# 测试 script 标签和 setTimeout，Promise 的执行顺序

## 使用方式

```sh
npm install
node index.js
```

## 结论

在不使用 async 和 defer 的情况下，script 是并行加载的。
并不是等待第一个 js 文件返回之后才请求第二个 js 文件。

虽然后面的 js 文件先返回了，但是并不会立即执行，而是要按照 script 的顺序执行。
所以输出结果的顺序一定是：`test1 -> test2 -> test3`

并且经过多次测试没有发现 Promise 靠后执行的情况，所以顺序应该是这样的：`test1 -> test1 Promise -> test2 -> test2 Promise -> test3 -> test3 Promise`

但是 setTimeout 的执行顺序是不固定的，举例来说，`test1 setTimeout`可能出现在`test2`前面，也可能是后面，甚至于在`test3`后面。

总结就是 script 的顺序和 setTimeout 的顺序是不固定的。

## 场景

之所以有这个 demo，是想要实现这样的功能。

现在有两个 js 文件 AB，A 是主要业务文件，B 是提供服务的。比如 B 文件会在全局 window 上挂载一个方法`window.B.sayHello`方法。

A 虽然是依赖 B 的，但是并不是立即调用的 B 的方法，而是在异步事件中调用的。比如是在组件的 onMounted 中调用的该方法。

本来的想法是把 A 文件放在前面加载，B 文件放在后面加载。目前看来果然还是不行的。还是老老实实的把 B 文件放在前面，A 文件放在后面吧。
