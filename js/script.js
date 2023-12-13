const settings = {
  selectors: {
    contactButton: '.contact__btn',
    contactBox: '.contact__box',
    imagesBox: '.images',
    image: 'img',
  },
  classes: {
    boxActive: 'box__active',
    buttonActive: 'button__active',
    imageActive: 'image__active',
  }
}

const contactButton = document.querySelector(settings.selectors.contactButton);
const contactBox = document.querySelector(settings.selectors.contactBox);

const imagesBox = document.querySelector(settings.selectors.imagesBox);
const images = document.querySelectorAll(settings.selectors.image);

document.addEventListener( 'click', event => {
  if (event.target == contactButton) {
    event.preventDefault();
    contactButton.classList.toggle(settings.classes.buttonActive);
    contactBox.classList.toggle(settings.classes.boxActive);
  } /* else if (event.target != contactBox && event.target != contactBox.children) {
    contactButton.classList.remove(settings.classes.buttonActive);
    contactBox.classList.remove(settings.classes.boxActive);
  } */
  for (let singleImage of images) {
    const imagesBoxRect = imagesBox.getBoundingClientRect();
    if (event.target == singleImage) {
      //event.preventDefault();
      if (!singleImage.classList.contains(settings.classes.imageActive)) {
        singleImage.style.height = `${window.innerHeight / 1.5}px`;
        singleImage.style.width = `auto`;
        singleImage.style.top = `${window.top}`
        singleImage.style.transform = `translateX(-${imagesBoxRect.width}px)`;
        singleImage.classList.add(settings.classes.imageActive);
      } else {
        singleImage.style.height = '100%';
        singleImage.style.width = `100%`;
        singleImage.style.transform = ``;
        singleImage.classList.remove(settings.classes.imageActive);
      }

    } else if (event.target != singleImage) {
      //event.preventDefault();
      singleImage.classList.remove(settings.classes.imageActive);
    }
  }
});



