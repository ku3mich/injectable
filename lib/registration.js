const s = require('./symbols');
const b = require('@ku3mich/base');

class Registration extends b.Object {
  constructor(scope, regType, deps){
	super();
	
	this.scope = scope || s.scopes.Transient;
	this.regType = regType || s.types.Class;
	this.tags = [];
	this.deps = deps || {};
  }

  tagged(){
	Array.prototype.push.apply(this.tags, arguments);

	return this;
  }
}

module.exports = Registration;
