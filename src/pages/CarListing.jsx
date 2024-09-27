import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import "../styles/search.css";
import { useState, useEffect } from "react";
import PricingPlan from "../components/UI/Planing";

const CarListing = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts
  }, []); // Empty dependency array means this runs only on mount
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [sortByPrice, setSortOrder] = useState("");
  const [sortCategory, setSortCategory] = useState("");
  const [sortFuel, setSortFuel] = useState("");
  const [sortType, setSortType] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(""); // New state for location
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [refresh, setRefresh] = useState("");

  // States for dynamic filter options
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [distancePlans, setDistancePlans] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]); // New state for location options

  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handleSortCategoryChange = (e) => setSortCategory(e.target.value);
  const handleSortFuelChange = (e) => setSortFuel(e.target.value);
  const handleSortTypeChange = (e) => setSortType(e.target.value);
  const handlePlanChange = (e) => setSelectedPlan(e.target.value);
  const handleLocationChange = (e) => setSelectedLocation(e.target.value); // New handler for location
  const handleApplyFilters = () => setFilterApplied((prev) => !prev);

  // Fetching filter options (category, distance, location, etc.)
  // useEffect to fetch filter options like category, distance, and location
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch category options
        const categoryResponse = await fetch(
          `${BASE_URL}/getDefaultPropertyValuesByName`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "Property Name": "Category" }),
          }
        );
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch category options");
        }
        const categoryResult = await categoryResponse.json();
        setCategoryOptions(
          (categoryResult.data["Property Value"] || "").split(",")
        );

        // Fetch distance options
        const distanceResponse = await fetch(
          `${BASE_URL}/getDefaultPropertyValuesByName`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "Property Name": "Km Limit" }),
          }
        );
        if (!distanceResponse.ok) {
          throw new Error("Failed to fetch distance options");
        }
        const distanceResult = await distanceResponse.json();
        setDistancePlans(
          (distanceResult.data["Property Value"] || "").split(",")
        );

        // Fetch location options
        const locationResponse = await fetch(
          `${BASE_URL}/getDefaultPropertyValuesByName`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "Property Name": "Branch" }),
          }
        );
        if (!locationResponse.ok) {
          throw new Error("Failed to fetch location options");
        }
        const locationResult = await locationResponse.json();
        setLocationOptions(
          (locationResult.data["Property Value"] || "").split(",")
        );
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []); // Empty dependency array to run the effect only once

  // Apply Filters
  useEffect(() => {
    const applyFilters = async () => {
      const filterData = {
        categoryArgs: sortCategory || "",
        fuelType: sortFuel || "",
        transmissionType: sortType || "",
        kmLimit: selectedPlan || "",
        location: selectedLocation || "", // Include location in filters
        sortByPrice,
        startDate,
        endDate,

        categoryOptions: categoryOptions || [],
        fuelOptions: fuelOptions || [],
        transmissionOptions: transmissionOptions || [],
        distancePlans: distancePlans || [],
        locationOptions: locationOptions || [],
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

  // Refresh Filter
  const applyRefresh = () => {
    setRefresh(refresh + 1);
    setSortOrder("");
    setSortCategory("");
    setSortFuel("");
    setSortType("");
    setSelectedPlan("");
    setSelectedLocation(""); // Reset location
    setStartDate("");
    setEndDate("");
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

                  {/* Dropdown for locationOptions */}
                  <select
                    className="sort-dropdown"
                    onChange={handleLocationChange}
                    value={selectedLocation}>
                    <option value="">Choose Location</option>
                    {locationOptions.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>

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
                    <option value="Pertrol">Pertrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>

                  {/* Dropdown for transmissionOptions */}
                  <select
                    className="sort-dropdown"
                    onChange={handleSortTypeChange}
                    value={sortType}>
                    <option value="">Transmission Type</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
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
                    <CarItem item={item} key={item.id} />
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
