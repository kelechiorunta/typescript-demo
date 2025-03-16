"use strict";
// Explicit type declaration and assignment
let firstname = "Kelechi";
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
