'use strict';

// Object Destructuring
const obj1 = {first: 'Asim', last: 'Hussain', age: 39};

function getObj() {
  return obj1;
}

const {first, last} = getObj();

console.log(first);
console.log(last);

// Array Destructuring
const arr = ['a', 'b'];
const [x, y] = arr;
console.log(x);
console.log(y);

// Function Parameter Destructuring
function func({x = 1}) {
  console.log(x);
}
func({});

