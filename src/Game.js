import React from 'react';
import { calculateWinner } from './index';
import { BigBoard } from "./BigBoard";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        bigSquares: Array(9).fill(null),
        squares: Array(9).fill(Array(9).fill(null))
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.bigSquares.slice();
    if (calculateWinner(squares) || squares[i])
      return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        bigSquares: squares
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
    }
    else {
      status = (this.state.xIsNext ? 'X' : 'O') +
        "'s turn";
    }
    return (<div>
      <header className="status" align="center">
        <h1>{status}</h1>
      </header>
      <div className="game">
        <div className="big-game-board">
          <BigBoard squares={current.squares} onClick={(i) => this.handleClick(i)} winner={winner} />
        </div>
        <div className="game-info">
            <button className="reset" onClick={() => this.reset()}>Reset</button>
          <button className="undo" onClick={() => this.undo()}>Undo</button>
        </div>
      </div>
    </div>);
  }
}
