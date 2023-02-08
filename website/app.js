/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

async function postData(data) {
  console.log("within postData", data);
  const response = await fetch("http://localhost:8080/all", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    console.log("within try postData", response);
    return await response.json();
  } catch (e) {
    console.log("error", e);
  }
}

function performAction(event) {
  event.preventDefault();
  const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  const zipCode = document.getElementById("zip").value;
  const apiKey = `&appid=6034d7fbfff006ec80460cafa6fe2107`;
  const fullUrl = `${baseURL}${zipCode}${apiKey}`;

  console.log("fullUrl", fullUrl);

  getOpenWeather(fullUrl)
    .then(function (data) {
      console.log("(getWeatherData.then) Processing...", data);
    })
    .catch((error) => alert("Please enter a correct zip code."));
}

const getOpenWeather = async (url) => {
  console.log("(getWeatherData) Calling url=", url);
  const response = await fetch(url);

  try {
    const data = await response.json();
    console.log("(getWeatherData) Receiving data=", data);
    postData("/add", {
      date: data.date,
      temperature: data.temperature,
    });
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

let newGenerate = document.getElementById("generate").addEventListener("click", performAction);
