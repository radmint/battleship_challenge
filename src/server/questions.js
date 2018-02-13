/**
 * Created by pbystrom on 2/12/18.
 */
var grid = require('./grid');
var ships = require('./ships');

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
        {name: 'Rules', value: 'Rules'}
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
      choices: ['Horizontal', 'Vertical'],
      filter: function (str) {
        return str.toLowerCase();
      }
    }
  ]
};

module.exports = questions;