const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-button");
const newGameBtn = document.getElementById("new-button");
const msgContainer = document.getElementById("msg-container");
const msg = document.getElementById("msg");
const xScoreEl = document.getElementById("x-score");
const oScoreEl = document.getElementById("o-score");
const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const gameContainer = document.getElementById("game-container");

let turn = "X";
let isGameOver = false;
let xScore = 0;
let oScore = 0;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

startBtn.addEventListener("click", () => {
  welcomeScreen.classList.add("hide");
  gameContainer.classList.remove("hide");
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent === "" && !isGameOver) {
      box.textContent = turn;
      checkWinner();
      turn = turn === "X" ? "O" : "X";
    }
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a,b,c] = pattern;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[b].textContent === boxes[c].textContent
    ) {
      showWinner(boxes[a].textContent, pattern);
      return;
    }
  }

  if ([...boxes].every(box => box.textContent !== "") && !isGameOver) {
    showDraw();
  }
};

const showWinner = (winner, pattern) => {
  isGameOver = true;
  msg.textContent = `Congratulations 🏆 Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  pattern.forEach(index => boxes[index].classList.add("win"));

  if (winner === "X") {
    xScore++;
    xScoreEl.textContent = xScore;
  } else {
    oScore++;
    oScoreEl.textContent = oScore;
  }
};

const showDraw = () => {
  isGameOver = true;
  msg.textContent = "It's a Draw!";
  msgContainer.classList.remove("hide");
};

const resetGame = () => {
  isGameOver = false;
  turn = "X";
  msgContainer.classList.add("hide");
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.remove("win");
  });
};

const newGame = () => {
  xScore = 0;
  oScore = 0;
  xScoreEl.textContent = "0";
  oScoreEl.textContent = "0";
  resetGame();
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);
