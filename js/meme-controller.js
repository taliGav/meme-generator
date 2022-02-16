'use strict';

console.log('meme editor controller');

var gCanvas;
var gCtx;
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };


function openMemeEditor() {
    console.log('on open meme editor');
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');

    renderMeme();

}

function renderMeme() {
    // renders an image on the canvas and a line of text on top
    var meme = getMeme();
    // var img = getImgForDisp(meme.selectedImgId);
    drawMeme(meme.selectedImgId);

}

function drawMeme(id) {
    var img = new Image();
    const meme = getMeme();
    const imgs = getImgs();
    img.src = imgs[id - 1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
        drawTextLine(meme.lines[0].txt, meme.lines[0].xLoc, meme.lines[0].yLoc);
    };
}

function drawTextLine(text, x, y) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);
    var meme = getMeme();

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = meme.lines[0].strokeColor;
    gCtx.fillStyle = meme.lines[0].fillColor;
    gCtx.font = `${meme.lines[0].size}px Arial`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function setStrokeColor(elInputColor) {
    const meme = getMeme();
    meme.lines[0].strokeColor = elInputColor.value;
    renderMeme();
}

function setFillColor(elInputColor) {
    const meme = getMeme();
    meme.lines[0].fillColor = elInputColor.value;
    renderMeme();
}


function demo() {
    console.log('canvas on click demo');
}

function closeMemeEditor() {
    const elEditorContainer = document.querySelector('.editor-container');
    elEditorContainer.hidden = true;
}

// function downloadCanvas(elLink) {
//     const data = gCanvas.toDataURL()
//     elLink.href = data
//     elLink.download = 'my-img.jpg'
// }


function updateFontSize(val) {
    const meme = getMeme();
    var currFontSize = meme.lines[0].size;

    switch (val) {
        case '+':
            meme.lines[0].size = currFontSize + 1;
            renderMeme();
            break;
        case '-':
            meme.lines[0].size = currFontSize - 1;
            renderMeme();
            break;
    }
}

function switchLines() {
}
