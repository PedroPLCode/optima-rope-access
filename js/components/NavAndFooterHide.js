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
      navigationCheckbox: document.getElementById(settings.selectors.navigationCheckbox),
      footer: document.querySelector(settings.selectors.footer),
    }
  }

  initActions = () => {
    window.addEventListener('scroll', event => {
      event.preventDefault();
      this.handleContactBoxVisibility(); // MA SIĘ CHOWAĆ CZY NIE???
      this.handleNavigationVisibility();
      this.handleFooterVisibility();
    });
  }

  handleContactBoxVisibility = () => {
    for (let element of app.contact.dom.contactButtons) {
      app.contact.contactBoxHide(element);
    }
  }

  handleNavigationVisibility = () => {
    this.currentScrollPosition = window.pageYOffset;
    this.previousScrollPosition - this.currentScrollPosition < 0 ? this.navigationHide(): this.navigationShow();
    this.previousScrollPosition = this.currentScrollPosition;
  }

  navigationShow = () => {
    this.dom.navigation.classList.remove(settings.classes.navigationHide);
  }

  navigationHide = () => {
    this.dom.navigation.classList.add(settings.classes.navigationHide);
    app.navFooterHide.dom.navigationCheckbox.checked = false;
  }

  handleFooterVisibility = () => {
    window.pageYOffset < 25 ? this.footerHide() : this.footerShow();
  }

  footerShow = () => {
    this.dom.footer.classList.add(settings.classes.footerShow);
  }

  footerHide = () => {
    this.dom.footer.classList.remove(settings.classes.footerShow);
  }
}

export default NavAndFooterHide;

