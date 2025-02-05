class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits += 1;
    return this.hits;
  }

  isSunk() {
    if (this.hits >= this.length) {
      return true;
    }
    return false;
  }
}

function createBoard() {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < 10; j += 1) {
      const col = [];
      row.push(col);
    }
    board.push(row);
  }

  const markedLocation = new Set();
  const missedShots = new Set();
  const shipsHit = new Set();
  const missedShotsCoordinates = new Set();
  let shipsSunk = 0;
  const shipsSunkArr = [];

  function getRandomLocation(boundary = 0) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    if (col > boundary) {
      return getRandomLocation();
    }
    return [col, row];
  }

  function createPlayerShip() {
    let count = 0;
    const playerShipArr = [];
    do {
      if (count === 0) {
        const playerShip = new Ship(4);
        playerShipArr.push(playerShip);
      } else if (count < 3) {
        const playerShip = new Ship(3);
        playerShipArr.push(playerShip);
      } else if (count < 6) {
        const playerShip = new Ship(2);
        playerShipArr.push(playerShip);
      } else if (count >= 6) {
        const playerShip = new Ship(1);
        playerShipArr.push(playerShip);
      }
      count += 1;
    } while (count < 10);

    return playerShipArr;
  }

  function placeIndividualShip(size, boundary = 0) {
    const location = getRandomLocation(boundary);
    const ship = [];
    let col = location[0];
    const row = location[1];
    for (let i = 0; i < size; i += 1) {
      const coordinates = JSON.stringify([col, row]);
      if (markedLocation.has(coordinates)) {
        return placeIndividualShip(size, boundary);
      }
      ship.push([col, row]);
      // The ships will extend horizontally
      col += 1;
    }
    ship.forEach((spot) => {
      markedLocation.add(JSON.stringify(spot));
    });
    return ship;
  }

  function placeShip(playerShipsArr) {
    const shipsArr = playerShipsArr;
    const placedShips = [];

    for (let i = 0; i < shipsArr.length; i += 1) {
      if (shipsArr[i].length === 4) {
        const shipLocation = placeIndividualShip(4, 6);
        shipsArr[i].boardLocation = shipLocation;
        placedShips.push(shipLocation);
      }
      if (shipsArr[i].length === 3) {
        const shipLocation = placeIndividualShip(3, 7);
        shipsArr[i].boardLocation = shipLocation;
        placedShips.push(shipLocation);
      }
      if (shipsArr[i].length === 2) {
        const shipLocation = placeIndividualShip(2, 8);
        shipsArr[i].boardLocation = shipLocation;
        placedShips.push(shipLocation);
      }
      if (shipsArr[i].length === 1) {
        const shipLocation = placeIndividualShip(1, 9);
        shipsArr[i].boardLocation = shipLocation;
        placedShips.push(shipLocation);
      }
    }
    return placedShips;
  }

  function allShipsSunk(placedBoardShips) {
    if (placedBoardShips.length === shipsSunk) {
      return true;
    }
    return false;
  }

  // Location to this function should be an array of coordinates
  function receiveAttack(location, boardShips, unplacedShips) {
    // Check if the location has a ship
    if (markedLocation.has(JSON.stringify(location))) {
      // Check if spot is already hit
      if (shipsHit.has(JSON.stringify(location))) {
        return 'invalid move';
      }
      const col = location[0];
      const row = location[1];

      // Find ship location on the board
      // The result is nested in another array by filter method hence we access index 0
      let foundShip = boardShips.filter((ship) => {
        function comparison(array, value) {
          return array[0] === value[0] && array[1] === value[1];
        }
        return ship.find((value) => comparison([col, row], value));
      })[0];

      // Find ship object which is targeted
      foundShip = unplacedShips.find((ship) => {
        const shipBoardLocation = JSON.stringify(ship.boardLocation);
        const shipFound = JSON.stringify(foundShip);
        return shipBoardLocation === shipFound;
      });
      foundShip.hit();
      shipsHit.add(JSON.stringify(location));
      if (foundShip.hits === foundShip.length) {
        foundShip.isSunk = true;
        shipsSunkArr.push(foundShip);
        shipsSunk += 1;
        if (allShipsSunk(boardShips)) {
          return 'All player ships sunk';
        }
      }
      return 'ship hit';
    }
    // Check if shot was already made
    if (missedShots.has(JSON.stringify(location))) {
      return 'invalid move';
    }
    missedShots.add(JSON.stringify(location));
    missedShotsCoordinates.add(location);
    return 'missed shot';
  }

  return {
    board,
    getRandomLocation,
    createPlayerShip,
    placeShip,
    markedLocation,
    receiveAttack,
    missedShots,
    shipsHit,
    shipsSunkArr,
  };
}

function Player(type) {
  const gameBoard = createBoard();
  const unplacedShips = gameBoard.createPlayerShip();
  const isReady = false;
  return {
    gameBoard,
    type,
    unplacedShips,
    isReady,
  };
}

export { createBoard, Ship, Player };
