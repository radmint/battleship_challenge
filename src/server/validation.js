/**
 * Created by pbystrom on 2/12/18.
 */
var ships = require('./ships');
var player = require('./player');
var grid = require('./grid');

var validation = {
  edgeValidate: function (answer, ship) {
    console.log('validating edge...');
    var result = true;
    var shipLength = ship.squares;
    var x = parseInt(answer.xAxis);
    var y = parseInt(answer.yAxis);

    if (answer.alignmentSelect === 'horizontal') {
      if ((x + shipLength) - 1 > grid.size) { // minus 1 because count wasn't starting on the index of x
        console.log('x edge validation failed', x, shipLength);
        result = false;
      }
    } else {
      if ((y + shipLength) - 1 > grid.size) {
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
  },
  allValidate: function(answer,ship) {
    var valid = this.edgeValidate(answer, ship);
    if (valid === true) {
      console.log('is valid?', valid);
      var place = this.placementValidate(answer, ship);
      if (place === true) {
        console.log('can be placed?', place);
        console.log('adding ship to array');
        player.addToPlacedShips(answer);
        grid.determinePosition(ship, answer);
        console.log(player.battleGround);
        console.log('ship array is now', player.shipsPlaced);
        if(player.shipsPlaced.length < 5) {
          placement();
        } else {
          console.log('all ships placed');
        }
      } else {
        console.log('ship overlaps another ship, try again');
        placement(ship);
      }
    } else {
      console.log('ship too close to edge, try again');
      placement(ship);
    }
  }
};

module.exports = validation;