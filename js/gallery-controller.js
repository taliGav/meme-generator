 'use strict' 

 console.log('gallery controller');

 var gImgs = [{
    id: 1,
    url: './meme-imgs-square/1.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 2,
    url: './meme-imgs-square/2.jpg',
    keywords: ['funny', 'cat']
}];


function renderGallery(){

}

function onImgSelect(id) {
    setImg(id) ;
    renderMeme();
}
