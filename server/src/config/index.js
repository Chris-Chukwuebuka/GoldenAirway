const dotenv = require("dotenv");
dotenv.config();

// @description This is a simple example of how to use the dotenv package to load environment variables from a .env file. The dotenv package is a zero-dependency module that loads environment variables from a .env file into process.env. This allows you to store sensitive information in a .env file and keep it out of your codebase. In this example, we use the dotenv package to load the PORT environment variable from a .env file and use it to start a server on the specified port.

module.exports = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
   

    };


    