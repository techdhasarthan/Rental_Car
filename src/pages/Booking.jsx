import React, { useState } from "react";
import {
  Container,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./Document.css";
import Card from "../components/UI/Card"; // Assuming this is the correct path to your Card component

const Booking = () => {
  // State to manage active dropdown option
  const [activeOption, setActiveOption] = useState("Upcoming Bookings");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  // Handle option selection
  const handleOptionSelect = (option) => {
    setActiveOption(option);
  };

  return (
    <Container className="my-2">
      <div>
        <h4 className="fw-bold">Booking</h4>
      </div>

      {/* Dropdown to select booking type */}
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="mb-4">
        <DropdownToggle caret color="warning">
          {activeOption}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleOptionSelect("Upcoming Bookings")}>
            Upcoming Bookings
          </DropdownItem>
          <DropdownItem
            onClick={() => handleOptionSelect("Completed Bookings")}>
            Completed Bookings
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Content based on selected option */}
      {activeOption === "Upcoming Bookings" ? (
        <div className="text-center">
          <i className="fas fa-calendar-alt fa-4x text-primary mb-3"></i>
          <p className="text-muted">No Upcoming Bookings Found</p>
        </div>
      ) : (
        <div className="text-center">
          <i className="fas fa-calendar-check fa-4x text-primary mb-3"></i>
          <p className="text-muted">No Completed Bookings Found</p>
          {/* Render the Card component when "Completed Bookings" is selected */}
          <Card />
        </div>
      )}
    </Container>
  );
};

export default Booking;
