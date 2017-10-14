const i = require('./symbols.js');
const prototypeChain = require('@ku3mich/base').prototypeChain;

module.exports = function buildInjectCache(prototype, locator) {
  const cache = {
    props : {},
    tags : []
  };

  for (let proto of prototypeChain(prototype)){
    let registration = proto.constructor[i.symbols.exposure];
    if (!registration)
      continue;

    if (registration.tags) 
      Array.prototype.push.apply(cache.tags, registration.tags);
    
    let injects = registration.deps;
    if (!injects)
      continue;

    for (let p in injects){
      if (cache.props[p] && (injects[p] !== cache.props[p]))
        throw new i.InjectError(`duplicated overriden dependency [${p}]`);

      const resolve = dep => {
        if (dep.match(/^(\.{1,2}\/|\/)/)) {
          return '/' + locator.resolver.convert(registration.dirname).join(dep).relative.posix.get();
        }
        
        return dep;
      };

      cache.props[p] = resolve(injects[p]);
    }
  }

  cache.tags = Array.from(new Set(cache.tags));
  return cache;
};
