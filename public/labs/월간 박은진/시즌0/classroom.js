import { setupCopyButtons } from './copy-prompt.js';

const content = document.getElementById('lesson-content');
const title = document.getElementById('lesson-title');
const day2Toggle = document.getElementById('day-2-toggle');
const day2Menu = document.getElementById('day-2-apps');
const day3Menu = document.getElementById('day-3-apps');
const books = {
  2: { file: './2일차/index.html', apps: {
    word: 'Word-Copilot', powerpoint: 'PowerPoint-Copilot', excel: 'Excel-Copilot',
  }, defaultApp: 'word' },
  3: { file: './3일차/index.html', apps: {
    workspace: 'workspace', projects: 'projects', researcher: 'researcher',
    analyst: 'analyst', outlook: 'outlook', teams: 'teams',
  }, defaultApp: 'workspace' },
};
let currentLoad = 0;

async function loadBook(day, book) {
  if (!book.document) {
    const response = await fetch(book.file);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
    const main = parsed.querySelector('main');
    if (!main || (day === '2' && main.querySelectorAll('pre').length !== 38) ||
        Object.values(book.apps).some(id => !main.querySelector(`#${id}`))) {
      throw new Error('Invalid prompt book');
    }
    main.querySelectorAll('a[download]').forEach(link => {
      link.href = new URL(link.getAttribute('href'), response.url).href;
    });
    book.document = main;
  }
  return book.document;
}

async function showLesson() {
  const [route, requestedApp] = location.hash.split('/');
  const day = route === '#day-3' ? '3' : '2';
  const book = books[day];
  const app = Object.hasOwn(book.apps, requestedApp) ? requestedApp : book.defaultApp;
  const load = ++currentLoad;

  day2Toggle.classList.toggle('active', day === '2');
  day2Toggle.setAttribute('aria-expanded', String(day === '2'));
  day2Menu.hidden = day !== '2';
  day3Menu.hidden = day !== '3';
  let appName;
  document.querySelectorAll('[data-app]').forEach(link => {
    if (link.closest('ul').dataset.lessonDay === day && link.dataset.app === app) {
      link.setAttribute('aria-current', 'page');
      appName = link.textContent;
    } else {
      link.removeAttribute('aria-current');
    }
  });
  document.querySelector('[data-day="3"]').classList.toggle('active', day === '3');
  document.getElementById('lesson-meta').textContent = `시즌0 · ${day}일차 · AB-730`;
  title.textContent = 'M365 Copilot을 활용한 비즈니스 워크플로우 혁신';
  document.getElementById('lesson-label').textContent = `${appName} · 실습 프롬프트북`;
  document.title = `${day}일차 | 시즌0 | 월간 박은진`;
  window.scrollTo({ top: 0, behavior: 'instant' });
  content.setAttribute('aria-busy', 'true');
  content.textContent = '프롬프트북을 불러오는 중입니다.';

  try {
    const main = await loadBook(day, book);
    if (load !== currentLoad) return;
    content.replaceChildren(document.importNode(main.querySelector(`#${book.apps[app]}`), true));
    setupCopyButtons(content);
  } catch {
    if (load !== currentLoad) return;
    const message = document.createElement('p');
    message.className = 'load-error';
    message.textContent = '프롬프트북을 불러오지 못했습니다. ';
    const link = document.createElement('a');
    link.href = book.file;
    link.textContent = `${day}일차 프롬프트북 직접 열기`;
    message.append(link);
    content.replaceChildren(message);
  } finally {
    if (load === currentLoad) content.setAttribute('aria-busy', 'false');
  }
}

day2Toggle.addEventListener('click', () => {
  if (location.hash.split('/')[0] === '#day-3') {
    location.hash = '#day-2/word';
    return;
  }
  const open = day2Toggle.getAttribute('aria-expanded') !== 'true';
  day2Toggle.setAttribute('aria-expanded', String(open));
  day2Menu.hidden = !open;
});
window.addEventListener('hashchange', showLesson);
showLesson();
