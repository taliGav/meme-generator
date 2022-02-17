'use strict';
console.log('meme editor service');

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 22,
            xLoc:15,
            yLoc:30,
            align: 'left',
            strokeColor: 'black',
            fillColor: 'white'
        }
    ]
};

console.log('meme line[0]',gMeme.lines[0].txt);

function getMeme() {
    return gMeme;
}

function setImg(id) { 
gMeme.selectedImgId = id;
console.log(gMeme);
}

function setLineTxt(el) {
    // console.log('el.value',el.value);
    gMeme.lines[0].txt = el.value;
    renderMeme();
}


function openMemeEditor() {
    console.log('on open meme editor');
    const elEditorContainer = document.querySelector('.editor-container');
    gCanvas = document.getElementById('meme-canvas');
    gCanvas.style.top = '350px';
    gCanvas.style.left = '350px';

    gCtx = gCanvas.getContext('2d');

    elEditorContainer.hidden = false;
    renderMeme();

}
