const p = require('path');
//const g = glob;

class LocatorError extends Error {
	constructor (msg){
		super(msg);
	}
}

class Resolver {
	constructor(root){
		this.root = root;
		this.__resolver = this._resolver;
	}

	_resolver(path) {
		const res = p.normalize(p.join(this.root, path));
		if (!res.startsWith(this.root))
			throw new LocatorError(`path: '${path}' beyond the container root`);

		return res;
	}

	resolve(path){
		this.path = path;
		
		return this;
	}

	get relative() {
		const resolver = this.__resolver.bind(this);
		this.__resolver = path => p.relative(this.root, resolver(path));
		
		return this;
	}
	
	get result(){
		return this.__resolver(this.path);
	}
}

class Locator {
	constructor (root){
		this.root = root;
	}

	resolve(path){
		return (new Resolver(this.root)).resolve(path);
	}
}

Object.assign(module.exports, {
	LocatorError,
	Locator,
	Resolver
});
