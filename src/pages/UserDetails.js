import React, {useState} from 'react';
import PropertyServices from '../services/property-service';
import useAsync from '../hooks/useAsync';
import PropertyCard from '../components/Dashboard/propertyCard';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom' to create a navigation link
import './Dashboard.css';
import './UserDetails.css'
import PropertyForm from '../components/Add_property/page';

const UserDetails = () => {
  const { data, loading } = useAsync(PropertyServices.getPropertyByUser);
  const [editPropertyData, setEditPropertyData] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }


  const handleDeleteProperty = async (propertyId) => {
    try {
      await PropertyServices.deleteProperty(propertyId);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };
  
  const handleEditProperty = (id) => {
    const propertyToEdit = data.find((property) => property._id === id);
    if (propertyToEdit) {
      // Set the editPropertyData state to populate the form
      setEditPropertyData(propertyToEdit);
    }
  }

  return (
    <>
      <Navbar />
      <div className="add-property-button-container">
        <Link to="/add-property" className="add-property-button">
          Add Property
        </Link>
      </div>
      {editPropertyData && (
        <div className="edit-form-container">
          <h2>Edit Property</h2>
          <PropertyForm propertyData={editPropertyData} />
          {/* <button onClick={handleCancelEdit}>Cancel</button> */}
        </div>
      )}
      <div className="card-container">
        {data && data.length > 0 ? (
          data.map((property) => (
            <div key={property._id} className="property-card">
              <PropertyCard property={property} />
              <div className="property-actions">
                <button
                  onClick={() => handleDeleteProperty(property._id)}
                  className="delete-button"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditProperty(property._id)}
                  className="edit-button"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No property listed.</p>
            <Link to="/user">Click here to add a property</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetails;
