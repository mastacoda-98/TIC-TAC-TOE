const start = document.getElementById("start");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const info = document.getElementById("status");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let mark = "X";

function Player(name) {
  this.name = name;
  this.score = 0;
  this.addScore = function () {
    this.score += 1;
  };
}
function Board() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}
function Game() {
  this.board = Board();
  if (player1.value === "") {
    player1.value = "Player 1";
  }
  if (player2.value === "") {
    player2.value = "Player 2";
  }
  this.player1 = new Player(player1.value);
  this.player2 = new Player(player2.value);
  this.currentPlayer = this.player1;
  this.prev = null;
}
function check(board, sign) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] !== sign) {
        break;
      }
      if (j === 2) {
        return true;
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[j][i] !== sign) {
        break;
      }
      if (j === 2) {
        return true;
      }
    }
  }
  if (board[0][0] !== "") {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
  }
  if (board[0][2] !== "") {
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }
  }
  return false;
}

let game = new Game();

start.addEventListener("click", function (e) {
  e.preventDefault();
  game = new Game();
  score1.innerText = "Score : 0";
  score2.innerText = "Score : 0";
  if (player1.value === "") {
    player1.value = "Player 1";
  }
  info.innerText = `${player1.value} turn...`;
});

const grid = document.getElementById("cells");
grid.addEventListener("click", function (e) {
  const cell = e.target;
  const temp = game.currentPlayer;
  if (cell.innerText === "") {
    cell.innerText = mark;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    game.board[row][col] = mark;
    mark = mark === "X" ? "O" : "X";
    game.currentPlayer =
      game.currentPlayer === game.player1 ? game.player2 : game.player1;
    info.innerText = `${game.currentPlayer.name} turn...`;
  }
  if (check(game.board, mark === "X" ? "O" : "X")) {
    temp.addScore();
    if (temp === game.player1) {
      score1.innerText = `Score : ${temp.score}`;
    } else {
      score2.innerText = `Score : ${temp.score}`;
    }
    mark = "X";
    game.currentPlayer =
      game.currentPlayer === game.player1 ? game.player2 : game.player1;
    info.innerText = `${temp.name} wins!`;
    grid.style.pointerEvents = "none";
    setTimeout(() => {
      info.innerText = `${player1.value} turn...`;
      grid.style.pointerEvents = "auto";
      game.board = Board();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cell = document.querySelector(
            `[data-row="${i}"][data-col="${j}"]`
          );
          cell.innerText = "";
        }
      }
      mark = "X";
    }, 2000);
  }
});
