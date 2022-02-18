'use strict';
console.log('meme editor service');

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 30,
            xLoc: 20,
            yLoc: 40,
            align: 'left',
            font: 'luckiest-guy',
            strokeColor: 'black',
            fillColor: 'white'
        },
        {
            txt: '',
            size: 22,
            xLoc: 40,
            yLoc: 60,
            align: 'left',
            font: 'luckiest-guy',
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

function drawMeme(id) {
    var img = new Image();
    const imgs = getImgs();
    img.src = imgs[id - 1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
        _drawTextLines();
    };
}

function _drawTextLines() {
    gMeme.lines.forEach(line => drawTextLine(gMeme.lines.indexOf(line)));
}

function _drawTextLine(currLine) {
    const text = gMeme.lines[currLine].txt;
    const x = gMeme.lines[currLine].xLoc;
    const y = gMeme.lines[currLine].yLoc;

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = gMeme.lines[currLine].strokeColor;
    gCtx.fillStyle = gMeme.lines[currLine].fillColor;
    gCtx.font = `${gMeme.lines[currLine].size}px ${gMeme.lines[currLine].font}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function setSelectedLine() {
    const currLineIdx = gMeme.selectedLineIdx;
    // console.log('currLine',currLine);
    var newLineIdx = currLineIdx + 1;
    // console.log('newLine',newLine);

    if (newLineIdx > gMeme.lines.length - 1) newLineIdx = 0;
    gMeme.selectedLineIdx = newLineIdx;
    console.log('updated line', gMeme.selectedLineIdx);
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

    updateInputText();
    renderMeme();
}

function updateInputText() {
    document.getElementById("text-input").value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function addNewLine() {
    const length = gMeme.lines.length;
    console.log('gMeme before add line', gMeme);

    var emptyLine = {
        txt: '',
        size: 22,
        xLoc: 10,
        yLoc: gMeme.lines[length - 1].yLoc + 20,
        align: 'left',
        font: 'luckiest-guy',
        strokeColor: 'black',
        fillColor: 'white'
    };

    gMeme.lines.push(emptyLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    console.log('gMeme after add line', gMeme);
}

function removeLine() {
    gMeme.lines.splice((gMeme.selectedLineIdx), 1);
    // console.log('gMeme after line removed' , gMeme);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then((url)=>{
        console.log('Got back live url:', url);
        onSuccess(url)
    })
    .catch((err) => {
        console.error(err)
    })
}



// gCtx.strokeText('Saving the context', 10, 50)
//   gCtx.save()

// gCtx.restore()