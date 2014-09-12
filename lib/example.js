var crel = require('crel');

module.exports = function(code, opts) {
  return crel(
    'pre',
    { lang: (opts || {}).lang || 'js' },
    crel('code', {}, code)
  );
};
