import { utils } from './utils.js';

const img = document.getElementById('carousel');

// Images are from unsplash
let pictures = ['../images/background1.jpg', '../images/background2.jpg', '../images/background3.jpg'];

img.src = pictures[0];
let position = 0;

const moveRight = async () => {
    if (position >= pictures.length - 1) {
        position = 0
        utils.flashDown(img);
        await utils.sleep(250);
        utils.flashUp(img);
        img.src = pictures[position];
        return;
    }
    utils.flashDown(img);
    await utils.sleep(250);
    utils.flashUp(img);
    img.src = pictures[position + 1];

    position++;
}

for (;;) {
  await utils.sleep(5000);
  moveRight();
}
