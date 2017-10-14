Object.assign(
  module.exports,
  {
	Injectable : require('./lib/injectable'),
	Container : require('./lib/container'),
	InjectError : require('./lib/injectError.js'),
	Locator : require('./lib/locator'),
	Resolver : require('./lib/resolver'),
  },
  require('./lib/symbols'),
  require('./lib/exposure')
);
