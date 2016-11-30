var marked = require('marked-ast');
var Slide = require('./slide');
var reSlideBreak = /\n\r?\:{3,}/m;
var reLeadingAndTrailingSpaces = /^\s*(.*)\s*$/m;

var markdown = module.exports = function(md, opts) {
  var ast;
  var slide;

  // if we have multiple slides, split and map
  if (reSlideBreak.test(md)) {
    return md.split(reSlideBreak).map(function(content) {
      return markdown(content, opts);
    });
  }

  // create the new slide
  slide = new Slide();

  // parse the slide
  ast = marked.parse(md.replace(reLeadingAndTrailingSpaces, '$1'));

  // walk the ast and create a slide
  ast.map(require('marked-ast-crel')).forEach(function(el) {
    slide.el.appendChild(el);
  });

  return slide;
};
