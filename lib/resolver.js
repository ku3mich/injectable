const PipeObject = require('@ku3mich/base').PipeObject;
const path = require('path');
const ResolverError = require('./resolverError');

class Resolver extends PipeObject {
  constructor(root){
	super();
	this.root = root;
  }

  _resolve(root, arg) {
	const res = path.resolve(root, arg);
	return res;
  }

  _normalize(arg) {
    return path.normalize(arg);
  }
  
  _relative(arg) {
	return path.relative(this.root, arg);
  }

  // starts resolving path that is relative to root
  resolve(arg){
    arg=arg.replace(/^\/+/, '');
    
	this._reset();
	this._use(() => this._resolve(this.root, arg));
	
	return this;
  }

  convert(arg) {
    return this.resolve(path.relative(this.root, arg));
  }

  join(arg){
    const r = this._use( res => this._resolve(res, arg));
    return r;
  }
  
  // transform resolved absolute path to relative regarding root
  get relative() {
	this._use(this._relative);
	return this;
  }
  
  get(){
	if (this._pipe) {
	  return this._exec(this.path);
    }

//	if (!res.startsWith(this.root))
//	  throw new ResolverError(`path: '${arg}' beyond the container root`);
    
	throw new ResolverError("no resolve was called");
  }
}

module.exports = Resolver;
