let buttons = document.querySelectorAll("button");
let digits = "0123456789";
let operators = "+-*/";
let display = document.querySelector("input#display") as HTMLInputElement | null;

type stateCalcObj = {
    scientific: boolean,
    num1: string,
    num2: string,
    op1: string,
    op2: string,
}

let calcState: stateCalcObj = {
    scientific: false,
    num1: "",
    num2: "",
    op1: "",
    op2: "",
}




function evalExp() {};

function calcSimple() {};

function calcScientific() {};
























































// let num1 = "";
// let num2 = "";
// let operator = null;

// buttons.forEach((button) => {
//     button.addEventListener("click", () => {
//         // if only numbers have been hit so far -----------> num1 +=
//         if (digits.includes(button.value) && operator === null) {
//             num1 += button.value;
//             display.value = num1;        
//         }
        
//         //if an operator key is hit for the first time
//         else if (operators.includes(button.value) && num1 !== "" && num2 === "") {
//             operator = button.value;
//             display.value = num1 + operator;
//         }

//         //if a number is hit when an operator has been chosen ----> num2 +=
//         else if (digits.includes(button.value) && operator !== null) {
//             num2 += button.value;
//             display.value = num1 + operator + num2;
//         }

//         // if "=" key or an operator is hit after num2 has been filled --------> result is calculated
//         else if (button.value === "=" || (operators.includes(button.value) && num2 !== "")) {
//             num1 = eval(num1 + operator + num2);
//             num2 = "";
//             display.value = num1;
//         }

//         //if decimal point key is hit ---------> number turns into float
//         else if (button.value === "decimal") {
//             if (operator === null) {
//                 num1 += ".";
//             }

//             else if (operator !== null && num2 !== ""){
//                 num2 += ".";
//             }
//         }

//         // if "clear" key is hit
//         else if (button.value === "clear") {
//             num1 = "";
//             num2 = "";
//             operator = null;
//             display.value = "0";
//         }
//     })
// })












// function add(num1, num2){
    //     return Number(num1) + Number(num2);
    // }
    
    // function subtract(num1, num2){
    //     return Number(num1) - Number(num2);
    // }
    
    // function multiply(num1, num2){
    //     return Number(num1) * Number(num2);
    // }
    
    // function divide(num1, num2){
    //     return Number(num1) / Number(num2);
    // }
    



// while (true){
//     for (let button of buttons) {
//     button.addEventListener("click", () => {
//         if (button.getAttribute("value") in digits) {
//             num1 = Number(button.getAttribute("value"));
            
//         }
//     });
//     }

//     for (let button of buttons) {
//         button.addEventListener("click", () => {
//             if (button.getAttribute("value") in operators) {
//                 operator = button.getAttribute("value");
//             }
//         });
//         }

//     for (let button of buttons) {
//         button.addEventListener("click", () => {
//             if (button.getAttribute("value") in digits) {
//                 num2 = Number(button.getAttribute("value"));
//             }
//         });
//         }
// }


// for (let button of buttons) {
    //     button.addEventListener("click", () =>{
    //         // First Number
    //         if (digits.includes(button.getAttribute("value")) && num1 === null && operator === null & num2 === null){
    //             num1 = button.getAttribute("value");
    //             document.getElementById("display").setAttribute("value", num1);
    //             console.log(operator)
    //             console.log(num1);
    //         }
    //         else if (operators.includes(button.getAttribute("value")) && num1 !== null && num2 === null){
    //             operator = button.getAttribute("value");
    //             document.getElementById("display").setAttribute("value", num1 + operator);
    //             console.log(operator)
    //             console.log(num1);
    //         }
    //         else if (!operators.includes(button.getAttribute("value")) && num1 !== null && operator === null && num2 === null){
    //             num_digits = button.getAttribute("value");
    //             num1 = num1 + num_digits;
    //             document.getElementById("display").setAttribute("value", num1);
    //             operator = null;
    //             console.log(operator);
    //             console.log(num1);
    //         } 
    
    //         // Second Number
    //         else if (digits.includes(button.getAttribute("value")) && num1 !== null && operator !== null & num2 === null){
    //             num2 = button.getAttribute("value");
    //             document.getElementById("display").setAttribute("value", num1 + operator + num2 );
    //             console.log("num2: " + num2);
    //             console.log("num digits is: " + num_digits);
    //         }
    
    //         else if (digits.includes(button.getAttribute("value")) && num2 !== null){
    //             num_digits = button.getAttribute("value");
    //             num2 = num2 + num_digits;
    //             document.getElementById("display").setAttribute("value", num1 + operator + num2);
    //             console.log(operator);
    //             console.log(num1);
    //             console.log(num_digits);
    //             console.log(num2);
    //         }
    
    //         else if (operators.includes(button.getAttribute("value")) && num2 !== null){
    
    //             // Math Function Calls
    //             if (operator === "+") {
    //                 document.getElementById("display").setAttribute("value", add(num1, num2));
    //                 num1 = add(num1, num2);
    //             } 
    //             else if (operator === "-") {
    //                 document.getElementById("display").setAttribute("value", subtract(num1, num2));
    //                 num1 = subtract(num1, num2);
    //             } 
    //             else if (operator === "*") {
    //                 document.getElementById("display").setAttribute("value", multiply(num1, num2));
    //                 num1 = multiply(num1, num2);
    //             } 
    //             else if (operator === "/") {
    //                 document.getElementById("display").setAttribute("value", divide(num1, num2));
    //                 num1 = divide(num1, num2);
    //             }
    
    //             operator = button.getAttribute("value")
    //             num2 = null
    
    //         }
    
    //         // Math Function Calls
    //         else if (button.getAttribute("Value") === "=" && operator === "+") {
    //             document.getElementById("display").setAttribute("value", add(num1, num2));
    //         } 
    //         else if (button.getAttribute("Value") === "=" && operator === "-") {
    //             document.getElementById("display").setAttribute("value", subtract(num1, num2));
    //         } 
    //         else if (button.getAttribute("Value") === "=" && operator === "*") {
    //             document.getElementById("display").setAttribute("value", multiply(num1, num2));
    //         } 
    //         else if (button.getAttribute("Value") === "=" && operator === "/") {
    //             document.getElementById("display").setAttribute("value", divide(num1, num2));
    //         }
    
    //         // Utilities
    //         else if (button.getAttribute("Value") === "clear"){
    //             num1 = null;
    //             num2 = null;
    //             operator = null;
    //             document.getElementById("display").setAttribute("value", 0);
    //             console.log(operator)
    //             console.log(num1);
    //             console.log(num2);
    //         }
    //     })
    // }