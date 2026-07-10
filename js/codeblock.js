// Renders code blocks from a hidden <script type="text/plain"> source (so
// authoring Rust/Verus code -- full of &, <, > -- never needs manual HTML
// escaping) and wires up "copy code" buttons. Code doesn't run on this page;
// students copy it and paste it into the linked Rust or Verus Playground.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.code-block').forEach((block) => {
    const sourceEl = block.querySelector('.code-source');
    const contentEl = block.querySelector('.code-content');
    if (sourceEl && contentEl) {
      const code = sourceEl.textContent.replace(/^\n/, '').replace(/\s+$/, '');
      contentEl.textContent = code;
    }
  });

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    const block = btn.closest('.code-block');
    const codeEl = block ? block.querySelector('.code-content') : null;
    if (!codeEl) return;

    btn.addEventListener('click', async () => {
      const code = codeEl.textContent;
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(code);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      btn.textContent = '✓ Copied!';
      setTimeout(() => {
        btn.textContent = original;
      }, 1500);
    });
  });
});
