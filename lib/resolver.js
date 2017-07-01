const PipeObject = require('./pipe').PipeObject;
const path = require('path');
const LocatorError = require('./locatorError.js');

class Resolver extends PipeObject {
	constructor(root){
		super();
		this.root = root;
	}

	_resolve(arg) {
		const res = path.normalize(path.join(this.root, arg));
		if (!res.startsWith(this.root))
			throw new LocatorError(`path: '${arg}' beyond the container root`);

		return res;
	}

	_relative(arg) {
		return path.relative(this.root, arg);
	}

	resolve(path){
		this.path = path;
		this._reset();
		this._use(this._resolve);
		
		return this;
	}

	get relative() {
		this._use(this._relative);
		return this;
	}
	
	get result(){
		if (this.path && this._pipe)
			return this._exec(this.path);

		throw new LocatorError("no resolve was called");
	}
}

module.exports = Resolver;
