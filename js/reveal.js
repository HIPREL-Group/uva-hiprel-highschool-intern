// Generic reveal-button toggle, used for the Day 3 ambiguity quiz answers and
// for "check your work" solved-code reveals elsewhere on the site. Shows
// hidden content only after the student clicks, so answers aren't visible by
// default (spoiler protection, not real security).
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal-btn').forEach((btn) => {
    const original = btn.textContent;
    const hiddenLabel = btn.dataset.hideLabel || 'Hide';
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const shown = target.classList.toggle('shown');
      btn.textContent = shown ? hiddenLabel : original;
    });
  });
});
