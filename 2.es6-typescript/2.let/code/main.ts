/* let */
var funcs = [];
for (let i = 0; i < 5; i += 1) {
  funcs.push(function () {
    console.log(i);
  })
}
funcs.forEach(function (func) {
  func()
});