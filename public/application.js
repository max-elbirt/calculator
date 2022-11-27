let state = {
    light: false,
    opLog: false,
    remote: false,
    popup: false,
};
//important object
// CR prefer functions over variables
const lightButt = document.querySelector("#lightbulb");
const scientificButt = document.querySelector("#scientific");
const sciDiv = document.querySelector("div.sci_container");
const opLog = document.querySelector("div.op_container");
const OpLogButt = document.querySelector("button#history.button");
const wrapper = document.querySelector("div.wrapper");
// CR prefer this one
// const getWrapper = () => document.querySelector("div.wrapper") as HTMLElement;
//event listeners
//DOM load rendering
// cr merge the 2 Dom content loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("render initializing");
    render();
});
// CR example for small functions
// function myClick(selector: string, fn: () => void) {
//     (document.querySelector(selector) as HTMLElement).addEventListener('click', fn);
// }
// myClick("#lightbulb", () => {ß
//    // do something
//     render();
// });
// ********* START
// copy for CR about global vars
// function someAction(s: stateObj): stateObj {
//     return  {...state,light: true};
// }
//
//
// document.querySelector("selector").addEventListener("click", () => {
//
//     // new state = action(old state)
//     state  = someAction(state);
//     // render
//     render(state);
// })
// ********* END
//light button event
document.querySelector("#lightbulb").addEventListener("click", () => {
    console.log("light button pressed");
    if (state.light === false) {
        lightOn();
        // cr call render out of the condition
        render();
    }
    else {
        lightOff();
        render();
    }
});
//Scientific button event
document.querySelector("button#scientific.button").addEventListener("click", () => {
    // CR another way to write the same solution:
    // calcState.scientific === false ? calcToScientific() : calcToSimple();
    // render();
    console.log("scientific button pressed");
    if (calcState.scientific === false) {
        calcToScientific();
        render();
    }
    else {
        calcToSimple();
        render();
    }
});
//Clear button event
document.querySelector("button#clear.button").addEventListener("click", () => {
    console.log("clear button pressed");
    clearAll();
    console.log(calcState);
    render();
});
//redo button event
document.querySelector("button#redo.button").addEventListener("click", () => {
    console.log("redoing");
    redoLast();
    console.log("redone");
    console.log(calcState);
});
//history button event
document.querySelector("button#history.button").addEventListener("click", () => {
    if (state.opLog === false) {
        OpLogOn();
        render();
    }
    else {
        OpLogOff();
        render();
    }
});
//remote button event
document.querySelector("button#cloud.button").addEventListener("click", () => {
    if (state.remote === false) {
        console.log("turning on");
        remoteOn();
    }
    else {
        remoteOff();
    }
});
//about button event
document.querySelector("button#about.button").addEventListener("click", () => {
    if (!state.popup) {
        createPopup();
    }
    else {
        removePopup();
    }
});
function createPopup() {
    // CR put at the end of the function to reflect the right state
    state.popup = true;
    const popDiv = document.createElement("div");
    popDiv.className = "popup";
    popDiv.innerHTML = "Max Elbirt<br>V 1.0.0<br>A scientific calculator";
    wrapper.appendChild(popDiv);
}
function removePopup() {
    const popDiv = document.querySelector("div.popup");
    popDiv.remove();
    state.popup = false;
}
//form data received event
//need to implement with render
document.addEventListener("DOMContentLoaded", () => {
    const url = window.location.search;
    if (url) {
        const config = new URLSearchParams(url);
        const body = document.querySelector("body");
        body.style.backgroundColor = config.get("bg-color");
        body.style.fontFamily = config.get("font-family");
        const fonts = config.get("font-family");
        const darkMode = config.get("dark");
        buttons.forEach((button) => {
            button.style.fontFamily = fonts;
        });
        //dark mode switch
        if (darkMode === "dark") {
            document.body.className = "dark";
        }
        else {
            document.body.className = "";
        }
    }
});
//calc state changing functions
// CR every function access to global var should accept the var
function calcToScientific() {
    calcState = { ...calcState, scientific: true };
    console.log("switched to scientific");
    clearAll();
    console.log(calcState);
}
function calcToSimple() {
    calcState = { ...calcState, scientific: false };
    console.log("switched to simple");
    clearAll();
    console.log(calcState);
}
//state changing functions
function lightOn() {
    state = { ...state, light: true };
}
function lightOff() {
    state = { ...state, light: false };
}
function OpLogOn() {
    state = { ...state, opLog: true };
}
function OpLogOff() {
    state = { ...state, opLog: false };
}
function remoteOn() {
    state = { ...state, remote: true };
    console.log(state);
}
function remoteOff() {
    state = { ...state, remote: false };
    console.log(state);
}
//screen changing functions for render
function removeSciDiv() {
    sciDiv.style.visibility = "hidden";
}
function appendSciDiv() {
    sciDiv.style.visibility = "visible";
}
function removeOpLog() {
    opLog.style.visibility = "hidden";
}
function appendOpLog() {
    opLog.style.visibility = "visible";
}
function clearAll() {
    calcState.num1 = "";
    calcState.num2 = "";
    calcState.num3 = "";
    calcState.op1 = "";
    calcState.op2 = "";
    calcState.log = "";
    document.querySelector("div.op_container").innerHTML = "";
}
function writeToOpLog() {
    console.log("log is", calcState.log);
    document.querySelector("div.op_container").innerHTML = calcState.log;
}
function redoLast() {
    console.log("redo last activated");
    if (calcState.num3 !== "") {
        console.log("redoing num3");
        calcState.num3 = calcState.num3.substring(0, calcState.num3.length - 1);
    }
    else if (calcState.num3 === "" && calcState.op2 !== "") {
        console.log("redoing op2");
        calcState.op2 = "";
    }
    else if (calcState.op2 === "" && calcState.num2 !== "") {
        console.log("redoing num2");
        calcState.num2 = calcState.num2.substring(0, calcState.num2.length - 1);
    }
    else if (calcState.num2 === "" && calcState.op1 !== "") {
        console.log("redoing op1");
        calcState.op1 = "";
    }
    else if (calcState.op1 === "" && calcState.num1 !== "") {
        console.log("redoing num1");
        calcState.num1 = String(calcState.num1).substring(0, String(calcState.num1).length - 1);
    }
    render();
}
//rendering function
function render() {
    console.log("render began");
    //color light button
    if (state.light === true) {
        console.log("turning light on");
        lightButt.style.backgroundColor = "#CF649A";
        display.className = "lightOn";
        console.log("turning display light on");
    }
    //remove color from light button
    if (state.light === false) {
        console.log("turning light off");
        lightButt.style.backgroundColor = "";
        display.className = "lightOff";
        console.log("turning display light off");
    }
    //color sci button and open sci div
    if (calcState.scientific === true) {
        console.log("intializing scientific mode");
        scientificButt.style.backgroundColor = "#CF649A";
        appendSciDiv();
    }
    //remove color from sci button and close sci
    if (calcState.scientific === false) {
        console.log("initializing simple mode");
        scientificButt.style.backgroundColor = "";
        removeSciDiv();
    }
    //add color to op button and close opLog
    if (state.opLog === true) {
        console.log("initializing op log");
        OpLogButt.style.backgroundColor = "#CF649A";
        appendOpLog();
    }
    //remove color from op button and cloase opLog
    if (state.opLog === false) {
        console.log("removing op log");
        OpLogButt.style.backgroundColor = "";
        removeOpLog();
    }
    console.log("rendering display");
    //rendering the display continuosly
    display.value = (calcState.num1 + calcState.op1 + calcState.num2 + calcState.op2 + calcState.num3).replace("**", "^");
}
