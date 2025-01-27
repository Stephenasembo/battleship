import createBoard from './index';

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

describe('Ship objects instantiated correctly', () => {
  let myShip;
  beforeEach(() => {
    myShip = new Ship(4);
  })

  test('hit method works', () => {
    expect(myShip.hit()).toBe(1);
  })


  test('check if ship is sunk', () => {  
    expect(myShip.isSunk()).toBeFalsy();
  })
})

describe('Gameboard works correctly', () => {
  let board;
  beforeEach(() => {
    board = createBoard();
  })
  test('board has 10 rows', () => {
    expect(board.board.length).toBe(10);
  })
  test('each row has 10 columns', () => {
    expect(board.board[0].length).toBe(10);
  })
  describe('board gets coordinates for ship', () => {
    test('Coordinates are within boundaries', () => {
      const location = board.getRandomLocation();
      expect(location[0]).toBeLessThan(10);
      expect(location[0]).toBeGreaterThan(-1);
      expect(location[1]).toBeLessThan(10);
      expect(location[1]).toBeGreaterThan(-1);
    })
  })
});

describe('Gameboard places ships on game board', () => {
  let board;
  beforeEach(() => {
    board = createBoard();
  })
  test('Board creates players ships', () => {
    expect(board.createPlayerShip().length).toBe(10);
  })
  test.skip('Board places ship of size 4 correctly', () => {
    const markedLocation = [[0, 0], [0, 1], [0, 2], [0, 3]]
    expect(board.placeShip()).toEqual(markedLocation);
  })
  test.skip('Board places 2 ships of size 3 correctly', () => {
    const markedLocation = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]];
    expect(board.placeShip()).toEqual(markedLocation);
  })
  test.skip('Board places 3 ships of size 2 correctly', () => {
    const markedLocation = [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1]];
    expect(board.placeShip()).toEqual(markedLocation);
  });
  test.skip('Board places 4 ships of size 1 correctly', () => {
    const markedLocation = [[0, 0], [0, 1], [0, 2], [0, 3]];
    expect(board.placeShip()).toEqual(markedLocation);
  })
});
