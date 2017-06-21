const awilix = require('awilix');

const Inject = Symbol('Inject');
const Register = Symbol('Register');
const Tag = Symbol('Tag');

const scopes = {
	Global : awilix.Lifetime.SINGLETON,
	Transient : awilix.Lifetime.TRANSIENT,
	Scoped : awilix.Lifetime.SCOPED
};

const regTypes = {
	Class : awilix.asClass,
	Function : awilix.asFunction,
	Value : awilix.asValue
};

class InjectError extends Error {
	constructor(message){
		super(message);
	}
}

class RegistrationOptions {
	constructor(scope, regType){
		this.scope = scope || scopes.Transient;
		this.regType = regType || regTypes.Class;
	}
}

const registrators = {
	register :  (scope, regType) => new RegistrationOptions(scope, regType),
	registerGlobalClass : () => new RegistrationOptions(scopes.Global, regTypes.Class),
	registerTransientClass : () => new RegistrationOptions(scopes.Transient, regTypes.Class),
	registerScopedClass : () => new RegistrationOptions(scopes.Scoped, regTypes.Class)
};

module.exports = {
	Register,
	Inject,
	Tag,
	InjectError
};

Object.assign(module.exports, scopes, regTypes, registrators);
