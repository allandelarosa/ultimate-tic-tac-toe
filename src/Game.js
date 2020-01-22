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
        squares: squares,
        allowed: [0,1,2,3,4,5,6,7,8]
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  nextSpace(j,bigSquares) {
    if ( bigSquares[j] === null )
        return [j];

    let moves = [];
    for ( let i=0 ; i<9 ; i++ ) {
        if ( i !== j && bigSquares[i] === null )
            moves.push( i );
    }

    return moves;
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

    // check if there is a winner or if someone already
    // claimed the spot
    if ( calculateWinner(bigSquares) || 
        calculateWinner(squares[j]) || 
        squares[j][i] )
        return;

    // check if move is actually allowed
    if ( !current.allowed.includes(j) ) 
        return;

    squares[j][i] = this.state.xIsNext ? 'X' : 'O';

    // determine next allowed moves
    let moves = this.nextSpace(i,bigSquares);

    console.log( current.allowed )

    let winner = calculateWinner( squares[j] );
    if ( winner ) {
        if ( winner === 'draw' )
            bigSquares[j] = winner;
        else
            bigSquares[j] = squares[j][winner[0]];
    }

    this.setState({
      history: history.concat([{
        bigSquares: bigSquares,
        squares: squares,
        allowed: moves
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
        // if there is a draw, player with most squares taken wins
      if (winner === 'draw') {
          let count = 0;
        for ( let square of current.bigSquares ) {
            if ( square === 'X' )
                count++;
            else if ( square === 'O' )
                count--;
        }
        status = 'Winner: ' + count < 0 ? 'O' : 'X';
      } else
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
            winner={winner} 
            allowed={current.allowed}/>
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
