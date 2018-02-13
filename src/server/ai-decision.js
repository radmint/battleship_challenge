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
    return new Promise(function (resolve, reject) {
      waitLoop(ships).then(function (result) {
        console.log('ships placed', result);
        if (ai.shipsPlaced.length === ships.length) {
          resolve(battleGround);
        } else {
          reject(Err("shoot it broke"));
        }
      });
    });
  }
};

function waitLoop(ships) {
  return new Promise(function (resolve, reject) {
    var index = 0;
    var positionDetermined = false;
    run();
    function run() {
      if (index < ships.length) {
        var item = ships[index++];
        waitForPlacement(item).then(function (decision) {
          console.log('after waitfor', decision);
          if (decision !== undefined) {
            positionDetermined = determinePosition(item, decision.row, decision.column, decision.alignDecision);
          }
          if (positionDetermined) {
            ai.shipsPlaced.push({row: decision.row, column: decision.column, squares: item.squares});
            run();
          } else {
            console.log(positionDetermined, 'positiondetermined');
          }
        });
      } else {
        console.log('no more ships', index, ships.length);
      }
    }
  });
}

function determinePosition(item, firstIndex, secondIndex, alignment) {
  var count = 0;
  var compvare = false;
  for (var subIndex = 0; subIndex < item.squares; subIndex++) {
    if (alignment === "vertical") {
      addToMap((firstIndex + subIndex), secondIndex);
      count++;
    } else {
      addToMap(firstIndex, (secondIndex + subIndex));
      count++;
    }
  }
  if (count === item.squares) {
    compvare = true;
  }
  console.log(compvare);
  return compvare;
}

function addToMap(firstIndex, secondIndex) {
  battleGround[firstIndex][secondIndex] = "X";
}

function columnIndex(column) {
  for (var index = 0; index < battleGround.length; index++) {
    if (battleGround[index][0] == column) {
      return index;
    }
  }
}

function checkForExistingShip(decision, shipLength) {
  return new Promise(function (resolve, reject) {
    var index = 0;
    var subIndex = 0;
    check();
    function check() {
      var ship = ai.shipsPlaced[index++];
      if (index < ai.shipsPlaced.length) {
        innerCheck();
        function innerCheck() {
          var indexCheck = subIndex++;
          if (subIndex < shipLength) {
            if (decision.alignDecision == "vertical") {
              if ((ship.row + indexCheck) === decision.row) {
                if (ship.column === decision.column) {
                  reject('it matched');
                }
              }
            } else {
              if ((ship.column + indexCheck) === decision.column) {
                if (ship.row === decision.row) {
                  reject('it matched');
                }
              }
            }
          } else {
            console.log('decision in ship check', decision);
            resolve(decision);
          }
        }
      }
    }
  });
}

function waitForPlacement(item) {
  return new Promise(function (resolve, reject) {
    placement(item);
    function placement(item) {
      var decision = {
        row: grid.row[Math.floor(Math.random() * grid.row.length)],
        column: columnIndex(grid.column[Math.floor(Math.random() * grid.column.length)]),
        alignDecision: alignment[Math.floor(Math.random() * alignment.length)]
      };
      if (decision.row + item.squares > 10) {
        placement(item);
      } else if (decision.column + item.squares > 10) {
        placement(item);
      } else {
        if (decision) {
          checkForExistingShip(decision, item.squares).then(function (decision) {
            console.log('compvare check');
            resolve(decision);
          }).catch(function(err) {
            placement(item);
          });
        }
      }
    }
  });
}
module.exports = ai;