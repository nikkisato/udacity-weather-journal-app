// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Get Route returns projectData object in your server code
app.get("/all", (req, res) => {
  res.send(projectData);
  projectData = {};
});

// post route that adds incoming data to ProjectData
app.post("/addData", (req, res) => {
  let data = req.body;
  projectData["temperature"] = data.temperature;
  projectData["date"] = data.date;
  projectData["feelings"] = data.feelings;
  console.log(projectData);
  res.send(projectData);
});

// Setup Server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
}
