const i = require('../../../../index.js');
class Q {
}
Q[i.Inject] = i.transientClass(module, {
  dep : '../dep'
});

module.exports = Q;
