'use strict';
console.log('meme editor service');

var gSelectedLine;

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'example1',
            size: 30,
            pos: { x: 20, y: 50 },
            align: 'left',
            font: 'Impact',
            strokeColor: 'black',
            fillColor: 'white',
            isDragged: false
        },
        {
            txt: 'example2',
            size: 25,
            pos: { x: 20, y: 350 },
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

///// OPEN MEME EDITOR - BY CLICKING ON GALLERY IMG ////

function openMemeEditor() {
    const elGallerySection = document.querySelector('.gallery');
    elGallerySection.hidden = true;
    console.log('on open meme editor');
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');

    const elEditorContainer = document.querySelector('.editor-section');
    elEditorContainer.hidden = false;

    updateInputText();
    setSelectedLine();
    addListeners();
    renderMeme();
}


///// RENDER MEME /////

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
        // _focusOnSelectedLine();
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

// function _focusOnSelectedLine() {
//     const currSelectedLine = gMeme.lines[gMeme.selectedLineIdx];
//     const { txt } = currSelectedLine;
//     var textWidth = gCtx.measureText(txt).width;
//     var boundingHeight = gCtx.measureText(txt).fontBoundingBoxAscent;
//     var x = currSelectedLine.pos.x - 5;
//     var y = currSelectedLine.pos.y + 5;

//     console.log(gCtx.measureText(txt));
//     console.log('textWidth', textWidth);
//     console.log('boundingHeight', boundingHeight);
//     console.log('x', x);
//     console.log('y', y);

//     gCtx.strokeStyle = 'white';
//     gCtx.linewidth = 2;
//     gCtx.strokeRect(x, y, textWidth + 15, -boundingHeight - 10);
// }


/// SELECTED LINE IDX  /////

function setSelectedLineIdx() {
    const currLineIdx = gMeme.selectedLineIdx;
    // console.log('currLine',currLine);
    var newLineIdx = currLineIdx + 1;
    // console.log('newLine',newLine);

    if (newLineIdx > gMeme.lines.length - 1) newLineIdx = 0;
    gMeme.selectedLineIdx = newLineIdx;
    console.log('updated line', gMeme.selectedLineIdx);
}



///  UPDATE TEXT IN ARR ITEM BY INPUT  /////

function setLineTxt(el) {
    // console.log('el.value',el.value);
    gMeme.lines[gMeme.selectedLineIdx].txt = el.value;
    renderMeme();
}

///  ADD AND REMOVE LINES FROM MEME  /////

function addNewLine() {
    const length = gMeme.lines.length;
    console.log('gMeme before add line', gMeme);

    var emptyLine = {
        txt: '',
        size: 25,
        pos: { x: 20, y: length* 50 },
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

///  UPDATE TEXT ON INPUT BY AN ARR ITEM  /////

function updateInputText() {
    document.getElementById("text-input").value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

/// SET FONT and FONT SIZE ////

function setFont(font) {
    const currLineIdx = gMeme.selectedLineIdx;
    switch (font) {
        case 'Impact':
            gMeme.lines[currLineIdx].font = 'Impact';
            renderMeme();
            break;
        case 'lobster':
            gMeme.lines[currLineIdx].font = 'lobster';
            renderMeme();
            break;
        case 'titan':
            gMeme.lines[currLineIdx].font = 'titan';
            renderMeme();
            break;
        case 'luckiest-guy':
            gMeme.lines[currLineIdx].font = 'luckiest-guy';
            renderMeme();
            break;
        case 'alfa':
            gMeme.lines[currLineIdx].font = 'alfa';
            renderMeme();
            break;
        case 'bowlby':
            gMeme.lines[currLineIdx].font = 'bowlby';
            renderMeme();
            break;
        case 'suez-heb':
            gMeme.lines[currLineIdx].font = 'suez-heb';
            renderMeme();
            break;
    }
}

function setFontSize(val) {
    const currLineIdx = gMeme.selectedLineIdx;
    var currFontSize = gMeme.lines[currLineIdx].size;

    switch (val) {
        case '+':
            gMeme.lines[currLineIdx].size = currFontSize + 1;
            // renderMeme();
            break;
        case '-':
            gMeme.lines[currLineIdx].size = currFontSize - 1;
            // renderMeme();
            break;
    }
    console.log('gMeme.lines[currLineIdx].size', gMeme.lines[currLineIdx].size);
}

///  INHERIT FUNC USED ON SHARE MEME TO FB  /////

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    console.log('formData', formData);
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






///  DRAG AND DROP FUNCS  /////

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

function setSelectedLine() {
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx];
}

function getSelectedLine() {
    return gSelectedLine;
}

function isSelectedLineClicked(clickedPos) {
    const { pos } = gSelectedLine;
    console.log(pos);
    const { txt } = gSelectedLine;

    console.log(txt);

    var textMeasure = gCtx.measureText(txt);
    console.log('textMeasure', textMeasure);
    var textWidth = gCtx.measureText(txt).width;
    console.log('textWidth', textWidth);

    const distance = Math.sqrt((pos.x + textWidth - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2);
    return distance <= gSelectedLine.size;
}

function setSelectedLineDrag(isDragged) {
    gSelectedLine.isDragged = isDragged;
}

function moveSelectedLine(dx, dy) {
    gSelectedLine.pos.x += dx;
    gSelectedLine.pos.y += dy;
}
