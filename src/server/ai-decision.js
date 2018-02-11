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
  move: function () {
    ships.forEach(function (item) {
      var decision = placement(item);
      console.log(decision);
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
      console.log(battleGround);
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

function edgeCheck(index, shipLength, edge) {

}

function placement(item) {
  var decision = {
    row: grid.row[Math.floor(Math.random() * grid.row.length)],
    column: columnIndex(grid.column[Math.floor(Math.random() * grid.column.length)]),
    alignDecision: alignment[Math.floor(Math.random() * alignment.length)]
  };
  var log;
  if (decision.alignDecision === "vertical") {
    if ((decision.row + item.squares) > battleGround[0].length) {
      placement(item);
    } else {
      log = decision;
    }
  } else {
    if ((decision.column + item.squares) > battleGround[0].length) {
      placement(item);
    } else {
      log = decision;
    }
  }
  console.log(log);
  return log;
}
module.exports = ai;