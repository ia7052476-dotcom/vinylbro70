'use strict';
const {projects} = JSON.parse(document.getElementById('site-data').textContent);
const get = selector => document.querySelector(selector);
const all = selector => [...document.querySelectorAll(selector)];
const projectById = id => projects.find(project => project.id === id);
const frameNumber = (i, length) => (i + length) % length;
const asset = (id, small = false) => 'assets/photo-' + id + (small ? '-sm' : '') + '.webp';
function setPhoto(image, photo, alt) {
  image.srcset = asset(photo, true) + ' 640w, ' + asset(photo) + ' 1280w';
  image.src = asset(photo);
  image.alt = alt;
}

function setupMenu() {
  const button = get('.menu-btn');
  const menu = get('#nav');
  function setOpen(open) {
    menu.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }
  button.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.addEventListener('click', () => setOpen(false));
  document.addEventListener('click', e => { if (!e.target.closest('header')) setOpen(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); button.focus(); }
  });
  matchMedia('(min-width:701px)').addEventListener('change', () => setOpen(false));
}
function onSwipe(element, callback) {
  let start = null;
  element.addEventListener('touchstart', e => {
    start = e.touches.length === 1 ? [e.touches[0].clientX, e.touches[0].clientY] : null;
  }, {passive:true});
  element.addEventListener('touchend', e => {
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start[0];
    const dy = e.changedTouches[0].clientY - start[1];
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) callback(dx < 0 ? 1 : -1);
    start = null;
  }, {passive:true});
  element.addEventListener('touchcancel', () => { start = null; }, {passive:true});
}
function setupHero() {
  if (!get('.hero')) return;
  const slides = ['lexus-rx', 'toyota-camry', 'mercedes-graphics'].map(projectById);
  let current = 0;
  function show(index) {
    current = frameNumber(index, slides.length);
    const p = slides[current];
    setPhoto(get('.hero-img'), p.photos[0], p.name + ' — ' + p.shade);
    get('#hero-car').textContent = p.name;
    get('#hero-shade').textContent = p.shade;
    get('.hero-caption').href = 'project-' + p.id + '.html';
    get('#slide-num').textContent = String(current + 1).padStart(2, '0');
    all('[data-slide]').forEach((b,i) => b.setAttribute('aria-pressed', String(i === current)));
  }
  all('[data-slide]').forEach(b => b.addEventListener('click', () => show(Number(b.dataset.slide))));
  onSwipe(get('.hero'), direction => show(current + direction));
}
function setupFilters() {
  const works = get('.works');
  if (!works) return;
  const buttons = all('[data-filter]');
  const cards = all('.tile-wrap');
  const limit = Number(works.dataset.limit);
  buttons.forEach(button => button.addEventListener('click', () => {
    const type = button.dataset.filter;
    let shown = 0;
    for (const card of cards) {
      const match = type === 'Все' || card.dataset.group === type;
      card.hidden = !match || (limit > 0 && type === 'Все' && shown >= limit);
      if (!card.hidden) shown++;
    }
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    get('#filter-status').textContent = 'Показано работ: ' + shown;
  }));
}
function setupViewer() {
  const modal = get('#viewer');
  let current, index, focusReturn;
  function render() {
    const text = current.labels[index];
    get('#view-image').src = asset(current.photos[index]);
    get('#view-image').alt = current.name + ' — ' + text;
    get('#view-title').textContent = current.name;
    get('#view-label').textContent = text;
    get('#view-counter').textContent = (index + 1) + ' / ' + current.photos.length;
    all('[data-step]').forEach(b => b.disabled = current.photos.length < 2);
  }
  function step(n) { index = frameNumber(index + n, current.photos.length); render(); }
  all('[data-step]').forEach(b => b.addEventListener('click', () => step(Number(b.dataset.step))));
  get('[data-close]').addEventListener('click', () => modal.close());
  modal.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault(); step(e.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  modal.addEventListener('close', () => { document.body.style.overflow = ''; focusReturn?.focus({preventScroll:true}); });
  onSwipe(get('#view-image'), step);
  return function open(project, position) {
    current = project; index = position; focusReturn = document.activeElement;
    render(); modal.showModal(); document.body.style.overflow = 'hidden';
    get('[data-close]').focus();
  };
}
function setupProject(openViewer) {
  const p = projectById(document.body.dataset.project);
  if (!p) return;
  let index = 0;
  function show(i) {
    index = frameNumber(i,p.photos.length);
    setPhoto(get('.project-img'), p.photos[index], p.labels[index]);
    get('.project-caption').textContent = p.labels[index];
    all('[data-thumb]').forEach((b,i) => b.setAttribute('aria-pressed', String(i === index)));
  }
  all('[data-thumb]').forEach(b => b.addEventListener('click', () => show(Number(b.dataset.thumb))));
  get('.project-main').addEventListener('click', () => openViewer(p, index));
}
function setupMap() {
  const button = get('.load-map');
  if (!button) return;
  function start() {
    const el = get('#map');
    el.replaceChildren();
    const coords = [56.493551,84.980018];
    const map = L.map(el,{scrollWheelZoom:false}).setView(coords,16);
    const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(map);
    let ready = false;
    layer.on('tileload', () => { ready = true; });
    layer.once('load', () => {
      if (ready) return;
      map.remove();
      el.innerHTML = '<div class="map-error"><p>Карта сейчас недоступна.<br><a href="https://2gis.ru/tomsk/firm/70000001054524797" target="_blank" rel="noopener">Открыть студию в 2ГИС</a></p></div>';
    });
    const marker = L.divIcon({className:'studio-marker',iconSize:[21,21],iconAnchor:[10,10]});
    L.marker(coords,{icon:marker,title:'ВинилБро70',alt:'ВинилБро70'}).addTo(map).bindPopup('<strong>ВинилБро70</strong><br>Мариинский переулок, 44').openPopup();
    map.zoomControl._zoomInButton.setAttribute('aria-label','Приблизить карту');
    map.zoomControl._zoomOutButton.setAttribute('aria-label','Отдалить карту');
  }
  button.addEventListener('click', () => {
    button.disabled = true;
    const script = document.createElement('script');
    script.src = 'assets/leaflet.js'; script.onload = start;
    script.onerror = () => {button.disabled=false;button.querySelector('span').textContent='Загрузить карту ещё раз';};
    document.head.append(script);
  });
}
setupMenu();
setupHero();
setupFilters();
const openViewer = setupViewer();
setupProject(openViewer);
setupMap();
