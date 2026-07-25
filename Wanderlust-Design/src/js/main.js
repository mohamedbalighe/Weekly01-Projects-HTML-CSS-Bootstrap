let new_code = "EG"; // قيمة ابتدائية (مصر) لضمان عدم حدوث خطأ إذا ضغط المستخدم على زر العطلات فوراً

async function get_Countries(){
    let Response = await fetch("https://date.nager.at/api/v3/AvailableCountries");
    let Countries_Data = await Response.json();
    
    let selectCountry = document.getElementById("global-country");

    for(let index=0 ; index < Countries_Data.length ; index++){
        selectCountry.innerHTML += `<option value="${Countries_Data[index].countryCode}">${Countries_Data[index].name}</option>`;
    }
    
    selectCountry.addEventListener("change", function() {
        let selectedCode = this.value; 
        let selectedText = this.options[this.selectedIndex].text; 

        
        new_code = selectedCode; // تحديث المتغير العام بالكود الجديد
        
        if(selectedCode) {
            get_Country_Details_And_Capital(selectedCode); 
            Countries_Flag(selectedCode, selectedText); 
        }
    });
}

async function get_Country_Details_And_Capital(countryCode){
    try {
        let Response = await fetch(`https://openlights.github.io/restcountries-v3.1-mirror/v3.1/alpha/${countryCode}.json`);
        let countryData = await Response.json();
        let country = countryData[0]; 

        let capitalName = country.capital ? country.capital[0] : "N/A"; 
        document.getElementById("global-city").innerHTML = `<option value="${capitalName}">${capitalName}</option>`;    
        
        let citySpan = document.getElementById("selected-city-name");
        if(citySpan) {
            citySpan.textContent = `• ${capitalName}`;
        }

        Display_Country_Information(country);
    } catch (error) {
        console.error("حدث خطأ في جلب تفاصيل الدولة:", error);
    }
}

function Countries_Flag(countryCode, countryName) {
    let lowerCode = countryCode.toLowerCase();
    let flagUrl = `https://flagcdn.com/w40/${lowerCode}.png`;

    document.getElementById("selected-destination").innerHTML = `
        <div class="selected-flag">
          <img id="selected-country-flag" src="${flagUrl}" alt="${countryName}">
        </div>
        <div class="selected-info">
          <span class="selected-country-name" id="selected-country-name">${countryName}</span>
          <span class="selected-city-name" id="selected-city-name">• Loading...</span>
        </div>
        <button class="clear-selection-btn" id="clear-selection-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
    `;
}

function Display_Country_Information(countryObj){
    let CountryInformation = document.getElementById("dashboard-country-info-section");
    
    let commonName = countryObj.name?.common || "N/A";
    let officialName = countryObj.name?.official || "N/A";
    let region = countryObj.region || "N/A";
    let subregion = countryObj.subregion || "N/A";
    let capital = countryObj.capital ? countryObj.capital[0] : "N/A";
    let continent = countryObj.continents ? countryObj.continents[0] : "N/A";
    let timezone = countryObj.timezones ? countryObj.timezones[0] : "N/A";
    let side = countryObj.car ? countryObj.car.side : "N/A";
    let startOfWeek = countryObj.startOfWeek || "N/A";
    let googleMaps = countryObj.maps ? countryObj.maps.googleMaps : "#";
    let flagImg = countryObj.flags ? countryObj.flags.png : "";

    let population = countryObj.population ? countryObj.population.toLocaleString() : "N/A";
    let area = countryObj.area ? countryObj.area.toLocaleString() : "N/A";

    let currencyName = "N/A";
    if (countryObj.currencies) {
        let firstCurrencyKey = Object.keys(countryObj.currencies)[0];
        currencyName = countryObj.currencies[firstCurrencyKey].name;
    }

    let languages = "N/A";
    if (countryObj.languages) {
        languages = Object.values(countryObj.languages).join(", ");
    }

    let bordersHTML = "<span class='extra-tag'>None</span>";
    if (countryObj.borders && countryObj.borders.length > 0) {
        bordersHTML = countryObj.borders.map(border => `<span class="extra-tag border-tag">${border}</span>`).join("");
    }

    CountryInformation.innerHTML = `
        <div class="section-header">
          <h2><i class="fa-solid fa-flag"></i> Country Information</h2>
        </div>
        <div id="dashboard-country-info" class="dashboard-country-info">
          <div class="dashboard-country-header">
            <img src="${flagImg}" alt="${commonName}" class="dashboard-country-flag">
            <div class="dashboard-country-title">
              <h3>${commonName}</h3>
              <p class="official-name">${officialName}</p>
              <span class="region"><i class="fa-solid fa-location-dot"></i>${region} • ${subregion}</span>
            </div>
          </div>
          <div class="dashboard-local-time">
            <div class="local-time-display">
              <i class="fa-solid fa-clock"></i>
              <span class="local-time-value" id="country-local-time">08:30:45 AM</span>
              <span class="local-time-zone">${timezone}</span>
            </div>
          </div>
          <div class="dashboard-country-grid">
            <div class="dashboard-country-detail">
              <i class="fa-solid fa-building-columns"></i>
              <span class="label">Capital</span>
              <span class="value">${capital}</span>
            </div>
            <div class="dashboard-country-detail">
              <i class="fa-solid fa-users"></i>
              <span class="label">Population</span>
              <span class="value">${population}</span>
            </div>
            <div class="dashboard-country-detail">
              <i class="fa-solid fa-ruler-combined"></i>
              <span class="label">Area</span>
              <span class="value">${area} km²</span>
            </div>
            <div class="dashboard-country-detail">
              <i class="fa-solid fa-globe"></i>
              <span class="label">Continent</span>
              <span class="value">${continent}</span>
            </div>
            <div class="dashboard-country-detail">
              <i class="fa-solid fa-car"></i>
              <span class="label">Driving Side</span>
              <span class="value" style="text-transform: capitalize;">${side}</span>
            </div>
            <div class="dashboard-country-detail">
              <i class="fa-solid fa-calendar-week"></i>
              <span class="label">Week Starts</span>
              <span class="value" style="text-transform: capitalize;">${startOfWeek}</span>
            </div>
          </div>
          <div class="dashboard-country-extras">
            <div class="dashboard-country-extra">
              <h4><i class="fa-solid fa-coins"></i> Currency</h4>
              <div class="extra-tags">${currencyName}</div>
            </div>
            <div class="dashboard-country-extra">
              <h4><i class="fa-solid fa-language"></i> Languages</h4>
              <div class="extra-tags">${languages}</div>
            </div>
            <div class="dashboard-country-extra">
              <h4><i class="fa-solid fa-map-location-dot"></i> Neighbors</h4>
              <div class="extra-tags">${bordersHTML}</div>
            </div>
          </div>
          <div class="dashboard-country-actions">
            <a href="${googleMaps}" target="_blank" class="btn-map-link">
              <i class="fa-solid fa-map"></i> View on Google Maps
            </a>
          </div>
        </div>
    `;
}

get_Countries();

document.getElementById('Holidays_event').addEventListener('click', function(){
    get_Holidays(new_code);
});

async function get_Holidays(country_Code) {
  try {
    const currentYear = 2026;
    let Response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${country_Code}`);
    let holidays_data = await Response.json();

    let holidaysView = document.getElementById("holidays-view");
    if (!holidaysView) return;

    let holidayCardsHTML = "";
    
    if (holidays_data && holidays_data.length > 0) {
        holidayCardsHTML = holidays_data.map(holiday => {
            const dateObj = new Date(holiday.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('en-US', { month: 'short' });
            const dayName = dateObj.toLocaleString('en-US', { weekday: 'long' });

            return `
                <div class="holiday-card">
                  <div class="holiday-card-header">
                    <div class="holiday-date-box">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <button class="holiday-action-btn"><i class="fa-regular fa-heart"></i></button>
                  </div>
                  <h3>${holiday.localName}</h3>
                  <p class="holiday-name">${holiday.name}</p>
                  <div class="holiday-card-footer">
                    <span class="holiday-day-badge"><i class="fa-regular fa-calendar"></i> ${dayName}</span>
                    <span class="holiday-type-badge">${holiday.types ? holiday.types[0] : 'Public'}</span>
                  </div>
                </div>
            `;
        }).join("");
    } else {
        holidayCardsHTML = `<p class="no-data">No public holidays found for this country.</p>`;
    }

    let selectCountry = document.getElementById("global-country");
    let countryName = selectCountry ? selectCountry.options[selectCountry.selectedIndex].text : "Selected Country";
    let lowerCode = country_Code.toLowerCase();

    holidaysView.innerHTML = `
      <div class="view-header-card gradient-green">
        <div class="view-header-icon"><i class="fa-solid fa-calendar-days"></i></div>
        <div class="view-header-content">
          <h2>Public Holidays Explorer</h2>
          <p>Browse public holidays for ${countryName} and plan your trips around them</p>
        </div>
        <div class="view-header-selection" id="holidays-selection">
          <div class="current-selection-badge">
            <img src="https://flagcdn.com/w40/${lowerCode}.png" alt="${countryName}" class="selection-flag">
            <span>${countryName}</span>
            <span class="selection-year">${currentYear}</span>
          </div>
        </div>
      </div>
      <div id="holidays-content" class="holidays-content">
         ${holidayCardsHTML}
      </div>
    `;
  } catch (error) {
     console.log("حدث خطأ أثناء جلب العطلات الرسمية:", error);
  }
}

async function get_Events() {
    try {
        let Response = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y&city=New York&countryCode=US&size=20");
        let Events = await Response.json();

        let eventsView = document.getElementById("events-view");
        if (!eventsView) return;

        eventsView.innerHTML = `
          <div class="view-header-card gradient-purple">
            <div class="view-header-icon"><i class="fa-solid fa-ticket"></i></div>
            <div class="view-header-content">
              <h2>Events Explorer</h2>
              <p>Discover concerts, sports, theatre and more in Cairo</p>
            </div>
            <div class="view-header-selection">
              <div class="current-selection-badge">
                <img src="https://flagcdn.com/w40/eg.png" alt="Egypt" class="selection-flag">
                <span>Egypt</span>
                <span class="selection-city">• Cairo</span>
              </div>
            </div>
          </div>
          
          <div id="events-content" class="events-grid-layout">
            <div class="event-card">
              <div class="event-card-image">
                <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop" alt="Jazz Night">
                <span class="event-card-category">Music</span>
                <button class="event-card-save"><i class="fa-regular fa-heart"></i></button>
              </div>
              <div class="event-card-body">
                <h3>Jazz Night Live in Cairo</h3>
                <div class="event-card-info">
                  <div><i class="fa-regular fa-calendar"></i>Feb 15, 2026 at 20:00</div>
                  <div><i class="fa-solid fa-location-dot"></i>Cairo Opera House, Cairo</div>
                </div>
                <div class="event-card-footer">
                  <button class="btn-event"><i class="fa-regular fa-heart"></i> Save</button>
                  <a href="#" class="btn-buy-ticket"><i class="fa-solid fa-ticket"></i> Buy Tickets</a>
                </div>
              </div>
            </div>
            
            <div class="event-card">
              <div class="event-card-image">
                <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop" alt="Football">
                <span class="event-card-category">Sports</span>
                <button class="event-card-save"><i class="fa-regular fa-heart"></i></button>
              </div>
              <div class="event-card-body">
                <h3>Football Match in Cairo</h3>
                <div class="event-card-info">
                  <div><i class="fa-regular fa-calendar"></i>Feb 22, 2026 at 19:00</div>
                  <div><i class="fa-solid fa-location-dot"></i>Cairo Stadium, Cairo</div>
                </div>
                <div class="event-card-footer">
                  <button class="btn-event"><i class="fa-regular fa-heart"></i> Save</button>
                  <a href="#" class="btn-buy-ticket"><i class="fa-solid fa-ticket"></i> Buy Tickets</a>
                </div>
              </div>
            </div>
          </div>
        `;
    } catch (error) {
        console.error("حدث خطأ أثناء جلب الأحداث:", error);
    }
}



function getWeatherCondition(code) {
    const conditions = {
        0: { text: "Clear sky", icon: "fa-sun", class: "weather-sunny" },
        1: { text: "Mainly clear", icon: "fa-cloud-sun", class: "weather-sunny" },
        2: { text: "Partly cloudy", icon: "fa-cloud-sun", class: "weather-cloudy" },
        3: { text: "Overcast", icon: "fa-cloud", class: "weather-cloudy" },
        45: { text: "Foggy", icon: "fa-smog", class: "weather-cloudy" },
        48: { text: "Depositing rime fog", icon: "fa-smog", class: "weather-cloudy" },
        51: { text: "Light drizzle", icon: "fa-cloud-rain", class: "weather-rainy" },
        53: { text: "Moderate drizzle", icon: "fa-cloud-rain", class: "weather-rainy" },
        55: { text: "Dense drizzle", icon: "fa-cloud-rain", class: "weather-rainy" },
        61: { text: "Slight rain", icon: "fa-cloud-showers-heavy", class: "weather-rainy" },
        63: { text: "Moderate rain", icon: "fa-cloud-showers-heavy", class: "weather-rainy" },
        65: { text: "Heavy rain", icon: "fa-cloud-showers-heavy", class: "weather-rainy" },
        71: { text: "Slight snow fall", icon: "fa-snowflake", class: "weather-cloudy" },
        73: { text: "Moderate snow fall", icon: "fa-snowflake", class: "weather-cloudy" },
        75: { text: "Heavy snow fall", icon: "fa-snowflake", class: "weather-cloudy" },
        80: { text: "Slight rain showers", icon: "fa-cloud-sun-rain", class: "weather-rainy" },
        81: { text: "Moderate rain showers", icon: "fa-cloud-sun-rain", class: "weather-rainy" },
        82: { text: "Violent rain showers", icon: "fa-cloud-showers-water", class: "weather-rainy" },
        95: { text: "Thunderstorm", icon: "fa-cloud-bolt", class: "weather-rainy" }
    };
    return conditions[code] || { text: "Unknown", icon: "fa-cloud", class: "weather-sunny" };
}

async function get_Weather_Forecast() {
    try {
        let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto");
        let data = await response.json();

        let weatherView = document.getElementById("weather-view");
        if (!weatherView) return;

        let currentTemp = Math.round(data.current.temperature_2m);
        let currentApparentTemp = Math.round(data.current.apparent_temperature);
        let currentHumidity = data.current.relative_humidity_2m;
        let currentWind = data.current.wind_speed_10m;
        let currentUV = data.current.uv_index;
        let currentWeatherInfo = getWeatherCondition(data.current.weather_code);

        let todayMax = Math.round(data.daily.temperature_2m_max[0]);
        let todayMin = Math.round(data.daily.temperature_2m_min[0]);
        let todayPrecipProb = data.daily.precipitation_probability_max[0];

        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let currentDateString = new Date().toLocaleDateString('en-US', options);

        let hourlyHTML = "";
        for (let i = 0; i < 8; i++) {
            let hourTime = new Date(data.hourly.time[i]);
            let hourString = hourTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            let hourTemp = Math.round(data.hourly.temperature_2m[i]);
            let hourWeather = getWeatherCondition(data.hourly.weather_code[i]);
            
            let displayHour = (i === 0) ? "Now" : hourString;
            let activeClass = (i === 0) ? "hourly-item now" : "hourly-item";

            hourlyHTML += `
                <div class="${activeClass}">
                  <span class="hourly-time">${displayHour}</span>
                  <div class="hourly-icon"><i class="fa-solid ${hourWeather.icon}"></i></div>
                  <span class="hourly-temp">${hourTemp}°</span>
                </div>
            `;
        }

        let dailyHTML = "";
        for (let j = 0; j < 7; j++) {
            let dayDate = new Date(data.daily.time[j]);
            let dayLabel = (j === 0) ? "Today" : dayDate.toLocaleString('en-US', { weekday: 'short' });
            let dayDateString = dayDate.toLocaleString('en-US', { day: 'numeric', month: 'short' });
            
            let dayMax = Math.round(data.daily.temperature_2m_max[j]);
            let dayMin = Math.round(data.daily.temperature_2m_min[j]);
            let dayWeather = getWeatherCondition(data.daily.weather_code[j]);
            let dayPrecip = data.daily.precipitation_probability_max[j];

            let precipHTML = (dayPrecip > 0) ? `<i class="fa-solid fa-droplet"></i><span>${dayPrecip}%</span>` : "";

            dailyHTML += `
                <div class="forecast-day ${j === 0 ? 'today' : ''}">
                  <div class="forecast-day-name"><span class="day-label">${dayLabel}</span><span class="day-date">${dayDateString}</span></div>
                  <div class="forecast-icon"><i class="fa-solid ${dayWeather.icon}"></i></div>
                  <div class="forecast-temps"><span class="temp-max">${dayMax}°</span><span class="temp-min">${dayMin}°</span></div>
                  <div class="forecast-precip">${precipHTML}</div>
                </div>
            `;
        }

        weatherView.innerHTML = `
          <div class="view-header-card gradient-blue">
            <div class="view-header-icon"><i class="fa-solid fa-cloud-sun"></i></div>
            <div class="view-header-content">
              <h2>Weather Forecast</h2>
              <p>Check 7-day weather forecasts for Cairo</p>
            </div>
            <div class="view-header-selection">
              <div class="current-selection-badge">
                <img src="https://flagcdn.com/w40/eg.png" alt="Egypt" class="selection-flag">
                <span>Egypt</span>
                <span class="selection-city">• Cairo</span>
              </div>
            </div>
          </div>
          
          <div id="weather-content" class="weather-layout">
            <div class="weather-hero-card ${currentWeatherInfo.class}">
              <div class="weather-location">
                <i class="fa-solid fa-location-dot"></i>
                <span>Cairo</span>
                <span class="weather-time">${currentDateString}</span>
              </div>
              <div class="weather-hero-main">
                <div class="weather-hero-left">
                  <div class="weather-hero-icon"><i class="fa-solid ${currentWeatherInfo.icon}"></i></div>
                  <div class="weather-hero-temp">
                    <span class="temp-value">${currentTemp}</span>
                    <span class="temp-unit">°C</span>
                  </div>
                </div>
                <div class="weather-hero-right">
                  <div class="weather-condition">${currentWeatherInfo.text}</div>
                  <div class="weather-feels">Feels like ${currentApparentTemp}°C</div>
                  <div class="weather-high-low">
                    <span class="high"><i class="fa-solid fa-arrow-up"></i> ${todayMax}°</span>
                    <span class="low"><i class="fa-solid fa-arrow-down"></i> ${todayMin}°</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="weather-details-grid">
              <div class="weather-detail-card">
                <div class="detail-icon humidity"><i class="fa-solid fa-droplet"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Humidity</span>
                  <span class="detail-value">${currentHumidity}%</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon wind"><i class="fa-solid fa-wind"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Wind</span>
                  <span class="detail-value">${currentWind} km/h</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon uv"><i class="fa-solid fa-sun"></i></div>
                <div class="detail-info">
                  <span class="detail-label">UV Index</span>
                  <span class="detail-value">${currentUV}</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon precip"><i class="fa-solid fa-cloud-rain"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Precipitation</span>
                  <span class="detail-value">${todayPrecipProb}%</span>
                </div>
              </div>
            </div>
            
            <div class="weather-section">
              <h3 class="weather-section-title"><i class="fa-solid fa-clock"></i> Hourly Forecast</h3>
              <div class="hourly-scroll">
                ${hourlyHTML}
              </div>
            </div>
            
            <div class="weather-section">
              <h3 class="weather-section-title"><i class="fa-solid fa-calendar-week"></i> 7-Day Forecast</h3>
              <div class="forecast-list">
                ${dailyHTML}
              </div>
            </div>
          </div>
        `;
    } catch (error) {
        console.error("حدث خطأ أثناء جلب بيانات الطقس:", error);
    }
}

get_Weather_Forecast();



async function get_Exchange_Rates() {
    try {
        const response = await fetch("https://v6.exchangerate-api.com/v6/805842951e5953ad31497176/latest/USD");
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error("خطأ في جلب أسعار الصرف:", error);
    }
}

function convertCurrency(amount, fromCurrency, toCurrency, rates) {
    if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
        console.error("عملة غير مدعومة");
        return null;
    }
    
    const amountInUSD = amount / rates[fromCurrency];
    const convertedAmount = amountInUSD * rates[toCurrency];
    
    return convertedAmount;
}

async function displayCurrencyConversion() {
    const fromCurrency = document.getElementById("currency-from").value;
    const toCurrency = document.getElementById("currency-to").value;
    const amount = parseFloat(document.getElementById("currency-amount").value);
    
    if (!fromCurrency || !toCurrency || isNaN(amount) || amount <= 0) {
        alert("الرجاء إدخال جميع البيانات بشكل صحيح");
        return;
    }
    
    const rates = await get_Exchange_Rates();
    if (!rates) {
        alert("حدث خطأ في جلب أسعار الصرف");
        return;
    }
    
    const result = convertCurrency(amount, fromCurrency, toCurrency, rates);
    
    if (result !== null) {
        const resultElement = document.getElementById("currency-result");
        if (resultElement) {
            const exchangeRate = rates[toCurrency] / rates[fromCurrency];
            const today = new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            resultElement.innerHTML = `
                <div class="conversion-display">
                    <div class="conversion-from">
                        <span class="amount">${amount.toFixed(2)}</span>
                        <span class="currency-code">${fromCurrency}</span>
                    </div>
                    <div class="conversion-equals"><i class="fa-solid fa-equals"></i></div>
                    <div class="conversion-to">
                        <span class="amount">${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <span class="currency-code">${toCurrency}</span>
                    </div>
                </div>
                <div class="exchange-rate-info">
                    <p>1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}</p>
                    <small>Last updated: ${today}</small>
                </div>
            `;
        }
    } else {
        alert("حدث خطأ في التحويل");
    }
}

async function loadCurrenciesList() {
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const currencies = Object.keys(data.rates).sort();
        const fromSelect = document.getElementById("currency-from");
        if (fromSelect && fromSelect.options.length <= 3) {
            fromSelect.innerHTML = "";
            currencies.forEach(currency => {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                if (currency === "USD") option.selected = true;
                fromSelect.appendChild(option);
            });
        }
        const toSelect = document.getElementById("currency-to");
        if (toSelect && toSelect.options.length <= 3) {
            toSelect.innerHTML = "";
            currencies.forEach(currency => {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                if (currency === "EGP") option.selected = true;
                toSelect.appendChild(option);
            });
        }
        
    } catch (error) {
        console.error("خطأ في تحميل قائمة العملات:", error);
    }
}

function swapCurrencies() {
    const fromSelect = document.getElementById("currency-from");
    const toSelect = document.getElementById("currency-to");
    
    if (fromSelect && toSelect) {
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        displayCurrencyConversion();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadCurrenciesList();
    const convertBtn = document.getElementById("convert-btn");
    if (convertBtn) {
        convertBtn.addEventListener("click", displayCurrencyConversion);
    }
    const swapBtn = document.getElementById("swap-currencies-btn");
    if (swapBtn) {
        swapBtn.addEventListener("click", swapCurrencies);
    }
    const amountInput = document.getElementById("currency-amount");
    if (amountInput) {
        amountInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                displayCurrencyConversion();
            }
        });
    }
    setupAutoConversion();
});

function setupAutoConversion() {
    const amountInput = document.getElementById("currency-amount");
    const fromSelect = document.getElementById("currency-from");
    const toSelect = document.getElementById("currency-to");
    
    [amountInput, fromSelect, toSelect].forEach(element => {
        if (element) {
            element.addEventListener("change", displayCurrencyConversion);
            element.addEventListener("input", displayCurrencyConversion);
        }
    });
}
