const awilix = require('awilix');
const i = require('./symbols.js');

const InjectCache = Symbol('InjectCache');

function* prototypeChain(obj){
	while ( (obj=Object.getPrototypeOf(obj)) != Object.prototype){
		yield obj;
	}
}

function buildInjectCache(obj) {
	let cache = {};

	for (let proto of prototypeChain(obj)){
		let injects = proto.constructor[i.Inject];

		if (!injects)
			continue;

		for (let p in injects){
			if (cache[p] && (injects[p]!==cache[p]))
				throw new i.InjectError(`duplicated overriden dependency [${p}]`);

			cache[p] = injects[p];
		}
	}

	return cache;
}

class Injectable {
	constructor(opts){
		if (!opts)
			throw new i.InjectError(`Injecable: no proxy passed to ctor`);

		let ctor = Object.getPrototypeOf(this).constructor;
		let cache = ctor[InjectCache] || (ctor[InjectCache] = buildInjectCache(this));

		Object
			.getOwnPropertyNames(cache)
			.map(p => this[p] = opts[cache[p]]);
	}
}

module.exports ={
	Injectable
};
