import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="page">
      <section className="hero">
        <h1>Welcome to My Portfolio</h1>
        <h3>My name is Jubin Kurian, a full stack developer.</h3>
        <p>Explore my projects and games</p>
      </section>

      <div className="card">
        <h2>Featured Work</h2>
        <p>Check out my interactive games collection</p>
        <a href="/games" className="button">
          View Games
        </a>
      </div>
    </div>
  );
};

export default Home;
