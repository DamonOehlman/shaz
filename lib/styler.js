var overrides = [
  'backgroundSize',
  'backgroundColor'
];

module.exports = function(proto) {
  overrides.forEach(function(key) {
    proto[key] = function(value) {
      this.el.style[key] = value;
      return this;
    };
  });
};
