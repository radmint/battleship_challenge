/**
 * Created by pbystrom on 2/13/18.
 */
var inquirer = require('inquirer');
var questions = require('./questions');
var emoji = require('node-emoji');
var chalk = require('chalk');
var players = require('./players');
var figlet = require('figlet');

var game = {
  start: function (who) {
    var guessResult;
    var opponent;
    if (who === undefined || who.id === players.human.id) {
      inquirer.prompt(questions.guess).then(function (answer) {
        opponent = players.ai;
        guessResult = game.existingGuessCheck(answer, opponent, players.human);
      });
    } else {
      answer = players.ai.decision();
      opponent = players.human;
      console.log('ai is guessing...');
      guessResult = game.existingGuessCheck(answer, opponent, players.ai)
    }
  },
  existingGuessCheck: function (guess, opponent, player) {
    var isValid = true;
    for (var playerIndex = 0; playerIndex < player.existingGuesses.length; playerIndex++) {
      if (guess.xAxis == player.existingGuesses[playerIndex].xAxis && guess.yAxis == player.existingGuesses[playerIndex].yAxis) {
        console.log(chalk.red('Already guessed', guess.xAxis, guess.yAxis));
        isValid = false;
        break;
      }
    }
    if (isValid) {
      game.guessCheck(guess, opponent, player);
    } else {
      game.start(player);
    }
  },
  guessCheck: function (guess, opponent, player) {
    var hit;
    for (var index = 0; index < opponent.shipCoords.length; index++) {
      if (guess.xAxis == opponent.shipCoords[index].x && guess.yAxis == opponent.shipCoords[index].y) {
        console.log(chalk.red(figlet.textSync('IT\'S A HIT!')));
        opponent.battleGround[guess.yAxis][guess.xAxis] = emoji.get('fire');
        player.hits += 1;
        if (player.hits >= 17) {
          game.gameEnd(player);
        } else {
          player.addGuess(guess);
          hit = true;
          break;
        }
      }
    }
    if (!hit) {
      console.log(chalk.blue(figlet.textSync('MISS!')));
      opponent.battleGround[guess.yAxis][guess.xAxis] = emoji.get('x')
      player.addGuess(guess);
      hit = true;
    }
    console.log(opponent.battleGround);
    game.turn(opponent);
  },
  turn: function (who) {
    if (who === undefined || who.id === players.human.id) {
      console.log(chalk.magenta('Player\'s Turn!'));
      who = players.human;
    } else {
      console.log(chalk.magenta('Computer\'s Turn!'));
      who = players.ai;
    }
    game.start(who);
  },
  gameEnd: function (winner) {
    if (winner.id === player.human.id) {
      console.log(chalk.cyan(figlet.textSync('YOU WIN!!!')));
    } else {
      console.log(chalk.red(figlet.textSync('COMPUTER WINS')));
    }
  }
};

module.exports = game;