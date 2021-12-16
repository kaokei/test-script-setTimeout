const path = require("path");
const Koa = require("koa");
const app = new Koa();
const static = require("koa-static");

app.use(async (ctx, next) => {
  console.log('enter: ', ctx.path);
  await lazyLoadScript(ctx.path, setTime(ctx.path));
  await static(path.join(__dirname, "public"))(ctx, next);
});

app.listen(3000);

console.log('app.listen(3000);');

function lazyLoadScript(path, time = 3000) {
  return new Promise((resolve, reject) => {
    try {
      // js 文件将被特意延迟 3 秒
      if (/\/js\/test\d+\.js/.test(path)) {
        console.log(`拦截 ${path}，${time} 秒后返回`);
        setTimeout(() => {
          console.log(`响应 ${path}`);
          resolve(true);
        }, time);
      } else {
        resolve(true);
      }
    } catch (err) {
      reject(err);
    }
  });
}

function setTime(path) {
  if (path == "/js/test1.js") {
    return 3 * 1000;
  } else if (path == "/js/test2.js") {
    return 2 * 1000;
  } else {
    return 1 * 1000;
  }
}
