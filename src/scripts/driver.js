import { Player } from './index';
import '../styles.css';
import { dom, cacheFormInputs } from './dom';
import {
  displayScore,
  displayShips,
  displayController,
  displayBoardShips,
} from './ui';

const player1 = Player('human');
const player2 = Player('computer');

const gameController = displayController();

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
      gameController.player2Board.addEventListener('click', playRoundFn);
    } else if (activePlayer === player2) {
      gameController.player1Board.addEventListener('click', playRoundFn);
    }
  }

  function deactivateBoards(playRoundFn) {
    gameController.player1Board.removeEventListener('click', playRoundFn);
    gameController.player2Board.removeEventListener('click', playRoundFn);
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
  }
}

const p1Results = {};
const p2Results = {};

function cancelInput(event) {
  event.preventDefault();
  dom.p1Dialog.close();
}

// Places player's ships randomly on the board
function autoPlaceShips(event) {
  let player;
  if (event.target.id === 'p1Auto') {
    player = player1;
  } else if (event.target.id === 'p2Auto') {
    player = player2;
  }
  player.playerPlacedShips = player.gameBoard.placeShip(player.unplacedShips);
  displayBoardShips(player, gameController);
  player.isReady = true;
  deactivatePlacement(player);
  startGame();
}

const testInput = {
  size4: '0,0 1,0 2,0 3,0',
  size3a: '5,0 6,0 7,0',
  size3b: '1,1 2,1 3,1',
  size2a: '5,1 6,1',
  size2b: '8,1 9,1',
  size2c: '1,2 2,2',
  size1a: '4,2',
  size1b: '5,3',
  size1c: '6,4',
  size1d: '7,4',
};

// Place the ships based on coordinate input
function manualShipPlacement(player, inputObj) {
  const ships = player.unplacedShips;
  const shipLocationsArr = Object.values(inputObj);
  for (let i = 0; i < shipLocationsArr.length; i += 1) {
    let location = shipLocationsArr[i];
    location = location.split(' ');
    location = location.map((coordinates) => coordinates.split(','));
    for (let j = 0; j < location.length; j += 1) {
      location[j] = location[j].map((coordinates) => Number(coordinates));
    }

    // Convert coordinates into numbers
    location = location.map((coordinates) => {
      const array = coordinates;
      return array.map((element) => Number(element));
    });

    ships[i].boardLocation = location;
    player.playerPlacedShips.push(location);
    let boardName;
    if (player === player1) {
      boardName = 'p1';
    } else {
      boardName = 'p2';
    }
    displayShips(ships[i], boardName);
  }
  for (let i = 0; i < player.playerPlacedShips.length; i += 1) {
    player.playerPlacedShips[i].forEach((coordinates) => {
      player.gameBoard.markedLocation.add(JSON.stringify(coordinates));
    });
  }
}

function getUserInput(event) {
  event.preventDefault();
  dom.p1Dialog.close();
  let results;
  const inputs = cacheFormInputs();
  if (event.target.id === 'p1Submit') {
    results = {
      size4: inputs.p1size4.value,
      size3a: inputs.p1size3a.value,
      size3b: inputs.p1size3b.value,
      size2a: inputs.p1size2a.value,
      size2b: inputs.p1size2b.value,
      size2c: inputs.p1size2c.value,
      size1a: inputs.p1size1a.value,
      size1b: inputs.p1size1b.value,
      size1c: inputs.p1size1c.value,
      size1d: inputs.p1size1d.value,
    };
    Object.assign(p1Results, results);
    manualShipPlacement(player1, p1Results);
  } else if (event.targe.id === 'p2Submit') {
    results = {
      size4: inputs.p2size4.value,
      size3a: inputs.p2size3a.value,
      size3b: inputs.p2size3b.value,
      size2a: inputs.p2size2a.value,
      size2b: inputs.p2size2b.value,
      size2c: inputs.p2size2c.value,
      size1a: inputs.p2size1a.value,
      size1b: inputs.p2size1b.value,
      size1c: inputs.p2size1c.value,
      size1d: inputs.p2size1d.value,
    };
    Object.assign(p2Results, results);
  }
}

function testP1UserInput() {
  manualShipPlacement(player1, testInput);
  player1.isReady = true;
  deactivatePlacement(player1);
  startGame();
}

function testP2UserInput() {
  manualShipPlacement(player2, testInput);
  player2.isReady = true;
  deactivatePlacement(player2);
  startGame();
}

function openP1Form() {
  dom.p1Dialog.show();
  const formControls = cacheFormInputs();
  formControls.p1SubmitBtn.addEventListener('click', testP1UserInput);
  formControls.p1CancelBtn.addEventListener('click', cancelInput);
}

function openP2Form() {
  dom.p2Dialog.show();
  const formControls = cacheFormInputs();
  formControls.p2SubmitBtn.addEventListener('click', testP2UserInput);
  formControls.p2CancelBtn.addEventListener('click', cancelInput);
}

function deactivatePlacement(player) {
  if (player === player1) {
    dom.p1AutoBtn.removeEventListener('click', autoPlaceShips);
    dom.p1ManualBtn.removeEventListener('click', openP1Form);
  } else if (player === player2) {
    dom.p2AutoBtn.removeEventListener('click', autoPlaceShips);
    dom.p2ManualBtn.removeEventListener('click', openP2Form);
  }
}

dom.p1ManualBtn.addEventListener('click', openP1Form);
dom.p2ManualBtn.addEventListener('click', openP2Form);
dom.p1AutoBtn.addEventListener('click', autoPlaceShips);
dom.p2AutoBtn.addEventListener('click', autoPlaceShips);
