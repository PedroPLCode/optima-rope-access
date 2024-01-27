import { settings } from '../settings.js';
import { utils } from '../utils.js';
import { app } from '../app.js';

class ElementsShowAndHideMachine {
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
      sections: document.querySelectorAll(settings.selectors.section),
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
      for (let section of this.dom.sections) {
        if (utils.isInViewport(section)) {
          this.checkAndSetSectionsVisibility(section, settings.styles.noRotate, true)
          this.checkAndSetDivsVisibility(section, settings.styles.opacity1, true)
        } else {
          this.checkAndSetDivsVisibility(section, settings.styles.opacityLow, false)
          this.checkAndSetSectionsVisibility(section, settings.styles.fullRotate, false)
        }
      }
      this.checkAndSetContactBoxVisibility();
      this.checkAndSetNavigationVisibility();
      this.checkAndSetFooterVisibility();
      await utils.sleep(settings.variables.delayLong);
      this.navCanBeVisible ? null : this.navigationHide();
      await utils.sleep(settings.variables.delayLong);
      this.navCanBeVisible = true;
    });
  }

  checkAndSetSectionsVisibility = async (section, styleToChange, inVievport) => {
    await utils.sleep(inVievport ? settings.variables.delayLong : 0);
    section.classList.add(inVievport ? settings.classes.sectionShow : settings.classes.sectionHide)
  }

  checkAndSetDivsVisibility = async (section, styleToChange, inVievport) => {
    const divsIsThisSection = section.querySelectorAll(settings.selectors.allElementsInSection);
    for (let singleDiv of divsIsThisSection) {
      await utils.sleep(inVievport ? settings.variables.delayShort : 0);
      singleDiv.style.opacity = styleToChange;
    }
  }

  checkAndSetContactBoxVisibility = () => {
    for (let element of app.contact.dom.contactButtons) {
      app.contact.contactBoxHide(element);
    }
  }

  checkAndSetNavigationVisibility = () => {
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
    app.elementsShowAndHideMachine.dom.navigationCheckbox.checked = false;
  }

  checkAndSetFooterVisibility = () => {
    window.pageYOffset < 25 ? this.footerHide() : this.footerShow();
  }

  footerShow = () => {
    this.dom.footer.classList.add(settings.classes.footerShow);
  }

  footerHide = () => {
    this.dom.footer.classList.remove(settings.classes.footerShow);
  }
}

export default ElementsShowAndHideMachine;
