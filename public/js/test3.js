console.log("test3");

setTimeout(function () {
  console.log("test3 setTimeout");
});

Promise.resolve("test3 Promise").then(function (res) {
  console.log(res);
});
