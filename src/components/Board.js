import React, { useState } from 'react';
import Block from './Block';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default function () {
    let [squares, setSquares] = useState(Array(9).fill(null));
    let [xIsNext, setXIsNext] = useState(true);
    let [winner, setWinner] = useState(null);

    function handleClick (i) {
        let squaresSliced = squares.slice();
        if (winner || squaresSliced[i]) return;

        squaresSliced[i] = xIsNext ? 'X' : 'O';

        setSquares(squaresSliced);
        setXIsNext(!xIsNext);
        setWinner(calculateWinner(squaresSliced));
    }

    function renderSquare (i) {
        return (
            <Block 
                value={squares[i]} 
                onClick={() => handleClick(i)}/>
        )
    }
    
    let status = winner ? `Выйграл ${winner}!` : `Следующий ход: ${xIsNext ? 'X' : 'O'}`;

    return (
        <div className="board">
            <div className="status">{status}</div>
            <div className="row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}