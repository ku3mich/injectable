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

	// { service : type[with i.Inject instanceof Registration] }
	register(reg){
		const svcs = Object.getOwnPropertyNames(reg);
		
		for (let svc of svcs){
			let type = reg[svc];
			let r = type[i.Inject];
			
			if (!r)
				throw new i.InjectError(`type ${type} has no [Inject]`);
			if (! (r instanceof i.Registration))
				throw new i.InjectError(`[Inject] in type ${type} is not [Registration]`);

			this._container.register({
				[svc] : r.regType.call(null, type).setLifetime(r.scope)
			});

			const tags = r.tags;
			if (tags)
				this.registerTags(tags, svc);
		}
	}

	resolve(service){
		return this._container.resolve(service);
	}

	resolveMany(tag){
		if (this[tag])
			return this[tag].map(v => this.resolve(v));

		return undefined;
	}

	registerTags(tags, serviceName){
		tags.map(t => this.registerTag(t, serviceName));
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
