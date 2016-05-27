import weatherAPI from 'js/api';
import {render5daysForecast, renderError} from 'js/ui';
import {forecast5daysModel} from 'js/models';

export function load ({fetch, token} = {}) {
	return locateWidgets()
	.then(widgets => Promise.all(widgets.map(
		node => initializeWidget(node, weatherAPI({fetch, token}))
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

	return api.forecast5days(city, country)
	.then(response => render5daysForecast(widget, forecast5daysModel(response)))
	.catch(error => renderError(widget, error));
}
