const i = require('./symbols.js');
const InjectCache = i.symbols.InjectCache;

const b = require('@ku3mich/base');
const buildInjectCache = require('./buildInjectCache');

class Injectable extends b.Object {
  constructor(opts){
	super();
    
	if (!opts)
	  throw new i.InjectError(`Injecable: there is no awilix proxy was passed to ctor`);

	const cache = Injectable.$getCache(Object.getPrototypeOf(this), opts[i.symbols.LocatorInstance]);

	Object
	  .getOwnPropertyNames(cache.props)
	  .map(p => this[p] = opts[cache.props[p]]);
  }

  static $getCache(proto, locator) {
	const cache = proto[InjectCache] || (proto[InjectCache] = buildInjectCache(proto, locator));
    return cache;
  }
}

module.exports = Injectable;

