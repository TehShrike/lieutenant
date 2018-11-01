#!/usr/local/bin/node

const router = require(`./index.js`)

router({
	double(number) {
		if (typeof number === `undefined` || isNaN(number)) {
			console.log(`wat`)
		} else {
			console.log(parseFloat(number) * 2)
		}
	},
	add(...args) {
		console.log(args.reduce(
			(a, b) => parseFloat(a) + parseFloat(b)
		))
	},
	test: {
		even(n) {
			const even = parseInt(n) % 2 === 0
			console.log(`That's ` + (even ? `` : `not `) + `even!`)
		},
		odd(n) {
			const even = parseInt(n) % 2 === 0
			console.log(`That's ` + (even ? `not ` : ``) + `odd!`)
		},
		default() {
			console.log(`I just checked, and your computer is still on.`)
		},
	},
}, function badRoute(...args) {
	console.log(`Type in double or add or test or something, not those dumb`, args.length, `words you did`)
})
