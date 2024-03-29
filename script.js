// Html elements
const board=document.getElementById ("board");
const scoreBoard=document.getElementById ("scoreBoard");
const startButton=document.getElementById ("start");
const gameOverSign=document.getElementById ("gameOver");

// Game settings

const boardSize=10;
const gameSpeed=100;
const squareTypes={
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2,
};
const directions={
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,
};

// Game Variables

let snake;
let score;
let direction;
let boardSquare;
let snakeSquare;
let emptySquare;
let moveInterval;

const drawSnake = () => {
snake.forEach(square => drawSquare(square, "snakeSquare"));
}

// Rellena cada cuadrado del tablero
// @params 
// square: posicion del cuadrado,
// type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare)

const drawSquare = (square,type) => {
  const [ row, column ] = square.split("");
  boardSquare[row][column] = squareTypes[type];
  const squareElement = document.getElementById(square);
  squareElement.setAttribute("class", `square ${type}`);

  if (type === "emptySquare"){

    emptySquare.push(square);

  } else {

   if (emptySquare.indexOf(square !== -1)){

        emptySquare.splice(emptySquare.indexOf(square), 1);
    }
  } 

} 

const moveSnake= () => {
  const newSquare = String(
  Number(snake[snake.length -1]) + directions [direction]).padStart(2, "0");
  const [row,column] = newSquare.split ("");

  if( newSquare < 0 ||
      newSquare > boardSize * boardSize || (direction === "ArrowRight" && column == 0) || 
      (direction === "ArrowLeft" && column == 9 ||
      boardSquare[row][column] === squareTypes.snakeSquare) )
     { gameOver();

  } else {
   snake.push(newSquare); 
      if(boardSquare[row][column] === squareTypes.foodSquare){
        addFood();
     } else {
        const emptySquare = snake.shift();
        drawSquare(emptySquare,"emptySquare");
        }
        drawSnake();
    }

}

const addFood = () => {
  score ++;
  updateScore();
  createRandomFood();
}
const gameOver = () => {
  gameOverSign.style.display = "block";
  clearInterval(moveInterval)
  startButton.disabled = false;
}
const setDirection = newDirection => {

  direction= newDirection;

}

const diretionEvent = key => {
  switch (key.code){
    case "ArrowUp":
      direction!= "ArrowDown" && setDirection (key.code)
      break;

    case "ArrowDown":
        direction!= "ArrowUp" && setDirection (key.code)
      break;

    case "ArrowRight":
          direction!= "ArrowLeft" && setDirection (key.code)
      break;
        
    case "ArrowLeft":
      direction!= "ArrowLeft" && setDirection (key.code)
      break;

  }

}
const createRandomFood = () => {
  const randomEmptySquare = emptySquare[Math.floor(Math.random() * emptySquare.length)];
  drawSquare(randomEmptySquare, "foodSquare");
}
const updateScore = () => {
  scoreBoard.innerText = score;
}


const createBoard=() => {
    boardSquare.forEach( (row, rowIndex) => {
    row.forEach( (column, columnndex) => {
            const squareValue = `${rowIndex}${columnndex}`;
            const squareElement = document.createElement("div");
            squareElement.setAttribute("class", "square emptySquare");
            squareElement.setAttribute("id", squareValue);
            board.appendChild(squareElement);
            emptySquare.push(squareValue);
     })   
    })        
}
const setGame=() => {
     snake= ["00", "01", "02", "03"];
     score= snake.length;
     direction= "ArrowRight";
     boardSquare= Array.from(Array(boardSize), () => new Array (boardSize).fill(squareTypes.emptySquare));
     
     console.log(boardSquare);
     board.innerHTML= "";
     emptySquare = [];
     createBoard();

}  

const startGame=() => {
  setGame();
  gameOverSign.style.display= "none";
  startButton.disabled = true;  
  drawSnake();
  updateScore();
  createRandomFood();
  document.addEventListener("keydown", diretionEvent);
  moveInterval= setInterval(() => moveSnake(), gameSpeed);
}

startButton.addEventListener("click", startGame);