
//adiciona biblioteca jquery do node_modules
window.$ = window.jQuery = require('jquery');

//tira os scroll bar da tela
document.documentElement.style.overflow = 'hidden';

const btn = $("#teste1");
/**
 *
 */
function setEvents(){
    btn.on('click',e => digaOi());
}

function digaOi(){
    let x = 5;
    x=6;
    console.log(x);
}
/**
 * Init
 */
var init = function(){
    setEvents();

}


init();


/**
* This is a description
* @namespace My.Namespace
* @method myMethodName
* @param {String} str - some string
* @param {Object} obj - some object
* @param {requestCallback} callback - The callback that handles the response.
* @return {bool} some bool
*/

// var domtoimage = require('dom-to-image');

// var node = document.getElementById('teste1');
//
// domtoimage.toJpeg(document.getElementById('teste1'), { width: 500, height: 500 })
//     .then(function (dataUrl) {
//         var link = document.createElement('a');
//         link.download = 'my-image-name.jpeg';
//         link.href = dataUrl;
//         link.click();
//     });
