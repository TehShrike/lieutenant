const test = require(`tap`).test
const router = require(`./router.js`)

function failFunction(t) {
	return function failureState() {
		console.log(`FAIL`)
		t.notOk(true, `fail function was called!!!!!!!!!!!!!!`)
	}
}

test(`Calls a function that it should`, t => {
	const args = [ `what` ]

	t.plan(1)

	function what() {
		t.ok(true, `function was called`)
	}

	router({
		thing: failFunction(t),
		what, // in the butt
	}, failFunction(t), args)
})

test(`Routes recursively`, t => {
	const args = [ `huh`, `oh`, `I guess` ]

	function IGuess() {
		t.ok(true, `function was called after routing through multiple words`)
	}

	t.plan(1)

	router({
		uh: failFunction(t),
		huh: {
			oh: {
				'I guess': IGuess,
			},
		},
	}, failFunction(t), args)
})

test(`Passes arguments correctly to the called function`, t => {
	const args = [ `wat`, `wut`, `In whose butt?`, `I dunno`, `eh` ]

	t.plan(2)

	function tellMeAboutButts(argument1, argument2) {
		t.equal(`In whose butt?`, argument1)
		t.equal(`I dunno`, argument2)
	}

	router({
		wat: {
			wut: tellMeAboutButts,
			IReallyDontKnow: failFunction(t),
		},
	}, failFunction(t), args)
})

test(`Calls a default function`, t => {
	const args = [ `one`, `two` ]

	t.plan(1)

	function success() {
		t.ok(true)
	}

	const fail = failFunction(t)

	router({
		one: {
			two: {
				three: fail,
				default: success,
			},
			default: fail,
		},
		default: fail,
	}, fail, args)
})

test(`bad route function called successfully on bad route`, t => {
	const args = [ `not`, `real` ]
	t.plan(1)

	function success() {
		t.ok(true)
	}

	const fail = failFunction(t)

	router({
		one: {
			two: {
				three: fail,
				default: fail,
			},
			default: fail,
		},
		default: fail,
	}, success, args)
})

test(`autocompleteyness`, t => {
	const args = [ `on` ]

	t.plan(1)

	function success() {
		t.ok(true)
	}
	const fail = failFunction(t)

	router({
		one: success,
		two: fail,
	}, fail, args)
})

test(`autocomplete tricksiness`, t => {
	const args = [ `one`, `one` ]

	t.plan(1)

	function success() {
		t.ok(true)
	}

	const fail = failFunction(t)

	router({
		one: {
			one: success,
			o: fail,
		},
		oneness: fail,
	}, fail, args)
})
