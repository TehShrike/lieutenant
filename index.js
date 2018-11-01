const followRoute = require(`./router.js`)

function defaultBadRoute() {
	console.log(`lieutenant no understand`)
}

module.exports = function buildRouter(route, badRouteFnArgument) {
	const [ ,, ...args ] = process.argv

	let badRouteFn

	if (typeof badRouteFnArgument === `function`) {
		badRouteFn = function() {
			badRouteFnArgument(...args)
		}
	} else {
		badRouteFn = defaultBadRoute
	}

	followRoute(route, badRouteFn, args)
}
