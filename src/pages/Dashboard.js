import React from 'react';
import PropertyServices from '../services/property-service';
import useAsync from '../hooks/useAsync';
import './Dashboard.css';
import Navbar from '../components/Navbar/Navbar';
import Card from '../components/Card/card';


const Dashboard = () => {
  const { data, loading } = useAsync(PropertyServices.getProperty);
  
  // Check if data is loading or empty
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Card data={data}/>
    </>
  );
};

export default Dashboard;

