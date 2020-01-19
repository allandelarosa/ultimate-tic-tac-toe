import React from 'react';
import { calculateWinner } from './index';
import { BigBoard } from "./BigBoard";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    let squares = Array(9);
    for ( let i=0 ; i<squares.length ; i++ ) {
        squares[i] = Array(9).fill(null);
    }
    this.state = {
      history: [{
        bigSquares: Array(9).fill(null),
        squares: squares
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i,j) { // j is big square, i is little square
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    // just using slice on original "squares" will create a ne array, but the subarrays will still be references to the originals; need to copy each subarray individually
    const squares = Array(9);
    for ( let i=0 ; i<squares.length ; i++ ) {
        squares[i] = current.squares[i].slice();
    }
    const bigSquares = current.bigSquares.slice();

    if (calculateWinner(bigSquares) || 
        calculateWinner(squares[j]) || 
        squares[j][i])
        return;

    squares[j][i] = this.state.xIsNext ? 'X' : 'O';

    let winner = calculateWinner( squares[j] );
    if ( winner === 'draw' )
        bigSquares[j] = winner;
    else if ( winner )
        bigSquares[j] = squares[j][winner[0]];
    console.log(bigSquares)

    this.setState({
      history: history.concat([{
        bigSquares: bigSquares,
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  reset() {
      this.setState({
        stepNumber: 0,
        xIsNext: true
      });
  }

  undo() {
    if (this.state.stepNumber > 0) {
      this.setState({
        stepNumber: this.state.stepNumber - 1,
        xIsNext: !this.state.xIsNext
      });
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.bigSquares);
    
    let status;
    if (winner) {
      if (winner === 'draw')
        status = 'Draw! No player wins';
      else
        status = 'Winner: ' + current.bigSquares[winner[0]];
    } else {
      status = (this.state.xIsNext ? 'X' : 'O') +
        "'s turn";
    }

    return (<div>
      <div className="game">
        <div className="big-game-board">
          <BigBoard 
            bigSquares={current.bigSquares}
            squares={current.squares} 
            onClick={(i,j) => this.handleClick(i,j)} 
            winner={winner} />
        </div>
        <div className="game-info">
            <h3 className="status">{status}</h3>
            <button className="reset" onClick={() => this.reset()}>Reset</button><br></br>
            <button className="undo" onClick={() => this.undo()}>Undo</button>
        </div>
      </div>
    </div>);
  }
}
