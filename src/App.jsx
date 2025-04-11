import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Games from "./components/Games";
import Home from "./components/Home";
import "./App.css";
import TicTacToe from "./components/games/TicTacToe";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}
export default App;
