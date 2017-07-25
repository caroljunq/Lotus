
//adiciona biblioteca jquery do node_modules
window.$ = window.jQuery = require('jquery');

//tira os scroll bar da tela
document.documentElement.style.overflow = 'hidden';

const domtoimage = require('dom-to-image');

const character = $('.personagem'),
      object = $('.objeto'),
      moviment = $('.movimento'),
      imgCharacter = document.getElementById("personagem-escolhido"),
      imgHand = document.getElementById("mao"),
      imgObj = document.getElementById("obj");

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
    if(currentMoviment && currentCharacter){
       imgCharacter.src = "img/personagem_grande/"+currentCharacter+"/"+currentMoviment+".png";
       checkHands()
    }
       
}

/**
 * Retorna objeto selecionado
 */
function selectObject(e){
    let objectClass = $(e.currentTarget).attr("class").split(" ");
    object.removeClass("selecionado");
    currentObject = objectClass[2];
    $("."+currentObject).addClass("selecionado");
    imgObj.src = "img/objetos/"+currentObject+".png"; 
}

/**
 * Retorna movimento selecionado
 */

function selectMoviment(e){
    let movimentClass = $(e.currentTarget).attr("class").split(" ");
    moviment.removeClass("selecionado");
    currentMoviment = movimentClass[2];
    $("."+currentMoviment).addClass("selecionado");
     if(currentMoviment && currentCharacter){
         imgCharacter.src = "img/personagem_grande/"+currentCharacter+"/"+currentMoviment+".png";
         checkHands()
     }
}


/**
 * Checa se o movimento precisa de maos;
 */

function checkHands(){
    if(currentMoviment == "m4" || currentMoviment == "m5" || currentMoviment == "m6"){
       imgHand.src = "img/personagem_grande/"+currentCharacter+"/"+currentMoviment+"-mao.png"; 
    }else{
       imgHand.src = "";
    }
}

init();


///**
//* This is a description
//* @namespace My.Namespace
//* @method myMethodName
//* @param {String} str - some string
//* @param {Object} obj - some object
//* @param {requestCallback} callback - The callback that handles the response.
//* @return {bool} some bool
//*/
//



// domtoimage.toJpeg(document.getElementById('opa'), { width: 500, height: 500 })
//     .then(function (dataUrl) {
//         var link = document.createElement('a');
//         link.download = 'my-image-name.jpeg';
//         link.href = dataUrl;
//         link.click();
//     });
