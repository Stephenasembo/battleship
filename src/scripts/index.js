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

  const markedLocation = new Set ();

  function getRandomLocation(boundary = 0) {
    const row = Math.floor((Math.random()) * 10);
    const col = Math.floor((Math.random()) * 10);
    if (row > boundary) {
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
    }
    while(count < 10);

    return playerShipArr;
  }

  function placeIndividualShip(size, boundary = 0, nextCol = 0, nextRow = 0) {
    const location = getRandomLocation(boundary);
    let ship = [];
    const col = location[0];
    let row = location[1];
    for (let i = 0; i < size; i += 1) {
      const coordinates = JSON.stringify([col, row]);
      if (size === 4) {
        ship = [[0, 0], [0, 1], [0, 2], [0, 3]];
        ship.forEach((location) => {
          markedLocation.add(JSON.stringify(location))
        })
        return ship;
      }
      if (size === 3) {
        ship = [[0, 4], [0, 5], [0, 6]];
        ship.forEach((location) => {
          markedLocation.add(JSON.stringify(location))
        })
        return ship;
      }
      if (markedLocation.has(coordinates)) {
        ship.forEach((location) => {
          markedLocation.delete(location);
        })
        return placeIndividualShip(size, boundary);
      }
      ship.push([col, row]);
      markedLocation.add(coordinates);
      row += 1;
    }
    return ship;
  }

  function placeShip(shipsArr) {
    // const shipsArr = createPlayerShip();
    const placedShips = [];

    for (let i = 0; i < shipsArr.length; i += 1) {
      if (shipsArr[i].length === 4) {
        const shipLocation = placeIndividualShip(4, 7);
        shipsArr[i].boardLocation = JSON.stringify(shipLocation);
        placedShips.push(shipLocation);
      }
      if (shipsArr[i].length === 3) {
        const shipLocation = placeIndividualShip(3, 8);
        shipsArr[i].boardLocation = JSON.stringify(shipLocation);
        placedShips.push(shipLocation);
        return placedShips; 
      }
      if (shipsArr[i].length === 2) {
        const shipLocation = placeIndividualShip(2, 9);
        placedShips.push(shipLocation);
      }
      if (shipsArr[i].length === 1) {
        const shipLocation = placeIndividualShip(1);
        placedShips.push(shipLocation);
      }
    }
    return placedShips;
  }

  const unplacedShips = createPlayerShip();

  function receiveAttack(location) {
    const ships = placeShip(unplacedShips);
    const shipsHit = new Set();
    if (markedLocation.has(JSON.stringify(location))) {
      const col = location[0];
      const row = location[1];
      let foundShip = JSON.stringify((ships.filter((ship) => ship.find((value) => value[0] === col
      && value[1] === row)))[0]);
      foundShip = unplacedShips.find((ship) => ship.boardLocation === foundShip);
      shipsHit.add(JSON.stringify(location));
      foundShip.hit();
      return foundShip.hits;
    }
  }

  return { board, getRandomLocation, createPlayerShip, placeShip, markedLocation, receiveAttack };
}

export { createBoard, Ship };
