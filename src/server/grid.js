var player = require('./player');

var grid = {
  row: [
    {name: "1", value: 1, short: "1"},
    {name: "2", value: 2, short: "2"},
    {name: "3", value: 3, short: "3"},
    {name: "4", value: 4, short: "4"},
    {name: "5", value: 5, short: "5"},
    {name: "6", value: 6, short: "6"},
    {name: "7", value: 7, short: "7"},
    {name: "8", value: 8, short: "8"},
    {name: "9", value: 9, short: "9"},
    {name: "10", value: 10, short: "10"}
  ],
  column: [
    {name: "A", value: 1, short: "A"},
    {name: "B", value: 2, short: "B"},
    {name: "C", value: 3, short: "C"},
    {name: "D", value: 4, short: "D"},
    {name: "E", value: 5, short: "E"},
    {name: "F", value: 6, short: "F"},
    {name: "G", value: 7, short: "G"},
    {name: "H", value: 8, short: "H"},
    {name: "I", value: 9, short: "I"},
    {name: "J", value: 10, short: "J"}
  ],
  determinePosition: function (ship, answer) {
    console.log('determining position...');
    var count = 0;
    var compare = false;
    for (var subIndex = 0; subIndex < ship.squares; subIndex++) {
      if (answer.alignmentSelect === "horizontal") {
        this.addToMap(answer.yAxis, (answer.xAxis + subIndex));
        count++;
      } else {
        this.addToMap((answer.yAxis + subIndex), answer.xAxis);
        count++;
      }
    }
    if (count === ship.squares) {
      compare = true;
    }
    console.log('position determined', compare);
    return compare;
  },
  addToMap: function (firstIndex, secondIndex) {
    console.log('adding to map...');
    player.battleGround[firstIndex][secondIndex] = "X";
  }
};

module.exports = grid;