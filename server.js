// Setup empty JS object to act as endpoint for all routes
const projectData = [
  {
    temperature: "72",
    date: "02/04/2023",
    user_response: "Hello Udacity",
  },
];

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
const { response } = require("express");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Get Route returns projectData object in your server code
app.get("/projectData", (request, response) => {
  response.send(projectData);
});

// add a Post route that adds incoming data to projectData
app.post("/addData", (request, response) => {
  console.log(request);
  console.log(response);
  response.send(request.body);
  projectData.push({ temperature: "90", date: "02/10/2023", user_response: "Bye!" });
});

// Setup Server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
}
