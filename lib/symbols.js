const awilix = require('awilix');

const scopes = {
  global : awilix.Lifetime.SINGLETON,
  transient : awilix.Lifetime.TRANSIENT,
  scoped : awilix.Lifetime.SCOPED,
  abstract : Symbol('abstract')
};

const types = {
  class : awilix.asClass,
  function : awilix.asFunction,
  value : awilix.asValue
};

module.exports = {
  scopes,
  types,
  events : {
    registered : Symbol('registered'),
    warning : Symbol('warning')
  },
  symbols : {
    locatorInstance : '$locatorInstance', // due awilix internals
    injectCache : Symbol('injectCache'),
    exposure : Symbol('exposure')
  }
};

