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
        // placement();
        console.log('placement would be run here');
      } else {
        console.log('all ships placed');
      }
    }
    ai.move();
  });
}


function placement(ship) {
  inquirer.prompt(questions.placement).then(function (answer) {
    console.log(ship);
    if(ship === undefined) {
      ship = player.ships.shift();
    }
    validation.allValidate(answer,ship);
    console.log(player.ships);
    console.log('Beginning validation with the', ship.name, 'ship...');

  });
}

