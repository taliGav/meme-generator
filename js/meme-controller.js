'use strict';

console.log('meme controller');




var gCanvas;
var gCtx;
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];


function onInit() {
    console.log('on init');
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');

}


function renderMeme() {
    // renders an image on the canvas and a line of text on top
    var meme = getMeme();
    var img = getImgForDisp(imgId);
    drawMeme();
}

function drawMeme() {
    var img = new Image();
    img.src = './meme-imgs-square/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
        drawTextLine(gMeme.lines[0].txt, gMeme.lines[0].xLoc, gMeme.lines[0].yLoc,gMeme.lines[0].color)
    };
}

function drawTextLine(text, x, y,fillColor) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'brown';
    gCtx.fillStyle = fillColor;
    gCtx.font = '20px Arial';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}



function getImgForDisp(imgId) {

}
