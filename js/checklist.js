// Tier progress checklist (Project page). Checking a box lights up the
// matching node in the tier diagram and fills the connector line, and the
// state is remembered in localStorage so progress persists across the week.
document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.tier-check');
  if (boxes.length === 0) return;
  const key = 'tier-progress';
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(key) || '{}');
  } catch (e) {
    saved = {};
  }

  function updateNode(cb) {
    const node = document.querySelector('.tier-node-wrap[data-tier="' + cb.value + '"]');
    if (node) node.classList.toggle('complete', cb.checked);
    const circle = document.querySelector('.tier-node[data-tier="' + cb.value + '"]');
    if (circle) circle.classList.toggle('complete', cb.checked);
  }

  boxes.forEach((cb) => {
    if (saved[cb.value]) cb.checked = true;
    updateNode(cb);
    cb.addEventListener('change', () => {
      let data = {};
      try {
        data = JSON.parse(localStorage.getItem(key) || '{}');
      } catch (e) {
        data = {};
      }
      data[cb.value] = cb.checked;
      localStorage.setItem(key, JSON.stringify(data));
      updateNode(cb);
    });
  });
});
