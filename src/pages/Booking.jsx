import React, { useState } from "react";
import {
  Container,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

const Booking = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("1");

  // Function to toggle tabs
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    // <div className="container-sm ">
    <Container className="my-2   ">
      <div className="">
        <h4 className="fw-bold ">Booking</h4>
      </div>
      {/* Navigation Tabs */}
      <Nav tabs className="mb-4 mt-1 justify-content-around">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => toggle("1")}
            style={{ cursor: "pointer" }}>
            <Button color="warning">
              <i className="fas fa-users"></i> Upcoming Bookings
            </Button>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => toggle("2")}
            style={{ cursor: "pointer" }}>
            <Button color="warning">
              <i className="fas fa-users"></i> Completed
            </Button>
          </NavLink>
        </NavItem>
      </Nav>

      {/* Tab Content */}
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="text-center">
            <i className="fas fa-file-alt fa-4x text-primary mb-3"></i>
            <p className="text-muted">No Record Found</p>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="text-center">
            <i className="fas fa-file-alt fa-4x text-primary mb-3"></i>
            <p className="text-muted">No Record Found</p>
          </div>
        </TabPane>
      </TabContent>
    </Container>
    // </div>
  );
};

export default Booking;
