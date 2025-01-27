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
  test.skip('board has 10 rows', () => {
    expect(board.length).toBe(10);
  })
  test.skip('each row has 10 columns', () => {
    expect(board[0].length).toBe(10);
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
    expect(board.placeShip().length).toBe(10);
  })
});
