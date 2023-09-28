import React, { useState } from "react";
import "./card.css";
import PropertyCard from "../Dashboard/propertyCard";

const Card = ({ data }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("0-100000"); // Step 1

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePropertyTypeChange = (e) => {
    setSelectedPropertyType(e.target.value);
  };

  const handlePriceChange = (e) => { // Step 2
    setSelectedPrice(e.target.value);
  };

  const filteredData = data.filter((property) => {
    const propertyCity = property.city.toLowerCase();
    const selectedCityLowerCase = selectedCity.toLowerCase();
    const formattedDate = new Date(property.Available_from).toISOString().split('T')[0];
    const propertyType = property.type.toLowerCase();
    const selectedTypeLowerCase = selectedPropertyType.toLowerCase();

    const [minPrice, maxPrice] = selectedPrice.split("-").map(Number); // Extract min and max price

    if (selectedCityLowerCase && selectedDate && selectedPropertyType) {
      return (
        propertyCity === selectedCityLowerCase &&
        formattedDate === selectedDate &&
        propertyType === selectedTypeLowerCase &&
        property.price >= minPrice && property.price <= maxPrice // Check price range
      );
    }

    if (selectedCityLowerCase && selectedDate) {
      return (
        propertyCity === selectedCityLowerCase &&
        formattedDate === selectedDate &&
        property.price >= minPrice && property.price <= maxPrice
      );
    }

    if (selectedCityLowerCase && selectedPropertyType) {
      return (
        propertyCity === selectedCityLowerCase &&
        propertyType === selectedTypeLowerCase &&
        property.price >= minPrice && property.price <= maxPrice
      );
    }

    if (selectedDate && selectedPropertyType) {
      return (
        formattedDate === selectedDate &&
        propertyType === selectedTypeLowerCase &&
        property.price >= minPrice && property.price <= maxPrice
      );
    }

    if (selectedCityLowerCase) {
      return propertyCity === selectedCityLowerCase;
    }

    if (selectedDate) {
      return formattedDate === selectedDate;
    }

    if (selectedPropertyType) {
      return (
        propertyType === selectedTypeLowerCase &&
        property.price >= minPrice && property.price <= maxPrice
      );
    }

    return property.price >= minPrice && property.price <= maxPrice; // Default price filter
  });

  console.log("Filtered Data", filteredData);
  return (
    <div>
      <div className="Searchp">
        <h1>Search Properties for Rent</h1>
      </div>
      <div className="cl">
        <div>
          <p>City</p>
          <select name="city" onChange={handleCityChange} value={selectedCity}>
          <option value="">Select City</option>
          <option>Kadivali</option>
          <option>Borivali</option>
          <option>Andheri</option>
          <option>Rajasthan</option>
          </select>
        </div>
        <div>
          <p>Available From</p>
          <input
            type="date"
            name="availableDate"
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
        <div>
          <p>Price</p>
          <select
            name="price"
            onChange={handlePriceChange} // Step 2
            value={selectedPrice} // Step 1
          >
            <option value="">Select Price</option>
            <option value="0-10000">0-10000</option>
            <option value="10000-25000">10000-25000</option>
            <option value="25000-50000">25000-50000</option>
            <option value="50000">50000 above</option>
          </select>
        </div>
        <div>
          <p>Property Type</p>
          <select
            name="propertyType"
            onChange={handlePropertyTypeChange}
            value={selectedPropertyType}
          >
            <option value="">Select Type</option>
            <option>Duplex</option>
            <option>Flat</option>
          </select>
        </div>
      </div>
      <div className="card-container">
        {filteredData.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Card;
