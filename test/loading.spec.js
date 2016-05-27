describe('Load the weather widget', function () {
	beforeEach(function () {
		document.body.innerHTML += '<weather-widget data-city="london" data-country="uk"></weather-widget>';
	});

	function loadWidget (mockFetch, done, assert) {
		System.import('../base/src/js/widget.js').then(function (module) {
			return module.load({ fetch: mockFetch })
				.then(function (widgets) {
					return Promise.resolve(assert(widgets))
						.then(function () { disposeWidgets(widgets); });
				});
		})
		.then(done)
		.catch(done.fail);
	}

	function disposeWidgets (widgets) {
		widgets.forEach(function (widget) {
			widget.node.parentNode.removeChild(widget.node);
		});
	}

	function textInside (node, selector) {
		return node.querySelector(selector).textContent.trim();
	}

	it('shows an error if the request is invalid', function (done) {
		var mockFetch = function (path) {
			expect(path).toMatch(/\?q=london,uk/);
			return Promise.reject(new Error('Invalid request'));
		};
		loadWidget(mockFetch, done, function (widgets) {
			expect(widgets.length).toBe(1);
			expect(textInside(widgets[0].node, '.weather_errorMessage')).toMatch(/error loading/i);
		});
	});

	it('shows an error if the api response is invalid', function (done) {
		var mockFetch = function (path) {
			expect(path).toMatch(/\?q=london,uk/);
			return Promise.resolve({
				ok: false,
				status: 404
			});
		};
		loadWidget(mockFetch, done, function (widgets) {
			expect(widgets.length).toBe(1);
			expect(textInside(widgets[0].node, '.weather_errorMessage')).toMatch(/error loading/i);
		});
	});

	it('shows the widget if the server response is correct', function (done) {
		var mockFetch = function (path) {
			expect(path).toMatch(/\?q=london,uk/);
			return Promise.resolve({
				ok: true,
				status: 200,
				json: function () {
					return System.import('../base/test/mocks/forecast').then(function (json) {
						return json.default;
					});
				}
			});
		};
		loadWidget(mockFetch, done, function (widgets) {
			expect(widgets.length).toBe(1);
			expect(widgets[0].node.querySelectorAll('.weather_dateContainer').length).toBe(5);
		});
	});
});
