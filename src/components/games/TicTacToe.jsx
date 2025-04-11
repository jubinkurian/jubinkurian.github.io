import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./TicTacToe.css";

function TicTacToe() {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [inputX, setInputX] = useState("");
  const [inputO, setInputO] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);
  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const currentName = xNext ? playerX || "X" : playerO || "O";
  const status = winner
    ? `Hurray.....${winner === "X" ? playerX || "X" : playerO || "O"} wins!`
    : squares.every(Boolean)
    ? "Draw!"
    : `Next Player: ${currentName} `;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = [...squares];
    nextSquares[i] = xNext ? "X" : "O";
    setSquares(nextSquares);
    setXNext(!xNext);
  };
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXNext(true);
  };
  useEffect(() => {
    if (winner) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, [winner]);
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <p
        className={`status winner ${
          winner === "X" ? "x-winner" : winner === "O" ? "o-winner" : ""
        }`}
      >
        {status}
      </p>
      <div className="container">
        <div className="game-area">
          <div className="board">
            {squares.map((value, i) => (
              <button
                key={i}
                className={`square ${
                  value === "X" ? "x" : value === "O" ? "o" : ""
                } ${winningLine.includes(i) ? "highlight" : ""}`}
                onClick={() => handleClick(i)}
              >
                {value}
              </button>
            ))}
          </div>

          <button className="restart" onClick={handleRestart}>
            Restart
          </button>
        </div>
        <div className="sidebar">
          {isEditing ? (
            <>
              <input
                type="text"
                placeholder="Name for X"
                value={inputX}
                onChange={(e) => {
                  setInputX(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Name for O"
                value={inputO}
                onChange={(e) => {
                  setInputO(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  setPlayerX(inputX);
                  setPlayerO(inputO);
                  setIsEditing(false);
                }}
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>X:</strong> {playerX || "X"}
              </p>
              <p>
                <strong>O:</strong> {playerO || "O"}
              </p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: [] };
}

export default TicTacToe;
