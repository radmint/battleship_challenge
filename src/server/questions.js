/**
 * Created by pbystrom on 2/12/18.
 */
var grid = require('./grid');

var questions = {
  menu: [
    {
      name: 'menuSelect',
      message: 'What would you like to do?',
      type: 'list',
      choices: [
        {name: 'Play Battleship', value: 'Play Battleship'},
        {name: 'Settings', value: 'Settings'},
        {name: 'Credits', value: 'Credits'},
        {name: 'Rules', value: 'Rules'},
        {name: 'Exit', value: 'Exit'}
      ],
      filter: function (str) {
        return str.toLowerCase();
      }
    }
  ],
  placement: [
    {
      name: 'yAxis',
      message: 'Select the Y axis',
      type: 'list',
      choices: grid.column
    },
    {
      name: 'xAxis',
      message: 'Select the X axis',
      type: 'list',
      choices: grid.row
    },
    {
      name: 'alignmentSelect',
      message: 'Align horizontal or vertical?',
      type: 'list',
      choices: grid.alignment,
      filter: function (str) {
        return str.toLowerCase();
      }
    }
  ],
  guess: [
    {
      name: 'yAxis',
      message: 'Select your guess for the Y axis',
      type: 'list',
      choices: grid.column
    },
    {
      name: 'xAxis',
      message: 'Select your guess for the X axis',
      type: 'list',
      choices: grid.row
    }
  ],
  settings: [
    {
      name: 'aiLog',
      message: 'Turn AI Logging on or off',
      type: 'list',
      choices: [
        {name: 'On (you cheater)', value: true},
        {name: 'Off', value: false}
      ]
    },
    {
      name: 'humanLog',
      message: 'Turn Human Logging on or off',
      type: 'list',
      choices: [
        {name: 'On', value: true},
        {name: 'Off', value: false}
      ]
    }
  ]
};

module.exports = questions;