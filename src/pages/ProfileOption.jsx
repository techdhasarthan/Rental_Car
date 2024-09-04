import React, { useState } from "react";
import {
  Container,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Fade,
} from "reactstrap";
import classnames from "classnames";
import Document from "./Document"; // Component for Document Upload
import Booking from "./Booking"; // Component for Booking
import ChangePassword from "./ChangePassword"; // Component for Change Password

const ProfileOptions = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [fadeIn, setFadeIn] = useState(true);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setFadeIn(false); // Trigger fade-out
      setTimeout(() => {
        setActiveTab(tab);
        setFadeIn(true); // Trigger fade-in
      }, 200); // Match the fade duration for a smooth transition
    }
  };

  return (
    <div className="container-sm">
      <Container className="my-4 border rounded shadow">
        <div className="">
          <h4 className="fw-bold px-2 py-2"></h4>
        </div>
        {/* Navigation Tabs */}
        <Nav tabs className="justify-content-around">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => toggle("1")}
              style={{ cursor: "pointer" }}>
              <Button color="warning">
                <i className="fas fa-file-alt"></i> Document Upload
              </Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => toggle("2")}
              style={{ cursor: "pointer" }}>
              <Button color="warning">
                <i className="fas fa-calendar-alt"></i> Booking
              </Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => toggle("3")}
              style={{ cursor: "pointer" }}>
              <Button color="warning">
                <i className="fas fa-key"></i> Change Password
              </Button>
            </NavLink>
          </NavItem>
        </Nav>

        {/* Tab Content with Smooth Transition */}
        <TabContent activeTab={activeTab} className="tab-content-transition">
          <Fade in={fadeIn} timeout={300}>
            <TabPane tabId="1">{activeTab === "1" && <Document />}</TabPane>
            <TabPane tabId="2">{activeTab === "2" && <Booking />}</TabPane>
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
