'use strict';

console.log('meme editor controller');

var gCanvas;
var gCtx;
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };



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
        drawTextLines();
    };
}

function drawTextLines() {
    const meme = getMeme();
    meme.lines.forEach(line => drawTextLine(meme.lines.indexOf(line)));
}

function drawTextLine(currLine) {
    const meme = getMeme();
    const text = meme.lines[currLine].txt;
    const x = meme.lines[currLine].xLoc;
    const y = meme.lines[currLine].yLoc;
    
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = meme.lines[currLine].strokeColor;
    gCtx.fillStyle = meme.lines[currLine].fillColor;
    gCtx.font = `${meme.lines[currLine].size}px luckiest-guy`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function setStrokeColor(elInputColor) {
    const meme = getMeme();
    meme.lines[meme.selectedLineIdx].strokeColor = elInputColor.value;
    renderMeme();
}

function setFillColor(elInputColor) {
    const meme = getMeme();
    meme.lines[meme.selectedLineIdx].fillColor = elInputColor.value;
    renderMeme();
}


function demo() {
    console.log('canvas on click demo');
}

function closeMemeEditor() {
    const elEditorContainer = document.querySelector('.editor-container');
    elEditorContainer.hidden = true;
}

function downloadMeme(elLink) {
    const data = gCanvas.toDataURL('image/jpeg');
    elLink.href = data;
}


function onUpdateFontSize(val) {
    const meme = getMeme();
    const currLine = meme.selectedLineIdx;
    var currFontSize = meme.lines[currLine].size;

    switch (val) {
        case '+':
            meme.lines[currLine].size = currFontSize + 1;
            renderMeme();
            break;
        case '-':
            meme.lines[currLine].size = currFontSize - 1;
            renderMeme();
            break;
    }
}

function switchLines() {
    console.log('switch lines func activated');
    setSelectedLine();
    // console.log('meme line[meme.selectedLineIdx]',gMeme.lines[gMeme.selectedLineIdx].txt);
    updateInputText();
}

