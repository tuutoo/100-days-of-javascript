let colorOne = document.getElementById("color-a");
let colorTwo = document.getElementById("color-b");
let currentDirection = 'to bottom';
let outputCode = document.getElementById("code");

function setDirection(value, _this) {
  let direcrtions = document.querySelectorAll(".buttons button");
  for (let i of direcrtions) {
    i.classList.remove("active");
  }
  _this.classList.add("active");
  currentDirection = value;
}

function generateCode() {
  outputCode.value = `background-image: linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
  document.getElementsByTagName("BODY")[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
}

function copyText() {
  const textToCopy = outputCode.value;
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert("Gradient Copied!");
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
    });
}

generateCode();