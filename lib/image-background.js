var mimetypes = {
  svg: 'image/svg+xml'
};

function getMimeType(imageType) {
  return mimetypes[imageType] || ('image/' + imageType);
}

module.exports = function(proto) {
  return function(imageType) {
    proto[imageType] = function(input) {
      var el = this.el;
      var img;

      function setBackgroundImage(url) {
        el.style.backgroundImage = 'url("' + url + '")';
      }

      if (Buffer.isBuffer(input)) {
        setBackgroundImage('data:' + getMimeType(imageType) + ';base64,' + input.toString('base64'));
        return this;
      }

      img = new Image();
      img.onload = function() {
        setBackgroundImage(input);
      };

      img.src = input;
      return this;
    };
  };
};
