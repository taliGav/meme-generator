'use strict';
console.log('meme editor service');

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 26,
            xLoc: 15,
            yLoc: 30,
            align: 'left',
            strokeColor: 'black',
            fillColor: 'white'
        },
        {
            txt: 'NOT hungry',
            size: 22,
            xLoc: 100,
            yLoc: 60,
            align: 'left',
            strokeColor: 'black',
            fillColor: 'white'
        }
    ]
};


function getMeme() {
    return gMeme;
}

function setImg(id) {
    gMeme.selectedImgId = id;
    console.log(gMeme);
}

function setSelectedLine() {
    const currLine = gMeme.selectedLineIdx;
    // console.log('currLine',currLine);
    var newLine = currLine + 1;
    // console.log('newLine',newLine);

    if (newLine > gMeme.lines.length - 1) newLine = 0;
    gMeme.selectedLineIdx = newLine;
    console.log('updated line',gMeme.selectedLineIdx);
}


function setLineTxt(el) {
    // console.log('el.value',el.value);
    gMeme.lines[gMeme.selectedLineIdx].txt = el.value;
    renderMeme();
}


function openMemeEditor() {
    console.log('on open meme editor');
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');

    const elEditorContainer = document.querySelector('.editor-container');
    elEditorContainer.hidden = false;
    renderMeme();
}
