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
      navigationCheckbox: document.getElementById("menu-toggle"),
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

      this.currentScrollPosition = window.pageYOffset;
      if (this.previousScrollPosition - this.currentScrollPosition < 0) {
        this.dom.navigation.classList.add(settings.classes.navigationHide);
        app.navFooterHide.dom.navigationCheckbox.checked = false;
      } else {
        this.dom.navigation.classList.remove(settings.classes.navigationHide);
        //app.navFooterHide.dom.navigationCheckbox.checked = false;
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

