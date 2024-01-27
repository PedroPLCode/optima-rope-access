import ContactShowAndHide from './components/ContactShowAndHide.js';
import ElementsShowAndHideMachine from './components/ElementsShowAndHideMachine.js';
import Carousel from './components/Carousel.js';
import PhotoGallery from './components/PhotoGallery.js';
import VerticalMouseDrivenCarousel from './components/VerticalMouseDrivenCarousel.js';
import LanguageChange from './components/LanguageChange.js';

export const app = {
  init: function() {
    this.contact = new ContactShowAndHide();
    this.elementsShowAndHideMachine = new ElementsShowAndHideMachine();
    this.mainMenuCarousel = new VerticalMouseDrivenCarousel();
    this.carousel = new Carousel();
    this.gallery = new PhotoGallery();
    this.languageChange = new LanguageChange();
  }
}

//cssScrollSnapPolyfill();

app.init();
