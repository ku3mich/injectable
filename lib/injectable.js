const awilix = require('awilix');

const Inject = Symbol('Inject');
const InjectCache = Symbol('InjectCache');

class InjectError extends Error {
	constructor(message){
		super(message);
	}
}

function* prototypeChain(obj){
	while ( (obj=Object.getPrototypeOf(obj)) != Object.prototype){
		yield obj;
	}
};

function buildInjectCache(obj) {
	let cache = {};

	for (let proto of prototypeChain(obj)){
		let injects = proto.constructor[Inject];

		if (!injects)
			continue;

		for (let p in injects){
			if (cache[p] && (injects[p]!==cache[p]))
				throw new InjectError(`duplicated overriden dependency [${p}]`);

			cache[p] = injects[p];
		}
	}

	return cache;
}

class Injectable {
	constructor(opts){
		if (!opts)
			throw new InjectError(`Injecable: no proxy passed to ctor`);

		let ctor = Object.getPrototypeOf(this).constructor;
		let cache = ctor[InjectCache] || (ctor[InjectCache] = buildInjectCache(this));

		Object
			.getOwnPropertyNames(cache)
			.map(p => this[p] = opts[cache[p]]);
	}
}

module.exports ={
	Inject,
	Injectable,
	createContainer : awilix.createContainer
};
