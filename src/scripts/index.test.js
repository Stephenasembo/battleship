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
    expect(board.length).toBe(10);
  })
  test('each row has 10 columns', () => {
    expect(board[0].length).toBe(10);
  })
});
