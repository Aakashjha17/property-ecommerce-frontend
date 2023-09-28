import React, { useState, useEffect } from 'react';
import PropertyServices from '../../services/property-service';
import './page.css';
import Uploader from '../uploader/image-uploader';

function PropertyForm({ propertyData }) {
  // Initialize state with propertyData values, or use defaults for a new property
  const [imageUrl, setImageUrl] = useState(propertyData ? propertyData.image : '');
  const [price, setPrice] = useState(propertyData ? propertyData.price : '');
  const [city, setCity] = useState(propertyData ? propertyData.city : '');
  const [type, setType] = useState(propertyData ? propertyData.type : '');
  const [bed, setBed] = useState(propertyData ? propertyData.beds : '');
  const [bathroom, setBathroom] = useState(
    propertyData ? propertyData.bathroom : ''
  );
  const [district, setDistrict] = useState(
    propertyData ? propertyData.District : ''
  );
  const [date, setDate] = useState(
    propertyData ? propertyData.Available_from : ''
  );
  const [size, setSize] = useState(propertyData ? propertyData.size : '');

  useEffect(() => {
    // Update state when propertyData changes
    if (propertyData) {
      setPrice(propertyData.price);
      setCity(propertyData.city);
      setType(propertyData.type);
      setBed(propertyData.beds);
      setBathroom(propertyData.bathroom);
      setDistrict(propertyData.District);
      setDate(propertyData.Available_from);
      setSize(propertyData.size);
    }
  }, [propertyData]);

  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];
  //   const data = new FormData();
  //   data.append("file", selectedImage);
  //   data.append("upload_preset", "mod0yxrg");
  //   data.append("cloud_name", "daycufjkf");
  
  //   fetch("https://api.cloudinary.com/v1_1/daycufjkf/image/upload", {
  //     method: "post",
  //     body: data
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Image uploaded:", data);
  //       // Now you can set the image URL or other relevant data in your state
  //     })
  //     .catch((err) => {
  //       console.log("Error uploading image:", err);
  //     });
  //   setImage(selectedImage);
  // };

  const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate(date);
    console.log(imageUrl)
    const propertyDataForSubmit = {
      image: imageUrl,
      price,
      city,
      type,
      beds: bed,
      bathroom,
      District: district,
      Available_from: formattedDate,
      size,
    };

    console.log(propertyDataForSubmit);

    try {
      if (propertyData) {
        // Send a PUT request to update the property with updated data
        const response = await PropertyServices.updateProperty(
          propertyData._id,
          propertyDataForSubmit
        );
        console.log('Property updated:', response.data);
      } else {
        // Send a POST request to create a new property
        const response = await PropertyServices.postProperty(
          propertyDataForSubmit
        );
        console.log('Property added:', response.data);
      }

      // Clear the form fields
      setImageUrl('');
      setPrice('');
      setCity('');
      setType('');
      setBed('');
      setBathroom('');
      setDistrict('');
      setDate('');
      setSize('');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="property-form">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Image:</label>
            <Uploader setImageUrl={setImageUrl} />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Bedrooms:</label>
            <input
              type="number"
              value={bed}
              onChange={(e) => setBed(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Bathrooms:</label>
            <input
              type="number"
              value={bathroom}
              onChange={(e) => setBathroom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>District:</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Size:</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            {propertyData ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}

export default PropertyForm;
