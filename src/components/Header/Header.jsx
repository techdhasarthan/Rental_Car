import React, { useRef, useState } from "react";

import { Container } from "reactstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/cars", display: "Cars" },
  { path: "/blogs", display: "Blog" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const location = useLocation();
  const isActive = location.pathname === "/user-account";
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = [
    { value: "chennai", label: "Chennai" },
    { value: "trichy", label: "Trichy" },
    { value: "ramanad", label: "Ramanathapuram    " },
    { value: "chicago", label: "Chicago" },
  ];

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  return (
    <header className="header">
      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}>
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="d-flex align-items-center justify-content-end gap-3">
                <div className="location-selector">
                  <i class="ri-map-pin-line"></i>
                  <select
                    value={selectedLocation}
                    onChange={handleLocationChange}>
                    {locations.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
                {!isLoggedIn ? (
                  <Link
                    to="/sign-in"
                    className="d-flex align-items-center gap-1 text-white no-underline custom-hover p-3">
                    <span className="custom-hover">
                      <i className="ri-login-box-line"></i> Login
                    </span>
                  </Link>
                ) : (
                  <Link
                    to="/user-account"
                    className="d-flex align-items-center gap-1 text-white no-underline custom-hover p-3">
                    <span
                      className="custom-hover"
                      style={{ color: isLoggedIn ? "orange" : "inherit" }}>
                      <i
                        style={{ color: isLoggedIn ? "orange" : "inherit" }}
                        className="ri-user-3-line"></i>
                      Profile
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
