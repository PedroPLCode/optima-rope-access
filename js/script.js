const menuButton = document.querySelector('.menu__btn');
const navLinks = document.querySelectorAll('.menu__item');
for (let navLink of navLinks) {
  document.addEventListener( 'click', (event) => {
    const menuBox = document.querySelector('.menu__box');
    if (event.target == navLink || event.target == menuButton) {
      menuButton.classList.toggle('active')
      menuBox.classList.toggle('active');
    } else {
      menuBox.classList.remove('active');
      menuButton.classList.toggle('active')
    }
  });
}
