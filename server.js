const mongoose = require('mongoose').default;
const dotenv = require('dotenv');

process.on('uncaughtException', (error) => {
  console.log('uncaught Exception! Shutting down...');
  console.log(error.name, error.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

async function main() {
  ////remote database
  await mongoose.connect(DB);
  ////local database
  // await mongoose.connect(process.env.DATABASE_LOCAL);
}

main()
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Event listeners for successful connection and error
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB!');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (error) => {
  console.log('unhandled Rejection! Shutting down...');
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});
