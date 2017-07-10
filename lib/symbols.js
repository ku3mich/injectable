const awilix = require('awilix');

const Inject = Symbol('Inject');

const scopes = {
  Global : awilix.Lifetime.SINGLETON,
  Transient : awilix.Lifetime.TRANSIENT,
  Scoped : awilix.Lifetime.SCOPED
};

const types = {
  Class : awilix.asClass,
  Function : awilix.asFunction,
  Value : awilix.asValue
};


module.exports = {
  Inject,
  scopes,
  types
};

