"use strict";

import {
  createButtons,
  setPlayers,
  checkWinner,
  setWinner,
  position,
} from "./functions.js";

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
const scorePar = document.getElementById("score");
const chooseSymbol = document.getElementById("select-symbol");

chooseSymbol.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  console.log("provjera");

  setPlayers(e.target.innerHTML, player1, player2);
  createButtons(container, buttons);
});

container.addEventListener("click", (e) => {
  e.preventDefault();

  //Handle za klikanje van granica buttona, u granici containera
  if (buttons.indexOf(e.target) === -1) {
    return;
  }

  onButtonClicked(e.target);
});

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

  winner = checkWinner(gameBoard, buttons, winner, createButtons);

  console.log(gameBoard);

  if (winner === "neriješeno") {
    console.log("Rezultat je neriješen.");
    winner = null;

    setTimeout(() => {
      gameBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      createButtons(container, buttons);
    }, 2000);
    return;
  }

  if (winner) {
    console.log(winner);
    setWinner(winner, player1, player2, scorePar, gameBoard);

    setTimeout(() => {
      createButtons(container, buttons);
    }, 2000);
  }
}
