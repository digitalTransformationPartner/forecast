import weatherAPI from 'js/api';

const TOKEN = '35707da7adefd4c081227bb6b93dc048';

function load ({fetch} = {}) {
	return locateWidgets()
	.then(widgets => Promise.all(widgets.map(
		node => initializeWidget(node, weatherAPI({fetch, token: TOKEN}))
	)));
}

function locateWidgets () {
	return Promise.resolve(
		Array.from(document.getElementsByTagName('weather-widget'))
	);
}

function initializeWidget (domNode, api) {
	// Node.dataset only exists in IE11+, if missing fallback to getAttribute
	const {city, country} = domNode.dataset || {
		city: domNode.getAttribute('data-city'),
		country: domNode.getAttribute('data-country')
	};
	const widget = {
		node: domNode,
		query: { city, country }
	};

	return api.forecast5day(city, country)
	.then(response => render(widget, response))
	.catch(error => renderError(widget, error));
}

function render (widget, response) {
	console.log('y', response);
	return widget;
}

function renderError (widget, error) {
	widget.node.innerHTML = `
		<p class="weather_errorMessage">Error loading weather data.</p>
		<p class="weather_errorMessage_debug">${error.message}</p>
	`;
	return widget;
}

export default { load };
