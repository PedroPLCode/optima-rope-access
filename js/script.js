const settings = {
  selectors: {
    navigation: '.navigation',
    footer: '.footer',
    contactButton: '.contact__btn',
    contactButtonText: '.contact__btn-text',
    contactBox: '.contact__box',
    closeButton: '.close__trigger',
    imagesBox: '.images',
    images: 'img',
  },
  classes: {
    boxActive: 'box__active',
    buttonActive: 'button__active',
    imageActive: 'image__active',
    navigationHide: 'navigation__hide',
    footerShow: 'footer__show',
  }
}

//const imagesBox = document.querySelector(settings.selectors.imagesBox);
const images = document.querySelectorAll(settings.selectors.images);

// CONTACT SHOW AND HIDE - OK
const contactButton = document.querySelectorAll(settings.selectors.contactButton);
const contactButtonText = document.querySelectorAll(settings.selectors.contactButtonText);
const contactBox = document.querySelector(settings.selectors.contactBox);
const closeButton = document.querySelector(settings.selectors.closeButton);
document.addEventListener( 'click', event => {
  for (let single of contactButton) {
    if (event.target == single) {
      event.preventDefault();
      single.classList.toggle(settings.classes.buttonActive);
      contactBox.classList.toggle(settings.classes.boxActive);
    } else if (event.target == closeButton) {
      single.classList.remove(settings.classes.buttonActive);
      contactBox.classList.remove(settings.classes.boxActive);
    }
  }
  for (let single of contactButtonText) {
    if (event.target == single) {
      event.preventDefault();
      single.classList.toggle(settings.classes.buttonActive);
      contactBox.classList.toggle(settings.classes.boxActive);
    } else if (event.target == closeButton) {
      single.classList.remove(settings.classes.buttonActive);
      contactBox.classList.remove(settings.classes.boxActive);
    }
  }


/*
  // IMAGES - TO DO !!!
  for (let image of images) {
    const imagesBoxRect = imagesBox.getBoundingClientRect();
    if (event.target == image) {
      //event.preventDefault();
      if (!image.classList.contains(settings.classes.imageActive)) {
        image.style.height = `${window.innerHeight / 1.5}px`;
        image.style.width = `auto`;
        image.style.top = `${window.top}`
        image.style.transform = `translateX(-${imagesBoxRect.width}px)`;
        image.classList.add(settings.classes.imageActive);
      } else {
        image.style.height = '100%';
        image.style.width = `100%`;
        image.style.transform = ``;
        image.classList.remove(settings.classes.imageActive);
      }

    } else if (event.target != image) {
      //event.preventDefault();
      image.classList.remove(settings.classes.imageActive);
    }
  } */
});

// NAVIGATION AND FOOTER HIDE - OK
const navigation = document.querySelector(settings.selectors.navigation);
const footer = document.querySelector(settings.selectors.footer);
let previousScrollPosition = 0;
let currentScrollPosition = 0;
  window.addEventListener('scroll', event => {
    event.preventDefault();

    for (let single of contactButton) {
      single.classList.remove(settings.classes.buttonActive);
    }
    contactBox.classList.remove(settings.classes.boxActive);

    for (let image of images) {
      if (image.classList.contains(settings.classes.imageActive)) {
        image.style.height = '100%';
        image.style.width = `100%`;
        image.style.transform = ``;
        image.classList.remove(settings.classes.imageActive);
      }
    }

    currentScrollPosition = window.pageYOffset;
    if (previousScrollPosition - currentScrollPosition < 0) {
      navigation.classList.add(settings.classes.navigationHide);
    } else {
      navigation.classList.remove(settings.classes.navigationHide);
    }
    previousScrollPosition = currentScrollPosition;
    if (window.pageYOffset < 25) {
      footer.classList.remove(settings.classes.footerShow);
    } else {
      footer.classList.add(settings.classes.footerShow);
    }
  });
