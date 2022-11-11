const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const cors = require("cors");

// connection
const connection = require("./db");
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors for multiple origin

var allowedOrigins = ["http://localhost:3001"];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// route import
const CostomerRouter = require("./Routes/CostomerRoute");
const CruiserRouter = require("./Routes/CruiserRoute");
const BookRouter = require("./Routes/BookRoute");

// routes
app.get("/", (req, res) => {
  res.send("Welcome to ConCruise");
});
app.use("/costomer", CostomerRouter);
app.use("/cruiser",CruiserRouter);
app.use("/book",BookRouter)

app.get("/", (req, res) => {
  res.send("Welcome");
});


// server
app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to db successfully");
  } catch {
    console.log("something went wrong while connecting to db");
  }
  console.log(`Server listening on localhost:${port}`);
});