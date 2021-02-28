'use strict';

let array = [10, 20, 30];

console.log('for-in');
for (let index in array) {
  console.log(typeof(index));
}

console.log('for-of');
for (let value of array) {
  console.log(value);
}
