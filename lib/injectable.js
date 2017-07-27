const i = require('./symbols.js');
const b = require('@ku3mich/base');
const buildInjectCache = require('./buildInjectCache');
const InjectCache = Symbol('InjectCache');

class Injectable extends b.Object {
  constructor(opts){
	super();
    
	if (!opts)
	  throw new i.InjectError(`Injecable: there is no awilix proxy was passed to ctor`);

	let ctor = Object.getPrototypeOf(this).constructor;
	let cache = ctor[InjectCache] || (ctor[InjectCache] = buildInjectCache(this, opts[i.LocatorInstanceKey]));

	Object
	  .getOwnPropertyNames(cache)
	  .map(p => this[p] = opts[cache[p]]);
  }
}

module.exports = Injectable;

