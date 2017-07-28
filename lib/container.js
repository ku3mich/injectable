const b = require('@ku3mich/base');

const i = require('./symbols.js');
const Registration = require('./registration.js');
const InjectError = require('./injectError.js');
const Injectable = require('./injectable');
const Locator = require('./locator');
const Part = require('./part');

const awilix = require('awilix');

class Container extends b.EmitterLike(b.Object) {
  // param: instace of locator for root or parent container for scoped
  constructor(param){
	super();
    
	if (param instanceof Container){
	  this.tags = parent.tags;
	  this._container = parent._container.createScope();
      this.locator = parent.locator;
	}
	else{
      if (!(param instanceof Locator))
        throw new InjectError('container requires a Locator instance');
      
	  this.tags =  {};
	  this._container = awilix.createContainer();
      this._container.registerValue(i.LocatorInstanceKey,  param);
      this.locator = param;
	}
  }

  // { service : type[with i.Inject instanceof Registration] }
  register(reg){
	const svcs = Object.getOwnPropertyNames(reg);
	
	for (let svc of svcs){
	  let type = reg[svc];

      if (!type.hasOwnProperty(i.Inject))
		throw new InjectError(`type ${type} has no [Inject]`);

	  let r = type[i.Inject];
	  
      if (!Injectable.isPrototypeOf(type))
        throw new InjectError(`svc ${svc} of ${Injectable.toString.call(type)} is not [Injectable]`);
      
      
	  if (! (r instanceof Registration))
		throw new i.InjectError(`[Inject] in type ${type} is not [Registration]`);

	  this._container.register({
		[svc] : r.regType.call(null, type).setLifetime(r.scope)
	  });

      this.emit('registered', {
        svc,
        type,
        scope : r.scope
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
	if (this.tags[tag])
	  return this.tags[tag].map(v => this.resolve(v));

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

  registerParts(pattern){
    const files = this.locator.locateFiles(pattern);
    for (let file of files){
      const part = Part.load(this.locator.resolver.resolve(file).get());
      if (part.exports instanceof Function){
        if (part.exports[i.Inject]){
          const service = '/'+file.replace(/\.js$/, '');
          
          try {
            this.register({ [service] : part.exports });
          }
          catch (e){
            this.emit('warning', e.message);
          }
        }
        //else skip
      }
      // else skip, for now only file-class supported
    }
  }
}

module.exports = Container;
