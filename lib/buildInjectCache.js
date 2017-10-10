const i = require('./symbols.js');
const prototypeChain = require('@ku3mich/base').prototypeChain;

module.exports = function buildInjectCache(obj, locator) {
  let cache = {};

  for (let proto of prototypeChain(obj)){
	let registration = proto.constructor[i.Inject];

	if (!registration)
	  continue;

	let injects = registration.deps;
	if (!injects)
	  continue;
	
	for (let p in injects){
	  if (cache[p] && (injects[p]!==cache[p]))
		throw new i.InjectError(`duplicated overriden dependency [${p}]`);

      const resolve = dep => {
        if (dep.match(/^(\.{1,2}\/|\/)/)) {
          return '/' + locator.resolver.convert(registration.dirname).join(dep).relative.posix.get();
        }
        
        return dep;
      };

	  cache[p] = resolve(injects[p]);
	}
  }

  return cache;
};
