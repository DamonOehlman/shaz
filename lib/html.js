var crel = require('crel');

module.exports = function(html, opts) {
  var injected = crel('div', opts);

  injected.innerHTML = html;
  return injected;
};
