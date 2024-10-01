import React, { useRef, useState, useEffect } from "react";
import { Container } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../SCSS/headerScss.scss";
import profile from "../../assets/all-images/slider-img/profile.jpg";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
  const [user, setUserName] = useState({ name: "Guest" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const customerId = localStorage.getItem("id");
  const imageUrl = localStorage.getItem("UserImage");

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Effect to handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                <Link to="/user-account">
                  <div
                    className="dropdownMobileView text-decoration-none"
                    ref={dropdownRef}>
                    <img
                      src={imageUrl || profile}
                      alt="avatar"
                      className="img-fluid rounded-circle me-3 shadow-lg profile"
                      width="55"
                      height="55"
                      onClick={toggleDropdown}
                      style={{
                        cursor: "pointer",
                        border: "1px solid black",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                        borderRadius: "50%", // Ensures the image is a perfect circle
                        objectFit: "cover", // Ensures the image fits properly inside the circle
                        width: "55px", // Maintain a square container
                        height: "55px", // Maintain a square container
                      }}
                    />
                    <span className="profileMobileName text-black text-decoration-none">
                      {user?.name || "Guest"}
                    </span>
                  </div>
                </Link>

                {/* Manually coded menu items */}
                <NavLink to="/home" className="nav__item">
                  <div className="MobileViewIcon">
                    <i className="ri-home-4-fill"></i>
                  </div>
                  <div className="pt-1">Home</div>
                </NavLink>
                <NavLink to="/about" className="nav__item">
                  <div className="MobileViewIcon">
                    <i className="ri-error-warning-fill"></i>
                  </div>
                  <div className="pt-1">About</div>
                </NavLink>
                <NavLink to="/cars" className="nav__item_cars">
                  <div className="MobileViewIcon_cars">
                    <i className="ri-car-fill"></i>
                  </div>
                  <div className="pt-1 ">Cars</div>
                </NavLink>
                <NavLink to="/blogs" className="nav__item_blog">
                  <div className="MobileViewIcon_blog ">
                    <i className="ri-article-fill"></i>
                  </div>
                  <div className="pt-1 blog">Blog</div>
                </NavLink>
                <NavLink to="/contact" className="nav__item nav__item_contact">
                  <div className="MobileViewIcon_contact">
                    <i className="ri-contacts-fill"></i>
                  </div>
                  <div className="pt-1  ">Contact</div>
                </NavLink>

                {!isLoggedIn ? (
                  <Link
                    to="/sign-in"
                    className="d-flex text-white no-underline custom-hover p-3 mt-3"></Link>
                ) : (
                  <div onClick={handleSignOut}>
                    <div className="profileLogout">
                      <button
                        type="button"
                        className="btn btn-warning d-flex align-items-center shadow-lg ">
                        <i className="ri-logout-box-line me-2"></i>
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="nav__right d-none d-md-flex align-items-center">
              {!isLoggedIn ? (
                <Link
                  to="/sign-in"
                  className="d-flex text-white no-underline custom-hover"></Link>
              ) : (
                <div className="dropdown" ref={dropdownRef}>
                  <img
                    src={imageUrl || profile}
                    alt="avatar"
                    className="img-fluid rounded-circle me-3 shadow-lg profile"
                    width="55"
                    height="55"
                    onClick={toggleDropdown}
                    style={{
                      cursor: "pointer",
                      border: "1px solid black",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                      borderRadius: "50%", // Ensures the image is a perfect circle
                      objectFit: "cover", // Ensures the image fits properly inside the circle
                      width: "35px", // Maintain a square container
                      height: "35px", // Maintain a square container
                    }}
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
