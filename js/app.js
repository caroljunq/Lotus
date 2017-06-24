
//adiciona biblioteca jquery do node_modules
window.$ = window.jQuery = require('jquery');

var domtoimage = require('dom-to-image');


var node = document.getElementById('teste1');

domtoimage.toJpeg(document.getElementById('teste1'), { width: 500, height: 500 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
