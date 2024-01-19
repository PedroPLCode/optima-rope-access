import { settings } from '../settings.js';
import { utils } from '../utils.js';

class LanguageChange {
  constructor() {
    this.isEnglish = false;
    this.getElements();
    this.initActions();
    this.setEnglish();
  }

  getElements = () => {
    this.dom = {
      langChangeTrigger: document.querySelector(settings.selectors.langChangeTrigger),
      elementsPolish: document.querySelectorAll(settings.selectors.langPolish),
      elementsEnglish: document.querySelectorAll(settings.selectors.langEnglish),
    }
  }

  initActions = () => {
    this.dom.langChangeTrigger.addEventListener('click', event => {
      event.preventDefault();
      const childrens =  this.dom.langChangeTrigger.children;
      if (event.target == childrens[0] || childrens[1]) {
        this.changeLanguage();
      }
    });
  }

  changeLanguage = () => {
    this.isEnglish ? this.setPolish() : this.setEnglish();
  }

  setEnglish = () => {
    this.hidePolish();
    this.showEnglish();
    this.changeHtmlLangAttribute(settings.atributes.en);
    this.isEnglish = true;
  }

  setPolish = () => {
    this.hideEnglish();
    this.showPolish();
    this.changeHtmlLangAttribute(settings.atributes.pl);
    this.isEnglish = false;
  }

  changeHtmlLangAttribute = lang => {
    document.documentElement.setAttribute(settings.atributes.lang, lang);
  }

  hidePolish = () => {
    for (let element of this.dom.elementsPolish) {
      this.hideElement(element);
    }
  }

  hideEnglish = () => {
    for (let element of this.dom.elementsEnglish) {
      this.hideElement(element);
    }
  }

  showPolish = () => {
    for (let element of this.dom.elementsPolish) {
      this.showElement(element);
    }
  }

  showEnglish = () => {
    for (let element of this.dom.elementsEnglish) {
      this.showElement(element);
    }
  }

  hideElement = async element => {
    element.style.opacity = settings.styles.opacity0;
    await utils.sleep(250);
    element.style.display = settings.styles.displayNone;
  }

  showElement = async element => {
    await utils.sleep(250);
    element.style.display = settings.styles.displayBlock;
    element.style.opacity = settings.styles.opacity1;
  }
}

export default LanguageChange;
