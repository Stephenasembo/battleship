import { Ship, Player } from './index';
import '../styles.css';

const player1 = Player('human');
const player2 = Player('computer');
const p1Dialog = document.querySelector('#p1Dialog');
const p2Dialog = document.querySelector('#p2Dialog');
const p1ManualBtn = document.querySelector('#p1Manual');
const p1AutoBtn = document.querySelector('#p1Auto');
const p2ManualBtn = document.querySelector('#p2Manual');
const p2AutoBtn = document.querySelector('#p2Auto');

function cacheFormInputs() {
  const p1SubmitBtn = document.querySelector('#p1Submit');
  const p1CancelBtn = document.querySelector('#p1Cancel');
  const p2SubmitBtn = document.querySelector('#p2Submit');
  const p2CancelBtn = document.querySelector('#p2Cancel');

  const p1size4 = p1Dialog.querySelector('#p1size4');
  const p1size3a = document.querySelector('#p1size3a');
  const p1size3b = document.querySelector('#p1size3b');
  const p1size2a = document.querySelector('#p1size2a');
  const p1size2b = document.querySelector('#p1size2b');
  const p1size2c = document.querySelector('#p1size2c');
  const p1size1a = document.querySelector('#p1size1a');
  const p1size1b = document.querySelector('#p1size1b');
  const p1size1c = document.querySelector('#p1size1c');
  const p1size1d = document.querySelector('#p1size1d');

  const p2size4 = document.querySelector('#p2size4');
  const p2size3a = document.querySelector('#p2size3a');
  const p2size3b = document.querySelector('#p2size3b');
  const p2size2a = document.querySelector('#p2size2a');
  const p2size2b = document.querySelector('#p2size2b');
  const p2size2c = document.querySelector('#p2size2c');
  const p2size1a = document.querySelector('#p2size1a');
  const p2size1b = document.querySelector('#p2size1b');
  const p2size1c = document.querySelector('#p2size1c');
  const p2size1d = document.querySelector('#p2size1d');

  return {
    p1SubmitBtn,
    p1CancelBtn,
    p2SubmitBtn,
    p2CancelBtn,

    p1size4,
    p1size3a,
    p1size3b,
    p1size2a,
    p1size2b,
    p1size2c,
    p1size1a,
    p1size1b,
    p1size1c,
    p1size1d,

    p2size4,
    p2size3a,
    p2size3b,
    p2size2a,
    p2size2b,
    p2size2c,
    p2size1a,
    p2size1b,
    p2size1c,
    p2size1d,
  };
}

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
    const row = Number((coordinatesArr[1].split('row'))[1]);
    const col = Number((coordinatesArr[2].split('col'))[1]);
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
    const spot = document.querySelector(`#${boardName}krow${location[1]}kcol${location[0]}`);
    const shot = enemy.gameBoard.receiveAttack(
      location,
      enemy.playerPlacedShips,
      enemy.unplacedShips,
    );
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

// Displays the player's ships which are placed on the board
function displayBoardShips(player) {
  const ships = player.playerPlacedShips;
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

const p1Results = {};
const p2Results = {};

function getUserInput(event) {
  event.preventDefault();
  p1Dialog.close();
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

  console.log(p1Results);
  console.log(p2Results);
}

function cancelInput(event) {
  event.preventDefault();
  p1Dialog.close();
}

function openP1Form() {
  p1Dialog.show();
  const formControls = cacheFormInputs();
  formControls.p1SubmitBtn.addEventListener('click', getUserInput);
  formControls.p1CancelBtn.addEventListener('click', cancelInput);
}

function openP2Form() {
  p2Dialog.show();
  const formControls = cacheFormInputs();
  formControls.p2SubmitBtn.addEventListener('click', getUserInput);
  formControls.p2CancelBtn.addEventListener('click', cancelInput);
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
  displayBoardShips(player);
}

p1ManualBtn.addEventListener('click', openP1Form);
p2ManualBtn.addEventListener('click', openP2Form);
p1AutoBtn.addEventListener('click', autoPlaceShips);
p2AutoBtn.addEventListener('click', autoPlaceShips);

playGame();
