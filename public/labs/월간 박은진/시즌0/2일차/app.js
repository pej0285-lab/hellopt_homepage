import { groups } from './prompts.js';

const byId = (id) => document.getElementById(id);
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
let toastTimer;
function notify(message) {
  clearTimeout(toastTimer);
  byId('toast').textContent = message;
  toastTimer = setTimeout(() => { byId('toast').textContent = ''; }, 3500);
}
function fallbackCopy(text) {
  const input = el('textarea');
  input.value = text;
  input.setAttribute('aria-label', '복사할 프롬프트');
  input.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
  document.body.append(input);
  input.focus();
  input.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch { /* Use manual selection below. */ }
  input.remove();
  return copied;
}
async function copyPrompt(text, button, pre) {
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      copied = true;
    }
  } catch { /* Clipboard permission may require the fallback. */ }
  if (!copied) copied = fallbackCopy(text);
  if (copied) {
    button.textContent = '복사됨 ✓';
    button.classList.add('copied');
    notify('프롬프트를 복사했습니다. Copilot에 붙여넣어 주세요.');
    setTimeout(() => { button.textContent = '복사'; button.classList.remove('copied'); }, 2200);
    button.focus({ preventScroll: true });
  } else {
    const range = document.createRange();
    range.selectNodeContents(pre);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    pre.focus({ preventScroll: true });
    notify('자동 복사를 사용할 수 없습니다. 선택된 원문을 직접 복사해 주세요.');
  }
}
function closeMenu() {
  byId('sidebar').classList.remove('mobile-open');
  byId('menu-toggle').setAttribute('aria-expanded', 'false');
}
const entries = [];
const allLink = el('a', 'nav-link', '전체 실습 안내');
allLink.href = '#overview';
allLink.addEventListener('click', closeMenu);
byId('contents').append(allLink);
groups.forEach((group, groupIndex) => {
  const nav = el('details', `nav-group ${group.id}`);
  nav.open = true;
  const summary = el('summary');
  summary.append(el('span', 'app-icon', group.short), document.createTextNode(group.name));
  nav.append(summary);
  const section = el('section', `app-section ${group.id}`);
  section.id = group.id;
  section.setAttribute('aria-labelledby', `${group.id}-title`);
  const heading = el('header', 'app-heading');
  const headingText = el('div');
  const title = el('h2', '', group.name);
  title.id = `${group.id}-title`;
  const textbookPages = { word: '14–21', powerpoint: '23–29', excel: '33–41' };
  headingText.append(title, el('p', '', group.description), el('p', 'textbook-pages', `교재 ${textbookPages[group.id]}쪽`));
  heading.append(el('span', 'app-icon', group.short), headingText, el('span', 'section-number', `0${groupIndex + 1}`));
  section.append(heading);
  if (group.source) section.append(el('p', 'app-source', group.source));
  const chapters = [];
  group.sections.forEach((chapter) => {
    const chapterTitle = el('h3', 'chapter-heading', chapter.name);
    section.append(chapterTitle);
    const navTitle = el('p', 'nav-section-title', chapter.name);
    nav.append(navTitle);
    const chapterEntries = [];
    chapter.items.forEach((item) => {
      const id = `${group.id}-${item.number}`;
      const link = el('a', 'nav-link');
      link.href = `#${id}`;
      link.append(el('span', 'nav-number', item.number), el('span', '', item.title));
      link.addEventListener('click', () => {
        if (byId('search').value) { byId('search').value = ''; filter(); }
        closeMenu();
      });
      nav.append(link);
      const card = el('article', 'exercise');
      card.id = id;
      card.setAttribute('aria-labelledby', `${id}-title`);
      const header = el('header', 'exercise-header');
      const cardTitle = el('h3', '', item.title);
      cardTitle.id = `${id}-title`;
      header.append(el('span', 'exercise-kicker', `${group.name.toUpperCase()} / 실습 ${item.number}`), cardTitle);
      if (item.source) header.append(el('p', 'source-file', item.source));
      card.append(header);
      item.prompts.forEach((prompt, index) => {
        const box = el('div', 'prompt-block');
        const toolbar = el('div', 'prompt-toolbar');
        const pre = el('pre', '', prompt.text);
        pre.id = `${id}-prompt-${index + 1}`;
        pre.tabIndex = 0;
        const copy = el('button', 'copy-button', '복사');
        copy.type = 'button';
        copy.setAttribute('aria-label', `${group.name} ${prompt.label} 프롬프트 복사`);
        copy.setAttribute('aria-describedby', `${id}-title`);
        copy.addEventListener('click', () => copyPrompt(prompt.text, copy, pre));
        toolbar.append(el('span', 'prompt-label', `PROMPT · ${prompt.label}`), copy);
        box.append(toolbar, pre);
        card.append(box);
      });
      section.append(card);
      const entry = { card, link, search: [group.name, item.number, item.title, item.source, ...item.prompts.map(p => p.text)].join(' ').toLocaleLowerCase() };
      entries.push(entry);
      chapterEntries.push(entry);
    });
    chapters.push({ chapterTitle, navTitle, entries: chapterEntries });
  });
  byId('contents').append(nav);
  byId('exercises').append(section);
  group.rendered = { nav, section, chapters };
});
function filter() {
  const query = byId('search').value.trim().toLocaleLowerCase();
  let count = 0;
  entries.forEach(entry => {
    const match = entry.search.includes(query);
    entry.card.hidden = !match;
    entry.link.hidden = !match;
    if (match) count++;
  });
  groups.forEach(group => {
    const { nav, section, chapters } = group.rendered;
    chapters.forEach(chapter => {
      const visible = chapter.entries.some(entry => !entry.card.hidden);
      chapter.chapterTitle.hidden = !visible;
      chapter.navTitle.hidden = !visible;
    });
    section.hidden = !chapters.some(chapter => !chapter.chapterTitle.hidden);
    nav.hidden = section.hidden;
    if (query && !nav.hidden) nav.open = true;
  });
  byId('result-count').textContent = `${query ? '검색 결과' : '전체'} ${count}개 실습`;
  byId('empty').hidden = count > 0;
}
byId('search').addEventListener('input', filter);
filter();
byId('menu-toggle').addEventListener('click', () => {
  const open = byId('sidebar').classList.toggle('mobile-open');
  byId('menu-toggle').setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && byId('sidebar').classList.contains('mobile-open')) {
    closeMenu();
    byId('menu-toggle').focus();
  }
});
byId('main').addEventListener('click', closeMenu);
const observer = new IntersectionObserver(items => {
  const active = items.filter(item => item.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
  if (!active) return;
  entries.forEach(entry => {
    if (entry.card === active.target) entry.link.setAttribute('aria-current', 'true');
    else entry.link.removeAttribute('aria-current');
  });
}, { rootMargin: '-90px 0px -60% 0px', threshold: 0 });
entries.forEach(entry => observer.observe(entry.card));
const initialTarget = document.getElementById(decodeURIComponent(location.hash.slice(1)));
if (initialTarget) requestAnimationFrame(() => initialTarget.scrollIntoView());
