const pipe = require('pipe-functions');
const Base = require('@ku3mich/base').Object;

class Pipe extends Base{
	constructor (){
		super();
		this.reset();
	}

	reset() {
		this._pipe = [];
	}
	
	use(func, context){
		this._pipe.push(context ? func.bind(context) : func);
		return this;
	}

	exec(arg){
		return pipe.apply(this, [ arg ].concat(this._pipe));
	}
}

const PipeLike = base => class extends base{
	_reset() {
		this._pipe = new Pipe();
	}

	_use(func, context){
		this._pipe.use(func, context || this);
	}

	_exec(arg){
		return this._pipe.exec(arg);
	}
};

class PipeObject extends PipeLike(Base) {
}

module.exports = {
	Pipe,
	PipeLike,
	PipeObject
};
