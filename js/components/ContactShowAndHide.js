import settings from '../settings.js';

class ContactShowAndHide {
  constructor() {
    this.getElements();
    this.initActions();
  }

  getElements = () => {
    this.dom = {
      contactButton: document.querySelectorAll(settings.selectors.contactButton),
      contactButtonText: document.querySelectorAll(settings.selectors.contactButtonText),
      contactBox: document.querySelector(settings.selectors.contactBox),
      closeButton: document.querySelector(settings.selectors.closeButton),
    }
  }

  initActions = () => {
    document.addEventListener( 'click', event => {
      for (let singleElement of this.dom.contactButton) {
        if (event.target == singleElement) {
          singleElement.preventDefault();
          singleElement.classList.toggle(settings.classes.buttonActive);
          this.dom.contactBox.classList.toggle(settings.classes.boxActive);
        } else if (event.target == this.dom.closeButton) {
          singleElement.classList.remove(settings.classes.buttonActive);
          this.dom.contactBox.classList.remove(settings.classes.boxActive);
        }
      }
      for (let singleElement of this.dom.contactButtonText) {
        if (event.target == singleElement) {
          event.preventDefault();
          singleElement.classList.toggle(settings.classes.buttonActive);
          this.dom.contactBox.classList.toggle(settings.classes.boxActive);
        } else if (event.target == this.dom.closeButton) {
          singleElement.classList.remove(settings.classes.buttonActive);
          this.dom.contactBox.classList.remove(settings.classes.boxActive);
        }
      }
    });
  }
}

export default ContactShowAndHide;
