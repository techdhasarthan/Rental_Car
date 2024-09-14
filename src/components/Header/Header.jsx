import React, { useRef, useState, useEffect } from "react";
import { Container } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import profile from "../../assets/all-images/slider-img/profile.jpg";
import { toast } from "react-toastify";
import axios from "axios";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/cars", display: "Cars" },
  { path: "/blogs", display: "Blog" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const [user, setUserName] = useState({ name: "Guest" }); // Initial state with default user name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const customerId = localStorage.getItem("id"); // Get customer ID from local storage

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Fetch user profile data on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (customerId) {
          const response = await fetch(`${backendUrl}/getCustomerProfileDetails`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: customerId }),
          });

          if (response.ok) {
            const data = await response.json();
            const profileData = {
              name: data.data.Name || "Guest", // Fallback to "Guest" if name is missing
              id: data.data.ID || "",
            };

            setUserName(profileData); // Set the user name in state
            setIsLoggedIn(true); // Set logged-in state to true
          } else {
            toast.error(`Failed to fetch profile data. Status: ${response.status}`);
          }
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserProfile(); // Fetch user profile when component mounts
  }, [customerId, backendUrl]);

  // Handle user sign out
  const handleSignOut = async () => {
    try {
      const response = await axios.post(`${backendUrl}/getCustomerRegistrationDetailsSignOut`, { id: customerId });

      if (response.data.status === "true") {
        toast.success("Signed out successfully", {
          autoClose: 2000,
          className: "custom-toast",
        });

        // Clear local storage after successful sign-out
        localStorage.removeItem("id");
        localStorage.removeItem("user");

        setIsLoggedIn(false); // Update logged-in state
        navigate("/sign-in"); // Navigate to the sign-in page
      } else {
        toast.error("Failed to sign out", {
          autoClose: 2000,
          className: "custom-toast",
        });
      }
    } catch (error) {
      toast.error("Failed to sign out. Please try again.", {
        autoClose: 3000,
      });
      console.error("Error signing out:", error);
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
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? "nav__active nav__item" : "nav__item")}
                    key={index}>
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="nav__right">
              <div className="d-flex align-items-center justify-content-between w-100 gap-4 ">
                {!isLoggedIn ? (
                  <Link to="/sign-in" className="d-flex shadow border-4 gap-1 text-white no-underline custom-hover p-3 ">
                    <span className="custom-hover">
                      <i className="ri-login-box-line"></i> Login
                    </span>
                  </Link>
                ) : (
                  <div className="dropdown d-flex justify-content-end ps-5" ref={dropdownRef}>
                    <img
                      src={profile}
                      alt="avatar"
                      className="img-fluid rounded-circle me-3 shadow-lg profileimage"
                      width="35"
                      onClick={toggleDropdown}
                      style={{ cursor: "pointer" }}
                    />
                    <div className="pt-2 text-light">
                      <h6 className="profileName">{user?.name || "Guest"}</h6> {/* Display user's name */}
                    </div>
                    <div className={`dropdown-menu ${showDropdown ? "show" : ""} mt-1`}>
                      <Link to="/user-account" className="dropdown-item" onClick={() => setShowDropdown(false)}>
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
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
