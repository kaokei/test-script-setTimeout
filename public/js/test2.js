console.log('test2');

setTimeout(function() {
  console.log('test2 setTimeout');
});

Promise.resolve("test2 Promise").then(function (res) {
  console.log(res);
});
