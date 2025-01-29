import { createBoard, Ship } from './index';

let board;

beforeAll(() => {
  board = createBoard();
});

describe('Ship objects instantiated correctly', () => {
  let myShip;
  beforeEach(() => {
    myShip = new Ship(4);
  });

  test('hit method works', () => {
    expect(myShip.hit()).toBe(1);
  });

  test('check if ship is sunk', () => {
    expect(myShip.isSunk()).toBeFalsy();
  });
});

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
  let ships;
  beforeAll(() => {
    ships = board.createPlayerShip();
  });
  test('Board creates players ships', () => {
    expect(ships.length).toBe(10);
  });
  test('Board places ship of size 4 correctly', () => {
    expect(ships[0].length).toEqual(4);
  });
  test('Board places 2 ships of size 3 correctly', () => {
    expect(ships[1].length).toEqual(3);
    expect(ships[2].length).toEqual(3); 
  });
  test('Board places 3 ships of size 2 correctly', () => {
    expect(ships[3].length).toEqual(2);
    expect(ships[4].length).toEqual(2);
    expect(ships[5].length).toEqual(2);
  });
  test('Board places 4 ships of size 1 correctly', () => {
    expect(ships[6].length).toEqual(1);
    expect(ships[7].length).toEqual(1);
    expect(ships[8].length).toEqual(1);
    expect(ships[9].length).toEqual(1);
  });
});

describe('Ship does not occupy taken space by another', () => {
  let ships;
  beforeAll(() => {
    ships = board.placeShip();
  });
  test('Ship not placed on top of another', () => {
    const ship = ships[1];
    const coordinatesArr = ship.map((location) => JSON.stringify(location));
    expect(board.markedLocation.has(coordinatesArr[0])).toBeTruthy();
  });
});

describe.skip('Space available for ship', () => {
  test('Space available for size 4', () => {
    expect(board.placeShip()[1]).toBeLessThan(7);
  })
  test.skip('Space available for size 3', () => {
    expect(location[0]).toBeLessThan(8);
  })
  test.skip('Space available for size 2', () => {
    expect(location[0]).toBeLessThan(9);
  })
});

describe.only('Board receives attack', () => {
  test.skip('Attack recieved', () => {
    expect(board.receiveAttack([0, 0])).toBeTruthy();
    expect(board.receiveAttack([1, 1])).toBeFalsy();
  });
  test('Increase hits of target ship', () => {
    expect(board.receiveAttack([0, 0])).toEqual(1);
    expect(board.receiveAttack([0, 1])).toEqual(2);
    expect(board.receiveAttack([0, 2])).toEqual(3);
  });
});
