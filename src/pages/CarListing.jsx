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
  const [sortByPrice, setSortOrder] = useState("");
  const [sortCategory, setSortCategory] = useState("default");
  const [sortFuel, setSortFuel] = useState("default");
  const [sortType, setSortType] = useState("default");
  const [selectedPlan, setSelectedPlan] = useState("default"); // For dropdown

  const [filteredData, setFilteredData] = useState(carData); // Store filtered data

  const plans = ["default", "140 KM", "320 KM", "500 KM", "620 KM"]; // Distance plans

  const navigate = useNavigate(); // useNavigate hook for redirection

  // Handle filter functions
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handleSortCategoryChange = (e) => setSortCategory(e.target.value);
  const handleSortFuelChange = (e) => setSortFuel(e.target.value);
  const handleSortTypeChange = (e) => setSortType(e.target.value);
  const handlePlanChange = (e) => setSelectedPlan(e.target.value); // For distance plan dropdown

  // API integration to apply filters when the "Apply Filters" button is clicked
  const applyFilters = async () => {
    // Prepare filter data to send to the API
    const filterData = {
      categoryArgs: sortCategory !== "default" ? sortCategory : "",
      fuelType: sortFuel !== "default" ? sortFuel : "",
      transmissionType: sortType !== "default" ? sortType : "",
      kmLimit: selectedPlan !== "default" ? selectedPlan : "",
      sortByPrice,
    };

    alert(JSON.stringify(filterData));
    try {
      const response = await fetch("https://your-api-endpoint.com/filters", {
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
      setFilteredData(result); // Update the state with filtered data from API
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setFilteredData(carData); // Fallback to initial data if API fails
    }
  };

  // Refresh the page (reset filters)
  const applyRefresh = () => {
    setSortOrder("default");
    setSortCategory("default");
    setSortFuel("default");
    setSortType("default");
    setSelectedPlan("default");

    setFilteredData(carData); // Reset to initial data or refetch if needed
    window.location.reload();
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
                    <option value="default">Sort By Price</option>
                    <option value="Asc">Asc</option>
                    <option value="Desc">Desc</option>
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
