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
  return board;
}

export default createBoard;