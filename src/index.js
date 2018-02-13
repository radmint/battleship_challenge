#!/usr/bin/env node

var inquirer = require('inquirer');
var chalk = require('chalk');
var ai = require('./server/ai-decision');
var figlet = require('figlet');
var questions = require('./server/questions');
var grid = require('./server/grid');
var validation = require('./server/validation');
var player = require('./server/player');

console.log(
  chalk.red(
    figlet.textSync('BATTLESHIP', {horizontalLayout: 'full'})
  )
);

initialMenu();

function initialMenu() {
  inquirer.prompt(questions.menu).then(function (answer) {
    if (answer.menuSelect === 'play battleship') {
      if (player.shipsPlaced.length < 5) {
        placement();
      } else {
        console.log('all ships placed');
      }
    }
    // ai.move().then(function (result) {
    //   console.log('final', result);
    // });
  });
}


function placement(ship) {
  inquirer.prompt(questions.placement).then(function (answer) {
    console.log(ship);
    if(ship === undefined) {
      ship = player.ships.shift();
    }
    console.log(player.ships);
    console.log('Beginning validation with the', ship.name, 'ship...');
    var valid = validation.edgeValidate(answer, ship);
    if (valid === true) {
      console.log('is valid?', valid);
      var place = validation.placementValidate(answer, ship);
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
  });
}

