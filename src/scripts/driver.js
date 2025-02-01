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
    boardDiv.appendChild(rowDiv);
  }
  parent.appendChild(boardDiv);
  return { boardDiv, boardName };
}

function displayShips(ship, board, playerBoard) {
  const location = ship.boardLocation;
  for (let i = 0; i < location.length; i += 1) {
    let startRow = location[i][0];
    let startCol = location[i][1];
    startCol = startCol.toString();
    startRow = startRow.toString();
    const displayStartRow = board.querySelector(`#${playerBoard}krow${startRow}`);
    const displayStartCol = displayStartRow.querySelector(`#${playerBoard}krow${startRow}kcol${startCol}`);
    displayStartCol.style.backgroundColor = 'red';
  }
}

const testShip = new Ship(4);
testShip.boardLocation = [[0, 0], [0, 1], [0, 2], [0, 3]];

function displayController() {
  const player1Board = document.querySelector('.one');
  const player2Board = document.querySelector('.two');
  const board1 = displayBoard(player1Board);
  const board2 = displayBoard(player2Board);
  displayShips(testShip, board1.boardDiv, board1.boardName);
  displayShips(testShip, board2.boardDiv, board2.boardName);

  return {
    player1Board,
    player2Board,
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

  function playRound(event) {
    const location = event.target.id;
    const coordinates = decodeLocation(location);
    console.log(coordinates);
    deactivateBoards(playRound);
  }

  activatePlayerBoard(playRound);
}

playGame();
