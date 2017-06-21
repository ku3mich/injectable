const injectable = require('./lib/injectable');
const symbols = require('./lib/symbols');
const container = require('./lib/container');

Object.assign(
	module.exports,
	injectable,
	symbols,
	container);
