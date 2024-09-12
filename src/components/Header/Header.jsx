import React, { useRef, useState, useEffect } from "react";
import { Container } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
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
  const [user, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserName(JSON.parse(userData));
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              <div className="d-flex align-items-center justify-content-between w-100 gap-4 ">
                {!isLoggedIn ? (
                  <Link
                    to="/sign-in"
                    className="d-flex shadow border-4 gap-1 text-white no-underline custom-hover p-3 ">
                    <span className="custom-hover">
                      <i className="ri-login-box-line"></i> Login
                    </span>
                  </Link>
                ) : (
                  <div
                    className="dropdown d-flex justify-content-end ps-5"
                    ref={dropdownRef}>
                    <img
                      src={profile}
                      alt="avatar"
                      className="img-fluid rounded-circle me-3 shadow-lg profileimage  "
                      width="35"
                      onClick={toggleDropdown}
                      style={{ cursor: "pointer" }}
                    />
                    <div className=" pt-2 text-light">
                      <h6 className="profileName">{user?.name || "Guest"}</h6>
                    </div>
                    <div
                      className={`dropdown-menu ${
                        showDropdown ? "show" : ""
                      }  mt-1`}>
                      <Link
                        to="/user-account"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}>
                        <i className="ri-user-line"></i> My Profile
                      </Link>
                      <Link
                        to="/sign-in"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}>
                        <i className="ri-logout-box-line"></i> Logout
                      </Link>
                    </div>
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
