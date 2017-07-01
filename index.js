Object.assign(
	module.exports,
	{
		Injectable : require('./lib/injectable'),
		Container : require('./lib/container'),
		InjectError : require('./lib/injectError.js'),
		Registration : require('./lib/registration.js')
	},
	require('./lib/symbols'),
	require('./lib/registrators.js')
);
