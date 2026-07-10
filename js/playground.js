// Live, in-page code playground: an editable textarea that runs code with no
// backend of our own. Rust and Verus go through the OFFICIAL Rust Playground /
// Verus Playground execute APIs directly from the browser (both have CORS
// enabled). Python runs entirely client-side via Pyodide (CPython compiled to
// WebAssembly, loaded from a CDN on first use, no server round-trip at all).
// See ../PLAYGROUND_NOTES.md for how this was verified and what the fallback
// options are if these services are ever unreachable.
//
// Markup contract:
// <div class="playground" data-tool="rustc|verus|python">
//   <script type="text/plain" class="code-source">...starter code...</script>
//   <div class="code-toolbar">
//     <span class="code-lang">Rust</span>
//     <button class="pg-run" type="button">Run</button>
//     <button class="pg-reset" type="button">Reset code</button>
//     <a class="open-playground-link" href="...">Open Playground</a>
//     <span class="pg-status"></span>
//   </div>
//   <textarea class="pg-editor" spellcheck="false"></textarea>
//   <pre class="pg-output"></pre>
// </div>

const PLAYGROUND_ENDPOINTS = {
  rustc: { url: 'https://play.rust-lang.org/execute', mode: 'debug' },
  verus: { url: 'https://play.verus-lang.org/execute', mode: 'detailed' },
};

const PYODIDE_CDN_URL = 'https://cdn.jsdelivr.net/pyodide/v0.28.0/full/pyodide.js';
let pyodideLoadPromise = null;

function loadPyodideScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PYODIDE_CDN_URL;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Could not load the Python runtime from the CDN.'));
    document.head.appendChild(script);
  });
}

async function getPyodide() {
  if (!pyodideLoadPromise) {
    pyodideLoadPromise = (async () => {
      if (typeof loadPyodide !== 'function') {
        await loadPyodideScript();
      }
      return loadPyodide();
    })();
  }
  return pyodideLoadPromise;
}

async function callPlayground(tool, code) {
  if (tool === 'python') {
    const pyodide = await getPyodide();
    let combined = '';
    pyodide.setStdout({ batched: (msg) => { combined += msg + '\n'; } });
    pyodide.setStderr({ batched: (msg) => { combined += msg + '\n'; } });
    try {
      await pyodide.runPythonAsync(code);
      return { ok: true, timed_out: false, stdout: combined, stderr: '' };
    } catch (err) {
      // Pyodide's error already includes the Python traceback text.
      return { ok: false, timed_out: false, stdout: combined, stderr: String(err.message || err) };
    }
  }

  const target = PLAYGROUND_ENDPOINTS[tool];
  const res = await fetch(target.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      channel: 'stable',
      mode: target.mode,
      edition: '2021',
      crateType: 'bin',
      tests: false,
      backtrace: false,
      code: code,
    }),
  });
  const data = await res.json();
  if (data.error) {
    // e.g. {"error": "The operation timed out: deadline has elapsed"}
    return { ok: false, timed_out: /timed out/i.test(data.error), stdout: '', stderr: data.error };
  }
  return { ok: !!data.success, timed_out: false, stdout: data.stdout || '', stderr: data.stderr || '' };
}

function initPlayground(root) {
  const tool = ['verus', 'python'].includes(root.dataset.tool) ? root.dataset.tool : 'rustc';
  const sourceEl = root.querySelector('.code-source');
  const editor = root.querySelector('.pg-editor');
  const runBtn = root.querySelector('.pg-run');
  const resetBtn = root.querySelector('.pg-reset');
  const output = root.querySelector('.pg-output');
  const status = root.querySelector('.pg-status');

  const initialCode = sourceEl.textContent.replace(/^\n/, '').replace(/\s+$/, '');
  editor.value = initialCode;

  async function run() {
    runBtn.disabled = true;
    output.textContent = '';
    if (tool === 'python') {
      status.textContent = pyodideLoadPromise ? 'Running...' : 'Loading Python runtime (first run only, a few seconds)...';
    } else {
      status.textContent = tool === 'verus' ? 'Verifying...' : 'Compiling and running...';
    }
    status.className = 'pg-status busy';
    try {
      const result = await callPlayground(tool, editor.value);
      const parts = [];
      if (result.stdout) parts.push(result.stdout);
      if (result.stderr) parts.push(result.stderr);
      output.textContent = parts.join('\n').trim() || '(no output)';

      if (result.ok) {
        status.textContent = tool === 'verus' ? 'Verified ✓' : 'Ran successfully ✓';
        status.className = 'pg-status done';
      } else if (result.timed_out) {
        status.textContent = 'Timed out';
        status.className = 'pg-status error';
      } else if (tool === 'verus') {
        status.textContent = 'Not verified';
        status.className = 'pg-status error';
      } else {
        status.textContent = 'Error';
        status.className = 'pg-status error';
      }
    } catch (err) {
      output.textContent = tool === 'python'
        ? "Couldn't load the Python runtime. Check your internet connection and try again.\n\n(" + err + ')'
        : "Couldn't reach the playground service. Use the \"Open Playground\" link " +
          'instead, or check your internet connection.\n\n(' + err + ')';
      status.textContent = 'Connection error';
      status.className = 'pg-status error';
    } finally {
      runBtn.disabled = false;
    }
  }

  runBtn.addEventListener('click', run);
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      editor.value = initialCode;
      output.textContent = '';
      status.textContent = '';
      status.className = 'pg-status';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.playground').forEach(initPlayground);
});
