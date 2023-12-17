import { utils } from './utils.js';

const galleryItem = document.getElementsByClassName("gallery-item");
const lightBoxContainer = document.createElement("div");
const lightBoxContent = document.createElement("div");
const lightBoxImg = document.createElement("img");
const lightBoxPrev = document.createElement("div");
const lightBoxNext = document.createElement("div");

lightBoxContainer.classList.add("lightbox");
lightBoxContent.classList.add("lightbox-content");
lightBoxPrev.classList.add("fa", "fa-angle-left", "lightbox-prev");
lightBoxNext.classList.add("fa", "fa-angle-right", "lightbox-next");

lightBoxContainer.appendChild(lightBoxContent);
lightBoxContent.appendChild(lightBoxImg);
lightBoxContent.appendChild(lightBoxPrev);
lightBoxContent.appendChild(lightBoxNext);

document.body.appendChild(lightBoxContainer);

let index = 1;

function showLightBox(n) {
    if (n > galleryItem.length) {
        index = 1;
    } else if (n < 1) {
        index = galleryItem.length;
    }
    let imageLocation = galleryItem[index-1].children[0].getAttribute("src");
    lightBoxImg.setAttribute("src", imageLocation);
}

async function currentImage() {
    lightBoxContainer.style.display = "block";

    let imageIndex = parseInt(this.getAttribute("data-index"));
    showLightBox(index = imageIndex);
    utils.flashDown(lightBoxImg);
    await utils.sleep(250);
    utils.flashUp(lightBoxImg);
}
for (let i = 0; i < galleryItem.length; i++) {
    galleryItem[i].addEventListener("click", currentImage);
}

function slideImage(n) {
    showLightBox(index += n);
}
async function prevImage() {
  utils.flashDown(lightBoxImg);
  await utils.sleep(250);
  utils.flashUp(lightBoxImg);
  slideImage(-1);
}
async function nextImage() {
  utils.flashDown(lightBoxImg);
  await utils.sleep(250);
  utils.flashUp(lightBoxImg);
  slideImage(1);
}

lightBoxPrev.addEventListener("click", prevImage);
lightBoxNext.addEventListener("click", nextImage);

async function closeLightBox() {
    if (this === event.target) {
      utils.flashDown(lightBoxImg);
      await utils.sleep(250);
      lightBoxContainer.style.display = "none";
    }
}
lightBoxContainer.addEventListener("click", closeLightBox);
