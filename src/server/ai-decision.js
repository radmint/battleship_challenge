/**
 * Created by pbystrom on 2/10/18.
 */
var grid = require('./grid');
var ships = require('./ships');

var alignment = ["horizontal", "vertical"];

var battleGround = [
  [" ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  ["A", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["B", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["C", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["D", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["E", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["F", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["G", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["H", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["I", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["J", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
];

ai = {
  shipsPlaced: [],
  move: function () {
    return new Promise(function (resolve, result) {
      ships.forEach(function (item) {
        placement(item).then(function (results) {
          decision = results;
          if (decision !== undefined) {
            if (decision.alignDecision == "vertical") {
              for (var index = 0; index < item.squares; index++) {
                battleGround[decision.row + index][decision.column] = "X"
              }
            } else {
              for (var subIndex = 0; subIndex < item.squares; subIndex++) {
                battleGround[decision.row][decision.column + subIndex] = "X"
              }
            }
          }
        });
      });
      resolve(battleGround);
    });
  }
};

function columnIndex(column) {
  for (var index = 0; index < battleGround.length; index++) {
    if (battleGround[index][0] == column) {
      return index;
    }
  }
}

function checkForExistingShip(decision, shipLength) {
  return new Promise(function (resolve, result) {
    var passed = true;
    ai.shipsPlaced.forEach(function (item) {
      for (var index = 0; index < shipLength; index++) {
        if (decision.alignDecision == "vertical") {
          if ((item.row + index) === decision.row) {
            if (item.column === decision.column) {
              passed = false;
            }
          }
        } else {
          if ((item.column + index) === decision.column) {
            if (item.row === decision.row) {
              passed = false;
            }
          }
        }
      }
    });
    if (passed) {
      resolve();
    } else {
      reject();
    }
  });
}

function addToShipsArray(decision) {
  ai.shipsPlaced.push({row: decision.row, column: decision.column});
}

function placement(item) {
  return new Promise(function (resolve, result) {
    var decision = {
      row: grid.row[Math.floor(Math.random() * grid.row.length)],
      column: columnIndex(grid.column[Math.floor(Math.random() * grid.column.length)]),
      alignDecision: alignment[Math.floor(Math.random() * alignment.length)]
    };
    if (decision.alignDecision === "vertical") {
      if ((decision.row + item.squares) > battleGround[0].length) {
        placement(item);
      } else {
        checkForExistingShip(decision, item.squares).then(function (results) {
          addToShipsArray(decision);
        }, function (err) {
          placement(item);
        });
        resolve(decision);
      }
    } else {
      if ((decision.column + item.squares) > battleGround[0].length) {
        placement(item);
      } else {
        checkForExistingShip(decision, item.squares).then(function (results) {
          addToShipsArray(decision);
        }, function (err) {
          placement(item);
        });
        resolve(decision);
      }
    }
  });
}
module.exports = ai;