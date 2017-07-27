const s = require('./symbols');
const b = require('@ku3mich/base');
const InjectError = require('./injectError.js');
const path = require('path');

class Registration extends b.Object {
  constructor(scope, regType, deps, _module){
	super();

	if (!_module)
      throw new InjectError('no module specified for registration');
    
	this.scope = scope || s.scopes.Transient;
	this.regType = regType || s.types.Class;
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
