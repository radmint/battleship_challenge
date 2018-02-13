/**
 * Created by pbystrom on 2/10/18.
 */
var grid = require('./grid');
var ships = require('./ships');
var validation = require('./validation');

ai = {
  shipsPlaced: [],
  ships: ships,
  move: function () {
    doTheThing();
    function doTheThing(ship) {
      if (ship === undefined) {
        console.log('ship is undefined',this.ships);
        ship = this.ships.shift();
      }
      var decision = this.decision();
      var aiValidate = allValidate(decision,ship);
      console.log(aiValidate);
    }
  },
  battleGround: [
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
  ],
  decision: function () {
    return {
      row: (grid.row[Math.floor(Math.random() * grid.row.length)]).value,
      column: (grid.column[Math.floor(Math.random() * grid.column.length)]).value,
      alignDecision: (grid.alignment[Math.floor(Math.random() * grid.alignment.length)]).toLowerCase()
    };
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

      if (decision.row + item.squares > 10) {
        placement(item);
      } else if (decision.column + item.squares > 10) {
        placement(item);
      } else {
        if (decision) {
          checkForExistingShip(decision, item.squares).then(function (decision) {
            console.log('compvare check');
            resolve(decision);
          }).catch(function (err) {
            placement(item);
          });
        }
      }
    }
  });
}
module.exports = ai;