import React from 'react';
import { Square, calculateWinner } from './index';

export class Board extends React.Component {
  renderSquare(i) {
    let winner = calculateWinner(this.props.squares);
    let background = winner && 
        winner.includes(i) ? "yellow" : 
        i % 2 === 1 ? "#ddd" : "white"; 
    return <Square 
        key={i} 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i,this.props.squareNumber)} 
        background={background} 
    />;
  }

  render() {
    const rows = Array(3);
    for (let i = 0; i < 3; i++) {
      const squares = Array(3);

      for (let j = 0; j < 3; j++) {
        let k = i * 3 + j;
        squares[j] = this.renderSquare(k);
      }

      rows[i] = (
      <div className="board-row" key={i}>
        {squares}
      </div>);
    }

    let background = this.props.winner && 
    this.props.winner.includes(this.props.squareNumber) ?
    "#ff9" : 
    this.props.allowed.includes(this.props.squareNumber) ? 
    "#f97" : "#99f";

    return (
    <div className="game-board" 
        style={{background: background}}>
        {rows}
    </div>);
  }
}
