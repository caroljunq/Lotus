
//adiciona biblioteca jquery do node_modules
window.$ = window.jQuery = require('jquery');

//tira os scroll bar da tela
document.documentElement.style.overflow = 'hidden';

const character = $('.personagem'),
      object = $('.objeto'),
      moviment = $('.movimento');

let currentCharacter = 0;
let currentObject = 0;
let currentMoviment = 0;

/**
 * Eventos elementos e botoes
 */

function setEvents(){
    character.on('click', e => selectCharacter(e));
    object.on('click', e => selectObject(e));
    moviment.on('click', e => selectMoviment(e));
}

/**
 * Init
 */
function init(){
    setEvents();
}

/**
 * Retorna personagem selecionado
 */

function selectCharacter(e){
    let characterClass = $(e.currentTarget).attr("class").split(" ");
    character.removeClass("selecionado");
    currentCharacter = characterClass[2];
    $("."+currentCharacter).addClass("selecionado");
}

/**
 * Retorna objeto selecionado
 */
function selectObject(e){
    let objectClass = $(e.currentTarget).attr("class").split(" ");
    object.removeClass("selecionado");
    currentObject = objectClass[2];
    $("."+currentObject).addClass("selecionado");
}

/**
 * Retorna movimento selecionado
 */

function selectMoviment(e){
    let movimentClass = $(e.currentTarget).attr("class").split(" ");
    moviment.removeClass("selecionado");
    currentMoviment = movimentClass[2];
    $("."+currentMoviment).addClass("selecionado");
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
