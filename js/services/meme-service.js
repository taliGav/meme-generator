'use strict';
console.log('meme editor service');

var gSelectedLine;

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'ex1',
            size: 30,
            pos: { x: 20, y: 40 },
            align: 'left',
            font: 'Impact',
            strokeColor: 'black',
            fillColor: 'white',
            isDragged: false
        },
        {
            txt: 'ex2',
            size: 25,
            pos: { x: 20, y: 60 },
            align: 'left',
            font: 'Impact',
            strokeColor: 'black',
            fillColor: 'white',
            isDragged: false
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
    gMeme.lines.forEach(line => _drawTextLine(gMeme.lines.indexOf(line)));
}

function _drawTextLine(currLine) {
    const text = gMeme.lines[currLine].txt;
    const x = gMeme.lines[currLine].pos.x;
    const y = gMeme.lines[currLine].pos.y;

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = gMeme.lines[currLine].strokeColor;
    gCtx.fillStyle = gMeme.lines[currLine].fillColor;
    gCtx.font = `${gMeme.lines[currLine].size}px ${gMeme.lines[currLine].font}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function setSelectedLineIdx() {
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
    setSelectedLine();
    addListeners();
    renderMeme();
}


function onUp() {
    console.log('onUp()');
    setSelectedLineDrag(false);
    document.body.style.cursor = 'grab';
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
        pos: { x: 20, y: gMeme.lines[length - 1].pos.y + 20 },
        align: 'left',
        font: 'Impact',
        strokeColor: 'black',
        fillColor: 'white',
        isDragged: false
    };

    gMeme.lines.push(emptyLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    console.log('gMeme after add line', gMeme);
}

function removeLine() {
    if (gMeme.lines.length === 1) {
        gMeme.lines[0].txt = '';
        return;
    };
    gMeme.lines.splice((gMeme.selectedLineIdx), 1);
    // console.log('gMeme after line removed', gMeme);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    // console.log('gMeme after line removed + selected line update', gMeme);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl);

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url);
        })
        .catch((err) => {
            console.error(err);
        });
}



// gCtx.strokeText('Saving the context', 10, 50)
//   gCtx.save()

// gCtx.restore()








function addListeners() {
    addMouseListeners();
    addTouchListeners();
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove);
    gCanvas.addEventListener('mousedown', onDown);
    gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove);
    gCanvas.addEventListener('touchstart', onDown);
    gCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    console.log('onDown()');
    if (!isSelectedLineClicked(pos)) return;
    setSelectedLineDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';

}

function onMove(ev) {
    console.log('onMove()');
    const line = getSelectedLine();
    if (line.isDragged) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        moveCircle(dx, dy);
        gStartPos = pos;
        renderCanvas();
    }
}

function onUp() {
    console.log('onUp()');
    setSelectedLineDrag(false);
    document.body.style.cursor = 'grab';
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    };
    console.log();
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        };
    }
    return pos;
}

function drawArc(x, y, size = 60, color = 'blue') {
    gCtx.beginPath();
    gCtx.lineWidth = '6';
    gCtx.arc(x, y, size, 0, 2 * Math.PI);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
    gCtx.fillStyle = color;
    gCtx.fill();
}




function setSelectedLine() {
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx];
}

function getSelectedLine() {
    return gSelectedLine;
}

function isSelectedLineClicked(clickedPos) {
    const { pos } = gSelectedLine;
    console.log(pos);
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2);
    return distance <= gSelectedLine.size;
}


function setSelectedLineDrag(isDragged) {
    gSelectedLine.isDragged = isDragged;
}

function moveSelectedLine(dx, dy) {
    gSelectedLine.pos.x += dx;
    gSelectedLine.pos.y += dy;
}
