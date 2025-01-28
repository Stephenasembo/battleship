class Ship {
  #hits = 0;
  constructor(length) {
    this.length = length;
  }
  hit() {
    this.#hits += 1;
    return this.#hits;
  }
  isSunk() {
    if (this.#hits >= this.length) {
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
    if (col > boundary) {
      return getRandomLocation();
    } 
    return [row, col];
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

  function placeShip() {
    const shipsArr = createPlayerShip();
    const placedShips = [];
    
    for (let i = 0; i < shipsArr.length; i += 1) {
      if (shipsArr[i].length === 4) {
        const location = getRandomLocation(7);
        const shipLocation = [];
        const col = location[0];
        let row = location[1];
        for (let i = 0; i < 4; i += 1) {
          shipLocation.push([col, row]);
          markedLocation.add([col, row]);
          row += 1;    
        }
        placedShips.push(shipLocation);
      }
      if (shipsArr[i].length === 3) {
        const location = getRandomLocation(8);
        const shipLocation = [];
        let col = location[0];
        let row = location[1];
        for (let j = 0; j < 3; j += 1) {
          shipLocation.push([col, row]);
          markedLocation.add([col, row]);
          row += 1;
        }
        placedShips.push(shipLocation);
        col += 1;
        row = location[1];
      }
      if (shipsArr[i].length === 2) {
        const location = getRandomLocation(8);
        const shipLocation = [];
        let col = location[0];
        let row = location[1];
        for (let i = 0; i < 2; i += 1) {
          shipLocation.push([col, row]);
          markedLocation.add([col, row]);
          row += 1;
        }
        placedShips.push(shipLocation);
        col += 1;
        row = location[1];
      }
      if (shipsArr[i].length === 1) {
        const location = getRandomLocation(8);
        const shipLocation = [];
        let col = location[0];
        let row = location[1];
        shipLocation.push([col, row]);
        markedLocation.add([col, row]);
        placedShips.push(shipLocation);
        row += 1;
      }
    }

    return placedShips;
  }

  return { board, getRandomLocation, createPlayerShip, placeShip, markedLocation };
}

export default createBoard;