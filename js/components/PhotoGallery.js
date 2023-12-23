import { settings } from '../settings.js';
import { utils } from '../utils.js';

class PhotoGallery {
  constructor() {
    this.getElements();
    this.initElements();
    this.initActions();
  }

  getElements = () => {
    this.dom = {
      galleryItem: document.getElementsByClassName(settings.selectors.galleryItem),
      lightBoxContainer: document.createElement(settings.selectors.div),
      lightBoxContent: document.createElement(settings.selectors.div),
      lightBoxImg: document.createElement(settings.selectors.images),
      lightBoxPrev: document.createElement(settings.selectors.div),
      lightBoxNext: document.createElement(settings.selectors.div),
    }
  }

  initElements = () => {
    this.dom.lightBoxContainer.classList.add(settings.classes.lightbox);
    this.dom.lightBoxContent.classList.add(settings.classes.lightboxContent);
    this.dom.lightBoxPrev.classList.add(settings.classes.fa,
                                        settings.classes.faAngleLeft,
                                        settings.classes.lightboxPrev
                                        );
    this.dom.lightBoxNext.classList.add(settings.classes.fa,
                                        settings.classes.faAngleRight,
                                        settings.classes.lightboxNext
                                        );
    this.dom.lightBoxContainer.appendChild(this.dom.lightBoxContent);
    this.dom.lightBoxContent.appendChild(this.dom.lightBoxImg);
    this.dom.lightBoxContent.appendChild(this.dom.lightBoxPrev);
    this.dom.lightBoxContent.appendChild(this.dom.lightBoxNext);
    document.body.appendChild(this.dom.lightBoxContainer);
    this.index = 1;
  }

  initActions = async () => {
    this.dom.lightBoxPrev.addEventListener("click", this.prevImage);
    this.dom.lightBoxNext.addEventListener("click", this.nextImage);
    this.dom.lightBoxContainer.addEventListener("click", event => this.closeLightBox(event));
    for (let i = 0; i < this.dom.galleryItem.length; i++) {
      const indexClicked = i;
      this.dom.galleryItem[i].addEventListener("click", (event) => this.currentImage(event, indexClicked));
    }
  }

  showLightBox = n => {
    if (n > this.dom.galleryItem.length) {
      this.index = 1;
    } else if (n < 1) {
      this.index = this.dom.galleryItem.length;
    }
    let imageLocation = this.dom.galleryItem[this.index-1].children[0].getAttribute(settings.selectors.src);
    this.dom.lightBoxImg.setAttribute(settings.selectors.src, imageLocation);
  }

  slideImage = n => {
    this.showLightBox(this.index += n);
  }

  currentImage = async (event, i) => {
    event.preventDefault();
    this.dom.lightBoxContainer.style.display = settings.styles.displayBlock;
    let imageIndex = parseInt(this.dom.galleryItem[i].getAttribute(settings.selectors.dataIndex));
    this.showLightBox(this.index = imageIndex);
    utils.flashDown(this.dom.lightBoxImg);
    await utils.sleep(250);
    utils.flashUp(this.dom.lightBoxImg);
  }

  prevImage = async () => {
    utils.flashDown(this.dom.lightBoxImg);
    await utils.sleep(250);
    utils.flashUp(this.dom.lightBoxImg);
    this.slideImage(-1);
  }
  nextImage = async () => {
    utils.flashDown(this.dom.lightBoxImg);
    await utils.sleep(250);
    utils.flashUp(this.dom.lightBoxImg);
    this.slideImage(1);
  }

  closeLightBox = async event => {
    if (this.dom.lightBoxContainer === event.target) {
      utils.flashDown(this.dom.lightBoxImg);
      await utils.sleep(250);
      this.dom.lightBoxContainer.style.display = settings.styles.displayNone;
    }
  }
}

export default PhotoGallery;
