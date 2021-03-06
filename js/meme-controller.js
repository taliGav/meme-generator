'use strict';

console.log('meme editor controller');

var gStartPos;
var gEl;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };


const MEMES_STORAGE_KEY = 'memesDB';

function _saveMemesToStorage() {
    saveToStorage(MEMES_STORAGE_KEY, gSavedMemes);
}

function getSaved() {
    return gSavedMemes;
}

function renderMeme() {
    console.log('hi');
    // renders an image on the canvas and a line of text on top
     var meme = getMeme();
    drawMeme(meme.selectedImgId);
    
}

function onSetFont(font) {
    setFont(font);
    renderMeme();
}

function setStrokeColor(elInputColor) {
    let meme = getMeme();
    meme.lines[meme.selectedLineIdx].strokeColor = elInputColor.value;
    renderMeme();
}

function setFillColor(elInputColor) {
    let meme = getMeme();
    meme.lines[meme.selectedLineIdx].fillColor = elInputColor.value;
    renderMeme();
}

function openGallery() {
    const elGallerySection = document.querySelector('.gallery');
    elGallerySection.hidden = false;
    const elEditorContainer = document.querySelector('.editor-section');
    elEditorContainer.hidden = true;
    const elSaved = document.querySelector('.saved-memes');
    elSaved.hidden = true;
}

function onUpdateFontSize(val) {
    setFontSize(val);
    renderMeme();
}

function onSwitchLines() {
    // console.log('switch lines func activated');
    setSelectedLineIdx();
    setSelectedLine();
    // console.log('meme line[meme.selectedLineIdx]', gMeme.lines[gMeme.selectedLineIdx].txt, 'meme.lines[currLineIdx].size', gMeme.lines[gMeme.selectedLineIdx].size);
    renderToEls();
    renderMeme();
}

function onAddLine() {
    addNewLine();
    setSelectedLine();
    renderToEls();
    renderMeme();
}

function onRemoveLine() {
    removeLine();
    setSelectedLine();
    renderToEls();
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

function onSaveMeme() {
    setSelectedToNull();
    drawMemeForSave('save');
    renderMeme();
}

function onDownloadMeme(el) {
    setSelectedToNull();
    drawMemeForSave('down');
    // gEl = el
    const data = gCanvas.toDataURL('image/jpeg');
    el.href = data;
    renderMeme();
}