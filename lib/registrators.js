const Registration = require('./registration');
const s = require('./symbols');

module.exports = {
  register :  (scope, type, deps, _module) => new Registration(scope, type, deps, _module),
  globalClass : (_module, deps) => new Registration(s.scopes.global, s.types.Class, deps, _module),
  transientClass : (_module, deps) => new Registration(s.scopes.transient, s.types.class, deps, _module),
  scopedClass : (_module, deps) => new Registration(s.scopes.scoped, s.types.class, deps, _module),
  abstractClass : (_module, deps) => new Registration(s.scopes.abstract, s.types.class, deps, _module)
};

