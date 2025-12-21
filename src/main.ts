import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");

let helloWorld = "Hello";

console.log(helloWorld);

interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Sang",
  age: 69,
};

// spits error out as id was not definied in the interface
// const user2 : User = {
//     name: "wagwan",
//     id: 2,

// }

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const classUser = new UserAccount("Sang", 3);

//Exercise - practising Typescript data type

//boolean
let flag: boolean = false;

//number - in Typescript, float, ints etc are all number
let decimal: number = 69;
let big: bigint = 100n;

//String
let text: string = "testing";
let templateString = `Hello world, my name is ${text} and. I love ${decimal}`;

//Array
let array: number[] = [1, 2, 3];
let arrayString: Array<string> = ["hey", "this", "is"];

//Tuple - array with fixed number of elements, with its types being known
let tuple1: [string, number, number, string];
tuple1 = ["BTS", 8, 9, "BigBang"];
// tuple1 = [8,4,"YO", "hey"]; gives error as it needs to be initialised in the same order as line 61

console.log(tuple1[0].substring(2));
// console.log(tuple1[1].substring(2)) // won't work as tuple1[1] is not a String

//Enum - friendly way of giving friendly names to sets of numeric values
// enum Color {
//     Red,
//     Green,
//     Blue
// }
// let c:Color = Color.Green;

//Unknown/ANYTHING - these values can come from dynamic content - like from user, or accepting all values in API, they can be anything
let anything: unknown = 69;
anything = "Actually, let's make it a string";
anything = true;
//anything will be true as its final value
// you can also do an if condition and pre determine the type of unknown, like

if (anything === "string") {
  const anything2: string = anything;
  //error is givem
  const anything3: number = anything;
}
if (anything === 89) {
  const anything4: number = anything;
  //error again
  const anything5: boolean = anything;
}

//Any - you use this to tell Typescript to not check it. Runs in compiling, but crashes during runtime

// Null nad undefinied

//Never - use this for types of values that never occur. EG -> using for a function that doesn't have an end point

//Object
