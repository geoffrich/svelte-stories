// Adapted from https://css-tricks.com/simple-swipe-with-vanilla-javascript/

let startX = null;
const SWIPE_THRESHOLD = 20;

function setStart(e) {
  startX = unify(e).clientX;
}

function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

function makeEvent(dx, complete) {
  return new CustomEvent('swipe', {
    detail: {
      direction: dx < 0 ? 'left' : dx > 0 ? 'right' : 'none',
      complete,
      dx
    }
  });
}

export default function swipe(node) {
  node.addEventListener('mousedown', setStart);
  node.addEventListener('touchstart', setStart);

  node.addEventListener('mouseup', finishSwipe);
  node.addEventListener('touchend', finishSwipe);

  node.addEventListener('mousemove', drag);
  node.addEventListener('touchmove', drag);

  function drag(e) {
    e.preventDefault();
    if (startX || startX === 0) {
      let dx = unify(e).clientX - startX;
      node.dispatchEvent(makeEvent(dx, false));
    }
  }

  function finishSwipe(e) {
    if (startX || startX === 0) {
      let dx = unify(e).clientX - startX;

      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        node.dispatchEvent(makeEvent(dx, true));
      }

      startX = null;
    }
  }

  return {
    destroy() {
      node.removeEventListener('mousedown', setStart);
      node.removeEventListener('touchstart', setStart);

      node.removeEventListener('mouseup', finishSwipe);
      node.removeEventListener('touchend', finishSwipe);

      node.removeEventListener('mousemove', drag);
      node.removeEventListener('touchmove', drag);
    }
  };
}
