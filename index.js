/**
  # shaz

  Simple slide creation logic for
  [shazam](https://github.com/DamonOehlman/shazam).

  ## Example Usage

  __NOT CURRENTLY DESIGNED FOR HUMAN CONSUMPTION__

**/

var slide = module.exports = require('./slide');
var tag = slide.tag = require('./tag');

slide.slide = require('./slide');
slide.img = require('./img');
slide.markdown = exports.md = require('./markdown');
slide.site = require('./site');

// export the tag creators
require('./tags').forEach(function(tagName) {
  slide[tagName] = tag(tagName);
});
