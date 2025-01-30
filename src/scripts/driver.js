import { Ship, createBoard, Player } from './index';
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
    rowDiv.setAttribute('id', `${boardName}row${i}`);
    for (let j = 0; j < 10; j += 1) {
      const colBtn = document.createElement('button');
      colBtn.setAttribute('id', `${boardName}col${j}`);
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
    const displayStartRow = board.querySelector(`#${playerBoard}row${startRow}`);
    const displayStartCol = displayStartRow.querySelector(`#${playerBoard}col${startCol}`);
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

gameController.player1Board.addEventListener('click', player1.gameBoard.getDesiredLocation);
