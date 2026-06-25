import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import DishCard from './DishCard';

const API_BASE_URL = 'http://localhost:5001/api';

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDishes();

    // Set up Socket.IO connection for real-time updates
    const socket = io('http://localhost:5001');

    socket.on('dishStatusUpdated', (updatedDish) => {
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dishes`);
      if (!response.ok) {
        throw new Error('Failed to fetch dishes');
      }
      const data = await response.json();
      setDishes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (dishId) => {
    // Optimistic UI update
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.dishId === dishId ? { ...dish, isPublished: !dish.isPublished } : dish
      )
    );

    try {
      const response = await fetch(`${API_BASE_URL}/dishes/${dishId}/toggle`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle status');
      }

      // We also update state with the server response just to be perfectly synced
      // but the optimistic update + socket.io already handles it seamlesslys
      const updatedDish = await response.json();
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
    } catch (err) {
      // Revert optimistic update on failure
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === dishId ? { ...dish, isPublished: !dish.isPublished } : dish
        )
      );
      console.error(err);
      alert('Failed to update publication status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Loading your dishes...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h3>Oops! Something went wrong.</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dish Management Dashboard</h1>
        <p>Control the publication status of your restaurant's menu items.</p>
      </div>

      <div className="dishes-grid">
        {dishes.map((dish) => (
          <DishCard
            key={dish.dishId}
            dish={dish}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {dishes.length === 0 && (
        <div className="loading-container" style={{ minHeight: '30vh' }}>
          <h3>No dishes found in the database.</h3>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
