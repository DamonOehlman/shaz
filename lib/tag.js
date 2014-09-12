var crel = require('crel');

module.exports = function(tag) {
  return function() {
    return crel.apply(null, [tag].concat([].slice.call(arguments)));
  };
};
