const all = document.getElementById("allcard");
let search = document.getElementById("search_btn");
let inputCity = document.getElementById("input_search");

// Define an array of day names
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Define an array of abbreviated month names
const monthAbbreviations = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Function to fetch weather data
function fetchWeatherData(city) {
  // Create the URL with the city name
  let url = `https://api.weatherapi.com/v1/current.json?key=f6f2f39cf8b44ee98e564050242807&q=${city}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      addData(data);
    })
    .catch((err) => {
      all.innerHTML =
        '<p class="error-msg">There was an error loading the authors</p>';
    });
}

// Set default city and fetch weather data for it
let defaultCity = "Cairo";
fetchWeatherData(defaultCity);

// Function to handle search button click
search.addEventListener("click", function () {
  let city = inputCity.value || defaultCity; // Use default city if input is empty
  fetchWeatherData(city);
  emptysearch();
});
function emptysearch() {
  inputCity.value = "";
}

// Function to add data to the page
function addData(data) {
  let name = data.location.name;
  let localtime = data.location.localtime;

  // Split localtime into date and time components
  let [datePart, timePart] = localtime.split(" ");
  let [year, month, day] = datePart.split("-");

  // Convert month number to integer
  let monthNumber = parseInt(month, 10);

  // Get day of the week using Date object
  let dateObj = new Date(datePart); // Create Date object from datePart
  let dayName = dayNames[dateObj.getDay()];

  // Format date string as "Day, DD Mon"
  let dayname1 = `${dayName}`;
  let formattedDate = `${day} ${monthAbbreviations[monthNumber - 1]}`;

  let temp = data.current.temp_c;
  let icon = data.current.condition.icon;
  let iconUrl = `https:${icon}`;
  let text = data.current.condition.text;
  let wind_kph = data.current.wind_kph;

  // Generate the HTML content for the cards
  let cardHtml1 = `
    <div class="container borderOfCard">
      <div class="headOfCard">
        <p class="day">${dayname1}</p>
        <p class="localtime">${formattedDate}</p>
      </div>
      <h5 class="name">${name}</h5>
      <div class="degree">
        <h1 class="temp">${temp}<sup>°</sup>C</h1>
        <div class="icon"><img src="${iconUrl}" alt="Weather Icon"></div>
      </div>
      <p class="text">${text}</p>
      <div class="base_icon">
        <i class="aa fa-solid fa-cloud-rain"></i> <span id="precipitation1">20%</span>
        <i class="aa fa-solid fa-wind"></i> <span id="wind1">${wind_kph} km/h</span> 
        <i class="aa fa-solid fa-tint"></i> <span id="humidity1">East</span>
      </div>
    </div>`;

  // Add 1 day for the second card
  let nextDateObj = new Date(dateObj);
  nextDateObj.setDate(nextDateObj.getDate() + 1);
  let dayname2 = dayNames[nextDateObj.getDay()];
  let formattedDate2 = `${nextDateObj.getDate()} ${
    monthAbbreviations[nextDateObj.getMonth()]
  }`;

  let cardHtml2 = `
    <div class="container borderOfEndCard">
      <div class="headOfCard">
        <p class="day">${dayname2}</p>
      </div>
      <h5 class="name">${name}</h5>
      <div class="degree">
        <div class="icon"><img src="${iconUrl}" alt="Weather Icon"></div>
        <h1 class="temp">${temp}<sup>°</sup>C</h1>
      </div>
      <p class="text">${text}</p>
    </div>`;

  // Add 2 days for the third card
  nextDateObj.setDate(nextDateObj.getDate() + 2);
  let dayname3 = dayNames[nextDateObj.getDay()];
  let formattedDate3 = `${nextDateObj.getDate()} ${
    monthAbbreviations[nextDateObj.getMonth()]
  }`;

  let cardHtml3 = `
    <div class="container borderOfEndCard" id="EndCard22">
      <div class="headOfCard">
        <p class="day">${dayname3}</p>
      </div>
      <h5 class="name">${name}</h5>
      <div class="degree">
        <div class="icon"><img src="${iconUrl}" alt="Weather Icon"></div>
        <h1 class="temp">${temp}<sup>°</sup>C</h1>
      </div>
      <p class="text">${text}</p>
    </div>`;

  // Insert the HTML content into the page
  all.innerHTML = cardHtml1 + cardHtml2 + cardHtml3;
}
