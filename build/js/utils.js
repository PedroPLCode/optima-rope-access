export const utils = {};

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
