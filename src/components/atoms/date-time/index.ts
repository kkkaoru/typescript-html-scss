import { updateDateTimeTextByAnimation, animateUpdateDateTimeText } from './animation';

updateDateTimeTextByAnimation(
  document.querySelectorAll('.datetime'),
  window.navigator.language,
  animateUpdateDateTimeText,
);
