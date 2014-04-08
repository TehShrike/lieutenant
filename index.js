var followRoute = require('./router.js')

function defaultBadRoute() {
	console.log("lieutenant no understand")
}

module.exports = function buildRouter(route, badRouteFnArgument) {
	var args = process.argv.slice(2)

	var badRouteFn

	if (typeof badRouteFnArgument === 'function') {
		badRouteFn = function() {
			badRouteFnArgument.apply(null, args)
		}
	} else {
		badRouteFn = defaultBadRoute
	}

	followRoute(route, badRouteFn, args)
}
