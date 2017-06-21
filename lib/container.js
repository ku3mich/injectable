const awilix = require('awilix');
const i = require('./symbols.js');

class Container {
	constructor(parent){
		if (parent){
			this.tags = parent.tags;
			this._container = parent._container.createScope();
		}
		else{
			this.tags =  {};
			this._container = awilix.createContainer();
		}
	}

	// { service : type }
	register(reg){
		const svcs = Object.getOwnPropertyNames(reg);
		
		for (let svc of svcs){
			let type = reg[svc];
			let r = type[i.Register];
			
			if (!r)
				throw new i.InjectError(`type [${type}] has no [Register]`);

			if (typeof(r) == 'function')
				r = r();

			this._container.register({
				[svc] : r.regType.call(null, type).setLifetime(r.scope)
			});

			const tag = type[i.Tag];
			if (tag)
				this.registerTag(tag, service);
		}
	}

	resolve(service){
		return this._container.resolve(service);
	}

	resolveMany(tag){
		if (this[tag])
			return this[tag].map(v =>this.resolve(v));

		return undefined;
	}

	registerTag(tag, serviceName){
		const t = this.tags;
		if (!t[tag])
			t[tag] = [];
		t[tag].push(serviceName);
	}
}

module.exports =  {
	Container
};
