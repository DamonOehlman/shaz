/**
  # shaz

  Simple slide creation logic for
  [shazam](https://github.com/DamonOehlman/shazam).

  ## Example Usage

  __NOT CURRENTLY DESIGNED FOR HUMAN CONSUMPTION__

**/

var tag = exports.tag = require('./tag');
var SUPPORTED_TAGS = [
  // headings
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
];

exports.slide = require('./slide');
exports.html = require('./html');
exports.img = require('./img');

// export the tag creators
SUPPORTED_TAGS.forEach(function(tagName) {
  exports[tagName] = tag(tagName);
});
