import { utils } from '../utils.js';
//import { app } from './app.js';
//import { settings } from './settings.js';

class PhotoGallery {
  constructor() {
    this.getElements();
    this.initElements();
    this.initActions();
  }

  getElements = () => {
    this.dom = {
      galleryItem: document.getElementsByClassName("gallery-item"),
      lightBoxContainer: document.createElement("div"),
      lightBoxContent: document.createElement("div"),
      lightBoxImg: document.createElement("img"),
      lightBoxPrev: document.createElement("div"),
      lightBoxNext: document.createElement("div"),
    }
  }

  initElements = () => {
    this.dom.lightBoxContainer.classList.add("lightbox");
    this.dom.lightBoxContent.classList.add("lightbox-content");
    this.dom.lightBoxPrev.classList.add("fa", "fa-angle-left", "lightbox-prev");
    this.dom.lightBoxNext.classList.add("fa", "fa-angle-right", "lightbox-next");

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
    let imageLocation = this.dom.galleryItem[this.index-1].children[0].getAttribute("src");
    this.dom.lightBoxImg.setAttribute("src", imageLocation);
  }

  slideImage = n => {
    this.showLightBox(this.index += n);
  }

  currentImage = async (event, i) => {
    event.preventDefault();
    this.dom.lightBoxContainer.style.display = "block";
    let imageIndex = parseInt(this.dom.galleryItem[i].getAttribute("data-index"));
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
      this.dom.lightBoxContainer.style.display = "none";
    }
  }
}

export default PhotoGallery;
