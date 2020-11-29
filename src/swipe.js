// https://css-tricks.com/simple-swipe-with-vanilla-javascript/

let x0 = null;

function lock(e) {
  x0 = unify(e).clientX;
}

function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

export default function swipe(node) {
  node.addEventListener('mousedown', lock);
  node.addEventListener('touchstart', lock);

  node.addEventListener('mouseup', move);
  node.addEventListener('touchend', move);

  function move(e) {
    if (x0 || x0 === 0) {
      let dx = unify(e).clientX - x0,
        s = Math.sign(dx);

      if (Math.abs(dx) > 20) {
        node.dispatchEvent(
          new CustomEvent('swipe', {
            detail: {
              direction: s < 0 ? 'left' : s > 0 ? 'right' : 'none'
            }
          })
        );
      }
      console.log(dx);

      x0 = null;
    }
  }
}
