
let grid = {
  size: 10,
  alignment: ['Horizontal', 'Vertical'],
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
  determinePosition: function (ship, answer, who) {
    let count = 0;
    let compare = false;
    for (let subIndex = 0; subIndex < ship.length; subIndex++) {
      if (answer.alignmentSelect === "horizontal") {
        this.addToMap(answer.yAxis, (answer.xAxis + subIndex), who);
        count++;
      } else {
        this.addToMap((answer.yAxis + subIndex), answer.xAxis, who);
        count++;
      }
    }
    if (count === ship.length) {
      compare = true;
    }
    return compare;
  },
  addToMap: function (firstIndex, secondIndex, who) {
    who.battleGround[firstIndex][secondIndex] = 'X';
  }
};

module.exports = grid;