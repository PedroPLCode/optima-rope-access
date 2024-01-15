import { settings } from '../settings.js';
import { utils } from '../utils.js';
import { app } from '../app.js';

class NavAndFooterHide {
  constructor() {
    this.previousScrollPosition = 0;
    this.currentScrollPosition = 0;
    this.navCanBeVisible = true;
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
    window.addEventListener('click', event => {
      const navLinks = document.querySelectorAll(settings.selectors.navLinks);
      for (let singleNavLink of navLinks) {
        if (event.target == singleNavLink) {
          this.navCanBeVisible = false;
          this.navigationListWrap();
        }
    }
    });
    window.addEventListener('scroll', async event => {
      event.preventDefault();
      this.handleContactBoxVisibility();
      this.handleNavigationVisibility();
      this.handleFooterVisibility();
      await utils.sleep(settings.variables.delay);
      this.navCanBeVisible ? null : this.navigationHide();
      await utils.sleep(settings.variables.delay);
      this.navCanBeVisible = true;
    });
  }

  handleContactBoxVisibility = () => {
    for (let element of app.contact.dom.contactButtons) {
      app.contact.contactBoxHide(element);
    }
  }

  handleNavigationVisibility = () => {
    this.currentScrollPosition = window.pageYOffset;
    this.previousScrollPosition - this.currentScrollPosition > 0 ? this.navigationShow() : this.navigationHide();
    this.previousScrollPosition - this.currentScrollPosition > 0 ? this.navigationListWrap() : null ;
    this.previousScrollPosition = this.currentScrollPosition;
  }

  navigationShow = () => {
    this.navCanBeVisible ? this.dom.navigation.classList.remove(settings.classes.navigationHide): null;
  }

  navigationHide = () => {
    this.dom.navigation.classList.add(settings.classes.navigationHide);
    this.navigationListWrap();
  }

  navigationListWrap = () => {
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

