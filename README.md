weather forecast for the next 5 days in London

### Implementation

Source code is written in ES6 under `src`. It's loaded and transpiled in the browser by JSPM.

Files are organized as

* `api.js` calls OpenWeatherMap API
* `models.js` formats API responses for the view
* `ui.js` renders the widget in the page
* `widget.js` loads the widgets and coordinates actions

To keep it simple, I've not used any UI framework, but it's easy to modify `ui.js` and use the functional framework of choice.

### Tests

Tests run in PhantomJS with karma. Because JSPM only compiles source code, tests are written in ES5.

```
npm test
```

Or if you want to run locally `karma start karma.conf.js`

### Build

The build is a combination of `gulp` and `jspm-cli`. JSPM creates a self executable, minified bundle, `gulp` replaces non minified scripts and CSS with the bundled and minified version.

```
npm run build
```

Built files are generated inside `dist`
