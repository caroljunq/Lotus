
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
      mao = $("#mao"),
      btnSave = $(".btn-salvar"),
      btnJpg = $(".btn-jpg"),
      btnGif = $(".btn-gif"),
      btnSaibaMais = $(".btn-saiba-mais"),
      btnVoltar = $(".btn-voltar"),
      btnBack = $(".icon-back"),
      btnNext = $(".icon-next"),
      imgSaibaMais = document.getElementById("img-saiba");

let currentCharacter = "p1";
let currentObject = "o1";
let currentMoviment = "m1";
let currentDegree = 0;
let currentPage = 1;

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
    'o7':'latinha',
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
    
    btnJpg.on("click",() => setImgJpg());
    btnGif.on("click",() => setImgGif());
    
    btnSaibaMais.on("click",() => showSaibaMais());
    btnVoltar.on("click",() => removeSaibaMais());
    
    btnBack.on("click",() => backPage());
    btnNext.on("click",() => nextPage());
}


/**
 * Init
 */
function init(){
    $("."+currentCharacter).addClass("selecionado");
    $("."+currentMoviment).addClass("selecionado");
    $("."+currentObject).addClass("selecionado");
    btnJpg.addClass("btn-jpg-ativo");
    btnBack.hide();
    imgSaibaMais.src = "img/saiba-mais/1.png";
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
    checkImgType();     
}

/**
 * Retorna objeto selecionado
 */
function selectObject(e){
    let objectClass = $(e.currentTarget).attr("class").split(" ");
    object.removeClass("selecionado");
    currentObject = objectClass[2];
    $("."+currentObject).addClass("selecionado");
    checkImgType();
}

/**
 * Retorna movimento selecionado
 */

function selectMoviment(e){
    let movimentClass = $(e.currentTarget).attr("class").split(" ");
    moviment.removeClass("selecionado");
    currentMoviment = movimentClass[2];
    $("."+currentMoviment).addClass("selecionado");
    checkImgType();
}

/**
 * Checa se o tipo da imagem que vai mostrar
 */

function checkImgType(){
    if(btnJpg.attr('class').indexOf('btn-jpg-ativo') != -1){
        if(currentMoviment && currentCharacter){
            imgObj.src = "img/objetos/"+currentObject+".png";
            imgCharacter.src = "img/personagem_grande/"+currentCharacter+"/"+currentMoviment+".png";
            checkHands();
        }  
    }else if(btnGif.attr('class').indexOf('btn-gif-ativo')!= -1){
        imgObj.src = "";
        imgHand.src = "";
        if(currentObject && currentCharacter && (currentMoviment == 'm1' || currentMoviment == 'm2' || currentMoviment == 'm3')){
            imgCharacter.src = "img/gif/"+currentCharacter+"/"+currentCharacter+"_"+personagens[currentCharacter]+"_"+movimentos[currentMoviment]+"_"+objetos[currentObject]+".gif";
        }
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
    if(btnJpg.attr('class').indexOf('btn-jpg-ativo') != -1){
        btnRotacionar.css('background','none');
        btnZoomIn.css('background','none');
        btnZoomOut.css('background','none');
        $(".btn-rotacionar").css('background','transparent');
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
        btnRotacionar.css('background','url(img/botoes/rotacionar.png) no-repeat');
        btnZoomIn.css('background','url(img/botoes/aumentar.png) no-repeat');
        btnZoomOut.css('background','url(img/botoes/diminuir.png) no-repeat');
        
    }else if(btnGif.attr('class').indexOf('btn-gif-ativo') != -1){
        
    }
   
}

/**
* Coloca na tela a imagem jpg
*/

function setImgJpg(){
    if(btnGif.attr('class').indexOf("btn-gif-ativo"))
        btnGif.removeClass("btn-gif-ativo");
    btnJpg.toggleClass("btn-jpg-ativo");
          
}

/**
* Coloca na tela a imagem gif
*/

function setImgGif(){
    if(btnJpg.attr('class').indexOf("btn-jpg-ativo"))
        btnJpg.removeClass("btn-jpg-ativo");
    btnGif.toggleClass("btn-gif-ativo");        
}

/**
* Mostra tela do saiba mais
*/

function showSaibaMais(){
    $(".saiba-mais").fadeIn(1000);
}

/**
* Esconde tela do saiba mais
*/
function removeSaibaMais(){
    $(".saiba-mais").fadeOut(1000);
}

/**
* Proxima pg do saiba mais
*/
function nextPage(){
 
    currentPage++;
    if(currentPage == 12)
        btnNext.hide();
    btnBack.show();
 
    imgSaibaMais.src = "img/saiba-mais/"+currentPage+".png";
}

/**
* Anterior pg do saiba mais
*/
function backPage(){
    currentPage--;
    if(currentPage == 1)
        btnBack.hide();
    
    btnNext.show();
    
    
    
    imgSaibaMais.src = "img/saiba-mais/"+currentPage+".png";
}



init();


