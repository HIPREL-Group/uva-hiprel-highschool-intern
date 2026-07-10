// Day 4 scoreboard: drives the animated bar chart from the verified-count
// inputs the students fill in as they grade each AI attempt.
document.addEventListener('DOMContentLoaded', () => {
  function updateChart() {
    const vp = parseFloat(document.getElementById('vague-verified').value) || 0;
    const vt = parseFloat(document.getElementById('vague-total').value) || 0;
    const sp = parseFloat(document.getElementById('spec-verified').value) || 0;
    const st = parseFloat(document.getElementById('spec-total').value) || 0;
    const vaguePct = vt > 0 ? Math.round((vp / vt) * 100) : 0;
    const specPct = st > 0 ? Math.round((sp / st) * 100) : 0;

    const vagueBar = document.getElementById('bar-vague');
    const specBar = document.getElementById('bar-spec');
    vagueBar.style.height = vaguePct + '%';
    specBar.style.height = specPct + '%';
    vagueBar.querySelector('.bar-label').textContent = vaguePct + '%';
    specBar.querySelector('.bar-label').textContent = specPct + '%';
  }

  const updateBtn = document.getElementById('update-chart');
  if (updateBtn) {
    updateBtn.addEventListener('click', updateChart);
    ['vague-verified', 'vague-total', 'spec-verified', 'spec-total'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', updateChart);
    });
    updateChart();
  }
});
