import {
  player1,
  player2,
  startGame,
  openP1Form,
  openP2Form
} from '../driver';

import { displayBoardShips, displayShips } from '../ui';
import { dom } from '../dom';

// No more placement of ships after choice is made
function deactivatePlacement(player, autoPlaceFn) {
  if (player.type === 'human') {
    dom.p1AutoBtn.removeEventListener('click', autoPlaceFn);
    dom.p1ManualBtn.removeEventListener('click', openP1Form);
  } else if (player.type === 'computer') {
    dom.p2AutoBtn.removeEventListener('click', autoPlaceFn);
    dom.p2ManualBtn.removeEventListener('click', openP2Form);
  }
  startGame();
}

// Places player's ships randomly on the board
function autoPlaceShips(event) {
  let player;
  if (event.target.id === 'p1Auto') {
    player = player1;
  } else if (event.target.id === 'p2Auto') {
    player = player2;
  }
  player.playerPlacedShips = player.gameBoard.placeShip(player.unplacedShips);
  displayBoardShips(player);
  player.isReady = true;
  deactivatePlacement(player, autoPlaceShips);
}

// Place the ships based on coordinate input
function manualShipPlacement(player, inputObj) {
  const ships = player.unplacedShips;
  const shipLocationsArr = Object.values(inputObj);
  for (let i = 0; i < shipLocationsArr.length; i += 1) {
    let location = shipLocationsArr[i];
    location = location.split(' ');
    location = location.map((coordinates) => coordinates.split(','));
    for (let j = 0; j < location.length; j += 1) {
      location[j] = location[j].map((coordinates) => Number(coordinates));
    }

    // Convert coordinates into numbers
    location = location.map((coordinates) => {
      const array = coordinates;
      return array.map((element) => Number(element));
    });

    ships[i].boardLocation = location;
    player.playerPlacedShips.push(location);
    let boardName;
    if (player === player1) {
      boardName = 'p1';
    } else {
      boardName = 'p2';
    }
    displayShips(ships[i], boardName);
  }
  for (let i = 0; i < player.playerPlacedShips.length; i += 1) {
    player.playerPlacedShips[i].forEach((coordinates) => {
      player.gameBoard.markedLocation.add(JSON.stringify(coordinates));
    });
  }
  deactivatePlacement(player, autoPlaceShips);
}

export { deactivatePlacement, autoPlaceShips, manualShipPlacement };
