import { settings } from '../settings.js';
import { app } from '../app.js';

class NavAndFooterHide {
  constructor() {
    this.previousScrollPosition = 0;
    this.currentScrollPosition = 0;
    this.getElements();
    this.initActions();
  }

  getElements = () => {
    this.dom = {
      navigation: document.querySelector(settings.selectors.navigation),
      footer: document.querySelector(settings.selectors.footer),
    }
  }

  initActions = () => {
    window.addEventListener('scroll', event => {
      event.preventDefault();

      for (let single of app.contact.dom.contactButton) {
        single.classList.remove(settings.classes.buttonActive);
      }
      app.contact.dom.contactBox.classList.remove(settings.classes.boxActive);
  /*
      for (let image of images) {
        if (image.classList.contains(settings.classes.imageActive)) {
          image.style.height = '100%';
          image.style.width = `100%`;
          image.style.transform = ``;
          image.classList.remove(settings.classes.imageActive);
        }
      }
      */

      this.currentScrollPosition = window.pageYOffset;
      if (this.previousScrollPosition - this.currentScrollPosition < 0) {
        this.dom.navigation.classList.add(settings.classes.navigationHide);
      } else {
        this.dom.navigation.classList.remove(settings.classes.navigationHide);
      }
      this.previousScrollPosition = this.currentScrollPosition;
      if (window.pageYOffset < 25) {
        this.dom.footer.classList.remove(settings.classes.footerShow);
      } else {
        this.dom.footer.classList.add(settings.classes.footerShow);
      }
    });
  }
}

export default NavAndFooterHide;

