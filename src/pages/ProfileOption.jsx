import {
  Container,
  Button,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Fade,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import classnames from "classnames";
import Document from "./Document"; // Component for Document Upload
import ChangePassword from "./ChangePassword"; // Component for Change Password
import { useState } from "react";
import "./UserProfile.css"; // Import your custom CSS

const ProfileOptions = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [fadeIn, setFadeIn] = useState(true);
  const [bookingOption, setBookingOption] = useState("Upcoming Bookings"); // Default content option
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility
  const [selectedBookingOption, setSelectedBookingOption] =
    useState("Upcoming Bookings"); // Track selected booking option

  // Function to toggle tabs with fade effect
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setFadeIn(false); // Trigger fade-out
      setTimeout(() => {
        setActiveTab(tab);
        setFadeIn(true); // Trigger fade-in
        if (tab !== "2") {
          // Reset the dropdown when switching away from the Booking tab
          setDropdownOpen(false);
        }
      }, 200); // Match the fade duration for a smooth transition
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Handle dropdown item click
  const handleDropdownClick = (option) => {
    setSelectedBookingOption(option); // Update selected option for styling
    setBookingOption(option); // Update content based on selected option
    setActiveTab("2"); // Set the activeTab to Booking
    setFadeIn(false); // Trigger fade-out before transition
    setTimeout(() => {
      setFadeIn(true); // Trigger fade-in after selection
    }, 200);
  };

  // Determine the color based on the selected booking option
  const getDropdownColor = () => {
    // If the activeTab is not Booking, reset color to default
    if (activeTab !== "2") {
      return "warning";
    }
    switch (selectedBookingOption) {
      case "Upcoming Bookings":
        return "primary";
      case "Completed Bookings":
        return "primary";
      default:
        return "warning";
    }
  };

  return (
    <div className="container-sm ">
      <Container className="my-4 rounded shadow border">
        <div className="pt-2">
          <h4 className="fw-bold px-2 py-2">Profile Options</h4>
        </div>

        {/* Navigation Tabs */}
        <Nav tabs className="border-0">
          <NavItem
            className={classnames("pt-2", "px-1", {
              "nav-active": activeTab === "1",
              "nav-inactive": activeTab !== "1",
            })}
            onClick={() => toggle("1")}
            style={{ cursor: "pointer" }}>
            <Button color={activeTab === "1" ? "primary" : "warning"}>
              <i className="fas fa-file-alt"></i> Document Upload
            </Button>
          </NavItem>

          {/* Dropdown for Booking */}
          <NavItem className="pt-2 px-1">
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret color={getDropdownColor()}>
                Booking {/* Always show "Booking" */}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => handleDropdownClick("Upcoming Bookings")}
                  active={selectedBookingOption === "Upcoming Bookings"}>
                  Upcoming Bookings
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleDropdownClick("Completed Bookings")}
                  active={selectedBookingOption === "Completed Bookings"}>
                  Completed Bookings
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>

          <NavItem
            className={classnames("pt-2", "px-1", {
              "nav-active": activeTab === "3",
              "nav-inactive": activeTab !== "3",
            })}
            onClick={() => toggle("3")}
            style={{ cursor: "pointer" }}>
            <Button color={activeTab === "3" ? "primary" : "warning"}>
              <i className="fas fa-key"></i> Change Password
            </Button>
          </NavItem>
        </Nav>

        {/* Tab Content with Smooth Transition */}
        <TabContent activeTab={activeTab} className="tab-content-transition">
          <Fade in={fadeIn} timeout={300}>
            <TabPane tabId="1">{activeTab === "1" && <Document />}</TabPane>
            <TabPane tabId="2">
              {activeTab === "2" && (
                <div className="text-center">
                  <h5 className="fw-bold mb-3">{selectedBookingOption}</h5>
                  {selectedBookingOption === "Upcoming Bookings" && (
                    <div>
                      {/* Content specific to Upcoming Bookings */}
                      <i className="fas fa-calendar-alt fa-4x text-primary mb-3"></i>
                      <p className="text-muted">
                        Here is the upcoming bookings content.
                      </p>
                    </div>
                  )}
                  {selectedBookingOption === "Completed Bookings" && (
                    <div>
                      {/* Content specific to Completed Bookings */}
                      <i className="fas fa-calendar-check fa-4x text-success mb-3"></i>
                      <p className="text-muted">
                        Here is the completed bookings content.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabPane>
            <TabPane tabId="3">
              {activeTab === "3" && <ChangePassword />}
            </TabPane>
          </Fade>
        </TabContent>
      </Container>
    </div>
  );
};

export default ProfileOptions;
