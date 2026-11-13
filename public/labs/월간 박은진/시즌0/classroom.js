const content = document.getElementById('lesson-content');
const title = document.getElementById('lesson-title');
let currentLoad = 0;
let lessonDocument;
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
async function showLesson() {
  const day = location.hash === '#day-3' ? '3' : '2';
  const apps = { word: 'Word-Copilot', powerpoint: 'PowerPoint-Copilot', excel: 'Excel-Copilot' };
  const requestedApp = location.hash.split('/')[1];
  const app = Object.hasOwn(apps, requestedApp) ? requestedApp : 'word';
  const appNames = { word: 'Word Copilot', powerpoint: 'PowerPoint Copilot', excel: 'Excel Copilot' };
  const load = ++currentLoad;
  const toggle = document.getElementById('day-2-toggle');
  toggle.classList.toggle('active', day === '2');
  if (day === '2') {
    toggle.setAttribute('aria-expanded', 'true');
    document.getElementById('day-2-apps').hidden = false;
  }
  document.querySelectorAll('[data-app]').forEach(link => {
    if (day === '2' && link.dataset.app === app) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.querySelectorAll('[data-day]').forEach(link => {
    if (link.dataset.day === day) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.getElementById('lesson-meta').textContent = `시즌0 · ${day}일차${day === '2' ? ' · AB-730' : ''}`;
  title.textContent = day === '2' ? 'M365 Copilot을 활용한 비즈니스 워크플로우 혁신' : '3일차';
  document.getElementById('lesson-label').textContent = day === '2' ? `${appNames[app]} · 실습 프롬프트북` : '준비 중';
  document.title = `${day}일차 | 시즌0 | 월간 박은진`;
  content.replaceChildren();
  content.setAttribute('aria-busy', 'false');
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (day === '3') {
    const notice = document.createElement('section');
    notice.className = 'notice';
    const heading = document.createElement('h2');
    heading.textContent = '강의 자료를 준비하고 있습니다.';
    const message = document.createElement('p');
    message.textContent = '강의 주제와 실습 자료는 추후 이곳에 추가됩니다.';
    notice.append(heading, message);
    content.append(notice);
    return;
  }
  content.setAttribute('aria-busy', 'true');
  content.textContent = '프롬프트북을 불러오는 중입니다.';
  try {
    if (!lessonDocument) {
      const response = await fetch('./2일차/index.html');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
      const main = parsed.querySelector('main');
      if (!main || main.querySelectorAll('pre').length !== 38) throw new Error('Invalid prompt book');
      lessonDocument = main;
    }
    if (load !== currentLoad) return;
    content.replaceChildren(document.importNode(lessonDocument.querySelector(`#${apps[app]}`), true));
    content.querySelectorAll('.prompt').forEach(box => {
      const button = box.querySelector('.copy');
      const pre = box.querySelector('pre');
      button.removeAttribute('onclick');
      button.type = 'button';
      pre.tabIndex = 0;
      const card = box.closest('.card');
      button.setAttribute('aria-label', `${box.closest('.app').querySelector('h2').textContent} ${card.querySelector('.badge').textContent} ${card.querySelector('h4').textContent} 프롬프트 복사`);
      button.addEventListener('click', () => copyPrompt(button, pre));
    });
  } catch {
    if (load !== currentLoad) return;
    const message = document.createElement('p');
    message.className = 'load-error';
    message.textContent = '프롬프트북을 불러오지 못했습니다. ';
    const link = document.createElement('a');
    link.href = './2일차/index.html';
    link.textContent = '2일차 프롬프트북 직접 열기';
    message.append(link);
    content.replaceChildren(message);
  } finally {
    if (load === currentLoad) content.setAttribute('aria-busy', 'false');
  }
}
document.getElementById('day-2-toggle').addEventListener('click', () => {
  const toggle = document.getElementById('day-2-toggle');
  if (location.hash === '#day-3') {
    location.hash = '#day-2/word';
    return;
  }
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  document.getElementById('day-2-apps').hidden = !open;
});
window.addEventListener('hashchange', showLesson);
showLesson();
