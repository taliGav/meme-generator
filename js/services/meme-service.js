'use strict';
console.log('meme editor service');

var gSelectedLine;
var gTemp;

var gCanvas;
var gCtx;
gCanvas = document.getElementById('meme-canvas');
gCtx = gCanvas.getContext('2d');


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 1,
    lines: [
        {
            txt: 'example1',
            size: 25,
            pos: { x: 20, y: 50 },
            align: 'left',
            font: 'Impact',
            strokeColor: 'black',
            fillColor: 'white',
            isDragged: false,
            // textWidth: gCtx.measureText(gMeme.lines[0].txt).width
        },
        {
            txt: 'example2',
            size: 25,
            pos: { x: 20, y: 350 },
            align: 'left',
            font: 'Impact',
            strokeColor: 'black',
            fillColor: 'white',
            isDragged: false,
            // textWidth: gCtx.measureText(gMeme.lines[1].txt).width
        }
    ]
};

// console.log(gMeme.lines[0].textWidth)

function getMeme() {
    return gMeme;
}

///// OPEN MEME EDITOR - BY CLICKING ON GALLERY IMG ////

function openMemeEditor() {
    const elGallerySection = document.querySelector('.gallery');
    elGallerySection.hidden = true;
    console.log('on open meme editor');

    const elEditorContainer = document.querySelector('.editor-section');
    elEditorContainer.hidden = false;

    renderToEls();
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
    img.src = imgs[+id - 1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
        _drawTextLines();
    };
}

function drawMemeForSave(val) {
    console.log('bye');
    var img = new Image();
    const imgs = getImgs();
    img.src = imgs[gMeme.selectedImgId - 1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
        setSelectedToNull();
        _drawTextLines();
        saveMeme();
        if (val === 'save') restoreSelected();
    };
}


// function downloadMeme() {
//     const data = gCanvas.toDataURL('image/jpeg');
//     gEl.href = data;
// }

function saveMeme() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");
    gSavedMemes.push(imgDataUrl);
    _saveMemesToStorage();
}

function setSelectedToNull() {
    gTemp = gMeme.selectedLineIdx;
    gMeme.selectedLineIdx = null;
}

function restoreSelected() {
    gMeme.selectedLineIdx = gTemp;
}

function _drawTextLines() {
    gMeme.lines.forEach(line => _drawTextLine(gMeme.lines.indexOf(line)));
}

function _drawTextLine(lineIdx) {
    let text = gMeme.lines[lineIdx].txt;
    let x = gMeme.lines[lineIdx].pos.x;
    let y = gMeme.lines[lineIdx].pos.y;

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = gMeme.lines[lineIdx].strokeColor;
    gCtx.fillStyle = gMeme.lines[lineIdx].fillColor;
    gCtx.font = `${gMeme.lines[lineIdx].size}px ${gMeme.lines[lineIdx].font}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
    if (lineIdx === gMeme.selectedLineIdx) _focusOnSelectedLine();
}

function _focusOnSelectedLine() {
    var currSelectedLine = gMeme.lines[gMeme.selectedLineIdx];
    var { txt, size } = currSelectedLine;

    var x = currSelectedLine.pos.x - 10;
    var y = currSelectedLine.pos.y + 10;

    let textWidth = gCtx.measureText(txt).width;

    gCtx.strokeStyle = 'yellow';
    gCtx.linewidth = 2;
    gCtx.strokeRect(x, y, textWidth + 20, -(size + 10));
}


/// SELECTED LINE IDX  /////

function setSelectedLineIdx() {
    let currLineIdx = gMeme.selectedLineIdx;
    // console.log('currLine',currLine);
    let newLineIdx = currLineIdx + 1;
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
        pos: { x: 20, y: length * 50 },
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

///  UPDATE TEXT & FONT ON INPUT BY AN ARR ITEM PLUS RENDER  /////

function _updateInputText() {
    document.getElementById("text-input").value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function _updateSelectFont() {
    document.querySelector('.form-select').value = gMeme.lines[gMeme.selectedLineIdx].font;
}

function renderToEls() {
    _updateInputText();
    _updateSelectFont();
}


/// SET FONT and FONT SIZE ////

function setFont(font) {
    let currLineIdx = gMeme.selectedLineIdx;
    gMeme.lines[currLineIdx].font = font;
    // renderMeme();
}

function setFontSize(val) {
    let currLineIdx = gMeme.selectedLineIdx;
    var currFontSize = gMeme.lines[currLineIdx].size;
    // console.log('currFontSize', currFontSize);
    gMeme.lines[currLineIdx].size = val === '+' ? currFontSize + 1 : currFontSize - 1;
    // switch (val) {
    //     case '+':
    //         gMeme.lines[currLineIdx].size = currFontSize + 1;
    //         // renderMeme();
    //         break;
    //     case '-':
    //         gMeme.lines[currLineIdx].size = currFontSize - 1;
    //         // renderMeme();
    //         break;
    // }
    // console.log('gMeme.lines[currLineIdx].size', gMeme.lines[currLineIdx].size);
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
    // gMeme.lines.forEach(line => { 
        if (!isSelectedLineClicked(pos)) return;
        setSelectedLineDrag(true);
        gStartPos = pos;
        console.log('gStartPos', gStartPos);
        document.body.style.cursor = 'grabbing';
    // });
}

function onMove(ev) {
    console.log('onMove()');
    gMeme.lines.forEach(line => {
        // const line = getSelectedLine();
        if (line.isDragged) {
            const pos = getEvPos(ev);
            const dx = pos.x - gStartPos.x;
            const dy = pos.y - gStartPos.y;
            moveSelectedLine(dx, dy);
            gStartPos = pos;
            renderMeme();
        };
    });
}

function onUp() {
    console.log('onUp()');
    gMeme.lines.forEach(line => line.isDragged = false);
    document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    };
    console.log('pos click', pos);
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
    console.log('selectedLineIdx', gMeme.selectedLineIdx);
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx];
}

function getSelectedLine() {
    return gSelectedLine;
}

function isSelectedLineClicked(clickedPos) {
    let { pos, txt } = gSelectedLine;
    var textMeasure = gCtx.measureText(txt);
    var boundingHeight = gCtx.measureText(txt).fontBoundingBoxAscent;
    var textWidth = gCtx.measureText(txt).width;

    const distance = Math.sqrt((pos.x + textWidth - clickedPos.x) ** 2 + (pos.y + boundingHeight - clickedPos.y) ** 2);
    const maxDistance = Math.sqrt(textWidth ** 2 + boundingHeight ** 2);
    return distance <= maxDistance / 2;
}

function setSelectedLineDrag(isDragged) {
    gSelectedLine.isDragged = isDragged;
}

function moveSelectedLine(dx, dy) {
    gSelectedLine.pos.x += dx;
    gSelectedLine.pos.y += dy;
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }






// if line clicked

function lineClicked(ev) {

    var textWidth = gCtx.measureText(txt).width;
    var boundingHeight = gCtx.measureText(txt).fontBoundingBoxAscent;
    var x = currSelectedLine.pos.x - 10;
    var y = currSelectedLine.pos.y + 10;


    const clickedLine = gMeme.lines.find(line =>
        ev.offsetX >= line.pos.x && ev.offsetX <= line.x + textWidth &&
        ev.offsetY >= line.pos.y && ev.offsetY <= line.y + line.size
    );
    console.log(clickedLine);
    // TODO: find out if clicked a star bar
    // ev.offsetX >= star.x && ev.offsetX <= star.x + gBarWidth &&
    // ev.offsetY >= star.y && ev.offsetY <= star.y + star.rate


    if (clickedLine) openModal(clickedStar.name, clickedStar.rate, ev.clientX, ev.clientY);
    else closeModal();
};