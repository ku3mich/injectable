const s = require('./symbols');
const b = require('@ku3mich/base');
const InjectError = require('./injectError.js');
const path = require('path');

class Registration extends b.Object {
  constructor(scope, regType, deps, _module){
    super();

    if (!(_module instanceof module.constructor))
      throw new InjectError('no module specified for registration');
    
    this.scope = scope || s.scopes.transient;
    this.regType = regType || s.types.class;
    this.tags = [];
    this.deps = deps || {};
    this.module = _module;
    this.dirname = path.dirname(_module.filename);
  }

  tagged(){
    Array.prototype.push.apply(this.tags, arguments);

    return this;
  }
}

module.exports = Registration;
