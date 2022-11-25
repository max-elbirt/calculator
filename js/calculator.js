let buttons = document.querySelectorAll("button");
console.log(buttons);
let digits = "0123456789";
let operators = "+-*/";
let sciOps = "sqrtroot**2**modpi";
let display = document.querySelector("input#display");
const pi = Math.PI.toFixed(2);
let calcState = {
    scientific: false,
    sciOp: false,
    num1: "",
    num2: "",
    num3: "",
    extraEval: "",
    op1: "",
    op2: "",
    evaluator: "",
    log: "",
};
//two functions for token calculation
function splitInput(n1, o1, n2, o2, n3 = "") {
    const inputStr = n1 + " " + o1 + " " + n2 + " " + o2 + " " + n3;
    const inputLst = inputStr.split(" ");
    return inputLst;
}
function tokenStackCalculatorSimple(n1, o1, n2, o2, n3 = " ") {
    console.log("token stack calc initialising");
    console.log(n1);
    const inputArray = splitInput(n1, o1, n2, o2, n3);
    console.log("input array created", inputArray);
    const ariOptions = {
        '+': function (a, b) { console.log("start addition"); return a + b; },
        '-': function (a, b) { console.log("start subtraction"); return a - b; },
        '*': function (a, b) { console.log("start subtraction"); return a * b; },
        '/': function (a, b) { console.log("start subtraction"); return a / b; },
    };
    let a;
    let b;
    let oper = "";
    let result;
    console.log("starting loop");
    for (let val of inputArray) {
        console.log("loop started");
        if (digits.includes(val[0]) && oper === "") {
            a = Number(val);
            console.log("a entered as:", a);
        }
        else if (operators.includes(val) && a) {
            oper = val;
            console.log("oper entered as:", oper);
        }
        else if (digits.includes(val[0]) && a && oper) {
            b = Number(val);
            console.log("b entered as", b);
            console.log("a=", a, "b=", b, "oper=", oper);
            console.log("calculating");
            result = ariOptions[oper](a, b);
            a = result;
            oper = "";
            b = null;
            console.log("results are:", a, result);
        }
    }
    return result;
}
//button listener, can be made more specific
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log("adding event listeners to buttons");
        if (calcState.scientific === false) {
            calcSimple(button);
        }
        else {
            calcScientific(button);
        }
    });
});
function evalExp() {
    return eval(calcState.num1 + calcState.op1 + calcState.num2 + calcState.op2 + calcState.num3);
}
;
//function inserts operation record into the calcState object under log (utilized later on aswell)
function writeToLog() {
    calcState.log += calcState.num1 + calcState.op1 + calcState.num2 + calcState.op2 + calcState.num3 + calcState.evaluator + "<br>";
}
//calculation function for simple mode
function calcSimple(x) {
    //parsing num1
    if (digits.includes(x.value) && calcState.op1 === "") {
        calcState.num1 += x.value;
        console.log("inserting to num1");
    }
    //parsing op1
    else if (operators.includes(x.value) && calcState.num1 !== "" && calcState.num2 === "") {
        calcState.op1 = x.value;
        console.log("inserting to op1");
    }
    //parsing num2
    else if (digits.includes(x.value) && calcState.op1 !== "" && calcState.op2 === "") {
        calcState.num2 += x.value;
    }
    //outputting result when = is pressed
    else if (x.value === "=") {
        writeToLog();
        console.log("calculating");
        if (state.remote === false) {
            calcState.num1 = evalExp();
        }
        else if (state.remote === true) {
            ;
            (async () => {
                let answer = await remotCalc();
                calcState.num1 = answer;
            })();
        }
        ;
        // calcState.num1 = tokenStackCalculatorSimple(calcState.num1, calcState.op1, calcState.num2, calcState.op2, calcState.num3); 
        calcState.num2 = "";
        calcState.op1 = "";
        writeToLog();
        writeToOpLog();
    }
    //outputting result when an operator is pressed after num2
    else if (operators.includes(x.value) && calcState.num2 !== "") {
        calcState.evaluator = x.value;
        writeToLog();
        console.log("calculating result so far");
        if (state.remote === false) {
            calcState.num1 = evalExp();
        }
        else if (state.remote === true) {
            calcRemote();
        }
        ;
        // calcState.num1 = String(tokenStackCalculatorSimple(calcState.num1, calcState.op1, calcState.num2, calcState.op2, calcState.num3));
        calcState.num2 = "";
        calcState.op1 = x.value;
        writeToLog();
        writeToOpLog();
    }
    //add decimal to first number
    else if (x.value === "decimal" && calcState.num2 === "" && String(calcState.num1).indexOf(".") === -1) {
        calcState.num1 += ".";
    }
    //add decimal to second number
    else if (x.value === "decimal" && calcState.num2 !== "" && calcState.num2.indexOf(".") === -1) {
        calcState.num2 += ".";
    }
    render();
}
;
//calc function for scientific mode
function calcScientific(x) {
    console.log("entered calcScientific");
    console.log(calcState);
    //parsing num1
    if (digits.includes(x.value) && calcState.op1 === "") {
        calcState.num1 += x.value;
        console.log("inserting to num1");
    }
    //parsin pi to num1
    else if (x.value === "pi" && calcState.op1 === "") {
        calcState.num1 = String(pi);
    }
    //parsing op1
    else if (operators.includes(x.value) && calcState.num1 !== "" && calcState.num2 === "") {
        calcState.op1 = x.value;
        console.log("inserting to op1");
    }
    //parsing num2
    else if (digits.includes(x.value) && calcState.op1 !== "" && calcState.op2 === "") {
        calcState.num2 += x.value;
        console.log("inserting to num2");
    }
    //parsing pi to num2 
    else if (x.value === "pi" && calcState.op1 !== "" && calcState.op2 === "") {
        calcState.num2 = String(pi);
    }
    //parsing op2
    else if (operators.includes(x.value) && calcState.num2 !== "" && calcState.num3 === "") {
        calcState.op2 = x.value;
        console.log("inserting to op2");
    }
    //parsing num3
    else if (digits.includes(x.value) && calcState.op2 !== "") {
        calcState.num3 += x.value;
        console.log("inserting to num3");
    }
    //parsing pi to num3
    else if (x.value === "pi" && calcState.op2 !== "") {
        calcState.num3 += x.value;
    }
    //outputting result when = is pressed
    else if (x.value === "=") {
        writeToLog();
        console.log("calculating");
        calcState.num1 = evalExp();
        calcState.num2 = "";
        calcState.num3 = "";
        calcState.op1 = "";
        calcState.op2 = "";
        writeToOpLog();
    }
    //outputting result when operator is pressed after num3
    else if (operators.includes(x.value) && calcState.num3 !== "") {
        writeToLog();
        console.log("calculating result after num3");
        calcState.num1 = evalExp();
        calcState.num2 = "";
        calcState.num3 = "";
        calcState.op2 = "";
        calcState.op1 = x.value;
        writeToOpLog();
    }
    //entering and exiting sci op mode
    else if (sciOps.includes(calcState.op1) && calcState.num1 !== "" && calcState.num2 === "") {
        calcState.sciOp = true;
        calcState.op1 = x.value;
        sciOpCalc1(calcState.op1, x);
    }
    //add decimal to first number
    else if (x.value === "decimal" && calcState.num2 === "" && String(calcState.num1).indexOf(".") === -1) {
        calcState.num1 += ".";
    }
    //add decimal to second number
    else if (x.value === "decimal" && calcState.num2 !== "" && calcState.num2.indexOf(".") === -1) {
        calcState.num2 += ".";
    }
    //add decimal to third number
    else if (x.value === "decimal" && calcState.num3 !== "" && calcState.num3.indexOf(".") === -1) {
        calcState.num3 += ".";
    }
    render();
}
;
function sciOpCalc1(o, x) {
    console.log("entering sciOpCalc1");
    switch (o) {
        case "^2": {
            console.log("entering square");
            calcState.num1 = Math.pow(Number(calcState.num1), 2);
            console.log("exiting SciOpmode");
            calcState.sciOp = false;
            break;
        }
        case "sqrt": {
            console.log("entering sqrt");
            calcState.num1 = Math.sqrt(Number(calcState.num1));
            calcState.sciOp = false;
            break;
        }
        case "root": {
            console.log("root");
            calcState.op1 = "**(1/";
            console.log(calcState.op1);
            console.log(calcState.num2);
            calcState.sciOp = false;
            break;
        }
        case "mod": {
            console.log("entering mod");
            calcState.op1 = "%";
            calcState.sciOp = false;
            break;
        }
    }
}
function sciOpCalc2(o, x) {
    console.log("entering sciOpCalc1");
    switch (o) {
        case "^2": {
            console.log("entering square");
            calcState.num1 = Math.pow(Number(calcState.num1), 2);
            console.log("exiting SciOpmode");
            calcState.sciOp = false;
            break;
        }
        case "sqrt": {
            console.log("entering sqrt");
            calcState.num1 = Math.sqrt(Number(calcState.num1));
            calcState.sciOp = false;
            break;
        }
        case "root": {
            console.log("root");
            calcState.op1 = "**(1/";
            console.log(calcState.op1);
            console.log(calcState.num2);
            calcState.sciOp = false;
            break;
        }
        case "mod": {
            console.log("entering mod");
            calcState.op1 = "%";
            calcState.sciOp = false;
            break;
        }
    }
}
const remotCalc = async () => {
    console.log("calc remote started");
    const expression = calcState.num1 + calcState.op1 + calcState.num2 + calcState.op2 + calcState.num3;
    const response = await fetch("https://api.mathjs.org/v4/?expr=" + encodeURIComponent(expression));
    const answer = await response.text();
    return answer;
};
