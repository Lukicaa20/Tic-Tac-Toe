export function createButtons(container, buttons) {
  container.innerHTML = "";
  buttons.length = 0;

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

export function setPlayers(symbol, player1, player2) {
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

export function position(index) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return [row, col];
}

export function checkWinner(board, buttons) {
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
    return "neriješeno";
  }

  return null;
}

export function setWinner(winner, player1, player2, scorePar, gameBoard) {
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
