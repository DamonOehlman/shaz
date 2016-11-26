var crel = require('crel');

module.exports = function(listType) {
  return function(items) {
    return crel(listType, items.map(function(text) {
      return crel('li', text);
    }));
  }
};