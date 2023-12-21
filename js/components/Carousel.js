import { utils } from '../utils.js';
import { settings } from '../settings.js';

class Carousel {
  constructor() {
    this.getElements();
    this.initActions();
  }

  getElements = () => {
    this.dom = {
      img: document.getElementById('carousel'),
      footer: document.querySelector(settings.selectors.footer),
    }
  }

  initActions = async () => {
    this.pictures = ['../../images/about/about1.jpg', '../../images/about/about2.jpg', '../../images/about/about3.jpg', '../../images/about/about4.jpg'];
    this.position = 0;
    this.dom.img.src =  this.pictures[0];
    for (;;) {
      await utils.sleep(5000);
      this.moveRight();
    }
  }

  moveRight = async () => {
    if (this.position >= this.pictures.length - 1) {
      this.position = 0
        utils.flashDown(this.dom.img);
        await utils.sleep(250);
        utils.flashUp(this.dom.img);
        this.dom.img.src = this.pictures[this.position];
        return;
    }
    utils.flashDown(this.dom.img);
    await utils.sleep(250);
    utils.flashUp(this.dom.img);
    this.dom.img.src = this.pictures[this.position + 1];

    this.position++;
  }
}

export default Carousel;
