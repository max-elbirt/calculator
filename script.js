


const infoAlert = "Max Elbirt\n"+"Verson 0.1\n"+"A scientific calculator\n";

const info = document.querySelector("#about");
info.onclick = () => {alert(infoAlert)};

const buttons1 = document.getElementsByTagName("button");

for (let button of buttons1) {
  button.addEventListener("click", () => {alert(button.getAttribute("value"))});
}