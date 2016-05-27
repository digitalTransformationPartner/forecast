describe('Load the weather widget', function () {
	beforeEach(function () {
		document.body.innerHTML += '<weather-widget data-city="london" data-country="uk"></weather-widget>';
	});
	afterEach(function () {
		var widgets = document.getElementsByTagName('weather-widget');
		[].slice.apply(widgets).forEach(function (widget) {
			widget.parentNode.removeChild(widget);
		});
	});

	function loadWidget (mockFetch, done, assert) {
		System.import('../base/src/js/main.js').then(function (main) {
			return main.load({ fetch: mockFetch }).then(assert);
		})
		.then(done)
		.catch(done.fail);
	}

	it('shows an error if the server response is invalid', function (done) {
		var mockFetch = function (path) {
			expect(path).toMatch('?q=london,uk');
			return Promise.reject(new Error('Invalid response'));
		};
		loadWidget(mockFetch, done, function () {
			console.log('widget');
		});
	});

	it('shows the widget if the server response is correct', function () {});
});
