// import React, { useState } from "react";
// import { Container, Row, Col } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
// import CommonSection from "../components/UI/CommonSection";
// import CarItem from "../components/UI/CarItem";
// import carData from "../assets/data/carData";
// import "../styles/search.css";
// import PricingPlan from "../components/UI/Planing";

// const faqs = [
//   {
//     question: "What do I need to rent a car?",
//     answer:
//       'To avail Lionea  car service you must be at least 21 years old, and your driving license for "Light Motor Vehicles" must be at least 1 year old (at the time of starting the trip). Driving license printed on A4 sheet of paper (original or otherwise), driving license on M-Parivaahan app and commercial driving licenses will not be accepted.',
//   },
//   {
//     question: "Can I book for any period of time?",
//     answer:
//       "The Minimum booking hours for weekdays is 18 hours, and on weekends it is 18 hours.",
//   },
//   {
//     question: "How much time will you take to refund the security deposit?",
//     answer: "Security deposit will be refunded within 10 Bank working days.",
//   },
//   {
//     question: "Can I book an inter-state drop off??",
//     answer: "No, we do not provide inter-state drop off",
//   },
//   {
//     question: "Can I arrange for the car to be delivered to my home??",
//     answer: "Yes, the vehicle will be dropped at your doorstep.",
//   },
//   {
//     question: "Can I make changes to my booking? ?",
//     answer:
//       "You can extend / modify the booking post confirmation from customer support.",
//   },
//   {
//     question: "Can anyone besides the reservation applicant pick up the car??",
//     answer:
//       "No, only the applicant on whose name the booking has been confirmed and verified, will be allowed to pick up the car.",
//   },
//   {
//     question: "Do I need to pay any amount to cross the border??",
//     answer:
//       "Yes. You have to pay the amount as per the applicable law of the state which you intend to cross/travel. Wowcarz will refund only if an annual permit is purchased. However, reimbursement will be done based on the usage.",
//   },
//   {
//     question: "Where can I return the vehicle, if the location is closed??",
//     answer: "We work 24/7",
//   },
//   {
//     question: "How will I be charged, if I return the car late??",
//     answer: "Charges will be based on the extra hours and extra kilometers.",
//   },
//   {
//     question: "Who will pay traffic violations? How will it be charged??",
//     answer: "For such breaches, consumers have to compensate. This depends.",
//   },
//   {
//     question: "Who will pay for parking and tolls??",
//     answer:
//       "Parking and Tolls charges you are required to pay. No refund will be done for the same.",
//   },
//   {
//     question: "Where can I find the Car documents??",
//     answer: "You can find the car documents in the dashboard.",
//   },
// ];

// const CarListing = () => {
//   const [sortOrder, setSortOrder] = useState("default");
//   const [sortCategory, setSortCategory] = useState("default");
//   const [sortFuel, setSortFuel] = useState("default");
//   const [sortType, setSortType] = useState("default");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredAndSortedData, setFilteredAndSortedData] = useState(carData);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const toggleAccordion = (index) => {
//     setActiveIndex(index === activeIndex ? null : index);
//   };

//   // Handle dropdown changes
//   const handleSortOrderChange = (e) => setSortOrder(e.target.value);
//   const handleSortCategoryChange = (e) => setSortCategory(e.target.value);
//   const handleSortFuelChange = (e) => setSortFuel(e.target.value);
//   const handleSortTypeChange = (e) => setSortType(e.target.value);
//   const handleSearchChange = (e) => setSearchQuery(e.target.value);

//   // Function to apply filters when the button is clicked
//   const applyFilters = () => {
//     let filteredData = carData.filter((car) =>
//       car.carName.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (sortCategory !== "default") {
//       filteredData = filteredData.filter(
//         (car) => car.category === sortCategory
//       );
//     }

//     if (sortFuel !== "default") {
//       filteredData = filteredData.filter((car) => car.oil === sortFuel);
//     }

//     if (sortType !== "default") {
//       filteredData = filteredData.filter(
//         (car) => car.transmission_type === sortType
//       );
//     }

//     if (sortOrder === "rentPriceLowToHigh") {
//       filteredData = filteredData.sort((a, b) => a.price - b.price);
//     } else if (sortOrder === "rentPriceHighToLow") {
//       filteredData = filteredData.sort((a, b) => b.price - a.price);
//     }

//     setFilteredAndSortedData(filteredData);
//   };

//   return (
//     <Helmet title="Cars">
//       <CommonSection title="Car Listing" />
//       <section>
//         <Container>
//           <Row>
//             <Col lg="12">
//               <PricingPlan />
//             </Col>

//             <Col lg="12">
//               <div className="search-sort-container">
//                 <div className="sort-label-container">
//                   <i className="ri-sort-asc sort-icon"></i>
//                   <span className="sort-label">Sort By</span>
//                   <select
//                     className="sort-dropdown"
//                     onChange={handleSortCategoryChange}>
//                     <option value="default">Choose Category</option>
//                     <option value="SUV">SUV</option>
//                     <option value="Sedan">Sedan</option>
//                     <option value="Hatchback">Hatchback</option>
//                     <option value="Convertible">Convertible</option>
//                   </select>

//                   <select
//                     className="sort-dropdown"
//                     onChange={handleSortFuelChange}>
//                     <option value="default">Fuel Type</option>
//                     <option value="diesel">Diesel</option>
//                     <option value="petrol">Petrol</option>
//                     <option value="electric">Electric</option>
//                   </select>

//                   <select
//                     className="sort-dropdown"
//                     onChange={handleSortTypeChange}>
//                     <option value="default">Transmission Type</option>
//                     <option value="Manual">Manual</option>
//                     <option value="Automatic">Automatic</option>
//                   </select>

//                   <select
//                     className="sort-dropdown"
//                     onChange={handleSortOrderChange}>
//                     <option value="default">Rent Price</option>
//                     <option value="rentPriceLowToHigh">Low to High</option>
//                     <option value="rentPriceHighToLow">High to Low</option>
//                   </select>
//                 </div>

//                 {/* Apply Filters Button */}

//                 <button className="apply-filters-btn" onClick={applyFilters}>
//                   Apply Filters
//                 </button>
//               </div>
//             </Col>

//             {/* Car Listing */}
//             {filteredAndSortedData.length > 0 ? (
//               filteredAndSortedData.map((item) => (
//                 <CarItem item={item} key={item.id} />
//               ))
//             ) : (
//               <Col lg="12">
//                 <div className="no-results-message">
//                   No cars available for the selected filters
//                 </div>
//               </Col>
//             )}
//           </Row>
//         </Container>
//       </section>

//       {/* FAQs Section */}
//       <section className="mb-4">
//         <Container>
//           <Row>
//             <Col lg="12" className="text-center mb-2">
//               <h6 className="section__subtitle">See Our</h6>
//               <h2 className="section__title">Frequently Asked Questions</h2>
//             </Col>
//             <div className="faq-container">
//               {faqs.map((faq, index) => (
//                 <div key={index} className="faq-item">
//                   <div
//                     className="faq-header"
//                     onClick={() => toggleAccordion(index)}>
//                     <div className="faq-question">{faq.question}</div>
//                     <div className="faq-toggle-icon">
//                       <i
//                         className={`ri-arrow-${
//                           activeIndex === index ? "up" : "down"
//                         }-s-line`}></i>
//                     </div>
//                   </div>
//                   <div
//                     className={`faq-answer ${
//                       activeIndex === index ? "open" : ""
//                     }`}>
//                     <p>{faq.answer}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Row>
//         </Container>
//       </section>
//     </Helmet>
//   );
// };

// export default CarListing;import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import "../styles/search.css";
import { useState } from "react";
import PricingPlan from "../components/UI/Planing";

const CarListing = () => {
  const [sortOrder, setSortOrder] = useState("default");
  const [sortCategory, setSortCategory] = useState("default");
  const [sortFuel, setSortFuel] = useState("default");
  const [sortType, setSortType] = useState("default");
  const [selectedPlan, setSelectedPlan] = useState("default"); // For dropdown
  const [searchQuery, setSearchQuery] = useState(""); // Car name search filter
  const [filteredData, setFilteredData] = useState(carData); // Store filtered data

  const plans = ["default", "140 KM", "320 KM", "500 KM", "620 KM"]; // Distance plans

  const navigate = useNavigate(); // useNavigate hook for redirection

  // Handle filter functions
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handleSortCategoryChange = (e) => setSortCategory(e.target.value);
  const handleSortFuelChange = (e) => setSortFuel(e.target.value);
  const handleSortTypeChange = (e) => setSortType(e.target.value);
  const handlePlanChange = (e) => setSelectedPlan(e.target.value); // For distance plan dropdown
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Apply filters when the "Apply Filters" button is clicked
  const applyFilters = () => {
    let filteredData = carData.filter((car) =>
      car.carName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortCategory !== "default") {
      filteredData = filteredData.filter(
        (car) => car.category === sortCategory
      );
    }

    if (sortFuel !== "default") {
      filteredData = filteredData.filter((car) => car.oil === sortFuel);
    }

    if (sortType !== "default") {
      filteredData = filteredData.filter(
        (car) => car.transmission_type === sortType
      );
    }

    if (selectedPlan !== "default") {
      filteredData = filteredData.filter((car) => car.plan === selectedPlan);
    }

    if (sortOrder === "rentPriceLowToHigh") {
      filteredData = filteredData.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "rentPriceHighToLow") {
      filteredData = filteredData.sort((a, b) => b.price - a.price);
    }

    setFilteredData(filteredData); // Update the state with filtered data
  };

  // Refresh the page (reset filters)
  const applyRefresh = () => {
    window.location.reload(); // Redirect to the same page to refresh filters
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <PricingPlan />
            </Col>
            <Col lg="12">
              <div className="search-sort-container">
                <div className="sort-label-container">
                  <i className="ri-sort-asc sort-icon"></i>
                  <span className="sort-label">Sort By</span>

                  {/* Dropdown for different filters */}
                  <select
                    className="sort-dropdown"
                    onChange={handleSortCategoryChange}>
                    <option value="default">Choose Category</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Convertible">Convertible</option>
                  </select>

                  <select
                    className="sort-dropdown"
                    onChange={handleSortFuelChange}>
                    <option value="default">Fuel Type</option>
                    <option value="diesel">Diesel</option>
                    <option value="petrol">Petrol</option>
                    <option value="electric">Electric</option>
                  </select>

                  <select
                    className="sort-dropdown"
                    onChange={handleSortTypeChange}>
                    <option value="default">Transmission Type</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>

                  <select
                    className="sort-dropdown"
                    onChange={handleSortOrderChange}>
                    <option value="default">Rent Price</option>
                    <option value="rentPriceLowToHigh">Low to High</option>
                    <option value="rentPriceHighToLow">High to Low</option>
                  </select>

                  {/* Distance Plan Dropdown */}
                  <select className="sort-dropdown" onChange={handlePlanChange}>
                    <option value="default">Choose Distance Plan</option>
                    {plans.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                  <button className="apply-filters-btn" onClick={applyFilters}>
                    Apply Filters
                  </button>
                </div>

                <div className="text-end">
                  <input
                    type="text"
                    className="search-input d-none"
                    placeholder="Search by car name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Buttons for Apply Filters and Refresh */}

                <button className="apply-refresh-btn" onClick={applyRefresh}>
                  Refresh
                </button>
              </div>
            </Col>

            {/* Render filtered data */}
            {filteredData.length > 0 ? (
              filteredData.map((item) => <CarItem item={item} key={item.id} />)
            ) : (
              <Col lg="12">
                <div className="no-results-message">
                  No cars available for the selected filters
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
