'use strict';

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
};

console.log(gMeme.lines[0].txt);

function demo() {
    console.log('service');
}

function getMeme() {
    return gMeme;
}


function renderMeme(); 