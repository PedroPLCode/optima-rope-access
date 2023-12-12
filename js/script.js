const settings = {
  selectors: {
    menuButton: '.menu__btn',
    menuBox: '.menu__box',
    menuItem: '.menu__item',
  },
  classes: {
    active: 'active',
  }
}

const menuButton = document.querySelector(settings.selectors.menuButton);
const menuBox = document.querySelector(settings.selectors.menuBox);
const navLinks = document.querySelectorAll(settings.selectors.menuItem);

for (let navLink of navLinks) {
  document.addEventListener( 'click', event => {
    if (event.target == menuButton) {
      event.preventDefault();
      menuButton.classList.toggle(settings.classes.active);
      menuBox.classList.toggle(settings.classes.active);
      console.log('klik')
    } else if (event.target == navLink || (event.target != menuBox)) {
      menuButton.classList.remove(settings.classes.active);
      menuBox.classList.remove(settings.classes.active);
    }
  });
}
