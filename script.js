const initialWidth = 16;
const gridContainer = document.querySelector('.grid-container');
document.addEventListener("DOMContentLoaded", initializeGrid(initialWidth));

let mode = "pen";
const rainbowButton = document.querySelector("#rainbow-button");
rainbowButton.addEventListener("click", () => mode = "rainbow");
const blackButton = document.querySelector("#black-button");
blackButton.addEventListener("click",() => mode = "pen");
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", reset);

function initializeGrid(width){
  gridContainer.style.gridTemplateColumns = `Repeat(${width},1fr)`;
  //create all the squares
  for(i = 1; i <= width**2; i++){
    let square = document.createElement("div");
    square.classList.add("grid-square")
    gridContainer.appendChild(square);
  }
  //add listeners to all squares. change color by changing class.
  let gridSquares = document.querySelectorAll(".grid-square");
  gridSquares.forEach((square) => {
    square.addEventListener("mouseover", () => {
      if(mode === "pen"){
        square.style.backgroundColor = "black";
      }else if(mode ==="rainbow"){
        square.style.backgroundColor = randomizeRGBValue();
      }
    });
  });
}

function randomizeRGBValue(){
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`
}

function reset(){
  let gridSquares = document.querySelectorAll(".grid-square");
  gridSquares.forEach( square => square.classList.remove("touched-square"));
  let newWidth = Number(prompt("Enter how many squares (max 100) you want per side:"));
  //check for proper input under 100
  while(isNaN(newWidth) || newWidth > 100){
    newWidth = prompt("Please enter a proper number up to 100.");
  }
  cleargrid();
  initializeGrid(newWidth);
}

function cleargrid(){
  while(gridContainer.firstChild){
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

