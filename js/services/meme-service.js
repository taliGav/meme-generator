'use strict';
console.log('meme editor service');

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            xLoc:15,
            yLoc:30,
            align: 'left',
            color: 'red'
        }
    ]
};

console.log('meme line[0]',gMeme.lines[0].txt);


function getMeme() {
    return gMeme;
}