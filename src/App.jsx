import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Games from "./components/Games";
import Home from "./components/Home";
import ScrollArrows from "./components/ScrollArrows";
import "./App.css";
import TicTacToe from "./components/games/TicTacToe";
import Sudoku from "./components/games/Sudoku";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollArrows>
          <div className="App">
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
                <Route path="/games/sudoku" element={<Sudoku />} />
              </Routes>
            </div>
          </div>
        </ScrollArrows>
      </Router>
    </ThemeProvider>
  );
}
export default App;
