console.log("test1");

setTimeout(function () {
  console.log("test1 setTimeout");
});

Promise.resolve("test1 Promise").then(function (res) {
  console.log(res);
});
