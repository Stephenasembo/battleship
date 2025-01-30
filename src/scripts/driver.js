import { Ship, createBoard, Player } from './index';
import '../styles.css';

const player1 = Player('human');
const player2 = Player('computer');

function displayBoard(parent) {
  const boardDiv = document.createElement('div');
  for (let i = 0; i < 10; i += 1) {
    const rowDiv = document.createElement('div');
    rowDiv.setAttribute('id', i);
    for (let j = 0; j < 10; j += 1) {
      const colBtn = document.createElement('button');
      colBtn.setAttribute('id', j);
      rowDiv.appendChild(colBtn);
    }
    boardDiv.appendChild(rowDiv);
  }
  parent.appendChild(boardDiv);
}

function displayController() {
  const player1Board = document.querySelector('.one');
  const player2Board = document.querySelector('.two');
  displayBoard(player1Board);
  displayBoard(player2Board);
}

displayController();
