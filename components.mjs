import {firm, telegram, reviewsUrl,route,projects,services,reviews} from './catalog.mjs';

export const icons = {
 plane:'<path d="m21 3-4 17-6-5-3 3v-5L3 11l18-8ZM8 13l9-6-6 8"/>',
 pin:'<path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.4"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx=".8"/><rect x="14" y="3" width="7" height="7" rx=".8"/><rect x="3" y="14" width="7" height="7" rx=".8"/><rect x="14" y="14" width="7" height="7" rx=".8"/>',
 expand:'<path d="M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5"/>',
 left:'<path d="m14.5 5-7 7 7 7"/>',right:'<path d="m9.5 5 7 7-7 7"/>',
 close:'<path d="m5 5 14 14M19 5 5 19"/>',menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
 phone:'<path d="M7 3H4c-2 7 7 18 16 17l1-4-5-2-2 2c-3-1-5-3-6-6l2-2-3-5Z"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',plus:'<path d="M4 12h16m-8-8v16"/>',
 stack:'<path d="m3 8 9-5 9 5-9 5-9-5Zm0 4 9 5 9-5M3 16l9 5 9-5"/>',back:'<path d="m14 6-6 6 6 6"/>',
 star:'<path fill="currentColor" stroke="none" d="m12 1.7 3.1 6.4 7.1 1-5.1 5 1.2 7.1-6.3-3.4-6.3 3.4 1.2-7.1-5.1-5 7.1-1z"/>'
};
export const icon=(name)=>`<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
export const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export const ext='target="_blank" rel="noopener noreferrer"';
export const tg=(s='')=>telegram+(s?'?text='+encodeURIComponent(s):'');
export const btn=(href,label,kind='primary',ico='',external=false)=>`<a class="btn ${kind}" href="${esc(href)}" ${external?ext:''}>${ico?icon(ico):''}${label}</a>`;
export const photo=(id,alt,cls='',eager=false)=>`<img class="${cls}" src="assets/photo-${id}.webp" srcset="assets/photo-${id}-sm.webp 640w, assets/photo-${id}.webp 1280w" sizes="${cls==='hero-img'?'(max-width: 720px) 100vw, 76vw':cls==='tile-img'?'(max-width: 600px) 100vw, (max-width: 920px) 50vw, 33vw':'(max-width: 720px) 100vw, 70vw'}" alt="${esc(alt)}" ${eager?'fetchpriority="high" loading="eager"':'loading="lazy"'} decoding="async">`;
export const brand=()=>`<span class="logo"><span class="brand-symbol" aria-hidden="true"><i></i><i></i></span><span>ВИНИЛБРО<b>70</b></span></span>`;
export function header(home=false){
 const path=home?'':'index.html';
 const links=[['works','Работы'],['services','Услуги'],['studio','О студии'],['contacts','Контакты']];
 return `<a class="skip" href="#main">К содержанию</a><header><div class="wrap head"><a href="${home?'#top':'index.html'}" aria-label="ВинилБро70, главная">${brand()}</a><nav id="nav" aria-label="Главное меню">${links.map(([id,n])=>`<a href="${path}#${id}">${n}</a>`).join('')}</nav><div class="nav-end"><a class="header-tg" href="${telegram}" ${ext}>${icon('plane')} Telegram</a><button type="button" class="menu-btn" aria-controls="nav" aria-expanded="false" aria-label="Открыть меню">${icon('menu')}</button></div></div></header>`;
}
export const kicker=s=>`<p class="kicker"><span></span>${s}</p>`;
export const projectUrl=p=>'project-'+p.id+'.html';
export function hero(){
 return `<section class="hero" aria-labelledby="hero-title"><div class="hero-art">${photo(0,'Графитовый Lexus RX в боксе ВинилБро70','hero-img',true)}</div><div class="wrap hero-inner"><div class="hero-copy">${kicker('Детейлинг-студия · Томск')}<h1 id="hero-title">Цвет меняет<br><em>характер.</em></h1><p class="hero-desc">Оклейка кузова винилом, защита фар и деталей автомобиля.</p><div class="actions">${btn('#works','Посмотреть работы','primary','grid')}${btn(telegram,'Обсудить проект','ghost','plane',true)}</div></div><div class="hero-foot"><div class="slide-controls" aria-label="Автомобили на первом экране"><div class="slide-count"><b id="slide-num">01</b><span> / 03</span></div>${[0,1,2].map((_,i)=>`<button class="slide-bar" aria-label="Показать ${['Lexus RX','Toyota Camry','Mercedes-Benz'][i]}" aria-pressed="${i===0}" data-slide="${i}"><span></span></button>`).join('')}</div><a class="hero-caption" href="project-lexus-rx.html"><span class="car-marker"></span><span><strong id="hero-car">Lexus RX</strong><small id="hero-shade">Графитовый</small></span>${icon('expand')}</a></div></div></section>`;
}
export const filters=()=>`<div class="filters" role="group" aria-label="Фильтр по типу работ">${['Все','Кузов','Графика','Защита','Детали','Детейлинг'].map((x,i)=>`<button data-filter="${x}" aria-pressed="${!i}">${x}</button>`).join('')}</div>`;
export const tile=p=>`<a class="tile" data-type="${p.type}" href="${projectUrl(p)}"><div class="tile-art">${photo(p.photos[0],p.name+' — '+p.shade,'tile-img')}<span class="type-tag">${p.type}</span></div><div class="tile-title"><div><h3>${p.name}</h3><p>${p.shade}</p></div><span class="tile-icon">${icon('expand')}</span></div></a>`;
export function works(full=false){
 const featuredIds=['bmw-x5-matte','mercedes-graphics','chevrolet-hood-art','volvo-hood-polish','classic-blue','sedan-spoiler'];
 const featured=featuredIds.map(id=>projects.find(p=>p.id===id));
 const order=full?projects:[...featured,...projects.filter(p=>!featuredIds.includes(p.id))];
 return `<section class="section wrap works ${full?'all-works':''}" id="works" data-limit="${full?0:featured.length}">${full?`<a class="crumb" href="index.html">${icon('back')} Главная</a>`:''}<div class="section-head"><div>${kicker('Портфолио')}${full?'<h1>Каталог работ</h1>':'<h2>Работы студии</h2>'}</div>${full?'':`<a class="catalog-link" href="works.html">${icon('grid')} Каталог работ <span>(${projects.length})</span></a>`}</div>${filters()}<div class="tile-grid">${order.map((p,i)=>`<div class="tile-wrap" data-group="${p.type}" ${!full&&i>=featured.length?'hidden':''}>${tile(p)}</div>`).join('')}</div><p class="sr-only" aria-live="polite" id="filter-status"></p></section>`;
}
export function servicesSection(){
 return `<section id="services" class="section wrap"><div class="section-head"><div>${kicker('В мастерской')}<h2>Услуги и цены</h2></div><a class="text-link" href="${firm}/tab/menu" ${ext}>Цены в 2ГИС</a></div><p class="lead compact">Пришлите модель автомобиля и фотографии в Telegram. Мастер уточнит объём работ и рассчитает стоимость.</p><div class="service-list">${services.map((s,i)=>`<details class="service" ${i===0?'open':''}><summary><img src="assets/photo-${s.photo}-sm.webp" alt="" loading="lazy"><h3>${s.name}</h3><span class="price">По запросу</span><span class="disclose">${icon('plus')}</span></summary><div class="service-details"><p>${s.desc}</p>${btn(tg('Здравствуйте! Интересует услуга «'+s.name+'». Хочу узнать стоимость.'),'Узнать стоимость','text-button','plane',true)}</div></details>`).join('')}</div></section>`;
}
export function studio(){
 return `<section class="studio" id="studio"><div class="wrap studio-grid"><div class="studio-image">${photo(49,'Мастер ВинилБро70 за оклейкой детали')}<small>В мастерской ВинилБро70 · Фото владельца</small></div><div class="studio-copy">${kicker('О студии')}<h2>ВинилБро70</h2><p class="lead">Детейлинг-студия в Томске, на Мариинском переулке. Здесь оклеивают автомобили плёнкой, защищают оптику и занимаются уходом за кузовом и салоном.</p><p>Можно записаться заранее. Для клиентов есть зал ожидания и Wi-Fi.</p><a class="text-link" href="${firm}/tab/info" ${ext}>О студии в 2ГИС</a></div></div></section>`;
}
export function reviewsSection(){
 return `<section class="section wrap reviews" id="reviews"><div class="section-head"><div>${kicker('По словам клиентов')}<h2>Отзывы</h2></div><a class="text-link" href="${reviewsUrl}" ${ext}>Все отзывы в 2ГИС</a></div><div class="review-layout"><div class="rating"><div class="rating-value">4,9<span>/ 5</span></div><div class="stars" aria-hidden="true">★★★★★</div><a href="${reviewsUrl}" ${ext}>37 оценок в 2ГИС</a></div><div class="quotes">${reviews.map(r=>`<figure><blockquote>«${r.text}»</blockquote><figcaption><b>${r.name}</b><a href="${reviewsUrl}?reviewId=${r.id}" ${ext}>Отзыв в 2ГИС</a></figcaption></figure>`).join('')}</div></div></section>`;
}
export function contacts(){
 return `<section id="contacts" class="contacts section"><div class="wrap"><div class="section-head"><div>${kicker('Томск')}<h2>Заезжайте в студию</h2></div></div><div class="contact-grid"><div class="contact-data"><div class="address">${icon('pin')}<div><h3>Мариинский переулок, 44</h3><p>Томск, Октябрьский район</p></div></div><div class="contact-line">${icon('clock')} Пн–сб, 11:00–23:00</div><a class="contact-line" href="tel:+79016180066">${icon('phone')} +7 901 618-00-66</a><a class="contact-line" href="mailto:vinylbro@mail.ru">${icon('mail')} vinylbro@mail.ru</a><div class="actions">${btn(telegram,'Обсудить проект в Telegram','primary','plane',true)}<a class="text-link" href="https://wa.me/79016180066" ${ext}>WhatsApp</a></div></div><div class="map-panel"><div id="map"><button class="load-map" type="button" aria-label="Показать интерактивную карту"><img src="assets/studio.webp" alt="Въезд в студию с вывеской Vinylbro" loading="lazy"><span class="btn ghost">${icon('pin')} Показать карту</span></button></div><div class="map-foot"><span>Мариинский пер., 44</span><a class="text-link" href="${route}" ${ext}>Построить маршрут</a></div></div></div></div></section>`;
}
export const footer=()=>`<footer><div class="wrap"><a href="index.html" aria-label="ВинилБро70, главная">${brand()}</a><span>Детейлинг-студия · Томск</span><a href="#top">Наверх</a></div></footer>`;
export const dialog=()=>`<dialog id="viewer" aria-labelledby="view-title"><div class="viewer-top"><div><small>Фотогалерея</small><h2 id="view-title"></h2></div><button class="round" data-close aria-label="Закрыть просмотр">${icon('close')}</button></div><div class="viewer-stage"><button class="round" data-step="-1" aria-label="Предыдущее фото">${icon('left')}</button><img id="view-image" alt=""><button class="round" data-step="1" aria-label="Следующее фото">${icon('right')}</button></div><div class="viewer-bottom"><span id="view-label"></span><span id="view-counter" aria-live="polite"></span></div></dialog>`;
export function projectPage(p){
 return `<section class="project-page wrap"><a class="crumb" href="works.html">${icon('back')} Каталог работ</a>${kicker(p.type)}<div class="section-head"><h1>${p.name}</h1><span class="project-shade">${p.shade}</span></div><button class="project-main open-picture" aria-label="Открыть фото на весь экран">${photo(p.photos[0],p.labels[0],'project-img',true)}<span class="expand-badge">${icon('expand')}</span></button><p class="project-caption" aria-live="polite">${p.labels[0]}</p><div class="project-toolbar"><div class="thumbs" role="group" aria-label="Ракурсы автомобиля">${p.photos.map((id,i)=>`<button data-thumb="${i}" aria-label="${esc(p.labels[i])}" aria-pressed="${!i}"><img src="assets/photo-${id}-sm.webp" alt="" loading="lazy"></button>`).join('')}</div>${btn(tg('Здравствуйте! Интересует проект «'+p.name+' — '+p.shade+'». Хочу обсудить похожую работу.'),p.cta ?? 'Хочу такую оклейку','primary','plane',true)}</div></section><section class="related section wrap"><div class="section-head"><h2>Ещё работы</h2><a class="text-link" href="works.html">Все работы</a></div><div class="tile-grid">${[1,2,3].map(n=>tile(projects[(projects.indexOf(p)+n)%projects.length])).join('')}</div></section>`;
}

