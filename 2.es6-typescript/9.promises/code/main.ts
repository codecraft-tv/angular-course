'use strict';

// Via callbacks
/*
 function doAsyncTask(cb) {
 setTimeout(() => {
 console.log("Async Task Calling Callback");
 cb();
 }, 1000);
 }
 doAsyncTask(() => console.log("Callback Called"));
 */



// Via Promise
let error = false;
function doAsyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject('error');
      } else {
        resolve('done');
      }
    }, 1000);
  });
}

doAsyncTask().then(
    (val) => console.log(val),
    (err) => console.error(err)
);

// Immediately Resolved Promise
let promise = Promise.resolve('done');
promise.then((val) => console.log(val)); // 'done'

// Handling Errors
Promise.resolve('done')
    .then((val) => {throw new Error("fail")})
    .then((val) => console.log(val))
    .catch((err) => console.error(err));