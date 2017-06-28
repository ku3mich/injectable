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

class InjectError extends Error {
	constructor(message){
		super(message);
	}
}

class Registration {
	constructor(scope, regType, deps){
		this.scope = scope || scopes.Transient;
		this.regType = regType || types.Class;
		this.tags = [];
		this.deps = deps || {};
	}

	tagged(){
		Array.prototype.push.apply(this.tags, arguments);
	}
}

const registrators = {
	register :  (scope, type, deps) => new Registration(scope, type, deps),
	globalClass : (deps) => new Registration(scopes.Global, types.Class, deps),
	transientClass : (deps) => new Registration(scopes.Transient, types.Class, deps),
	scopedClass : (deps) => new Registration(scopes.Scoped, types.Class, deps)
};


module.exports = {
	Inject,
	InjectError
};

Object.assign(module.exports,
			  scopes,
			  types,
			  registrators,
			  { Registration });

