import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./CSS/Layout.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            B<span>LG</span>O.
          </NavLink>
        </div>

        {/* Hamburger Icon */}
        <div
          className={`menu-icon ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="login-signup">
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
              <button className="btn">Login</button>
            </NavLink>
            <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>
              <button className="btn">Signup</button>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
