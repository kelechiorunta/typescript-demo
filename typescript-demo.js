"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Explicit type declaration and assignment
let printname = "Kelechi";
// When type declaration is not explicitly declared, use 
// unknown as the type assignment rather than any type a safer alternative.
let v = "Hello";
v = 1;
v = { anyNo: () => {
        console.log("I am anything");
    } };
// Use of as is known as casting
if (typeof v != "object" || typeof v != null) {
    v.anyNo();
}
// Undefined and null type checking
let y = undefined;
let z = null;
// Arrays type checking
const names = [];
names.push("Dylan"); // no error
// Readonly property does not allow arrays to be modified
const names_only = ["Dylan"];
// names_only.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.
// try removing the readonly modifier and see if it works?
let array = [1, 2, 3];
let onlynumber = array[0];
// A tuple is a typed array with a pre-defined length and types for each index.
// Tuples are great because they allow each element in the array to be a known type of value.
// To define a tuple, specify the type of each element in the array:
// define our tuple
let ourTuple;
// initialize correctly
ourTuple = [5, false, 'Coding God was here'];
// If you have ever used React before you have worked with tuples more than likely.
// useState returns a tuple of the value and a setter function.
// const [firstName, setFirstName] = useState('Dylan') is a common example.
// Because of the structure we know our first value in our list will be a certain value type in this case a string and the second value a function.
const namedArray = ["hello", true];
const [a, b] = namedArray;
// Type checking for objects
const car = {
    type: "car",
    name: "Ford",
    invogue: true
};
class Car {
    constructor(brand, model, plateNumber) {
        this.brand = brand;
        this.model = model;
        this.plateNumber = plateNumber;
        this.name = brand + model + plateNumber;
    }
}
let ford = new Car("AA", "Ford", "443");
console.log(ford);
function getCountries(p) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const response = yield fetch(p, options);
            const result = yield response.json();
            return result === null || result === void 0 ? void 0 : result.users;
        }
        catch (err) {
            throw err;
        }
    });
}
function getname() {
    return __awaiter(this, void 0, void 0, function* () {
        return "America";
    });
}
getCountries('https://dummyjson.com/users')
    .then(users => console.log(users))
    .catch(err => console.error(err));
