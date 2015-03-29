var crel = require('crel');
var Slide = require('./slide');

/**
  ### `img(url, opts?) => Slide`

  Create a slide that contains a single image which is displayed using
  a `backround-image` CSS style.

**/
module.exports = function(url, opts) {
  var slide = new Slide();

  console.log('creating an img with url: ', url);
  // create an image to trigger loading
  var img = crel('img', {
    src: url
  });

  slide.el.classList.add('shazam-image');

  img.addEventListener('load', function() {
    slide.el.style['background-image'] = 'url("' + url + '")';
  });

  return slide;
};
