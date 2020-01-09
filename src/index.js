/*
  To do:
  - display location for each move in history
  - highlight the three squares that caused the win
  - if no one wins, display a message for a draw
  - play with css to make look nicer

  - ultimate tic tac toe?
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// squares are now function components; they only have render method and do not maintain state
// instead of extending React.Component, write a function that takes props as input
// instead of this.props, we have just props
function Square(props) {
  return (
    <button 
    className="square" 
    onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square 
      key={i}
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    // two loops to make squares
    // each component requires a key now, since it is part of a list
    const rows = Array(3);
    for ( let i=0 ; i<3 ; i++ ) {
      const squares = Array(3);
      for ( let j=0 ; j<3 ; j++ )
        squares[j] = this.renderSquare(i*3 + j);

      rows[i] = (
        <div className="board-row" key={i}>
          {squares}
        </div>
      );
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ // keeps track of previous moves
        squares: Array(9).fill(null)
      }],
      stepNumber: 0, // keeps track of move number
      xIsNext: true // determines x or o
    };
  }

  // updates square to have x or o; ignores input if there is a winner or if the square is already claimed
  handleClick(i) {
    // if we go back to a move and then make a new move, the new copy will get rid of the moves that followed originally and rewrite history
    const history = this.state.history.slice(0,
      this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if ( calculateWinner( squares ) || squares[i] )
      return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // concat does not mutate the original array, unlike push
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  // reverts game to a previous state
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner( current.squares );

    // map creates a new array by applying a function to an old array
    const moves = history.map((step,move) => {
      const desc = move ? 
        'Go to move #' + move :
        'Go to game start';
      return (
        // need key so that list will be rendered in intended order
        // key does not need to be globally unique, but needs to be unique between components and siblings
        // move number is a safe key
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if ( winner ) 
      status = 'Winner: ' + winner;
    else {
      status = 'Next player ' +
        (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for ( let l of lines ) {
    const [a,b,c] = l;
    if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) 
      return squares[a];
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
