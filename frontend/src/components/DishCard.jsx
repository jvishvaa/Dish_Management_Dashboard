import React from 'react';

const DishCard = ({ dish, onToggle }) => {
  return (
    <div className="dish-card">
      <div className="card-image-container">
        <img 
          src={dish.imageUrl} 
          alt={dish.dishName} 
          className="dish-image" 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
        <div className={`status-badge ${dish.isPublished ? 'published' : 'unpublished'}`}>
          {dish.isPublished ? 'Published' : 'Unpublished'}
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="dish-name">{dish.dishName}</h3>
        
        <div className="toggle-container">
          <span className="toggle-label">Publication Status</span>
          <button 
            className={`toggle-switch ${dish.isPublished ? 'active' : ''}`}
            onClick={() => onToggle(dish.dishId)}
            aria-label={`Toggle publication status for ${dish.dishName}`}
          >
            <div className="toggle-knob"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
