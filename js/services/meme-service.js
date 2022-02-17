'use strict';
console.log('meme editor service');

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'first',
            size: 26,
            xLoc: 20,
            yLoc: 40,
            align: 'left',
            strokeColor: 'black',
            fillColor: 'white'
        },
        {
            txt: 'sec',
            size: 22,
            xLoc: 40,
            yLoc: 300,
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
    renderMeme();
}


function setLineTxt(el) {
    // console.log('el.value',el.value);
    gMeme.lines[gMeme.selectedLineIdx].txt = el.value;
    renderMeme();
}


function openMemeEditor() {
    const elGallerySection = document.querySelector('.gallery');
    elGallerySection.hidden = true;
    console.log('on open meme editor');
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');

    const elEditorContainer = document.querySelector('.editor-container');
    elEditorContainer.hidden = false;

    
    renderMeme();
    updateInputText();
}

function updateInputText() {
    document.getElementById("text-input").value =  gMeme.lines[gMeme.selectedLineIdx].txt;
}



// gCtx.strokeText('Saving the context', 10, 50)
//   gCtx.save()   

// gCtx.restore()