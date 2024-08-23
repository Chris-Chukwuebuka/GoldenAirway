const mongoose = require("mongoose");

const { DB_URI } = require("../config/index");

//Database Connection configuration
const dbconnect = async () => {
  await mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Database Connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
  
};
module.exports = dbconnect;

