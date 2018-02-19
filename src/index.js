import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(100).fill(null),
    }
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    let row = [];
    for(let index = 0; index < 10; index++) {
      row.push(
        (<Square value={i}/>)
      )
    }
    return (
      <div className="row">
        <div className="board-label">{i}</div>{row}
      </div>
    );
  }

  render() {
    const status = 'Next player: X';
    let column = [];
    let boardLabel = [];
    for(let index = 0; index < 10; index++) {
      boardLabel.push(
        (<div className="board-label">
          {index}
          </div>
        )
      );
      column.push(
        (<div className="column">
          {this.renderSquare(index + 1)}
        </div>)
      )
    }
    return (
      <div>
        <div className="status">{status}</div>
        {boardLabel}
        <div className="board-row">
          {column}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
