import React from 'react';
import { calculateWinner } from './index';
import { Board } from "./Board";

export class BigBoard extends React.Component {
    renderBoard(i) {
        return <Board 
            key={i}
            squares={this.props.squares[i]} 
            onClick={(i) => this.props.handleClick(i)} 
            winner={this.props.winner} />
      }

      render() {
        const rows = Array(3);
        for (let i = 0; i < 3; i++) {
          const boards = Array(3);
          for (let j = 0; j < 3; j++) {
            let k = i * 3 + j;
            boards[j] = this.renderBoard(k);
          }
          rows[i] = (<div className="big-board-row" key={i}>
            {boards}
          </div>);
        }
        return (<div>
          {rows}
        </div>);
      }
}