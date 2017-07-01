const s = require('./symbols');
const Base = require('@ku3mich/base').Object;

class Registration extends Base {
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
