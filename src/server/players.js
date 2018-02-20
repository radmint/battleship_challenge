/**
 * Created by pbystrom on 2/10/18.
 */
let grid = require('./grid');

/**
 * AI methods and objects
 * @type {{shipsPlaced: Array, shipCoords: Array, addShipCoords: ai.addShipCoords, ships: [*], move: ai.move, addToPlacedShips: ai.addToPlacedShips, getShip: ai.getShip, battleGround: [*], decision: ai.decision}}
 */
function Player(id, ships, logging, name) {
  this.name = name;
  this.id = id;
  this.shipsPlaced = [];
  this.shipCoords = [];
  this.addShipCoords = function (answer, ship) {
    for (let index = 0; index < ship.length; index++) {
      if (answer.alignmentSelect === 'vertical') {
        this.shipCoords.push({x: answer.xAxis, y: answer.yAxis + index});
      } else {
        this.shipCoords.push({x: answer.xAxis + index, y: answer.yAxis});
      }
    }
  };
  this.ships = [
    {
      id: 0,
      name: "Carrier",
      length: 5
    },
    {
      id: 1,
      name: "Battleship",
      length: 4
    },
    {
      id: 2,
      name: "Cruiser",
      length: 3
    },
    {
      id: 3,
      name: "Submarine",
      length: 3
    },
    {
      id: 4,
      name: "Destroyer",
      length: 2
    }
  ];
  this.getShip = function () {
    return this.ships.shift();
  };
  this.addToPlacedShips = function (ship) {
    this.shipsPlaced.push(ship);
  };
  this.logging = logging;
  this.existingGuesses = [];
  this.addGuess = function (guess) {
    this.existingGuesses.push(guess);
  };
  this.hits = 0;
}

let players = {
  computer: new Player(0, this.ships, false, "Computer"),
  human: new Player(1, this.ships, true, "Human")
};

players.computer.move = function (validation) {
  makeAiMove();
  function makeAiMove(ship) {
    if (ship === undefined) {
      ship = players.computer.getShip();
    }
    let decision = players.ai.decision();
    validation.allValidate(decision, ship, makeAiMove, players.computer);
  }
};

players.computer.decision = function () {
  return {
    xAxis: parseInt((grid.row[Math.floor(Math.random() * grid.row.length)]).value),
    yAxis: parseInt((grid.column[Math.floor(Math.random() * grid.column.length)]).value),
    alignmentSelect: (grid.alignment[Math.floor(Math.random() * grid.alignment.length)]).toLowerCase()
  }
};

module.exports = players;