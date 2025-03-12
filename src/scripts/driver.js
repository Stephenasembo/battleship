import { Player } from './index';
import '../styles/styles.css';
import { dom } from './dom';
import { displayBoards, displayExplosion, displayScore, displaySplash, displayStart, displayTurnModal, displayTurns, displayWinner } from './ui';
import { deactivatePlacement, autoPlaceShips, manualShipPlacement } from './utils/shipPlacement';
import { getUserInput, openP1Form, openP2Form } from './utils/form';
import '../styles/responsive.css';
import '../styles/specialEffect.css';

let player1 = Player('human');
let player2 = Player('computer');

player1.displayBoard = dom.player1Board;
player2.displayBoard = dom.player2Board;

displayBoards([player1, player2]);
displayTurnModal();

export default function playGame() {
  let isGameWon = false;
  let activePlayer = player1;
  function switchActivePlayer() {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else if (activePlayer === player2) {
      activePlayer = player1;
    }
    displayTurns(activePlayer.type);
  }

  function decodeLocation(locationId) {
    const coordinatesArr = locationId.split('k');
    const row = Number(coordinatesArr[1].split('row')[1]);
    const col = Number(coordinatesArr[2].split('col')[1]);
    return [col, row];
  }

  // Listens for active player's actions on board
  function activatePlayerBoard(playRoundFn) {
    // Activate enemy's board only
    if (activePlayer === player1) {
      player2.displayBoard.addEventListener('click', playRoundFn);
    } else if (activePlayer === player2) {
      player1.displayBoard.addEventListener('click', playRoundFn);
    }
  }

  function deactivateBoards(playRoundFn) {
    player1.displayBoard.removeEventListener('click', playRoundFn);
    player2.displayBoard.removeEventListener('click', playRoundFn);
  }

  function displayShot(location, player) {
    let boardName;
    let enemy;
    if (player === player1) {
      boardName = 'p2';
      enemy = player2;
    } else {
      boardName = 'p1';
      enemy = player1;
    }
    const spot = document.querySelector(
      `#${boardName}krow${location[1]}kcol${location[0]}`,
    );
    const shot = enemy.gameBoard.receiveAttack(
      location,
      enemy.playerPlacedShips,
      enemy.unplacedShips,
    );
    displayScore(player, enemy);
    if (shot === 'ship hit') {
      spot.textContent = 'x';
      displayExplosion(spot);
      return {
        valid: true,
        status: 'hit',
      };
    }
    if (shot === 'missed shot') {
      spot.textContent = 'o';
      displaySplash(spot);
      return {
        valid: true,
        status: 'miss',
      };
    }
    if (shot === 'All player ships sunk') {
      spot.textContent = 'x';
      isGameWon = true;
      let winner;
      if (player.type === 'human') {
        winner = 'player1';
      } else if (player.type === 'computer') {
        winner = 'player2';
      }
      displayWinner(winner);

      // Activate restart button
      const restartBtn = document.querySelector('#restart');
      restartBtn.addEventListener('click', restartGame);
    }
    return {
      valid: false,
    };
  }

  function computerPlayer(prevShot = null) {
    let location;
    if (!prevShot) {
      const col = Math.floor(Math.random() * 10);
      const row = Math.floor(Math.random() * 10);
      location = [col, row];
      return location;
    }
    // Make continuous hits
    if (prevShot[0] < 9) {
      location = [(prevShot[0] + 1), prevShot[1]];
    } else if (prevShot[0] > 0) {
      location = [(prevShot[0] - 1), prevShot[1]];
    }
    return location;
  }

  function playRound(event, playerShot = null) {
    let coordinates;
    if (isGameWon) {
      return;
    }
    if (event) {
      const location = event.target.id;
      coordinates = decodeLocation(location);
    } else if (!event) {
      coordinates = playerShot;
    }
    const isShotValid = displayShot(coordinates, activePlayer);
    if (isShotValid.valid) {
      if (isShotValid.status === 'miss') {
        deactivateBoards(playRound);
        switchActivePlayer();
        activatePlayerBoard(playRound);
      }
    }
    if (activePlayer === player2) {
      let prevShot;
      // Get previous successful hit
      if (isShotValid.status === 'hit') {
        const hitAreas = Array.from(player1.gameBoard.shipsHit);
        prevShot = JSON.parse(hitAreas[hitAreas.length - 1]);
        prevShot[0] = Number(prevShot[0]);
        prevShot[1] = Number(prevShot[1]);
      }
      // Timelag for computer play effect
      setTimeout(() => {
        const computerShot = computerPlayer(prevShot);
        playRound(null, computerShot);
      }, 1400);
    }
  }

  activatePlayerBoard(playRound);
}

function startGame() {
  if (player1.isReady && player2.isReady) {
    displayStart();
    playGame();
  }
}

function autoPlacementUtil(event = null, restart = null) {
  let player;
  if (event) {
    if (event.target.id === 'p1Auto') {
      player = player1;
    } else if (event.target.id === 'p2Auto') {
      player = player2;
    }
  }

  if (restart) {
    autoPlaceShips(player1);
    deactivatePlacement(player1, autoPlacementUtil);
    autoPlaceShips(player2);
    deactivatePlacement(player2, autoPlacementUtil);  
  } else {
    autoPlaceShips(player);
    deactivatePlacement(player, autoPlacementUtil);
    startGame();
  }
}

function resetStats() {
  dom.p1HitsPara.textContent = 'You have 0 hits on the enemy\'s ships';
  dom.p1SunkShipsPara.textContent = 'You have sunk 0 enemy ships.';
  dom.p2HitsPara.textContent = 'You have 0 hits on the enemy\'s ships';
  dom.p2SunkShipsPara.textContent = 'You have sunk 0 enemy ships.';
}

function restartGame() {
  // Close win dialog
  const winDialog = document.querySelector('.winDialog');
  winDialog.close();

  player1 = Player('human');
  player2 = Player('computer');

  player1.displayBoard = dom.player1Board;
  player2.displayBoard = dom.player2Board;

  // Clear the marked boards
  player1.displayBoard.innerHTML = '';
  player2.displayBoard.innerHTML = '';
  displayBoards([player1, player2]);

  // Automatically start the game with random ship placement
  autoPlacementUtil(null, true);
  resetStats();
  dom.turnDialog.classList.toggle('invisible');
  startGame();
}

function manualPlacementUtil(player, inputObj) {
  let boardName;
  if (player === player1) {
    boardName = 'p1';
  } else {
    boardName = 'p2';
  }
  manualShipPlacement(player, inputObj, boardName);
  deactivatePlacement(player, autoPlacementUtil);
  startGame();
}

function readP1UserInput() {
  const p1Input = getUserInput(player1);
  manualPlacementUtil(player1, p1Input);
  player1.isReady = true;
  deactivatePlacement(player1);
}

function readP2UserInput() {
  const p2Input = getUserInput(player1);
  manualPlacementUtil(player2, p2Input);
  player2.isReady = true;
  deactivatePlacement(player2);
}

dom.p1ManualBtn.addEventListener('click', openP1Form);
dom.p2ManualBtn.addEventListener('click', openP2Form);
dom.p1AutoBtn.addEventListener('click', autoPlacementUtil);
dom.p2AutoBtn.addEventListener('click', autoPlacementUtil);

export {
  player1,
  player2,
  openP1Form,
  openP2Form,
  readP1UserInput,
  readP2UserInput,
};
