const awilix = require('awilix');
const Inject = Symbol('Inject');
const LocatorInstanceKey = '$locator';

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

const InjectCache = Symbol('InjectCache');

module.exports = {
  Inject,
  scopes,
  types,
  LocatorInstanceKey,
  InjectCache,
  events : {
    registered : Symbol('registered'),
    warning : Symbol('warning')
  }
};

