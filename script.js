"use strict";

//JS varijable

let player1 = {
  symbol: "",
  number: null,
  score: 0,
};
let player2 = {
  symbol: "",
  number: null,
  score: 0,
};

let buttons = [];
let turn = player1;

let gameBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let winner = null;

//DOM varijable

const container = document.getElementById("container");
const scoreDiv = document.getElementById("score");

//Event listeneri

document.getElementById("select-symbol").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  console.log("provjera");

  setPlayers(e.target.innerHTML);
  createButtons();
});

container.addEventListener("click", (e) => {
  e.preventDefault();

  //Handle za klikanje van granica buttona, u granici containera
  if (buttons.indexOf(e.target) === -1) {
    return;
  }

  onButtonClicked(e.target);
});

//FUNKCIJE

function onButtonClicked(button) {
  button.textContent = turn.symbol;
  button.disabled = true;

  const xyPosition = position(buttons.indexOf(button));

  if (turn === player1) {
    gameBoard[xyPosition[0]][xyPosition[1]] = player1.number;

    turn = player2;
  } else {
    gameBoard[xyPosition[0]][xyPosition[1]] = player2.number;

    turn = player1;
  }

  winner = checkWinner(gameBoard);

  console.log(gameBoard);

  if (winner) {
    console.log(winner);
    setWinner(winner);

    setTimeout(() => {
      createButtons();
    }, 2000);
  }

  function position(number) {
    const row = Math.floor(number / 3);
    const col = number % 3;
    return [row, col];
  }

  function setWinner(winner) {
    if (winner === player1.number) {
      console.log(winner);
      player1.score = player1.score + 1;
      scorePar.innerHTML = `${player1.symbol} | ${player1.score} : ${player2.score} |
       ${player2.symbol}`;
      winner = null;
      gameBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
    }
    if (winner === player2.number) {
      player2.score = player2.score + 1;
      scorePar.innerHTML = `${player1.symbol} | ${player1.score} : ${player2.score} | ${player2.symbol}`;
      winner = null;
      gameBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
    }
  }
}

function createButtons() {
  container.innerHTML = "";
  buttons = [];

  for (let i = 0; i < 9; i++) {
    const btn = document.createElement("button");
    btn.style.width = "100px";
    btn.style.height = "100px";
    btn.style.background = "grey";
    btn.style.border = "none";
    btn.style.fontSize = "50px";
    btn.style.borderRadius = "5px";
    buttons.push(btn);
    container.classList.add("grid");
    container.appendChild(btn);
  }
}

function setPlayers(symbol) {
  if (symbol === "X") {
    player1.symbol = "X";
    player2.symbol = "O";
    player1.number = 1;
    player2.number = 2;
  } else {
    player1.symbol = "O";
    player2.symbol = "X";
    player1.number = 2;
    player2.number = 1;
  }
}

function checkWinner(board) {
  let empty = false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== 0) {
        if (i === 1 && j === 1) {
          if (
            board[i][j + 1] === board[i][j] &&
            board[i][j - 1] === board[i][j]
          ) {
            console.log("mjesto 1-1, poklapanje po x osi");
            buttons[3].style.backgroundColor = "green";
            buttons[4].style.backgroundColor = "green";
            buttons[5].style.backgroundColor = "green";
            return board[i][j];
          }
          if (
            board[i + 1][j] === board[i][j] &&
            board[i - 1][j] === board[i][j]
          ) {
            console.log("mjesto 1-1, poklapanje po y osi ");
            buttons[1].style.backgroundColor = "green";
            buttons[4].style.backgroundColor = "green";
            buttons[7].style.backgroundColor = "green";
            return board[i][j];
          }

          if (board[0][0] === board[i][j] && board[2][2] === board[i][j]) {
            console.log(
              "mjesto 1-1, poklapanje po dijagonali odozgo prema dolje"
            );
            buttons[0].style.backgroundColor = "green";
            buttons[4].style.backgroundColor = "green";
            buttons[8].style.backgroundColor = "green";
            return board[i][j];
          }

          if (board[0][2] === board[i][j] && board[2][0] === board[i][j]) {
            console.log(
              "mjesto 1-1, poklapanje po dijagonali odozdo prema gore"
            );
            buttons[6].style.backgroundColor = "green";
            buttons[4].style.backgroundColor = "green";
            buttons[2].style.backgroundColor = "green";
            return board[i][j];
          }
        }
        if (i === 0 && j === 1) {
          if (
            board[i][j + 1] === board[i][j] &&
            board[i][j - 1] === board[i][j]
          ) {
            console.log("poklapnje po x osi");
            buttons[0].style.backgroundColor = "green";
            buttons[1].style.backgroundColor = "green";
            buttons[2].style.backgroundColor = "green";
            return board[i][j];
          }
        }
        if (i === 1 && j === 2) {
          if (
            board[i + 1][j] === board[i][j] &&
            board[i - 1][j] === board[i][j]
          ) {
            console.log("poklapnje po y osi desno");
            buttons[2].style.backgroundColor = "green";
            buttons[5].style.backgroundColor = "green";
            buttons[8].style.backgroundColor = "green";
            return board[i][j];
          }
        }
        if (i === 2 && j === 1) {
          if (
            board[i][j + 1] === board[i][j] &&
            board[i][j - 1] === board[i][j]
          ) {
            console.log("poklapnje po x osi(dolje)");
            buttons[6].style.backgroundColor = "green";
            buttons[7].style.backgroundColor = "green";
            buttons[8].style.backgroundColor = "green";
            return board[i][j];
          }
        }
        if (i === 1 && j === 0) {
          if (
            board[i + 1][j] === board[i][j] &&
            board[i - 1][j] === board[i][j]
          ) {
            console.log("poklapnje po y osi lijevo");
            buttons[0].style.backgroundColor = "green";
            buttons[3].style.backgroundColor = "green";
            buttons[6].style.backgroundColor = "green";
            return board[i][j];
          }
        }
      } else {
        empty = true;
      }
    }
  }

  if (!empty) {
    console.log("neriješeno");
    winner = null;
    gameBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    setTimeout(() => {
      createButtons();
    }, 2000);
  }

  return null;
}
