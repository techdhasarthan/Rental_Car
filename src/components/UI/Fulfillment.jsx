import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/fulfillment.css"; // Import your CSS file for styling
import "../../pages/ShowCarDetails.css";
import UploadCheckButton from "../../pages/UploadCheckButton";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { message } from "antd";
import { Container, Col } from "reactstrap";

const Fulfillment = () => {
  const [selectedOption, setSelectedOption] = useState("delivery"); // Default active option
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const location = useLocation();
  const { slug } = useParams(); // Extract car name (slug) from the URL
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Animation should happen only once
      mirror: false, // Elements should animate out while scrolling past them
    });
  }, []);

  const handleSelectChange = (event) => {
    setPickupLocation(event.target.value);
    setDeliveryInfo(""); // Clear delivery info when a pickup location is selected
    setExtraInfo("");
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Clear corresponding fields based on the selected option
    if (selectedValue === "selfPickup") {
      setDeliveryInfo("");
      setExtraInfo("");
    } else if (selectedValue === "delivery") {
      setPickupLocation("");
    }
  };

  const handleDeliveryInfoChange = (event) => {
    setDeliveryInfo(event.target.value);
    setPickupLocation(""); // Clear pickup location when delivery info is entered
  };

  const handleExtraInfoChange = (event) => {
    setExtraInfo(event.target.value);
    setPickupLocation(""); // Clear pickup location when extra info is entered
  };

  const handleFulfillmentRequest = () => {
    // Clear previous fulfillment-related data first
    localStorage.removeItem("pickupLocation");
    localStorage.removeItem("deliveryInfo");
    localStorage.removeItem("extraInfo");

    // Save selected fulfillment option
    localStorage.setItem("fulfillment", selectedOption);

    // Save relevant details based on the selected option
    if (selectedOption === "selfPickup") {
      if (pickupLocation) {
        localStorage.setItem("deliveryInfo", pickupLocation);
      }
    } else if (selectedOption === "delivery") {
      if (deliveryInfo) {
        localStorage.setItem("deliveryInfo", deliveryInfo);
      }
      if (extraInfo) {
        localStorage.setItem("extraInfo", extraInfo);
      }
    }
  };

  // Use useEffect to automatically trigger fulfillment request when relevant fields change
  useEffect(() => {
    handleFulfillmentRequest();
  }, [selectedOption, pickupLocation, deliveryInfo, extraInfo]);

  useEffect(() => {
    // Load Google Maps API
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const initMap = async () => {
      await loadScript(
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyDbf4ctII0wFHbVwnFy19k_2BsHWhPjFN8&libraries=places`
      );
      const mapInstance = new window.google.maps.Map(
        document.createElement("div")
      );
      const input = document.getElementById("search-box");
      const searchBoxInstance = new window.google.maps.places.SearchBox(input);

      setMap(mapInstance);
      setSearchBox(searchBoxInstance);

      // Bias the SearchBox results towards the current map's viewport
      mapInstance.addListener("bounds_changed", () => {
        searchBoxInstance.setBounds(mapInstance.getBounds());
      });

      // Listen for the event when the user selects a prediction from the pick list
      searchBoxInstance.addListener("places_changed", () => {
        const places = searchBoxInstance.getPlaces();
        if (places.length > 0) {
          const location = places[0].geometry.location;
          setDeliveryInfo(places[0].formatted_address); // Set the formatted address
          updateLatLngFields(location); // Update latitude and longitude
        }
      });
    };

    initMap();
  }, []);

  const updateLatLngFields = (location) => {
    // Update your latitude and longitude fields here
    const lat = location.lat();
    const lng = location.lng();
    console.log("Latitude:", lat, "Longitude:", lng); // You can store these in state or update input fields
  };
  return (
    <Container>
      <Col>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="pb-2">
            <div className="fulfillment-container">
              <div className="radio-buttons">
                <label>
                  <input
                    required
                    type="radio"
                    name="fulfillmentOption"
                    value="selfPickup"
                    checked={selectedOption === "selfPickup"}
                    onChange={handleOptionChange}
                  />
                  Self-Pickup
                </label>
                <label>
                  <input
                    required
                    type="radio"
                    name="fulfillmentOption"
                    value="delivery"
                    checked={selectedOption === "delivery"}
                    onChange={handleOptionChange}
                  />
                  Delivery
                </label>
              </div>

              <UploadCheckButton />

              {selectedOption === "selfPickup" && (
                <div className="select-input-container">
                  <select
                    required
                    className="select-input"
                    value={pickupLocation}
                    onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value="Kilampakkam">Kilampakkam</option>
                    <option value="Koyambedu">Koyambedu</option>
                    <option value="Tambaram">Tambaram</option>
                  </select>
                </div>
              )}

              {selectedOption === "delivery" && (
                <div className="delivery-info-container">
                  <input
                    id="search-box" // Make sure to set the ID for the input
                    required
                    type="text"
                    className="input-fieldss"
                    placeholder="Enter delivery address"
                    value={deliveryInfo}
                    onChange={handleDeliveryInfoChange}
                  />
                  <textarea
                    required
                    className="text-areas"
                    placeholder="Enter delivery instructions or additional details"
                    value={extraInfo}
                    onChange={handleExtraInfoChange}
                  />
                </div>
              )}

              <p className="disclaimer">
                <strong>Disclaimer:</strong> Delivery Charges may vary for
                outside city limits locations, including Airport pickup. You can
                add specific instructions related to delivery.
              </p>
            </div>
          </div>
        </form>
      </Col>
    </Container>
  );
};

export default Fulfillment;
