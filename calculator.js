let buttons = document.getElementsByTagName("button");

let num1 = null;
let num2 = null;
let num_digits = null;
let operator = null;

let digits = "0123456789"
let operators = "+-*/"

function add(num1, num2){
    return Number(num1) + Number(num2);
}

function subtract(num1, num2){
    return Number(num1) - Number(num2);
}

function multiply(num1, num2){
    return Number(num1) * Number(num2);
}

function divide(num1, num2){
    return Number(num1) / Number(num2);
}

for (let button of buttons) {
    button.addEventListener("click", () =>{
        // First Number
        if (digits.includes(button.getAttribute("value")) && num1 === null && operator === null & num2 === null){
            num1 = button.getAttribute("value");
            document.getElementById("display").setAttribute("value", num1);
            console.log(operator)
            console.log(num1);
        }
        else if (operators.includes(button.getAttribute("value")) && num1 !== null && num2 === null){
            operator = button.getAttribute("value");
            document.getElementById("display").setAttribute("value", num1 + operator);
            console.log(operator)
            console.log(num1);
        }
        else if (!operators.includes(button.getAttribute("value")) && num1 !== null && operator === null && num2 === null){
            num_digits = button.getAttribute("value");
            num1 = num1 + num_digits;
            document.getElementById("display").setAttribute("value", num1);
            operator = null;
            console.log(operator);
            console.log(num1);
        } 

        // Second Number
        else if (digits.includes(button.getAttribute("value")) && num1 !== null && operator !== null & num2 === null){
            num2 = button.getAttribute("value");
            document.getElementById("display").setAttribute("value", num1 + operator + num2 );
            console.log("num2: " + num2);
            console.log("num digits is: " + num_digits);
        }

        else if (digits.includes(button.getAttribute("value"))){
            num_digits = button.getAttribute("value");
            num2 = num2 + num_digits;
            document.getElementById("display").setAttribute("value", num1 + operator + num2);
            console.log(operator);
            console.log(num1);
            console.log(num_digits);
            console.log(num2);
        }

        // Math Function Calls
        else if (button.getAttribute("Value") === "=" && operator === "+") {
            document.getElementById("display").setAttribute("value", add(num1, num2));
        } 
        else if (button.getAttribute("Value") === "=" && operator === "-") {
            document.getElementById("display").setAttribute("value", subtract(num1, num2));
        } 
        else if (button.getAttribute("Value") === "=" && operator === "*") {
            document.getElementById("display").setAttribute("value", multiply(num1, num2));
        } 
        else if (button.getAttribute("Value") === "=" && operator === "/") {
            document.getElementById("display").setAttribute("value", divide(num1, num2));
        }

        // Utilities
        else if (button.getAttribute("Value") === "clear"){
            num1 = null;
            num2 = null;
            operator = null;
            document.getElementById("display").setAttribute("value", 0);
            console.log(operator)
            console.log(num1);
            console.log(num2);
        }
    })
}








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


