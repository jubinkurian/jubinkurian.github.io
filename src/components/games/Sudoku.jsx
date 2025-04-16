import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { getSudoku } from "sudoku-gen";
import "./Sudoku.css";

const Sudoku = () => {
  const [initialPuzzle, setInitialPuzzle] = useState([]);
  const [grid, setGrid] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Generate a new puzzle and initialize state
  const generatePuzzle = () => {
    const { puzzle } = getSudoku("easy");
    console.log(puzzle);
    const puzzleArray = puzzle.split("").map((val) => (val === "-" ? 0 : +val));

    const newGrid = Array.from({ length: 9 }, (_, i) =>
      puzzleArray.slice(i * 9, i * 9 + 9)
    );

    setInitialPuzzle(newGrid);
    setGrid(newGrid.map((row) => [...row]));
    setIsSolved(false);
    setSeconds(0);
    setTimerActive(true);
  };

  useEffect(() => {
    generatePuzzle();
  }, []);
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Handle user input
  const handleChange = (row, col, value) => {
    if (!/^[1-9]?$/.test(value)) return;

    const updatedGrid = grid.map((r) => [...r]);
    updatedGrid[row][col] = value === "" ? 0 : +value;
    setGrid(updatedGrid);

    if (checkIfSolved(updatedGrid)) {
      setIsSolved(true);
      setTimerActive(false);
      launchConfetti();
    }
  };

  // Determine if a cell is editable
  const isEditable = (r, c) => initialPuzzle[r][c] === 0;

  // Check if the puzzle is solved correctly
  const checkIfSolved = (grid) => {
    const isValidGroup = (group) => [...group].sort().join("") === "123456789";

    for (let i = 0; i < 9; i++) {
      if (!isValidGroup(grid[i])) return false; // Rows
      const col = grid.map((row) => row[i]);
      if (!isValidGroup(col)) return false; // Columns
    }

    // Check 3x3 blocks
    for (let r = 0; r < 9; r += 3) {
      for (let c = 0; c < 9; c += 3) {
        const block = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            block.push(grid[r + i][c + j]);
          }
        }
        if (!isValidGroup(block)) return false;
      }
    }

    return true;
  };

  // Confetti celebration
  const launchConfetti = () => {
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
  };

  return (
    <div className="sudoku-wrapper">
      <h2 className="sudoku-title">Sudoku Game</h2>
      <h3 className="sudoku-timer">⏱️ Time: {formatTime(seconds)}</h3>

      <div className="sudoku-grid">
        {grid.map((row, r) =>
          row.map((val, c) => (
            <input
              key={`${r}-${c}`}
              className={`sudoku-cell ${
                isEditable(r, c) ? "editable" : "readonly"
              }`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={val === 0 ? "" : val}
              onChange={(e) => handleChange(r, c, e.target.value)}
              readOnly={!isEditable(r, c)}
            />
          ))
        )}
      </div>

      {isSolved && (
        <div className="sudoku-win-message">
          🎉 You solved the puzzle in {formatTime(seconds)}! 🎉
        </div>
      )}
      <button onClick={generatePuzzle} className="sudoku-restart">
        Restart Game
      </button>
    </div>
  );
};

export default Sudoku;
