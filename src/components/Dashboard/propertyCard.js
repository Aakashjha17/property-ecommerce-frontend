import React from "react";
import "./propertyCard.css";

const PropertyCard = ({property}) => {
 

  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="card1">
      
        <div>
          <img src={property.image} alt="img" className="image" />
          <p>
            <span>₹ {property.price}</span>/month
          </p>
          <h2>{property.type}</h2>
          <p>Available From: {formatDate(property.Available_from)}</p>
          <p>
            {property.city}, {property.District}
          </p>
          <hr className="line" />
          <p>
            <span>Beds:{property.beds} </span>{" "}
            <span>Bathrooms:{property.bathroom} </span>{" "}
            <samp>{property.size}sqft</samp>
          </p>
        </div>
      
    </div>
  );
};

export default PropertyCard;
