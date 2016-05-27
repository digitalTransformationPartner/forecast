export function render5daysForecast (widget, data) {
	const datesHTML = data.dates.map(date => `
		<div class="weather_dateContainer">
			<h4 class="weather_day">${date.date}</h4>
			${dayForecast(date.list)}
		</div>
	`).join('');
	widget.node.innerHTML = `
		<h3 class="weather_cityName">${data.city.name} - ${data.city.country}</h3>
		${datesHTML}
	`;
	return widget;
}

function dayForecast (forecast) {
	return forecast.map(point => `
		<h4 class="weather_time">${point.dt_txt.split(' ')[1]}</h4>
		<span class="weather_temp">${Math.round(point.main.temp)}&deg;C</span>
		<span class="weather_mainWeather">${point.weather[0].main}</span>
		<span class="weather_mainWeatherDescription">${point.weather[0].description}</span>
	`).join('');
}

export function renderError (widget, error) {
	widget.node.innerHTML = `
		<p class="weather_errorMessage">Error loading weather data.</p>
		<p class="weather_errorMessage_debug">${error.message}</p>
	`;
	return widget;
}
