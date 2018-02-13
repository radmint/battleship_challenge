/**
 * Created by pbystrom on 2/12/18.
 */
var ships = require('./ships');
var player = require('./player');

var validation = {
  edgeValidate: function (answer, ship) {
    console.log('validating edge...');
    var result = true;
    var shipLength = ship.squares;
    var x = parseInt(answer.xAxis);
    var y = parseInt(answer.yAxis);

    if (answer.alignmentSelect === 'horizontal') {
      if ((x + shipLength) - 1 > 10) { // minus 1 because count wasn't starting on the index of x
        console.log('x edge validation failed', x, shipLength);
        result = false;
      }
    } else {
      if ((y + shipLength) - 1 > 10) {
        console.log('y edge validation failed', y, shipLength);
        result = false;
      }
    }
    return result;
  },
  placementValidate: function (newPlacement, ship) {
    console.log('validating existing ship placement...');
    var result;
    if (player.shipsPlaced.length > 0) {
      for (var index = 0; index < player.shipsPlaced.length; index++) {
        var shipPlaced = player.shipsPlaced[index];
        for (var subIndex = 1; subIndex < ship.squares; subIndex++) {
          if (newPlacement.xAxis === (shipPlaced.xAxis + subIndex)) {
            console.log('ship placement invalid - x axis', newPlacement.xAxis, shipPlaced.xAxis + subIndex);
            if (newPlacement.yAxis === shipPlaced.yAxis) {
              console.log('ship placement invalid - y axis', newPlacement.yAxis, shipPlaced.yAxis + subIndex);
              result = false;
              break;
            }
          } else if (newPlacement.yAxis === shipPlaced.yAxis) {
            console.log('ship placement invalid - y axis', newPlacement.yAxis, shipPlaced.yAxis + subIndex);
            if (newPlacement.xAxis === (shipPlaced.xAxis + subIndex)) {
              console.log('ship placement invalid - x axis', newPlacement.xAxis, shipPlaced.xAxis + subIndex);
              result = false;
              break;
            }
          } else {
            result = true;
          }
        }
      }
    } else {
      console.log('ship placement validation passed');
      result = true;
    }
    return result;
  }
};

module.exports = validation;