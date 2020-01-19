import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Game } from './Game';

export function Square(props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick}
      style={{background: props.background}}
    >
      {props.value}
    </button>
  );
}

export function calculateWinner(squares) {
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
      return l;
  }

  let draw = 0;
  for ( let s of squares )
    if ( s ) draw++;
  if ( draw === 9 )
    return 'draw';

  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
