const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DATABASE_URL;
const connection = mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connection);
    console.log("DB connection successfully");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
    process.exit(1); // Exit the application if database connection fails
  });

module.exports = connection;
