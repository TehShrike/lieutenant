Lieutenant
==========

I made a router for a command-line app I was making, and this is it!

I wanted to build an app that worked less like a traditional *nix app, with its series of "-t 13" and "--other-option=yesplz" key-value arguments, and more like git, in those parts where you give word commands like "stash pop" and "branch".

Usage
=====

To make a command-line app, preheat your oven to 176.7°C and type:

```js
var router = require("./index.js")

router({
	double: function(number) {
		if (typeof number === "undefined" || isNaN(number)) {
			console.log('wat')
		} else {
			console.log(parseFloat(number) * 2)
		}
	}
})
```

Run your app with `example.js double 13` and it will spit `26` right back at you.

But who has time to type out whole words?  Lieutenant lets you type in as few characters as you want, as long as it's enough to uniquely identify a command.  `example.js d 13` will work just as well.

You don't have to specify the arguments, Lieutenant doesn't care, it will pass them all in so you can handle any number of values for a command:

```js
router({
	add: function() {
		console.log(Array.prototype.slice.call(arguments).reduce(function(a, b) {
			return parseFloat(a) + parseFloat(b)
		}))
	}
})
```

and `example.js add 3 4 5` => `12` just like you'd hope.

But maybe that's not why you're here - maybe you're holding out for some real routing, some recursion!

```js
router({
	test: {
		even: function(n) {
			var even = parseInt(n) % 2 === 0
			console.log("That's " + (even ? "" : "not ") + "even!")
		},
		odd: function(n) {
			var even = parseInt(n) % 2 === 0
			console.log("That's " + (even ? "not " : "") + "odd!")
		}
	}
})
```

But hey, what if you want people to just `example.js test` without specifying anything else?  Don't worry; there's a hack for that.  Just add a default property:

```js
router({
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
})
```

Default output
=======

If the user passes in arguments that aren't valid, Lietenant doesn't give them any hints about which commands are valid.  If you want your app to say something useful in those cases, you'll have to write it yourself.

You can supply your custom error-handling by passing a function as the second argument to the routing function:

```js
router({
	add: function() {
		console.log(Array.prototype.slice.call(arguments).reduce(function(a, b) {
			return parseFloat(a) + parseFloat(b)
		}))
	}
}, function badRoute() {
	console.log("Type in double or add or test or something, not those dumb", arguments.length, "words you did")
})
```

As Relient K said in that one song they wrote back when they were still styling a catchy bassline, the rest is up to you!

License
=======

[WTFPL](http://wtfpl2.com)
