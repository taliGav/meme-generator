'use strict';

console.log('meme editor controller');

var gCanvas;
var gCtx;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };



function renderMeme() {
    // renders an image on the canvas and a line of text on top
    var meme = getMeme();
    drawMeme(meme.selectedImgId);
}

function onSetFont(font) {
    setFont(font);
    renderMeme();
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
    setFontSize(val);
    renderMeme();
}

function onSwitchLines() {
    console.log('switch lines func activated');
    setSelectedLineIdx();
    setSelectedLine();
    console.log('meme line[meme.selectedLineIdx]', gMeme.lines[gMeme.selectedLineIdx].txt, 'meme.lines[currLineIdx].size', gMeme.lines[gMeme.selectedLineIdx].size);
    updateInputText();
    renderMeme();
}

function onAddLine() {
    addNewLine();
    setSelectedLine();
    updateInputText();
    renderMeme();
}

function onRemoveLine() {
    removeLine();
    setSelectedLine();
    updateInputText();
    renderMeme();
}

function onShareOnFb() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");
    console.log('imgDataUrl', imgDataUrl);

    doUploadImg(imgDataUrl, onSuccess);

    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        console.log('encodedUploadedImgUrl', encodedUploadedImgUrl);

        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`, '_blank');
        // window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`,'_blank')
    }
}

