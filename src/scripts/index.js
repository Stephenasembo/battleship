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
    // const location = getRandomLocation();
    const markedLocation = new Set ();
    const placedShips = [];
    // let col = location[0];
    // let row = location[1];
    
    for (let i = 0; i < shipsArr.length; i += 1) {
      if (shipsArr[i].length === 4) {
        const location = getRandomLocation(7);
        return location;
        for (let i = 0; i < 4; i += 1) {
          shipLocation.push(board[col, row]);
          markedLocation.add([col, row]);
          row += 1;    
        }
        placedShips.push(shipLocation);
      }
      // if (shipsArr[i].length === 3) {
      //   for (let j = 0; j < 3; j += 1) {
      //     board[col, row] = 's';
      //     markedLocation.add([col, row]);
      //     row += 1;
      //   }
      //   col += 1;
      //   row = location[1];
      // }
      // if (shipsArr[i].length === 2) {
      //   for (let i = 0; i < 2; i += 1) {
      //     board[col, row] = 's';
      //     markedLocation.add([col, row]);
      //     row += 1;
      //   }
      //   col += 1;
      //   row = location[1];
      // }
      // if (shipsArr[i].length === 1) {
      //   board[col, row] = 's';
      //   markedLocation.add([col, row]);
      //   row += 1;
      // }
    }

    return [...markedLocation];
  }

  return { board, getRandomLocation, createPlayerShip, placeShip };
}

export default createBoard;