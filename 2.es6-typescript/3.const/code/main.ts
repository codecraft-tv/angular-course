'use strict';


/* // Declaring a const variable
const foo; // SyntaxError: Missing initializer in const declaration
*/


/* // Declaring a const variable
const moo = 1;
moo = 2; // TypeError: `foo` is read-only
*/

/* // Block Scoping
function func() {
    if (true) {
        const tmp = 123;
    }
    console.log(tmp); // Uncaught ReferenceError: tmp is not defined
}
func();
*/


const foo = Object.assign({});
foo.prop = 1;
console.log(foo.prop);