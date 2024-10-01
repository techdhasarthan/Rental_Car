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
  Col,
  Row,
} from "reactstrap";
import classnames from "classnames";
import Document from "./Document"; // Component for Document Upload
import ChangePassword from "./ChangePassword"; // Component for Change Password
import { useState, useEffect } from "react";
import "./UserProfile.css"; // Import your custom CSS
import HorizontalCard from "../components/UI/Card";

const ProfileOptions = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const ID = localStorage.getItem("id");
  const [activeTab, setActiveTab] = useState("1");
  const [fadeIn, setFadeIn] = useState(true);
  const [bookingOption, setBookingOption] = useState("Upcoming Booking"); // Default content option
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility
  const [selectedBookingOption, setSelectedBookingOption] =
    useState("Upcoming Booking"); // Track selected booking option
  const [count, setCount] = useState("");

  // New state to hold booking data
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  const fetchBookingData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(
        `${BASE_URL}/getCustomerViewCarBookingList`,
        {
          method: "POST", // Use POST method to send data
          headers: {
            "Content-Type": "application/json", // Specify the content type
          },
          body: JSON.stringify({
            "Request Type": selectedBookingOption,
            ID: ID, // Include the ID in your request
          }),
        }
      );

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Assuming the API returns bookings categorized as upcoming and completed
      setUpcomingBookings(data.data || []);
      setCompletedBookings(data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData(); // Fetch booking data when the component loads
  }, [count]);

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
    setCount(count + 1);
  };

  // Determine the color based on the selected booking option
  const getDropdownColor = () => {
    // If the activeTab is not Booking, reset color to default
    if (activeTab !== "2") {
      return "warning";
    }
    switch (selectedBookingOption) {
      case "Upcoming Booking":
        return "primary";
      case "Completed Booking":
        return "primary";
      default:
        return "warning";
    }
  };

  return (
    <div className="container-sm ">
      <Container className="my-4 rounded shadow border">
        <div className="pt-2">
          <h4 className="fw-bold px-2 py-2">My Account</h4>
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
              <i className="fas fa-file-alt"></i> Uploaded Files
            </Button>
          </NavItem>

          {/* Dropdown for Booking */}
          <NavItem className="pt-2 px-1">
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggleDropdown}
              className="dropdown_Booking ">
              <DropdownToggle caret color={getDropdownColor()}>
                Booking {/* Always show "Booking" */}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => handleDropdownClick("Upcoming Booking")}
                  active={selectedBookingOption === "Upcoming Booking"}>
                  Upcoming Booking
                </DropdownItem>
                <DropdownItem
                  onClick={() => handleDropdownClick("Completed Booking")}
                  active={selectedBookingOption === "Completed Booking"}>
                  Completed Booking
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
          {/* 
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
          </NavItem> */}
        </Nav>

        {/* Tab Content with Smooth Transition */}
        <TabContent activeTab={activeTab} className="tab-content-transition">
          <Fade in={fadeIn} timeout={300}>
            <TabPane tabId="1">{activeTab === "1" && <Document />}</TabPane>
            <TabPane tabId="2">
              {activeTab === "2" && (
                <div className="text-center">
                  <h5 className="fw-bold mb-5 ">{selectedBookingOption}</h5>

                  {/* Display loader if booking data is being fetched */}
                  {loading && <p>Loading booking data...</p>}

                  {/* Display Upcoming Booking */}
                  {selectedBookingOption === "Upcoming Booking" && !loading && (
                    <Row className="g-4 justify-content-around">
                      {" "}
                      {/* Added g-4 for consistent gutter spacing */}
                      {upcomingBookings.length > 0 ? (
                        upcomingBookings.map((booking) => (
                          <Col lg="5" md="5" sm="12" key={booking["ID"]}>
                            {" "}
                            {/* Set lg=6 for 50% width */}
                            <HorizontalCard userdata={booking} />
                          </Col>
                        ))
                      ) : (
                        <Col>
                          <p>No Upcoming Booking available.</p>
                        </Col>
                      )}
                    </Row>
                  )}

                  {/* Display Completed Booking */}
                  {selectedBookingOption === "Completed Booking" &&
                    !loading && (
                      <Row className="g-4 justify-content-around">
                        {completedBookings.length > 0 ? (
                          completedBookings.map((booking) => (
                            <Col lg="5" md="5" sm="12" key={booking["ID"]}>
                              {" "}
                              {/* Set lg=6 for 50% width */}
                              <HorizontalCard userdata={booking} />
                            </Col>
                          ))
                        ) : (
                          <Col>
                            <p>No Completed Booking available.</p>
                          </Col>
                        )}
                      </Row>
                    )}
                </div>
              )}
            </TabPane>
            {/* <TabPane tabId="3">
              {activeTab === "3" && <ChangePassword />}
            </TabPane> */}
          </Fade>
        </TabContent>
      </Container>
    </div>
  );
};

export default ProfileOptions;
