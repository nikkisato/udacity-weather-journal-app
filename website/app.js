/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

function performAction(event) {
  event.preventDefault();
  const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const apiKey = `&appid=6034d7fbfff006ec80460cafa6fe2107`;
  const fullUrl = `${baseURL}${zipCode}${apiKey}`;

  getOpenWeather(fullUrl, (data = {}))
    .then(function (data) {
      console.log(data);
      postData("http://localhost:8080/addData", {
        temperature: data.main.temp,
        date: newDate,
        feelings: feelings,
      });
    })
    .catch((error) => alert("Please enter a correct zip code."));
}

const getOpenWeather = async (url) => {
  console.log("(getWeatherData) Calling url=", url);
  const response = await fetch(url);

  try {
    const data = await response.json();
    console.log("(getWeatherData.then) Processing...", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

let newGenerate = document.getElementById("generate").addEventListener("click", performAction);
