'use strict';

console.log('meme editor controller');

var gCanvas;
var gCtx;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };



function renderMeme() {
    // renders an image on the canvas and a line of text on top
    var meme = getMeme();
    drawMeme(meme.selectedImgId);
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

function closeMemeEditor() {
    const elGallerySection = document.querySelector('.gallery');
    elGallerySection.hidden = false;
    const elEditorContainer = document.querySelector('.editor-container');
    elEditorContainer.hidden = true;
}

function onDownloadMeme(elLink) {
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

function onSwitchLines() {
    console.log('switch lines func activated');
    setSelectedLineIdx();
    setSelectedLine();
    // console.log('meme line[meme.selectedLineIdx]',gMeme.lines[gMeme.selectedLineIdx].txt);
    updateInputText();
    // add text ouline or something as focus
}

function onAddLine() {
    addNewLine();
    setSelectedLine();
    updateInputText();
    renderMeme();
}

function onRemoveLine(){
    removeLine();
    setSelectedLine();
    updateInputText();
    renderMeme();
}

function onShareToFb() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");
    console.log('imgDataUrl',imgDataUrl);

    doUploadImg(imgDataUrl, onSuccess);

    function onSuccess(uploadedImgUrl) {
        // console.log('uploadedImgUrl',uploadedImgUrl);
        // const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // console.log('encodedUploadedImgUrl',encodedUploadedImgUrl);

        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`,'_blank')
        // window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`,'_blank')
    }    
}

