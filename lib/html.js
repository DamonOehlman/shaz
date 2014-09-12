module.exports = function(html) {
  var injected = crel('div');

  injected.innerHTML = html;
  return injected;
};
