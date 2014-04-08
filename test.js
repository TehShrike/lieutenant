var test = require('tap').test
var router = require('./router.js')

function failFunction(t) {
	return function failureState() {
		console.log("FAIL")
		t.notOk(true, 'fail function was called!!!!!!!!!!!!!!')
	}
}

test("Calls a function that it should", function(t) {
	var arguments = ['what']

	t.plan(1)

	function what() {
		t.ok(true, 'function was called')
	}

	router({
		thing: failFunction(t),
		what: what // in the butt
	}, failFunction(t), arguments)
})

test("Routes recursively", function(t) {
	var arguments = ['huh', 'oh', 'I guess']

	function IGuess() {
		t.ok(true, 'function was called after routing through multiple words')
	}

	t.plan(1)

	router({
		uh: failFunction(t),
		huh: {
			oh: {
				'I guess': IGuess
			}
		}
	}, failFunction(t), arguments)
})

test("Passes arguments correctly to the called function", function(t) {
	var arguments = ['wat', 'wut', 'In whose butt?', 'I dunno', 'eh']

	t.plan(2)

	function tellMeAboutButts(argument1, argument2) {
		t.equal('In whose butt?', argument1)
		t.equal('I dunno', argument2)
	}

	router({
		wat: {
			wut: tellMeAboutButts,
			IReallyDontKnow: failFunction(t)
		}
	}, failFunction(t), arguments)
})

test("Calls a default function", function(t) {
	var arguments = ['one', 'two']

	t.plan(1)

	function success() {
		t.ok(true)
	}

	var fail = failFunction(t)

	router({
		one: {
			two: {
				three: fail,
				default: success
			},
			default: fail
		},
		default: fail
	}, fail, arguments)
})

test("bad route function called successfully on bad route", function(t) {
	var arguments = ["not", "real"]
	t.plan(1)

	function success() {
		t.ok(true)
	}

	var fail = failFunction(t)

	router({
		one: {
			two: {
				three: fail,
				default: fail
			},
			default: fail
		},
		default: fail
	}, success, arguments)

})

test("autocompleteyness", function(t) {
	var arguments = ['on']

	t.plan(1)

	function success() {
		t.ok(true)
	}
	var fail = failFunction(t)

	router({
		one: success,
		two: fail
	}, fail, arguments)
})

test("autocomplete tricksiness", function(t) {
	var arguments = ['one', 'one']

	t.plan(1)

	function success() {
		t.ok(true)
	}

	var fail = failFunction(t)

	router({
		one: {
			one: success,
			o: fail
		},
		oneness: fail
	}, fail, arguments)
})
