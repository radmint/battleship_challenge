/**
 * Created by pbystrom on 2/12/18.
 */
var grid = require('./grid');
var game = require('./game');
var players = require('./players');
var chalk = require('chalk');
/**
 * Validation methods for newly placed ships
 * @type {{edgeValidate: validation.edgeValidate, placementValidate: validation.placementValidate, allValidate: validation.allValidate}}
 */
var validation = {
  edgeValidate: function (answer, ship) {
    // console.log('validating edge...');
    var result = true;
    var shipLength = ship.length;
    var x = parseInt(answer.xAxis);
    var y = parseInt(answer.yAxis);

    if (answer.alignmentSelect === 'horizontal') {
      if ((x + shipLength) - 1 > grid.size) { // minus 1 because count wasn't starting on the index of x
        // console.log('x edge validation failed', x, shipLength);
        result = false;
      }
    } else {
      if ((y + shipLength) - 1 > grid.size) {
        // console.log('y edge validation failed', y, shipLength);
        result = false;
      }
    }
    return result;
  },
  placementValidate: function (answer, ship, who) {
    // console.log('validating existing ship placement...');
    var result;
    if (who.shipsPlaced.length > 0) {
      for (var index = 0; index < who.shipCoords.length; index++) {
        var coordinate = who.shipCoords[index];
        for (var subIndex = 0; subIndex < ship.length; subIndex++) {
          if (answer.alignmentSelect === 'vertical') {
            if (coordinate.x == answer.xAxis && coordinate.y == answer.yAxis + subIndex) {
              // console.log('x and y axis match', coordinate, answer.xAxis, answer.yAxis + subIndex);
              result = false;
              break;
            } else {
              result = true;
            }
          } else {
            if (coordinate.x == answer.xAxis + subIndex && coordinate.y == answer.yAxis) {
              // console.log('x and y axis match', coordinate, answer.xAxis + subIndex, answer.yAxis);
              result = false;
              break;
            } else {
              result = true;
            }
          }
        }
        if (result === false) {
          break;
        }
      }
    } else {
      result = true;
    }
    return result;
  },
  allValidate: function (answer, ship, callback, who) {
    var valid = this.edgeValidate(answer, ship);
    if (valid === true) {
      var place = this.placementValidate(answer, ship, who);
      if (place === true) {
        // console.log('adding ship to array');
        who.addToPlacedShips(answer);
        who.addShipCoords(answer, ship);
        if (who.id === players.human.id) { /* NOTE: If you want to see AI ship locations, remove this conditional*/
          grid.determinePosition(ship, answer, who);
          console.log(chalk.cyan('UPDATING BOARD...'));
          console.log(who.battleGround);
        }
        if (who.shipsPlaced.length < 5) {
          callback();
        } else {
          if (who.id === players.human.id) {
            console.log(chalk.cyan('SETUP FINISHED'));
            console.log(chalk.cyan('GAME STARTING!'));
            console.log(chalk.cyan('PREPARE YOUR GUESSES'));
            game.start();
          }
        }
      } else {
        if (players.ai.logging && players.human.logging) {
          console.log('ship overlaps another ship, try again');
        }
        callback(ship);
      }
    } else {
      if (players.ai.logging && players.human.logging) {
        console.log('ship too close to edge, try again');
      }
      callback(ship);
    }
  }
};

module.exports = validation;