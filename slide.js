var crel = require('crel');
var EventEmitter = require('eventemitter3');
var inherits = require('inherits');
var reImg = /\.(jpg|jpeg|png|bmp|gif|svg)$/i;
var reURL = /^\w*\:?\/\//;

var backgroundSizes = [
  'cover', 'contain'
];

var imageAttributes = [
  'jpg', 'jpeg', 'png', 'bmp', 'gif', 'svg'
];

var allowedStyleOverrides = [
  'color', 'font', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign'
];

function Slide(el, opts) {
  var backgroundImage = false;
  var el;

  if (! (this instanceof Slide)) {
    return new Slide(el, opts);
  }

  EventEmitter.call(this);

  // assign or create the element
  el = this.el = crel.apply(null, ['section'].concat(el || []));

  // if we have a hash, then set it
  if (opts && opts.hash) {
//     this.bespoke('hash', opts.hash);
  }

  // add classes
  ((opts || {}).classes || []).forEach(function(className) {
    el.classList.add(className);
  });

  // check for any image attributes
  imageAttributes.forEach(function(key) {
    if (opts && opts[key] && (! opts.background)) {
      opts.background = reURL.test(opts[key]) ? opts[key] : ('images/' + opts[key] + '.' + key);
      backgroundImage = true;
    }
  });

  if (opts && opts.background) {
    this.setBackground(opts.background, backgroundImage);
  }

  // set the background size
  this.el.style.backgroundSize = (opts || {}).contain ? 'contain': 'cover';

  // apply any style overrides
  this.applyStyleOverrides(opts);

  // flag whether loaded or not
  this.loaded = true;
}

inherits(Slide, EventEmitter);
module.exports = Slide;
var proto = Slide.prototype;

function appender(fn) {
  return function() {
    var child = fn.apply(this, arguments);

    if (child) {
      this.el.appendChild(child)
    }

    return this;
  };
}

proto.applyStyleOverrides = function(opts) {
  var slide = this;

  allowedStyleOverrides.forEach(function(key) {
    if (opts && opts[key]) {
      slide.el.style[key] = opts[key];
    }
  });
};

proto.eg = proto.example = appender(require('./lib/example'));
proto.html = appender(require('./lib/html'));
proto.url = appender(require('./lib/url'));
proto.markdown = proto.md = appender(require('./lib/markdown'));
require('./lib/styler')(proto);

backgroundSizes.forEach(function(size) {
  proto[size] = function() {
    return this.backgroundSize(size);
  };
});

proto.bespoke = function(attr, value) {
  this.el.setAttribute('data-bespoke-' + attr, value);
};


proto.setBackground = function(value, bgImage) {
  if (bgImage || reImg.test(value)) {
    return this.setBackgroundImage(value);
  }

  this.el.style.background = value;
};

proto.setBackgroundImage = function(value) {
  var img = new Image();
  var el = this.el;

  img.onload = function() {
    el.style.backgroundImage = 'url("' + value +'")';
  };

  img.src = value;
}

imageAttributes.forEach(require('./lib/image-background')(proto));

require('./tags').forEach(function(tag) {
  proto[tag] = appender(require('./lib/tag')(tag));
});
