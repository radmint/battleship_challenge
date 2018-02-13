/**
 * Created by pbystrom on 2/12/18.
 */
var ships = require('./ships');
var player = require('./player');

var validation = {
  edgeValidate: function (answer,ship) {
    console.log('validating edge...');
    var result;
    var shipLength = ship.squares;
    var x = parseInt(answer.xAxis);
    var y = parseInt(answer.yAxis);

    if ((x + shipLength) > 10) {
      console.log('edge validation failed');
      result = false;
    } else if ((y + shipLength) > 10) {
      console.log('edge validation failed');
      result = false;
    } else {
      console.log('edge validation passed');
      result = true;
    }
    return result;
  },
  placementValidate: function (newPlacement,ship) {
    console.log('validating existing ship placement...');
    var result;
    if (player.shipsPlaced.length > 0) {
      for (var index = 0; index < player.shipsPlaced.length; index++) {
        var shipPlaced = player.shipsPlaced[index];
        for (var subIndex = 0; subIndex < ship.squares; subIndex++) {
          if (newPlacement.xAxis === (shipPlaced.xAxis + subIndex)) {
            if (newPlacement.yAxis === shipPlaced.yAxis) {
              console.log('ship placement invalid - x axis');
              result = false;
              break;
            }
          } else if (newPlacement.yAxis === (shipPlaced.yAxis + subIndex)) {
            if (newPlacement.xAxis === shipPlaced.xAxis) {
              console.log('ship placement invalid - y axis');
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