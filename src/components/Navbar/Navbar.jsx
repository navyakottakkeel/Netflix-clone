import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";

import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import menu_icon from "../../assets/menu_icon.png";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { logout, user } = useAuth();

  // Add dark background when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu after navigation
  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav ref={navRef} className="navbar">

      {/* LEFT SECTION */}
      <div className="navbar-left">

        <Link to="/" onClick={handleMenuItemClick}>
          <img src={logo} alt="Netflix" className="logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={handleMenuItemClick}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/" onClick={handleMenuItemClick}>
              TV Shows
            </Link>
          </li>

          <li>
            <Link to="/" onClick={handleMenuItemClick}>
              Movies
            </Link>
          </li>

          <li>
            <Link to="/" onClick={handleMenuItemClick}>
              New & Popular
            </Link>
          </li>

          <li>
            <Link to="/watchlist" onClick={handleMenuItemClick}>
              My List
            </Link>
          </li>

          <li>
            <Link to="/" onClick={handleMenuItemClick}>
              Browse by Languages
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <img src={menu_icon} alt="Menu" />
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
          <Link to="/" onClick={handleMenuItemClick}>
            Home
          </Link>

          <Link to="/" onClick={handleMenuItemClick}>
            TV Shows
          </Link>

          <Link to="/" onClick={handleMenuItemClick}>
            Movies
          </Link>

          <Link to="/" onClick={handleMenuItemClick}>
            New & Popular
          </Link>

          <Link to="/watchlist" onClick={handleMenuItemClick}>
            My List
          </Link>

          <Link to="/" onClick={handleMenuItemClick}>
            Browse by Languages
          </Link>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="navbar-right">

        <img
          src={search_icon}
          alt="Search"
          className="icons search-icon"
        />

        <p className="children-text">{user?.email}</p>

        <img
          src={bell_icon}
          alt="Notifications"
          className="icons"
        />

        {/* Profile */}
        <div className="navbar-profile">

          <img
            src={profile_img}
            alt="Profile"
            className="profile"
          />

          <img
            src={caret_icon}
            alt="Profile menu"
            className="caret"
          />

          <div className="dropdown">
            <p onClick={logout}>Sign Out of Netflix</p>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;