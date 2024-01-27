export const utils = {};

utils.isInViewport = element => {
  const rect = element.getBoundingClientRect();
  return (
      (rect.top + (window.innerHeight) ) >= 0 &&
      rect.bottom <= ((window.innerHeight * 2 )|| (document.documentElement.clientHeight * 2))
  );
}

utils.flashDown = element => {
  element.style.opacity = '0.5';
  element.style.filter = 'blur(4px)';
}

utils.flashUp = element => {
  element.style.filter = 'blur(0)';
  element.style.opacity = '1';
}

utils.sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
