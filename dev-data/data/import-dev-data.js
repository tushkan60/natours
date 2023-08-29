const fs = require('fs');
const mongoose = require('mongoose').default;
const dotenv = require('dotenv');

const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

async function main() {
  ////remote database
  await mongoose.connect(DB);
  //local database
  // await mongoose.connect(process.env.DATABASE_LOCAL);
}

main()
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => console.log(err));

// Event listeners for successful connection and error
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB!');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

const formattedTours = tours.map((tour) => {
  delete tour.id;
  return tour;
});
const formattedUsers = users.map((user) => {
  delete user.id;
  return user;
});
const formattedReviews = reviews.map((review) => {
  delete review.id;
  return review;
});

const importData = async () => {
  try {
    await User.create(formattedUsers, { validateBeforeSave: false });
    await Review.create(formattedReviews, { validateBeforeSave: false });
    await Tour.create(formattedTours);
    console.log('data loaded');
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

const deleteOldData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('data deleted');
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteOldData();
}
