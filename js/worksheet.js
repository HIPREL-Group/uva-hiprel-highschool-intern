// Fillable tables that auto-save to the browser's localStorage, so students
// don't lose their work if they close the tab. Nothing is sent to a server -
// it stays on the machine they typed it on, so it's worth taking a screenshot
// or copying answers into the final report before switching computers.
function initWorksheet(table) {
  const key = 'worksheet:' + (table.dataset.key || location.pathname);
  const fields = table.querySelectorAll('input, textarea');
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(key) || '{}');
  } catch (e) {
    saved = {};
  }
  fields.forEach((el, i) => {
    const id = el.dataset.cell || String(i);
    el.dataset.cell = id;
    if (saved[id] !== undefined) el.value = saved[id];
    el.addEventListener('input', () => {
      let data = {};
      try {
        data = JSON.parse(localStorage.getItem(key) || '{}');
      } catch (e) {
        data = {};
      }
      data[id] = el.value;
      localStorage.setItem(key, JSON.stringify(data));
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.worksheet').forEach(initWorksheet);
});
