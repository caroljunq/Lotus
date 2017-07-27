
//adiciona biblioteca jquery do node_modules
window.$ = window.jQuery = require('jquery');

const html2canvas = require('html2canvas');

//tira os scroll bar da tela
document.documentElement.style.overflow = 'hidden';


const character = $('.personagem'),
      object = $('.objeto'),
      moviment = $('.movimento'),
      imgCharacter = document.getElementById("personagem-escolhido"),
      imgHand = document.getElementById("mao"),
      imgObj = document.getElementById("obj"),
      btnRotacionar = $(".btn-rotacionar"),
      btnZoomIn = $(".btn-aumentar"),
      btnZoomOut = $(".btn-diminuir"),
      obj = $("#obj"),
      btnSave = $(".btn-salvar");

let currentCharacter = 0;
let currentObject = 0;
let currentMoviment = 0;
let currentDegree = 0;

const personagens = {
    'p1': 'sarah',
    'p2':'milla',
    'p3':'will',
    'p4':'beto',
    'p5':'lu',
    'p6':'dani',
    'p7':'oli',
    'p8':'gaga',
    'p9':'joao'
};

const movimentos = {
    'm1': 'mupar',
    'm2':'voquer',
    'm3':'zabir',
    'm4':'move',
    'm5':'cola',
    'm6':'seca',
    'm7':'chuta',
    'm8':'desenha',
    'm9':'ganha'
};

const objetos = {
    'o1': 'reveca',
    'o2':'guzata',
    'o3':'tabilu',
    'o4':'bule',
    'o5':'nave',
    'o6':'remo',
    'o7':'lata',
    'o8':'bicho',
    'o9':'mochila'
}

/**
 * Eventos elementos e botoes
 */

function setEvents(){
    character.on('click', e => selectCharacter(e))
    object.on('click', e => selectObject(e));
    moviment.on('click', e => selectMoviment(e));
    btnRotacionar.on('click', e => rotateObj(e));
    btnZoomIn.on('click', e => zoomIn());
    btnZoomOut.on('click', e => zoomOut());
    btnSave.on('click',e => saveImg());
    $(document).ready(function() {
        obj.draggable({
            containment: $('.quadro-imagens')
        });
    });
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

/**
 * Rotaciona objeto
 */

function rotateObj(e){
    currentDegree += 15;
    if(currentDegree > 360)
        currentDegree = 0;
    obj.css("transform","rotate("+currentDegree+"deg)");
}

/**
 * Aumenta imagem escolhida em 15 px
*/
    
function zoomIn(){
    let currentWidth = parseInt(obj.css('width'),10);
    currentWidth += 15;
    obj.css("width",currentWidth + "px");
}
    
    
/**
* Diminui imagem escolhida em 15 px
*/
    
function zoomOut(){
    let currentWidth = parseInt(obj.css('width'),10);
    currentWidth -= 15;
    obj.css("width",currentWidth + "px");
}

/**
* Salva img
*/
function saveImg(){
    $(".botoes").hide();
    html2canvas($('.quadro-imagens'), 
    {
      onrendered: function (canvas) {
        let a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = personagens[currentCharacter]+'_'+movimentos[currentMoviment]+'_'+objetos[currentObject]+'.jpg';
        a.click();
      }
    });
    $(".botoes").show();
}

init();


