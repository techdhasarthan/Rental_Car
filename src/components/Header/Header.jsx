import React, { useRef, useState } from "react";
import { Container } from "reactstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../styles/header.css";
import profile from "../../assets/all-images/slider-img/profile.jpg";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/cars", display: "Cars" },
  { path: "/blogs", display: "Blog" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

  const location = useLocation();
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const [selectedLocation, setSelectedLocation] = useState("");
  const locations = [
    { value: "chennai", label: "Chennai" },
    { value: "trichy", label: "Trichy" },
    { value: "ramanad", label: "Ramanathapuram" },
    { value: "chicago", label: "Chicago" },
  ];

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
              <div className="d-flex align-items-center justify-content-between w-100 gap-4">
                <div className="location-selector d-flex align-items-center">
                  <i className="ri-map-pin-line"></i>
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
                  <div className="dropdown ">
                    <img
                      src={profile}
                      alt="avatar"
                      className="img-fluid rounded-circle me-3"
                      width="35"
                      onClick={toggleDropdown}
                      style={{ cursor: "pointer" }}
                    />
                    {showDropdown && (
                      <div className="dropdown-menu show">
                        <Link
                          to="/user-account"
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}>
                          <i className="ri-user-line"></i> My Profile
                        </Link>
                        <Link
                          to="/sign-up"
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}>
                          <i className="ri-logout-box-line"></i> Logout
                        </Link>
                      </div>
                    )}
                  </div>
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
