import React from "react";
import { Link } from "react-router-dom";
import "./Games.css";

const Games = () => {
  return (
    <div className="games-container">
      <h2 className="games-title">Games</h2>
      <ul className="games-list">
        <li className="game-item">
          <Link to="/games/tic-tac-toe" className="game-link">
            Tic Tac Toe
          </Link>
        </li>

        <li className="game-item">
          <Link to="/games/sudoku" className="game-link">
            Sudoku
          </Link>
        </li>
        <li className="game-item">
          <Link to="/games/memory" className="game-link">
            Memory Game
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Games;
