const Registration = require('./registration');
const s = require('./symbols');

module.exports = {
  register :  (scope, type, deps, _module) => new Registration(scope, type, deps, _module),
  globalClass : (_module, deps) => new Registration(s.scopes.Global, s.types.Class, deps, _module),
  transientClass : (_module, deps) => new Registration(s.scopes.Transient, s.types.Class, deps, _module),
  scopedClass : (_module, deps) => new Registration(s.scopes.Scoped, s.types.Class, deps, _module)
};

