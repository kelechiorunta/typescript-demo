// Explicit type declaration and assignment
let firstname: string = "Kelechi";

// When type declaration is not explicitly declared, use 
// unknown as the type assignment rather than any type a safer alternative.
let v: unknown = "Hello";
v = 1;
v =  { anyNo: () => {
    console.log("I am anything")
}} as { anyNo:() => void}
// Use of as is known as casting
if (typeof v != "object" || typeof v != null){
    (v as {anyNo: Function}).anyNo()
}

// Undefined and null type checking
let y: undefined = undefined;
let z: null = null;

// Arrays type checking
const names: string[] = [];
names.push("Dylan"); // no error

// Readonly property does not allow arrays to be modified
const names_only: readonly string[] = ["Dylan"];
// names_only.push("Jack"); // Error: Property 'push' does not exist on type 'readonly string[]'.
// try removing the readonly modifier and see if it works?

let array  = [1, 2, 3]
let onlynumber: number = array[0];


// A tuple is a typed array with a pre-defined length and types for each index.
// Tuples are great because they allow each element in the array to be a known type of value.
// To define a tuple, specify the type of each element in the array:
// define our tuple
let ourTuple: [number, boolean, string];

// initialize correctly
ourTuple = [5, false, 'Coding God was here'];

// If you have ever used React before you have worked with tuples more than likely.
// useState returns a tuple of the value and a setter function.
// const [firstName, setFirstName] = useState('Dylan') is a common example.
// Because of the structure we know our first value in our list will be a certain value type in this case a string and the second value a function.

const namedArray: [x: string, y: boolean] = ["hello", true];
const [a, b] = namedArray;