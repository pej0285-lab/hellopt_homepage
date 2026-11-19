let toastTimer;
function notify(text) {
  clearTimeout(toastTimer);
  document.getElementById('copy-status').textContent = text;
  toastTimer = setTimeout(() => { document.getElementById('copy-status').textContent = ''; }, 3500);
}
async function copyPrompt(button, pre) {
  const text = pre.textContent;
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      copied = true;
    }
  } catch { /* Use the selection-based fallback. */ }
  if (!copied) {
    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('aria-label', '복사할 프롬프트');
    input.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.append(input);
    input.focus();
    input.select();
    try { copied = document.execCommand('copy'); } catch { /* Manual selection below. */ }
    input.remove();
  }
  if (copied) {
    button.textContent = '복사됨';
    button.classList.add('done');
    button.focus({ preventScroll: true });
    notify('프롬프트를 복사했습니다. Copilot에 붙여넣어 주세요.');
    setTimeout(() => { button.textContent = '복사'; button.classList.remove('done'); }, 1400);
  } else {
    const range = document.createRange();
    range.selectNodeContents(pre);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    pre.focus({ preventScroll: true });
    notify('자동 복사가 제한되어 있습니다. 선택된 프롬프트를 직접 복사해 주세요.');
  }
}
export function setupCopyButtons(root) {
  root.querySelectorAll('.prompt').forEach(box => {
    const button = box.querySelector('.copy');
    const pre = box.querySelector('pre');
    button.removeAttribute('onclick');
    button.type = 'button';
    pre.tabIndex = 0;
    const card = box.closest('.card');
    button.setAttribute('aria-label', `${box.closest('.app').querySelector('h2').textContent} ${card.querySelector('.badge').textContent} ${card.querySelector('h4').textContent} 프롬프트 복사`);
    button.addEventListener('click', () => copyPrompt(button, pre));
  });
}
