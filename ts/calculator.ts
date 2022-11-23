let buttons = document.querySelectorAll("button");
let digits = "0123456789";
let operators = "+-*/";
let display = document.querySelector("input#display") as HTMLInputElement | null;

type stateCalcObj = {
    scientific: boolean,
    num1: string | number,
    num2: string,
    num3: string,
    op1: string,
    op2: string,
    evaluator: string,
    log: string,
}

let calcState: stateCalcObj = {
    scientific: false,
    num1: "",
    num2: "",
    num3: "",
    op1: "",
    op2: "",
    evaluator: "",
    log: "",
}


function splitInput(n1: string | number, o1: string, n2: string, o2: string, n3: string = "") {

    const inputStr: string = n1+ " " + o1 + " " + n2 + " " + o2 + " " + n3 ;
    const inputLst: (string)[] = inputStr.split(" ");
    return inputLst;
}

function tokenStackCalculatorSimple(n1: string | number, o1: string, n2: string, o2: string, n3: string = " "){
    console.log("token stack calc initialising");
    console.log(n1);
    const inputArray = splitInput(n1, o1, n2, o2, n3);
    console.log("input array created", inputArray);
    const ariOptions = {
        '+' : function(a,b){console.log("start addition"); return a + b},
        '-' : function(a,b){console.log("start subtraction"); return a - b},
        '*' : function(a,b){console.log("start subtraction"); return a * b},
        '/' : function(a,b){console.log("start subtraction"); return a / b},
    }

    let a: number;
    let b: number;
    let oper: string = "";
    let result: number;
    console.log("starting loop");

    for (let val of inputArray){
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
            result = ariOptions[oper] (a,b);
            a = result;
            oper = "";
            b = null;
            console.log("results are:", a, result);
        }
    }

    return result;
}




    




//button listener, can be made more specific
buttons.forEach((button: HTMLButtonElement) => {
    button.addEventListener("click", () => {
        console.log("adding event listeners to buttons");
        if (calcState.scientific === false) {
            calcSimple(button);
        }
        else {
            calcScientific(button);
        }
    })
    })




function evalExp() {
    return eval(calcState.num1 + calcState.op1 + calcState.num2 + calcState.op2 + calcState.num3);
};
//function inserts operation record into the calcState object under log (utilized later on aswell)
function writeToLog() {
    calcState.log += calcState.num1 + calcState.op1 + calcState.num2 + calcState.op2 + calcState.num3 + calcState.evaluator + "<br>"
}



//can change conditional arguments to pars functions
//calculation function for simple mode
function calcSimple(x: HTMLButtonElement) {
    console.log("entered calcSimple");
    console.log(calcState);
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
    else if (digits.includes(x.value) && calcState.op1 !== "") {
        calcState.num2 += x.value;
        console.log("inserting to num2");
    }
//outputting result when = is pressed
    else if (x.value === "=") {
        calcState.evaluator = x.value;
        writeToLog();
        console.log("calculating");
        //calcState.num1 = evalExp();
        calcState.num1 = tokenStackCalculatorSimple(calcState.num1, calcState.op1, calcState.num2, calcState.op2, calcState.num3); 
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
        //calcState.num1 = evalExp();
        calcState.num1 = String(tokenStackCalculatorSimple(calcState.num1, calcState.op1, calcState.num2, calcState.op2, calcState.num3));
        calcState.num2 = "";
        calcState.op1 = x.value;
        writeToLog();
        writeToOpLog();
    }
//add decimal to first number
    else if (x.value === "decimal" && calcState.num2 === "" && calcState.num1.indexOf(".") === -1) {
        calcState.num1 += ".";
    }
//add decimal to second number
    else if (x.value === "decimal" && calcState.num2 !== "" && calcState.num2.indexOf(".") === -1) {
        calcState.num2 += ".";
    }

    render();
};




//calc function for scientific mode
function calcScientific(x: HTMLButtonElement) {
    console.log("entered calcScientific");
    console.log(calcState);
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
        console.log("inserting to num2");
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
//add decimal to first number
    else if (x.value === "decimal" && calcState.num2 === "" && calcState.num1.indexOf(".") === -1) {
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
};











































