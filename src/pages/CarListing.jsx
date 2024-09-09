// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
// import CommonSection from "../components/UI/CommonSection";
// import CarItem from "../components/UI/CarItem";
// import "../styles/search.css";
// import { useState, useEffect } from "react";
// import PricingPlan from "../components/UI/Planing";

// const CarListing = () => {
//   const BASE_URL = process.env.REACT_APP_BACKEND_URL;
//   const [sortByPrice, setSortOrder] = useState(""); // Initialize as empty string
//   const [sortCategory, setSortCategory] = useState("");
//   const [sortFuel, setSortFuel] = useState("");
//   const [sortType, setSortType] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState("");
//   const [filteredData, setFilteredData] = useState([]); // Initialize as an empty array
//   const [filterApplied, setFilterApplied] = useState(false); // Track filter button clicks
//   const plans = ["", "140 KM", "320 KM", "500 KM", "620 KM"]; // Distance plans
//   const [refresh, setRefresh] = useState("");

//   const navigate = useNavigate(); // useNavigate hook for redirection

//   // Handle filter functions
//   const handleSortOrderChange = (e) => setSortOrder(e.target.value);
//   const handleSortCategoryChange = (e) => setSortCategory(e.target.value);
//   const handleSortFuelChange = (e) => setSortFuel(e.target.value);
//   const handleSortTypeChange = (e) => setSortType(e.target.value);
//   const handlePlanChange = (e) => setSelectedPlan(e.target.value); // For distance plan dropdown

//   const handleApplyFilters = () => {
//     setFilterApplied((prev) => !prev); // Toggle the value to reapply filters
//   };

//   useEffect(() => {
//     const applyFilters = async () => {
//       // Prepare filter data to send to the API
//       const filterData = {
//         categoryArgs: sortCategory || "", // Send empty string if no selection
//         fuelType: sortFuel || "",
//         transmissionType: sortType || "",
//         kmLimit: selectedPlan || "",
//         sortByPrice,
//       };

//       try {
//         const response = await fetch(`${BASE_URL}/getCustomerRentalCarsList`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(filterData),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch filtered data");
//         }

//         const result = await response.json();
//         if (result.data && result.data.length > 0) {
//           setFilteredData(result.data); // Update the state with filtered data from API
//         } else {
//           setFilteredData([]); // Clear filtered data if API returns empty
//         }
//       } catch (error) {
//         console.error("Error fetching filtered data:", error);
//         setFilteredData([]); // Fallback to empty array if API fails
//       }
//     };

//     applyFilters(); // Apply filters when page loads or filters change

//   }, [filterApplied,refresh]);

//   // Refresh the page (reset filters)
//   const applyRefresh = () => {
//     setRefresh(refresh+1);
//     setSortOrder("");
//     setSortCategory("");
//     setSortFuel("");
//     setSortType("");
//     setSelectedPlan("");
//     setFilterApplied(false); // Reset filters applied status
//     setFilteredData([]); // Reset to initial state
//    // window.location.reload(); // Optionally refresh the page
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

//                   {/* Dropdown for different filters */}
//                   <select
//                     className="sort-dropdown"
//                     onChange={handleSortCategoryChange}
//                     value={sortCategory}>
//                     <option value="">Choose Category</option>
//                     <option value="SUV">SUV</option>
//                     <option value="Sedan">Sedan</option>
//                     <option value="Hatchback">Hatchback</option>
//                     <option value="Convertible">Convertible</option>
//                   </select>

//                   <select
//                     className="sort-dropdown"
//                     onChange={handleSortFuelChange}
//                     value={sortFuel}>
//                     <option value="">Fuel Type</option>
//                     <option value="Diesel">Diesel</option>
//                     <option value="Petrol">Petrol</option>
//                     <option value="Electric">Electric</option>
//                   </select>

//                   <select
//                     className="sort-dropdown"
//                     onChange={handleSortTypeChange}
//                     value={sortType}>
//                     <option value="">Transmission Type</option>
//                     <option value="Manual">Manual</option>
//                     <option value="Automatic">Automatic</option>
//                   </select>

//                   <select
//                     className="sort-dropdown"
//                     onChange={handleSortOrderChange}
//                     value={sortByPrice}>
//                     <option value="">Sort By Price</option>
//                     <option value="Asc">Asc</option>
//                     <option value="Desc">Desc</option>
//                   </select>

//                   {/* Distance Plan Dropdown */}
//                   <select
//                     className="sort-dropdown"
//                     onChange={handlePlanChange}
//                     value={selectedPlan}>
//                     <option value="">Choose Distance Plan</option>
//                     {plans.map((plan) => (
//                       <option key={plan} value={plan}>
//                         {plan}
//                       </option>
//                     ))}
//                   </select>

//                   <button
//                     className="apply-filters-btn"
//                     onClick={handleApplyFilters}>
//                     Apply Filters
//                   </button>
//                 </div>

//                 {/* Buttons for Apply Filters and Refresh */}
//                 <button className="apply-refresh-btn" onClick={applyRefresh}>
//                   Refresh
//                 </button>
//               </div>
//             </Col>

//             {/* Render filtered data */}

//             {filteredData.length > 0 ? (
//               filteredData.map((item) => <CarItem item={item} key={item['ID']} />)
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
//     </Helmet>
//   );
// };

// export default CarListing;
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import "../styles/search.css";
import { useState, useEffect } from "react";
import PricingPlan from "../components/UI/Planing";

const CarListing = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [sortByPrice, setSortOrder] = useState("");
  const [sortCategory, setSortCategory] = useState("");
  const [sortFuel, setSortFuel] = useState("");
  const [sortType, setSortType] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [startDate, setStartDate] = useState(""); // New state for startDate
  const [endDate, setEndDate] = useState(""); // New state for endDate
  const [filteredData, setFilteredData] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const plans = ["", "140 KM", "320 KM", "500 KM", "620 KM"];
  const [refresh, setRefresh] = useState("");

  const navigate = useNavigate();

  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handleSortCategoryChange = (e) => setSortCategory(e.target.value);
  const handleSortFuelChange = (e) => setSortFuel(e.target.value);
  const handleSortTypeChange = (e) => setSortType(e.target.value);
  const handlePlanChange = (e) => setSelectedPlan(e.target.value);
  const handleApplyFilters = () => setFilterApplied((prev) => !prev);

  useEffect(() => {
    const applyFilters = async () => {
      const filterData = {
        categoryArgs: sortCategory || "",
        fuelType: sortFuel || "",
        transmissionType: sortType || "",
        kmLimit: selectedPlan || "",
        sortByPrice,
        startDate, // Send startDate
        endDate, // Send endDate
      };

      try {
        const response = await fetch(`${BASE_URL}/getCustomerRentalCarsList`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterData),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch filtered data");
        }

        const result = await response.json();
        if (result.data && result.data.length > 0) {
          setFilteredData(result.data);
        } else {
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Error fetching filtered data:", error);
        setFilteredData([]);
      }
    };

    applyFilters();
  }, [filterApplied, refresh]);

  const applyRefresh = () => {
    setRefresh(refresh + 1);
    setSortOrder("");
    setSortCategory("");
    setSortFuel("");
    setSortType("");
    setSelectedPlan("");
    setStartDate(""); // Reset startDate
    setEndDate(""); // Reset endDate
    setFilterApplied(false);
    setFilteredData([]);
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              {/* Pass startDate and endDate setter to PricingPlan */}
              <PricingPlan
                setStartDateProp={setStartDate}
                setEndDateProp={setEndDate}
              />
            </Col>
            <Col lg="12">
              <div className="search-sort-container">
                <div className="sort-label-container">
                  <i className="ri-sort-asc sort-icon"></i>
                  <span className="sort-label">Sort By</span>

                  {/* Dropdown for different filters */}
                  <select
                    className="sort-dropdown"
                    onChange={handleSortCategoryChange}
                    value={sortCategory}>
                    <option value="">Choose Category</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Convertible">Convertible</option>
                  </select>

                  <select
                    className="sort-dropdown"
                    onChange={handleSortFuelChange}
                    value={sortFuel}>
                    <option value="">Fuel Type</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                  </select>

                  <select
                    className="sort-dropdown"
                    onChange={handleSortTypeChange}
                    value={sortType}>
                    <option value="">Transmission Type</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>

                  <select
                    className="sort-dropdown"
                    onChange={handleSortOrderChange}
                    value={sortByPrice}>
                    <option value="">Sort By Price</option>
                    <option value="Asc">Asc</option>
                    <option value="Desc">Desc</option>
                  </select>

                  <select
                    className="sort-dropdown"
                    onChange={handlePlanChange}
                    value={selectedPlan}>
                    <option value="">Choose Distance</option>
                    {plans.map((plan, index) => (
                      <option key={index} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>

                  <button
                    className="apply-filters-btn"
                    onClick={handleApplyFilters}>
                    Apply Filters
                  </button>
                </div>

                {/* Buttons for Apply Filters and Refresh */}
                <button className="apply-refresh-btn" onClick={applyRefresh}>
                  Refresh
                </button>
              </div>
            </Col>

            <Col lg="12">
              <Row>
                {filteredData.length === 0 ? (
                  <h4 className="text-center">No cars found</h4>
                ) : (
                  filteredData.map((item) => (
                    <CarItem item={item} key={item["ID"]} />
                  ))
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
