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
        shipsArr[i].boardLocation = JSON.stringify(shipLocation);
        placedShips.push(shipLocation);
      }
      if (shipsArr[i].length === 3) {
        const shipLocation = placeIndividualShip(3, 7);
        shipsArr[i].boardLocation = JSON.stringify(shipLocation);
        placedShips.push(shipLocation);
      }
      if (shipsArr[i].length === 2) {
        const shipLocation = placeIndividualShip(2, 8);
        placedShips.push(shipLocation);
      }
      if (shipsArr[i].length === 1) {
        const shipLocation = placeIndividualShip(1, 9);
        placedShips.push(shipLocation);
      }
    }
    return placedShips;
  }

  function allShipsSunk() {
    if (placedBoardShips.length === shipsSunk) {
      return true;
    }
    return false;
  }

  // Location to this function should be an array of coordinates
  function receiveAttack(location) {
    // Check if the location has a ship
    if (markedLocation.has(JSON.stringify(location))) {
      // Check if spot is already hit
      if (shipsHit.has(JSON.stringify(location))) {
        return 'invalid move';
      }
      const col = location[0];
      const row = location[1];

      // Find ship location on the board
      let foundShip = JSON.stringify(
        placedBoardShips.filter((ship) => ship.find((value) => value[0] === col
        && value[1] === row))[0],
      );

      // Find ship object which is targeted
      foundShip = unplacedShips.find(
        (ship) => ship.boardLocation === foundShip,
      );
      foundShip.hit();
      shipsHit.add(JSON.stringify(location));
      if (foundShip.hits === foundShip.length) {
        foundShip.isSunk = true;
        shipsSunk += 1;
        if (allShipsSunk()) {
          return 'All player ships sunk';
        }
      }
      console.log('shot recieved')
      return foundShip.hits;
    }
    // Check if shot was already made
    if (missedShots.has(JSON.stringify(location))) {
      return 'invalid move';
    }
    missedShots.add(JSON.stringify(location));
    missedShotsCoordinates.add(location);
    return [...missedShotsCoordinates];
  }

  function decodeLocation(locationId) {
    const coordinatesArr = locationId.split('k');
    const row = Number((coordinatesArr[1].split('row'))[1]);
    const col = Number((coordinatesArr[2].split('col'))[1]);
    return [row, col];
  }

  function getDesiredLocation(event) {
    console.log(decodeLocation(event.target.id));
    return event.target.id;
  }

  return {
    board,
    getRandomLocation,
    createPlayerShip,
    placeShip,
    markedLocation,
    receiveAttack,
    missedShots,
    getDesiredLocation,
  };
}

function Player(type) {
  const gameBoard = createBoard();
  const playerPlacedShips = gameBoard.placeShip(gameBoard.createPlayerShip());
  return { gameBoard, type, playerPlacedShips };
}

export { createBoard, Ship, Player };
