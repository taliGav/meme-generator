'use strict';

console.log('gallery controller');

// const IMGS_STORAGE_KEY = 'imgsDB';
// var gImgIdx = 1;
var gImgs = [{
    id: 1,
    url: './meme-imgs-square/1.jpg',
    keywords: ['funny', 'trump', 'nerves']
},
{
    id: 2,
    url: './meme-imgs-square/2.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 3,
    url: './meme-imgs-square/3.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 4,
    url: './meme-imgs-square/4.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 5,
    url: './meme-imgs-square/5.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 6,
    url: './meme-imgs-square/6.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 7,
    url: './meme-imgs-square/7.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 8,
    url: './meme-imgs-square/8.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 9,
    url: './meme-imgs-square/9.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 10,
    url: './meme-imgs-square/10.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 11,
    url: './meme-imgs-square/11.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 12,
    url: './meme-imgs-square/12.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 13,
    url: './meme-imgs-square/13.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 14,
    url: './meme-imgs-square/14.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 15,
    url: './meme-imgs-square/15.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 16,
    url: './meme-imgs-square/16.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 17,
    url: './meme-imgs-square/17.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
},
{
    id: 18,
    url: './meme-imgs-square/18.jpg',
    keywords: ['funny', 'puppy', 'dog', 'cute', 'love']
}
];

// function _createImgs() {
//     gImgs = loadFromStorage(IMGS_STORAGE_KEY);
//     if (!gImgs || !gImgs.length) {
//         gImgs = [
//             _createImg()
//         ];
//         _saveImgsToStorage();
//     }
// }

// function _saveImgsToStorage() {
//     saveToStorage(IMGS_STORAGE_KEY, gImgs);
// }

// function _createImg(keywords) {
//     return {
//         id: gImgIdx++,
//         url: `./meme-imgs-square/${gImgIdx}.jpg`,
//         keywords
//     };
// }

function onInit() {
    // _createImgs();
    renderGallery();
}

function toggleMenu(){
    document.body.classList.toggle('menu-open')
}

function getImgs() {
    return gImgs;
}

function renderGallery() {
    const imgs = getImgs();
    var strHtml = imgs.map(img => {
        return `
        <img class="img img${img.id}" id="${img.id}" src="${img.url}" onclick="onImgSelect(this.id)" alt="">`;
    });
    document.querySelector('.gallery-container').innerHTML = strHtml.join('');
}

function onImgSelect(id) {
    setImg(id);
    openMemeEditor();
}




//// random color
// var randomColor = Math.floor(Math.random()*16777215).toString(16);
// color.innerHTML = "#" + randomColor;
