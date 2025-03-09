import { dom } from './dom';
import explosion from '../assets/explosion.mp3';
import splash from '../assets/splash.mp3';

const explosionAudio = new Audio(explosion);
const splashAudio = new Audio(splash);

function displayBoards(arr) {
  // We only have 2 player boards
  for (let i = 0; i < 2; i += 1) {
    let boardName;
    const boardPara = document.createElement('p');
    if (i === 0) {
      boardName = 'p1';
      boardPara.textContent = "Player1's board";
    } else {
      boardName = 'p2';
      boardPara.textContent = "Player2's board";
    }

    // 10 rows * 10 columns board
    for (let j = 0; j < 10; j += 1) {
      const rowDiv = document.createElement('div');
      rowDiv.setAttribute('id', `${boardName}krow${j}`);
      for (let k = 0; k < 10; k += 1) {
        const colBtn = document.createElement('button');
        colBtn.setAttribute('id', `${boardName}krow${j}kcol${k}`);
        rowDiv.appendChild(colBtn);
      }
      arr[i].displayBoard.appendChild(rowDiv);
    }
    arr[i].displayBoard.appendChild(boardPara);
  }
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

// Displays the player's ships which are placed on the board
function displayBoardShips(player) {
  const ships = player.playerPlacedShips;
  let name;
  if (player.type === 'human') {
    name = 'p1';
  } else if (player.type === 'computer') {
    name = 'p2';
  }
  for (let i = 0; i < ships.length; i += 1) {
    const shipLocation = ships[i];
    displayShips(shipLocation, name);
  }
}

function displayWinner(winner) {
  const winnerDiv = document.createElement('div');
  const winnerPara = document.createElement('p');
  winnerPara.textContent = `The winner of the game is ${winner}`;
  winnerDiv.appendChild(winnerPara);
  dom.container.appendChild(winnerDiv);
}

function displayStart() {
  dom.infoPara.textContent = 'Everyone is ready to play.';
  dom.turnPara.textContent = 'Everyone is ready to play.';
  dom.turnDialog.classList.toggle('invisible');
}

function displayTurns(playerType) {
  let name;
  if (playerType === 'human') {
    name = 'player1';
  } else {
    name = 'player2';
  }
  dom.infoPara.textContent = `It's ${name}'s turn`;
}

function displayTurnModal() {
  dom.turnDialog.show();
}

function displayExplosion(element) {
  element.classList.toggle('shipHit');
  explosionAudio.play();
  setTimeout(() => element.classList.toggle('shipHit'), 3000);
}

function displaySplash(element) {
  element.classList.toggle('missedHit');
  splashAudio.play();
  setTimeout(() => element.classList.toggle('missedHit'), 3000);
}

export {
  displayBoards,
  displayScore,
  displayShips,
  displayBoardShips,
  displayWinner,
  displayStart,
  displayTurns,
  displayExplosion,
  displaySplash,
  displayTurnModal,
};
