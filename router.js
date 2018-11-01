function findBestMatch(obj, targetKey) {
	if (typeof obj[targetKey] !== `undefined`) {
		return obj[targetKey]
	} else if (typeof obj === `object`) {
		const candidates = Object.keys(obj).filter(
			key =>
				key.length > targetKey.length
				&& key.substr(0, targetKey.length) === targetKey
		)
		return candidates.length === 1
			? obj[candidates[0]]
			: undefined
	} else {
		return undefined
	}
}

module.exports = function followRoute(options, badRoute, args) {
	if (args.length === 0) {
		badRoute()
	} else {
		const nextArgument = args.shift()

		const bestMatch = findBestMatch(options, nextArgument)
		if (typeof bestMatch === `function`) {
			bestMatch(...args)
		} else if (typeof bestMatch === `object`) {
			if (args.length === 0 && typeof bestMatch.default === `function`) {
				bestMatch.default()
			} else {
				followRoute(bestMatch, badRoute, args)
			}
		} else {
			badRoute()
		}
	}
}
