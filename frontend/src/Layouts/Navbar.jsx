import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./CSS/Layout.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update `isMobile` on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/" onClick={closeMenu}>
            B<span>LG</span>O.
          </NavLink>
        </div>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>

            {/* Only show buttons here on mobile */}
            {isMobile && (
              <div className="mobile-auth-buttons">
                <NavLink to="/login" onClick={closeMenu}>
                  <button className="btn">Login</button>
                </NavLink>
                <NavLink to="/signup" onClick={closeMenu}>
                  <button className="btn">Signup</button>
                </NavLink>
              </div>
            )}
          </ul>
        </nav>

        {/* Only show buttons here on desktop */}
        {!isMobile && (
          <div className="login-signup">
            <NavLink to="/login">
              <button className="btn">Login</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="btn">Signup</button>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
