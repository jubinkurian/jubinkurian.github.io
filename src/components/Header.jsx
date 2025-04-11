import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Header.css";

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <header className="header">
      <h2 className="logo">
        <Link to="/">My Portfolio</Link>
      </h2>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/games">Games</Link>
          </li>
          <li className="nav-item">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
