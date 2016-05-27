const BASE_API = 'http://api.openweathermap.org/data/2.5';
const FORECAST_5_DAYS = 'forecast';

export default function ({fetch = window.fetch, token}) {

	function forecast5day (city, country) {
		return fetch(`${BASE_API}/${FORECAST_5_DAYS}?q=${city},${country}&appid=${token}`)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(new Error(`Invalid request: ${response.status} ${response.statusText}`));
			}
		});
	}

	return { forecast5day };
}
