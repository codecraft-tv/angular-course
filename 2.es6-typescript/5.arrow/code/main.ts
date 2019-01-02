'use strict';

setTimeout(() => {
    console.log("setTimeout called!")
}, 1000);

setTimeout(() => console.log("setTimeout called!"), 1000);

let add = (a,b) => a + b;
console.log(add(1,2));

let obj = {
	name: "Asim",
	sayLater: function() {
		setTimeout(() => console.log(`${this.name}`), 1000)
	}
};
obj.sayLater();