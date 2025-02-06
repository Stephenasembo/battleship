function displayBoard(parent) {
  const boardDiv = document.createElement('div');
  const boardPara = document.createElement('p');
  let boardName;
  if (parent.classList[1] === 'one') {
    boardName = 'p1';
    boardPara.textContent = "Player1's board";
  } else if (parent.classList[1] === 'two') {
    boardName = 'p2';
    boardPara.textContent = "Player2's board";
  }
  for (let i = 0; i < 10; i += 1) {
    const rowDiv = document.createElement('div');
    rowDiv.setAttribute('id', `${boardName}krow${i}`);
    for (let j = 0; j < 10; j += 1) {
      const colBtn = document.createElement('button');
      colBtn.setAttribute('id', `${boardName}krow${i}kcol${j}`);
      rowDiv.appendChild(colBtn);
    }
    parent.appendChild(rowDiv);
  }
  parent.appendChild(boardPara);
  return { boardDiv, boardName };
}

function displayScore(player, enemy) {
  let hitsPara;
  let sunkSHipsPara;
  if (player.type === 'human') {
    hitsPara = document.querySelector('#p1Hits');
    sunkSHipsPara = document.querySelector('#p1SunkShips');
  } else {
    hitsPara = document.querySelector('#p2Hits');
    sunkSHipsPara = document.querySelector('#p2SunkShips');
  }
  hitsPara.textContent = `You have ${enemy.gameBoard.shipsHit.size} hits on the enemy's ships.`;
  sunkSHipsPara.textContent = `You have sunk ${enemy.gameBoard.shipsSunkArr.length} enemy ships.`;
}

function displayShips(ship, playerBoardName) {
  let horizontal;
  let vertical;
  for (let i = 0; i < ship.length; i += 1) {
    // Only manually placed ships have a boardLocation property
    if (ship.boardLocation) {
      [horizontal, vertical] = ship.boardLocation[i];
    } else {
      [horizontal, vertical] = ship[i];
    }
    // Select column occupied by ship
    vertical = vertical.toString();
    horizontal = horizontal.toString();
    const colId = `#${playerBoardName}krow${vertical}kcol${horizontal}`;
    const displayHorizontal = document.querySelector(colId);

    // Add classes for specific styling
    displayHorizontal.classList.toggle('ship');
    if (i === 0) {
      if (i === ship.length - 1) {
        displayHorizontal.classList.toggle('onlyCol');
      } else {
        displayHorizontal.classList.toggle('startCol');
      }
    } else if (i === ship.length - 1) {
      displayHorizontal.classList.toggle('endCol');
    } else {
      displayHorizontal.classList.toggle('midCol');
    }
  }
}

function displayController() {
  const player1Board = document.querySelector('.one');
  const player2Board = document.querySelector('.two');
  const board1 = displayBoard(player1Board);
  const board2 = displayBoard(player2Board);

  return {
    player1Board,
    player2Board,
    board1,
    board2,
  };
}

// Displays the player's ships which are placed on the board
function displayBoardShips(player, gameController) {
  const ships = player.playerPlacedShips;
  let board;
  if (player.type === 'human') {
    board = gameController.board1;
  } else if (player === 'computer') {
    board = gameController.board2;
  }
  for (let i = 0; i < ships.length; i += 1) {
    const shipLocation = ships[i];
    displayShips(shipLocation, board.boardName);
  }
}

export {
  displayScore,
  displayShips,
  displayController,
  displayBoardShips,
};
