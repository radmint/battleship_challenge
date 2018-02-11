#!/usr/bin/env node

var inquirer = require('inquirer');
var chalk = require('chalk');
var ai = require('./server/ai-decision');

var questions = [
  {
    name: "menuSelect",
    message: "What would you like to do?",
    type: 'list',
    choices: ['Play Battleship', 'Settings', 'Credits', 'Rules'],
    filter: function (str) {
      return str.toLowerCase();
    }
  }
];

inquirer.prompt(questions).then(function (answer) {
  ai.move();
})
;
