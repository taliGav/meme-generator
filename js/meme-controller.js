'use strict';

console.log('meme editor controller');

var gCanvas;
var gCtx;
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };
var gImgs = [{
    id: 1,
    url: './meme-imgs-square/1.jpg',
    keywords: ['funny', 'cat']
}];


function onInit() {
    console.log('on init');
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

function drawMeme() {
    var img = new Image();
    img.src = gImgs[0].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
        drawTextLine(gMeme.lines[0].txt, gMeme.lines[0].xLoc, gMeme.lines[0].yLoc, gMeme.lines[0].color);
    };
}

function drawTextLine(text, x, y, fillColor) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'brown';
    gCtx.fillStyle = fillColor;
    gCtx.font = '20px Arial';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function setMemeImg(id) {
    gMeme.selectedImgId = id;
    console.log(gMeme);
}


function demo() {
    console.log('canvas on click demo');
}
