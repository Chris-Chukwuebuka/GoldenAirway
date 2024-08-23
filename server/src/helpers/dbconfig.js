const mongoose = require("mongoose");

const { DB_URI } = require("../config/index");

//Database Connection configuration
const dbconnect = async () => {
  await mongoose;
  mongoose
    .connect(DB_URI, { serverSelectionTimeoutMS: 30000 }).then(() => {
      console.log("Database Connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = dbconnect;
