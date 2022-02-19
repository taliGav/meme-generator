'use strict';

var memeIdx = 0;
var memeId = 1;
var gSavedMemes = [];


function openSavedTab() {
    const elSaved = document.querySelector('.saved-memes');
    elSaved.hidden = false;
    const elEditorContainer = document.querySelector('.editor-container');
    elEditorContainer.hidden = true;
    const elGallerySection = document.querySelector('.gallery');
    elGallerySection.hidden = true;

    renderSaved();
}


function renderSaved() {
    var gSavedMemes = loadFromStorage(MEMES_STORAGE_KEY);
    console.log(gSavedMemes);

    var strHtml = gSavedMemes.map(meme => {
        return `
        <img class="saved-memes img${memeIdx++}" id="${memeId++}" src="${meme}" onclick="onMemeSelect(this)" alt="">`;
    });
    document.querySelector('.saved-container').innerHTML = strHtml.join('');

    // var memeMap = gSavedMemes.reduce(meme => {
    //     return `
    //     <img class="saved-meme img${memeIdx++}" id="${memeId++}" src="${meme}" onclick="onMemeSelect(this)" alt="">`;
    // });
}



function onMemeSelect(el) {
    var imgEls = document.querySelector('.saved-memes');
    imgEls.classList.remove('selected');

    el.classList.add('selected');
}

// function isSelected (){
// build saved memes map by reduce 
// add isSelect property
// make toggle func
// }