const http = require('http');
//importing the app from app.js
const app = require('./app');

const httpServer = http.createServer(app);
const dbconnect = require('./helpers/dbconfig');
const {PORT} = require('./config/index') || 4000  //importing the PORT from config/index.js;


const startServer = async () => {

await dbconnect();

  httpServer.listen(PORT, () => {
    console.log(`Server Is Running On Port ${PORT}`);
  });
};

startServer();