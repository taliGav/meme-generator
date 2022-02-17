'use strict';

console.log('gallery controller');

var gImgs = [{
    id: 1,
    url: './meme-imgs-square/1.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 2,
    url: './meme-imgs-square/2.jpg',
    keywords: ['funny', 'cat']
}];

function onInit() {
    renderGallery();
}

function getImgs() {
    return gImgs;
}

function renderGallery() {
    const imgs = getImgs();
    var strHtml = imgs.map(img => {
        return `
        <img class="img img${img.id}" id="${img.id}" src="${img.url}" onclick="onImgSelect(this.id)" alt="">`;
    });

    document.querySelector('.gallery-container').innerHTML = strHtml.join('');
}

function onImgSelect(id) {
    setImg(id);
    openMemeEditor();
}


function switchLines() {
    console.log('switch lines func activated');
    setSelectedLine();
    console.log('meme line[meme.selectedLineIdx]',gMeme.lines[gMeme.selectedLineIdx].txt);

    // openMemeEditor();
}

