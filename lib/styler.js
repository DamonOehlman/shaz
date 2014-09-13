var overrides = [
  [ 'backgroundSize', 'bgSize' ],
  [ 'backgroundColor', 'bgColor' ]
];

module.exports = function(proto) {
  overrides.forEach(function(attributes) {
    var main;

    attributes = [].concat(attributes || []);
    main = attributes[0];

    attributes.forEach(function(key) {
      proto[key] = function(value) {
        this.el.style[main] = value;
        return this;
      };
    });
  });
};
