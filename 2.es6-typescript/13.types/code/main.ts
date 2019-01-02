"use strict";

// Core
let decimal: number = 6;
let done: boolean = false;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// Function
let fun: Function = () => console.log("Hello");
function returnNumber(): number {
  return 1;
}

// Void
function returnNothing(): void {
  console.log("Moo");
}

// Enum
enum Direction {
  Up,
  Down,
  Left,
  Right
}
let go: Direction;
go = Direction.Up;


// Class
class Person1 {
}
let person: Person1;
let people: Person1[];

// Any
let notsure: any = 1;
notsure = "hello"; // This is fine since we don't do type checking with any

// Type Assertion
let value: any = "Asim Hussain";
let len: number = (<string>value).length;


// Generics
class Audio1 {
}
class Video {
}

class Post<T> {
  content: T;
}

let audioPost: Post<Audio1>;
let videoPost: Post<Video>;