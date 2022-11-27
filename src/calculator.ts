let buttons = document.querySelectorAll("button");
console.log(buttons)
let digits = "0123456789";
let operators = "+-*/";
let sciOps = "sqrtroot**2**modpi"
let display = document.querySelector("input#display") as HTMLInputElement | null;
let tempResult = "";
const pi = Math.PI.toFixed(2);
//
//
type stateCalcObj = {
    scientific: boolean,
    sciOp: boolean,
    num1: string | number,
    num2 :string,
    num3: string,
    extraEval: string,
    op1: string,
    op2: string,
    evaluator: string,
    log: string,
}

let calcState: stateCalcObj = {
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
}


//two functions for token calculation

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
    calcState.log += calcState.num1 + calcState.op1 + calcState.num2 + calcState.op2 + calcState.num3 + "=" + "<br>"
}


//calculation function for simple mode
function calcSimple(x: HTMLButtonElement) {
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
        if (state.remote === false){calcState.num1  = evalExp()}
        else if (state.remote === true){remoteCalc().then(res => {display.value = res});calcState.num1 = display.value};
        // calcState.num1 = tokenStackCalculatorSimple(calcState.num1, calcState.op1, calcState.num2, calcState.op2, calcState.num3); 
        calcState.num2 = "";
        calcState.op1 = "";
        writeToLog();
        writeToOpLog();
    }
//outputting result when an operator is pressed after num2
    else if (operators.includes(x.value) && calcState.num2 !== "") {
        writeToLog();
        if (state.remote === false){calcState.num1 = evalExp()}
        else if (state.remote === true){remoteCalc().then(res => {display.value = res}); calcState.num1 = display.value};
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
};


//---------------------------------------------------------------------------------------------------------------------------------


//calc function for scientific mode
function calcScientific(x: HTMLButtonElement) {
    console.log("entered calcScientific");
    console.log(calcState);
//parsing num1
    if (digits.includes(x.value) && calcState.op1 === "") {
        calcState.num1 += x.value;
        console.log("inserting to num1");
    }
//parsin pi to num1
    else if (x.value==="pi" && calcState.op1 === "") {
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
    else if (x.value==="pi" && calcState.op1 !== "" && calcState.op2 === ""){
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
        if (state.remote === false){calcState.num1 = evalExp()}
        else if (state.remote === true){remoteCalc().then(res => {display.value = res}); calcState.num1 = display.value};
        calcState.num2 = "";
        calcState.num3 = "";
        calcState.op1 = "";
        calcState.op2 = "";
        writeToLog();
        writeToOpLog();
    }
//outputting result when operator is pressed after num3
    else if (operators.includes(x.value) && calcState.num3 !== "") {
        writeToLog();
        if (state.remote === false){calcState.num1 = evalExp()}
        else if (state.remote === true){remoteCalc().then(res => {display.value = res}); calcState.num1 = display.value};
        calcState.num2 = "";
        calcState.num3 = "";
        calcState.op2 = "";
        calcState.op1 = x.value;
        writeToLog();
        writeToOpLog();
    }

//entering and exiting sci op mode for op1
    else if (sciOps.includes(calcState.op1) && calcState.num1 !== "" && calcState.num2 === "") {
        calcState.sciOp = true;
        calcState.op1 = x.value;
        sciOpCalc1(calcState.op1, x);
    } 

//entering and exiting sci op mode for op2
else if (sciOps.includes(calcState.op2) && calcState.num2 !== "" && calcState.num3 === "") {
    calcState.sciOp = true;
    calcState.op2 = x.value;
    sciOpCalc2(calcState.op1, x);
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
};


function sciOpCalc1(o: string, x: HTMLButtonElement) {
    console.log("entering sciOpCalc1");
    switch (o) {
        case "sqrt" :{
            console.log("entering sqrt");
            calcState.num1 = Math.sqrt(Number(calcState.num1));
            calcState.sciOp = false;
            break;
        }
        case "root" :{
            console.log("root");
            calcState.op1 = "**(1/";
            console.log(calcState.op1);
            console.log(calcState.num2);
            calcState.sciOp = false;
            break;
        }
        case "mod" :{
            console.log("entering mod");
            calcState.op1 = "%";
            calcState.sciOp = false;
            break;
        }
    }
}


function sciOpCalc2(o: string, x: HTMLButtonElement) {
    switch (o) {
        case "sqrt" :{
            console.log("entering sqrt");
            calcState.num1 = Math.sqrt(Number(calcState.num1));
            calcState.sciOp = false;
            break;
        }
        case "root" :{
            console.log("root");
            calcState.op1 = "**(1/";
            console.log(calcState.op1);
            console.log(calcState.num2);
            calcState.sciOp = false;
            break;
        }
        case "mod" :{
            console.log("entering mod");
            calcState.op1 = "%";
            calcState.sciOp = false;
            break;
        }
    }
}

const remoteCalc = async () => {
    let expression = (calcState.num1 + calcState.op1 + calcState.num2 + calcState.op2 + calcState.num3).replace("**", "^");
    let response = await fetch("https://api.mathjs.org/v4/?expr=" + encodeURIComponent(expression))
    let answer = await response.text();
    return answer;
}


































