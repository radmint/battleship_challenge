#!/usr/bin/env node

var inquirer = require('inquirer');
var chalk = require('chalk');
var figlet = require('figlet');
var questions = require('./server/questions');
var validation = require('./server/validation');
var players = require('./server/players');
var emoji = require('node-emoji');

console.log(
  chalk.bgBlue(
    figlet.textSync('BATTLE FOR SOULBOUND', {horizontalLayout: 'full'})
  )
);

initialMenu();

function initialMenu() {
  inquirer.prompt(questions.menu).then(function (answer) {
    if (answer.menuSelect === 'play battleship') {
      console.log(chalk.cyan('BEGIN SETUP'));
      console.log('Computer is setting their board...');
      console.log(chalk.cyan('SET YOUR SHIPS ' + emoji.get('ship')));
      console.log(players.human.battleGround);
      players.ai.move(validation);
      if (players.human.shipsPlaced.length < 5) {
        placement();
      } else {
        console.log('all ships placed');
      }
    } else if (answer.menuSelect === 'settings') {
      setSettings();
    } else if (answer.menuSelect === 'credits') {
      showCredits();
    } else if (answer.menuSelect === 'rules') {
      showRules();
    }
  });
}


function placement(ship) {
  inquirer.prompt(questions.placement).then(function (answer) {
    if (ship === undefined) {
      ship = players.human.getShip();
    }
    validation.allValidate(answer, ship, placement, players.human);
  });
}

function setSettings() {
  inquirer.prompt(questions.settings).then(function (answer) {
    players.ai.logging = answer.aiLog;
    players.human.logging = answer.humanLog;
    initialMenu();
  });
}

function showCredits() {
  console.log(chalk.cyan(figlet.textSync('PAIGE BYSTROM')));
  console.log(chalk.white(figlet.textSync('FUTURE SOULBOUND STUDIOS')));
  console.log(chalk.cyan(figlet.textSync('WEB DEVELOPER')));
  console.log(chalk.white(figlet.textSync('----------------------------')));
  console.log(chalk.cyan(figlet.textSync('JEROMY WALSH')));
  console.log(chalk.white(figlet.textSync('SOULBOUND STUDIOS')));
  console.log(chalk.cyan(figlet.textSync('CEO')));
  initialMenu();
}

function showRules() {
  console.log(chalk.cyan('The game has a setup phase in which players place their own ships of varying sizes on a 10x10 game board ',
    '(rows are indicated by letters, and columns are denoted by numbers), and then a play phase in which the players take turns',
    'guessing which cell (ex. A1 - J10) the other player\'s ships are on.'));
  console.log(chalk.yellow('If the player guesses correctly, the',
    'player is told they got a "hit". If they did not, they are told they got a "miss".'));
  console.log(chalk.cyan('Ships are varying sizes. Each player has 1x Carrier which is five cells long, 1x Battleship which is four cells',
    'long, 1x Cruiser that is three cells long, 1x Submarine which is three cells long, and 1x Destroyer which is',
    ',two cells long. When placing ships on the grid, they can be oriented horizontally or vertically, but not diagonally.'));
  console.log(chalk.yellow('Ships cannot share a cell on the game board. For example, if the Cruiser is on A1-A3, no other ship can',
    'be oriented such that any part of that ship is on A1, A2, or A3.'));
  console.log(chalk.cyan('If after guessing a cell, either player has "hit" all the cells of an opponent\'s ship, they are told they sunk',
    'that ship. For example, if my opponent has his Cruiser on A1-A3, and I have guessed all three of those',
    'cells, then upon guessing the final cell of the Cruiser I would be told: "Hit! You sunk my Cruiser."'));
  console.log(chalk.yellow('Play alternates, each player guessing one cell, until one player has sunk all five of the opponent\'s ships.'));
}
