import React from 'react';
import { MoveSquare } from './index';

export class NextMove extends React.Component {
    renderMoveSquare(i) {
        let background = this.props.allowed.includes(i) ?
            "#f97" : "white";
        return <MoveSquare
            key={i}
            background={background}
        />;
    }

    render() {
        const rows = Array(3);
        for (let i = 0; i < 3; i++) {
            const squares = Array(3);

            for (let j = 0; j < 3; j++) {
                let k = i * 3 + j;
                squares[j] = this.renderMoveSquare(k);
            }

            rows[i] = (
                <div className="moves-row" key={i}>
                    {squares}
                </div>);
        }

        return (
            <div className="moves">
                {rows}
            </div>);
    }
}
