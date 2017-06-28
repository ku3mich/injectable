const i = require('../index.js');
const c = require('./sample-classes.js');

function registerContainer(services){
	let container = new i.Container();
	container.register(services);
	return container;
}

const sampleServices =
		  {
			  A : c.A,
			  B : c.B,
			  Dep : c.Dep,
			  C : c.C
		  };

Object.assign(module.exports,
			  {
				  registerContainer,
				  sampleServices
			  } ,
			  c
			 );


