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

  function getRandomLocation() {
    const row = Math.floor((Math.random()) * 10);
    const col = Math.floor((Math.random()) * 10); 
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
    const location = [0, 0];
    const markedLocation = [];
    const row = location[0];
    let initial = location[1];
    for (let i = 0; i < 4; i += 1) {
      board[row, initial] = 's';
      markedLocation.push([row, initial]);
      initial += 1;
    }
    return markedLocation;
  }

  return { board, getRandomLocation, createPlayerShip, placeShip };
}

export default createBoard;