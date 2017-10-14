const b = require('@ku3mich/base');

const i = require('./symbols.js');
const Exposure = require('./exposure');
const InjectError = require('./injectError');
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
      this._container.registerValue(i.symbols.LocatorInstance,  param);
      this.locator = param;
    }
  }

  // throws if invalid, returns undefined if abstract or should not be registered and registration if it is OK
  getRegistration(type, svc) {
    let regstn = type[i.symbols.Exposure];

    if (!regstn)
      return undefined;
    
    if (!Injectable.isPrototypeOf(type))
      throw new InjectError(`svc ${svc} of ${Injectable.toString.call(type)} is not [Injectable]`);
    
    if (! (regstn instanceof Exposure))
      throw new i.InjectError(`[Inject] in type ${type} is not [Registration]`);

    return regstn;
  }

  _register(svc, type, regstn){
    if (!regstn) {
      // assuming that we are registering a value
      this._container.registerValue(svc, type);

      this.emit(i.events.registered, {
        svc,
        type : 'value'
      });
      
      return;
    }

    this._container.register({
      [svc] : regstn.regType.call(null, type).setLifetime(regstn.scope)
    });
    
    this.emit(i.events.registered, {
      svc,
      type,
      scope : regstn.scope
    });
    
    const cache = Injectable.$getCache(type, this.locator);
    this.registerTags(cache.tags, svc);
  }
  
  // { service : type[with i.Inject instanceof Registration] }
  register(services){
    for (let svc of Object.getOwnPropertyNames(services)) {
      const type = services[svc];
      const regstn = this.getRegistration(type, svc);
      this._register(svc, type, regstn);
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
        if (part.exports[i.symbols.Exposure]) {
          const service = '/'+file.replace(/\.js$/, '');
          
          try {
            const regstn = this.getRegistration(part.exports, service);
            if (regstn.scope != i.scopes.abstract)
              this._register(service, part.exports, regstn);
          }
          catch (e){
            this.emit(i.events.warning, e);
          }
        }
        //else skip
      }
      // else skip, for now file-class supported only
    }
  }
}

module.exports = Container;
