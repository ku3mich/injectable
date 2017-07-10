const Registration = require('./registration');
const s = require('./symbols');

module.exports = {
  register :  (scope, type, deps) => new Registration(scope, type, deps),
  globalClass : (deps) => new Registration(s.scopes.Global, s.types.Class, deps),
  transientClass : (deps) => new Registration(s.scopes.Transient, s.types.Class, deps),
  scopedClass : (deps) => new Registration(s.scopes.Scoped, s.types.Class, deps)
};

