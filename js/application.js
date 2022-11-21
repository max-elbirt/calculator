let state = {
    light: false,
    opLog: true,
};
//important object
let lightButt = document.querySelector("#lightbulb");
let scientificButt = document.querySelector("#scientific");
let sciDiv = document.querySelector("div.sci_container");
let opLog = document.querySelector("div.op_container");
//event listeners
//DOM load rendering
document.addEventListener("DOMContentLoaded", () => {
    console.log("render initializing");
    render();
});
//light button event
document.querySelector("#lightbulb").addEventListener("click", () => {
    console.log("light button pressed");
    if (state.light === false) {
        lightOn();
        render();
    }
    else {
        lightOff();
        render();
    }
});
//Scientific button event
document.querySelector("button#scientific.button").addEventListener("click", () => {
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
//calc state changing functions
function calcToScientific() {
    calcState = { ...calcState, scientific: true };
    console.log("switched to scientific");
    console.log(calcState);
}
function calcToSimple() {
    calcState = { ...calcState, scientific: false };
    console.log("switched to simple");
    console.log(calcState);
}
//state changing functions
function lightOn() {
    state = { ...arguments, light: true };
}
function lightOff() {
    state = { ...arguments, light: false };
}
//screen changing functions for render
function removeSciDiv() {
    sciDiv.style.display = "none";
}
function appendSciDiv() {
    sciDiv.style.display = "block";
}
//rendering function
function render() {
    console.log("render began");
    if (state.light === true) {
        console.log("turning light on");
        lightButt.className = "lightOn";
        display.className = "lightOn";
        console.log("turning display light on");
    }
    if (state.light === false) {
        console.log("turning light off");
        lightButt.className = "lightOff";
        display.className = "lightOff";
        console.log("turning display light off");
    }
    if (calcState.scientific === true) {
        console.log("intializing scientific mode");
        scientificButt.className = "sciOn";
        appendSciDiv();
    }
    if (calcState.scientific === false) {
        console.log("initializing simple mode");
        scientificButt.className = "sciOff";
        removeSciDiv();
    }
    //needs connection to log button, no css yet
    // if (state.opLog === false) {
    //     console.log("removing op log");
    //     opLog.className = "logOff";
    // }
    // if (state.opLog === true) {
    //     console.log("initializing op log");
    //     opLog.className = "logOn";
}
