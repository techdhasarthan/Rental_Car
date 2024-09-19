import React, { useRef, useState, useEffect } from "react";
import { Container } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../SCSS/headerScss.scss";
import profile from "../../assets/all-images/slider-img/profile.jpg";
import { toast } from "react-toastify";
import axios from "axios";

const navLinks = [
  { path: "/home", display: "Home", icon: "ri-home-4-fill" },
  { path: "/about", display: "About", icon: "ri-error-warning-fill" },
  { path: "/cars", display: "Cars", icon: "ri-car-fill" },
  { path: "/blogs", display: "Blog", icon: "ri-article-fill" },
  { path: "/contact", display: "Contact", icon: "ri-contacts-fill" },
];

const Header = () => {
  const [user, setUserName] = useState({ name: "Guest" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const customerId = localStorage.getItem("id");

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (customerId) {
          const response = await fetch(
            `${backendUrl}/getCustomerProfileDetails`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: customerId }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserName({
              name: data.data.Name || "Guest",
              id: data.data.ID || "",
            });
            setIsLoggedIn(true);
          } else {
            toast.error(
              `Failed to fetch profile data. Status: ${response.status}`
            );
          }
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
      }
    };

    fetchUserProfile();
  }, [customerId, backendUrl]);

  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/getCustomerRegistrationDetailsSignOut`,
        { id: customerId }
      );
      if (response.data.status === "true") {
        toast.success("Signed out successfully");
        localStorage.removeItem("id");
        setIsLoggedIn(false);
        navigate("/sign-in");
      } else {
        toast.error("Failed to sign out");
      }
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
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
                <div className="dropdownMobileView" ref={dropdownRef}>
                  <img
                    src={profile}
                    alt="avatar"
                    className="img-fluid rounded-circle me-3 shadow-lg profile"
                    width="35"
                    onClick={toggleDropdown}
                    style={{
                      cursor: "pointer",
                      border: "1px solid black",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                  <span className="profileMobileName text-black">
                    {user?.name || "Guest"}
                  </span>
                </div>
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}>
                    <i className={item.icon}></i>
                    <div className="pt-1"> {item.display}</div>
                  </NavLink>
                ))}
                {/* Add login/profile in mobile view */}
                {!isLoggedIn ? (
                  <Link
                    to="/sign-in"
                    className="d-flex text-white no-underline custom-hover p-3 mt-3">
                    <i className="ri-login-box-line"></i> Login
                  </Link>
                ) : (
                  <div onClick={handleSignOut}>
                    <div className="profileLogout">Log Out</div>
                  </div>
                )}
              </div>
            </div>

            {/* Profile/Login section in right corner for large screens */}
            <div className="nav__right d-none d-md-flex align-items-center">
              {!isLoggedIn ? (
                <Link
                  to="/sign-in"
                  className="d-flex text-white no-underline custom-hover">
                  <i className="ri-login-box-line"></i> Login
                </Link>
              ) : (
                <div className="dropdown" ref={dropdownRef}>
                  <img
                    src={profile}
                    alt="avatar"
                    className="img-fluid rounded-circle me-3 shadow-lg profileimage"
                    width="35"
                    onClick={toggleDropdown}
                    style={{ cursor: "pointer" }}
                  />
                  <span className="profileName text-white">
                    {user?.name || "Guest"}
                  </span>
                  <div
                    className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                    <Link
                      to="/user-account"
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}>
                      <i className="ri-user-line"></i> My Profile
                    </Link>
                    <span className="dropdown-item" onClick={handleSignOut}>
                      <i className="ri-logout-box-line"></i> Logout
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
