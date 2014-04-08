#!/usr/local/bin/node

var router = require("./index.js")

router({
	double: function(number) {
		if (typeof number === "undefined" || isNaN(number)) {
			console.log('wat')
		} else {
			console.log(parseFloat(number) * 2)
		}
	},
	add: function() {
		console.log(Array.prototype.slice.call(arguments).reduce(function(a, b) {
			return parseFloat(a) + parseFloat(b)
		}))
	},
	test: {
		even: function(n) {
			var even = parseInt(n) % 2 === 0
			console.log("That's " + (even ? "" : "not ") + "even!")
		},
		odd: function(n) {
			var even = parseInt(n) % 2 === 0
			console.log("That's " + (even ? "not " : "") + "odd!")
		},
		default: function() {
			console.log("I just checked, and your computer is still on.")
		}
	}
}, function badRoute() {
	console.log("Type in double or add or test or something, not those dumb", arguments.length, "words you did")
})
