const mongoose = require('mongoose');
const Dish = require('./models/Dish');

const dataset = [
  { "dishName": "Jeera Rice", "dishId": "1", "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg", "isPublished": true },
  { "dishName": "Paneer Tikka", "dishId": "2", "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg", "isPublished": true },
  { "dishName": "Rabdi", "dishId": "3", "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg", "isPublished": true },
  { "dishName": "Chicken Biryani", "dishId": "4", "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg", "isPublished": true },
  { "dishName": "Alfredo Pasta", "dishId": "5", "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg", "isPublished": true }

]

async function seedDatabase() {
  try {
    // Connect to the local MongoDB database
    // Adjust the connection string if your database name is different (e.g., 'dish_dashboard')
    await mongoose.connect('mongodb://127.0.0.1:27017/dish_dashboard');
    console.log('Connected to MongoDB.');

    for (const item of dataset) {
      // Use updateOne with upsert: true to prevent duplicating entries.
      // It will find the document by dishId and update it, or create it if it doesn't exist.
      await Dish.updateOne(
        { dishId: item.dishId },
        { $set: item },
        { upsert: true }
      );
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedDatabase();
