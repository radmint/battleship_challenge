/**
 * Created by pbystrom on 2/10/18.
 */
var emoji = require('node-emoji');
var ocean = emoji.get('ocean');
var grid = require('./grid');
var ships = require('./ships');

/**
 * AI methods and objects
 * @type {{shipsPlaced: Array, shipCoords: Array, addShipCoords: ai.addShipCoords, ships: [*], move: ai.move, addToPlacedShips: ai.addToPlacedShips, getShip: ai.getShip, battleGround: [*], decision: ai.decision}}
 */
function Player(id, ships, logging) {
  this.id = id;
  this.shipsPlaced = [];
  this.shipCoords = [];
  this.addShipCoords = function (answer, ship) {
    for (var index = 0; index < ship.length; index++) {
      if (answer.alignmentSelect === 'vertical') {
        this.shipCoords.push({x: answer.xAxis, y: answer.yAxis + index});
      } else {
        this.shipCoords.push({x: answer.xAxis + index, y: answer.yAxis});
      }
    }
  };
  this.ships = [
    {
      name: "Carrier",
      length: 5
    },
    {
      name: "Battleship",
      length: 4
    },
    {
      name: "Cruiser",
      length: 3
    },
    {
      name: "Submarine",
      length: 3
    },
    {
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
  this.battleGround = [
    [" ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ["A", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean],
    ["B", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean],
    ["C", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean],
    ["D", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean],
    ["E", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean],
    ["F", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean],
    ["G", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean],
    ["H", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean],
    ["I", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean],
    ["J", ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean, ocean]
  ];
  this.logging = logging;
  this.existingGuesses = [];
  this.addGuess = function (guess) {
    this.existingGuesses.push(guess);
  };
  this.hits = 0;
}

var players = {
  ai: new Player(0, ships, false),
  human: new Player(1, ships, true)
};

players.ai.move = function (validation) {
  makeAiMove();
  function makeAiMove(ship) {
    if (ship === undefined) {
      ship = players.ai.getShip();
    }
    var decision = players.ai.decision();
    validation.allValidate(decision, ship, makeAiMove, players.ai);
  }
};

players.ai.decision = function () {
  return {
    xAxis: parseInt((grid.row[Math.floor(Math.random() * grid.row.length)]).value),
    yAxis: parseInt((grid.column[Math.floor(Math.random() * grid.column.length)]).value),
    alignmentSelect: (grid.alignment[Math.floor(Math.random() * grid.alignment.length)]).toLowerCase()
  }
};

module.exports = players;