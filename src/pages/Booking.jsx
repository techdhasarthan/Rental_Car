// import React, { useState } from "react";
// import {
//   Container,
//   Button,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane,
// } from "reactstrap";
// import classnames from "classnames";
// import "./Document.css";

// const Booking = () => {
//   // State to manage active tab
//   const [activeTab, setActiveTab] = useState("1");

//   // Function to toggle tabs
//   const toggle = (tab) => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };

//   return (
//     // <div className="container-sm ">
//     <Container className="my-2   ">
//       <div className="">
//         <h4 className="fw-bold ">Booking</h4>
//       </div>
//       {/* Navigation Tabs */}
//       <Nav tabs className="mb-4 mt-1 justify-content-around">
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === "1" })}
//             onClick={() => toggle("1")}
//             style={{ cursor: "pointer" }}>
//             <Button color="warning" className="btn-with-icon">
//               <i className="ri-calendar-fill"></i> Upcoming Bookings
//             </Button>
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === "2" })}
//             onClick={() => toggle("2")}
//             style={{ cursor: "pointer" }}>
//             <Button color="warning" className="btn-with-icon">
//               <i className="ri-calendar-check-fill"></i> Completed
//             </Button>
//           </NavLink>
//         </NavItem>
//       </Nav>

//       {/* Tab Content */}
//       <TabContent activeTab={activeTab}>
//         <TabPane tabId="1">
//           <div className="text-center">
//             <i className="fas fa-file-alt fa-4x text-primary mb-3"></i>
//             <p className="text-muted">No Record Found</p>
//           </div>
//         </TabPane>
//         <TabPane tabId="2">
//           <div className="text-center">
//             <i className="fas fa-file-alt fa-4x text-primary mb-3"></i>
//             <p className="text-muted">No Record Found</p>
//           </div>
//         </TabPane>
//       </TabContent>
//     </Container>
//     // </div>
//   );
// };

// export default Booking;
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
      <div className="">
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
        </div>
      )}
    </Container>
  );
};

export default Booking;
