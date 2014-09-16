var marked = require('marked-ast');
var crel = require('crel');

module.exports = function(md) {
  var ast = marked.parse(md.replace(reLeadingAndTrailingSpaces, '$1'));
  var container = crel('div');

  // walk the ast and create a slide
  ast.map(require('marked-ast-crel')).forEach(function(el) {
    container.appendChild(el);
  });

  return container;
};
