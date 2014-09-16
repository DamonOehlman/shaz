var crel = require('crel');

module.exports = function(url) {
  return crel('p', crel('a', { href: url }, url));
};
