import { Ship, Player } from './index';
import '../styles.css';

const player1 = Player('human');
const player2 = Player('computer');

function displayBoard(parent) {
  const boardDiv = document.createElement('div');
  let boardName;
  if (parent.classList[1] === 'one') {
    boardName = 'p1';
  } else if (parent.classList[1] === 'two') {
    boardName = 'p2';
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
  return { boardDiv, boardName };
}

function displayShips(ship, board, playerBoardName) {
  for (let i = 0; i < ship.length; i += 1) {
    let horizontal = ship[i][0];
    let vertical = ship[i][1];
    vertical = vertical.toString();
    horizontal = horizontal.toString();
    const displayVertical = document.querySelector(`#${playerBoardName}krow${vertical}`);
    const displayHorizontal = document.querySelector(`#${playerBoardName}krow${vertical}kcol${horizontal}`);

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

const testShip = new Ship(4);
testShip.boardLocation = [[0, 0], [0, 1], [0, 2], [0, 3]];

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

const gameController = displayController();

export default function playGame() {
  let activePlayer = player1;
  function switchActivePlayer() {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else if (activePlayer === player2) {
      activePlayer = player1;
    }
  }

  function decodeLocation(locationId) {
    const coordinatesArr = locationId.split('k');
    const row = Number((coordinatesArr[1].split('row'))[1]);
    const col = Number((coordinatesArr[2].split('col'))[1]);
    return [row, col];
  }

  // Listens for active player's actions on board
  function activatePlayerBoard(playRoundFn) {
    if (activePlayer === player1) {
      gameController.player1Board.addEventListener('click', playRoundFn);
    } else if (activePlayer === player2) {
      gameController.player2Board.addEventListener('click', playRoundFn);
    }
  }

  function deactivateBoards(playRoundFn) {
    gameController.player1Board.removeEventListener('click', playRoundFn);
    gameController.player2Board.removeEventListener('click', playRoundFn);
  }

  function displayShot(location, player) {
    player.gameBoard.receiveAttack(location);
  };

  function playRound(event) {
    const location = event.target.id;
    const coordinates = decodeLocation(location);
    console.log(coordinates);
    displayShot(coordinates, activePlayer);
    deactivateBoards(playRound);
    switchActivePlayer();
    activatePlayerBoard(playRound);
  }

  activatePlayerBoard(playRound);
}

// Displays the player's ships which are placed on the board
function displayBoardShips(player) {
  const ships = player.playerPlacedShips;
  console.log(ships);
  let board;
  if (player === player1) {
    board = gameController.board1;
  } else if (player === player2) {
    board = gameController.board2;
  }
  for (let i = 0; i < ships.length; i += 1) {
    const shipLocation = ships[i];
    displayShips(shipLocation, board, board.boardName);
  }
}

displayBoardShips(player1);
console.log(player1.gameBoard.markedLocation);

playGame();
