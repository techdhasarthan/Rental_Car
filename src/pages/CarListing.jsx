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
  const [refresh, setRefresh] = useState("");

  // States for dynamic filter options
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [distancePlans, setDistancePlans] = useState([]);

  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handleSortCategoryChange = (e) => setSortCategory(e.target.value);
  const handleSortFuelChange = (e) => setSortFuel(e.target.value);
  const handleSortTypeChange = (e) => setSortType(e.target.value);
  const handlePlanChange = (e) => setSelectedPlan(e.target.value);
  const handleApplyFilters = () => setFilterApplied((prev) => !prev);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        var jsonObj = JSON.parse("{}");
        jsonObj["Property Name"] = "Category";
        //const response = await fetch(`${BASE_URL}/getDefaultPropertyValuesByName`,jsonObj);
        const response = await fetch(`${BASE_URL}/getDefaultPropertyValuesByName`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonObj),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch filter options");
        }

        const result = await response.json();
        const responseObj = result.data;
        const categoryValueString = responseObj["Property Value"];
        // Convert string to array using split, assuming comma-separated values
        setCategoryOptions(categoryValueString.split(",") || []);
        setFuelOptions(result.fuelOptions.split(",") || []);
        setTransmissionOptions(result.transmissionOptions.split(",") || []);
        setDistancePlans(result.distancePlans.split(",") || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

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

                  {/* Dropdown for categoryOptions */}
                  <select
                    className="sort-dropdown"
                    onChange={handleSortCategoryChange}
                    value={sortCategory}>
                    <option value="">Choose Category</option>
                    {categoryOptions.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* Dropdown for fuelOptions */}
                  <select
                    className="sort-dropdown"
                    onChange={handleSortFuelChange}
                    value={sortFuel}>
                    <option value="">Fuel Type</option>
                    {fuelOptions.map((fuel, index) => (
                      <option key={index} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </select>

                  {/* Dropdown for transmissionOptions */}
                  <select
                    className="sort-dropdown"
                    onChange={handleSortTypeChange}
                    value={sortType}>
                    <option value="">Transmission Type</option>
                    {transmissionOptions.map((transmission, index) => (
                      <option key={index} value={transmission}>
                        {transmission}
                      </option>
                    ))}
                  </select>

                  {/* Dropdown for distancePlans */}
                  <select
                    className="sort-dropdown"
                    onChange={handlePlanChange}
                    value={selectedPlan}>
                    <option value="">Choose Distance</option>
                    {distancePlans.map((plan, index) => (
                      <option key={index} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>

                  <button
                    className="apply-filters-btn "
                    onClick={handleApplyFilters}>
                    Apply Filters
                  </button>
                </div>

                {/* Buttons for Apply Filters and Refresh */}
                <button className="apply-refresh-btn " onClick={applyRefresh}>
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
