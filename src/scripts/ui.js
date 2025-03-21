import { dom } from './dom';
import explosion from '../assets/explosion.mp3';
import splash from '../assets/splash.mp3';
import success from '../assets/success.mp3';
import victory from '../assets/victory.gif';

const explosionAudio = new Audio(explosion);
const splashAudio = new Audio(splash);
const successAudio = new Audio(success);

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

function displayStart() {
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
  dom.turnPara.textContent = `It's ${name}'s turn`;
  dom.turnDialog.classList.toggle('invisible');
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

function displayWinner(winner) {
  const winDialog = document.createElement('dialog');
  const winPara = document.createElement('p');
  const winImg = document.createElement('img');
  winImg.setAttribute('src', victory);
  winImg.setAttribute('width', '220');
  winImg.setAttribute('height', '150');
  winImg.classList.add('winImg');

  const restartBtn = document.createElement('button');
  restartBtn.textContent = 'Restart Game';
  restartBtn.setAttribute('id', 'restart');

  winPara.textContent = `
  Congratulations ${winner}.
  You won the game`;
  winDialog.appendChild(winPara);
  winDialog.appendChild(winImg);
  winDialog.appendChild(restartBtn);

  winDialog.classList.add('winDialog');
  dom.container.appendChild(winDialog);
  winDialog.showModal();
  successAudio.play();
}

function removeWinDisplay() {
  const winDialog = document.querySelector('.winDialog');
  winDialog.close();
  dom.container.removeChild(winDialog);
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
  removeWinDisplay,
};
