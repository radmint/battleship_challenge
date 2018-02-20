import React from 'react';
import '../../assets/index.css';
import Players from '../../server/players';
import $ from 'jquery';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(100).fill(null),
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares:squares});
  }

  renderSquare(i) {
    let row = [];
    for (let index = 10; index < 110; index+=10) {
      row.push(
        (<Square value={this.state.squares[(index + i)]}
                 onClick={() => this.handleClick((index + i))}
        />)
      )
    }
    return (
      <div className="row">
        <div className="board-label">{i}</div>
        {row}
      </div>
    );
  }

  render() {
    let initialLabel = <div className="board-label"></div>
    let column = [];
    let boardLabel = [initialLabel];
    for (let index = 1; index < 11; index++) {
      boardLabel.push(
        (<div className="board-label">
            {index}
          </div>
        )
      );
      column.push(
        (<div className="column">
          {this.renderSquare(index)}
        </div>)
      )
    }
    return (
      <div className="board">
        <div className="player-name">
          <h3>{this.props.player.name}</h3>
        </div>
        {boardLabel}
        <div className="board-row">
          {column}
        </div>
        <div className="ships-container">
          <ShipContainer ships={this.props.player.ships.slice()} player={this.props.player.id}/>
        </div>
      </div>
    );
  }
}

class ShipContainer extends React.Component {
  render() {
    let shipsArray = [];
    for (let index = 0; index < this.props.ships.length; index++) {
      shipsArray.push(
        (<tr>
          <td>{this.props.ships[index].name}</td>
          <td>{this.props.ships[index].length}</td>
          <td>
            <button value={this.props.ships[index].id}
                    onClick={(e) => beginShipPlacement(this.props.ships[index], 'horizontal')}>
              Place Horizontal Ship
            </button>
            <button value={this.props.ships[index].id}
                    onClick={(e) => beginShipPlacement(this.props.ships[index], 'vertical')}>
              Place Vertical Ship
            </button>
          </td>
        </tr>)
      )
    }
    return (
      <table>
        <thead>
        <tr>
          <th>
            Ship Name
          </th>
          <th>
            Ship Length
          </th>
          <th>
            Place
          </th>
        </tr>
        </thead>
        <tbody>
        {shipsArray}
        </tbody>
      </table>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board player={Players.human}/>
          <Board player={Players.computer}/>
        </div>
      </div>
    );
  }
}

function beginShipPlacement(ship, orientation) {
  $('.square').off('mouseenter').off('mouseleave');
  if (orientation === 'horizontal') {
    horizontalHover(ship);
  } else {
    verticalHover(ship);
  }
}


function horizontalHover(selectedShip) {
  $('.square').on('mouseenter', function () {
    let $selection = $(this).nextAll('button').slice(0, selectedShip.length - 1);
    $(this).addClass("square-hover");
    $selection.addClass("square-hover");
  }).on('mouseleave', function () {
    $('.square').removeClass("square-hover");
  });
}

function verticalHover(selectedShip) {
  $('.square').on('mouseenter', function () {
    let $squareIndex = ($(this).index());
    let $squareParent = $(this).parent().parent().nextAll().addBack().slice(0, selectedShip.length);
    $squareParent.map(function () {
      let $selection = ($(this).children().children().eq($squareIndex));
      $selection.addClass("square-hover");
    });
  }).on('mouseleave', function () {
    $('.square').removeClass("square-hover");
  });
}


// ========================================

export default Game;