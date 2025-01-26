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
    expect(myShip.isSunk()).toBeTruthy();
  })
})