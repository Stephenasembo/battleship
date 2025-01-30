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
  test('board has 10 rows', () => {
    expect(board.board.length).toBe(10);
  });
  test('each row has 10 columns', () => {
    expect(board.board[0].length).toBe(10);
  });
  describe('board gets coordinates for ship', () => {
    test('Coordinates are within boundaries', () => {
      const location = board.getRandomLocation();
      expect(location[0]).toBeLessThan(10);
      expect(location[0]).toBeGreaterThan(-1);
      expect(location[1]).toBeLessThan(10);
      expect(location[1]).toBeGreaterThan(-1);
    });
  });
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

describe.skip('Board receives attack', () => {
  beforeAll(() => {
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([0, 2]);
  });

  test.skip('Attack recieved', () => {
    expect(board.receiveAttack([0, 0])).toBeTruthy();
    expect(board.receiveAttack([1, 1])).toBeFalsy();
  });
  test.skip('Increase hits of target ship', () => {
    expect(board.receiveAttack([0, 0])).toEqual(1);
    expect(board.receiveAttack([0, 1])).toEqual(2);
    expect(board.receiveAttack([0, 2])).toEqual(3);
    expect(board.receiveAttack([0, 3])).toEqual(4);
    expect(board.receiveAttack([0, 0])).toEqual('invalid move');
  });
  test('Record missed shots', () => {
    expect(board.receiveAttack([4, 6])).toContainEqual([4, 6]);
    expect(board.receiveAttack([4, 6])).toEqual('invalid move');
  });
  test('All ships sunk', () => {
    expect(board.receiveAttack([0, 3])).toEqual('All player ships sunk');
  });
});
