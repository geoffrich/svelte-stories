// https://css-tricks.com/simple-swipe-with-vanilla-javascript/

let x0 = null;

function lock(e) {
  x0 = unify(e).clientX;
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
  })
}

export default function swipe(node) {
  node.addEventListener('mousedown', lock);
  node.addEventListener('touchstart', lock);

  node.addEventListener('mouseup', move);
  node.addEventListener('touchend', move);

  node.addEventListener('mousemove', drag);
  node.addEventListener('touchmove', drag);

  function drag(e) {
    e.preventDefault();
    if (x0 || x0 === 0) {
      let dx = unify(e).clientX - x0;
      node.dispatchEvent(makeEvent(dx, false));
    }
  }

  function move(e) {
    if (x0 || x0 === 0) {
      let dx = unify(e).clientX - x0,
        s = Math.sign(dx);

      if (Math.abs(dx) > 20) {
        node.dispatchEvent(makeEvent(dx, true));
      }

      x0 = null;
    }
  }

  return {
    destroy() {
      node.removeEventListener('mousedown', lock);
      node.removeEventListener('touchstart', lock);
    
      node.removeEventListener('mouseup', move);
      node.removeEventListener('touchend', move);

      node.removeEventListener('mousemove', drag);
      node.removeEventListener('touchmove', drag);
    }
  }
}
