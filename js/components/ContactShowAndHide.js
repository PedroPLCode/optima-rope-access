import settings from '../settings.js';

class ContactShowAndHide {
  constructor() {
    this.getElements();
    this.initActions();
  }

  getElements = () => {
    this.dom = {
      contactButtons: document.querySelectorAll(settings.selectors.contactButton),
      contactButtonsTexts: document.querySelectorAll(settings.selectors.contactButtonText),
      contactBox: document.querySelector(settings.selectors.contactBox),
      closeButton: document.querySelector(settings.selectors.closeButton),
    }
  }

  initActions = () => {
    document.addEventListener('click', event => {
      this.handleClick(event, this.dom.contactButtons);
      this.handleClick(event, this.dom.contactButtonsTexts);
    });
  }

  handleClick = (event, elements) => {
    for (let element of elements) {
      this.handleElementClick(event, element);
    }
  }

  handleElementClick = (event, element) => {
    if (event.target == element) {
      event.preventDefault();
      this.contactBoxToggle(element);
    } else if (event.target == this.dom.closeButton) {
      this.contactBoxHide(element);
    }
  }

  contactBoxToggle = element => {
    element.classList.toggle(settings.classes.buttonActive);
    this.dom.contactBox.classList.toggle(settings.classes.boxActive);
  }

  contactBoxHide = element => {
    element.classList.remove(settings.classes.buttonActive);
    this.dom.contactBox.classList.remove(settings.classes.boxActive);
  }
}

export default ContactShowAndHide;
