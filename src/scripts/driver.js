import { Player } from './index';
import '../styles.css';
import { dom } from './dom';
import { displayBoards, displayScore, displayStart, displayWinner } from './ui';
import { deactivatePlacement, autoPlaceShips, manualShipPlacement } from './utils/shipPlacement';
import { getUserInput, openP1Form, openP2Form } from './utils/form';

const player1 = Player('human');
const player2 = Player('computer');

player1.displayBoard = dom.player1Board;
player2.displayBoard = dom.player2Board;

displayBoards([player1, player2]);

export default function playGame() {
  let isGameWon = false;
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
      return true;
    }
    if (shot === 'missed shot') {
      spot.textContent = 'o';
      return true;
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
    }
    return false;
  }

  function computerPlayer() {
    const col = Math.floor(Math.random() * 10);
    const row = Math.floor(Math.random() * 10);
    const location = [col, row];
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
    if (isShotValid) {
      deactivateBoards(playRound);
      switchActivePlayer();
      activatePlayerBoard(playRound);
    }
    if (activePlayer === player2) {
      const computerShot = computerPlayer();
      playRound(null, computerShot);
    }
  }

  activatePlayerBoard(playRound);
}

function startGame() {
  if (player1.isReady && player2.isReady) {
    playGame();
    displayStart();
  }
}

function autoPlacementUtil(event) {
  let player;
  if (event.target.id === 'p1Auto') {
    player = player1;
  } else if (event.target.id === 'p2Auto') {
    player = player2;
  }
  autoPlaceShips(player);
  deactivatePlacement(player, autoPlacementUtil);
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
