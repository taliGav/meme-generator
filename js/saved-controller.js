'use strict';

var memeIdx = 0;
var memeId = 1;

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
    var saved = loadFromStorage(MEMES_STORAGE_KEY);
    console.log(saved);

    var strHtml = saved.map(meme => {
        return `
        <img class="saved-meme img${memeIdx++}" id="${memeId++}" src="${meme}" onclick="onMemeSelect(this)" alt="">`;
    });
    document.querySelector('.saved-container').innerHTML = strHtml.join('');
}


function onMemeSelect(el) {
    var imgEls = document.querySelector('.saved-meme');
    imgEls.classlist.remove('.selected');

    el.classlist.add('.selected');
}