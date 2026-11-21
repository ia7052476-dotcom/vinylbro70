import fs from 'node:fs';
import {projects, firm, telegram} from './catalog.mjs';
import {hero,header,works,servicesSection,studio,reviewsSection,contacts,footer,dialog,projectPage,esc,projectUrl} from './components.mjs';
const url='https://vinylbro70-tomsk.persistenttide2.chatgpt.site';
const title='ВинилБро70 — оклейка автомобилей и детейлинг в Томске';
const desc='Оклейка автомобилей винилом и защита кузова и оптики в Томске. Фотографии работ студии ВинилБро70. Мариинский переулок, 44. Запись в Telegram.';
const business={'@context':'https://schema.org','@type':'AutomotiveBusiness',name:'ВинилБро70',url,telephone:'+79016180066',email:'vinylbro@mail.ru',address:{'@type':'PostalAddress',streetAddress:'Мариинский переулок, 44',addressLocality:'Томск',postalCode:'634003',addressCountry:'RU'},geo:{'@type':'GeoCoordinates',latitude:56.493551,longitude:84.980018},openingHours:'Mo-Sa 11:00-23:00',image:url+'/assets/photo-0.webp',sameAs:[firm,telegram]};
function write(file,title,description,content,home=false,project=null) {
 const canonical=url+'/'+(home?'':file);
 const image=project?.photos[0]??0;
 const html=`<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#111213"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta property="og:locale" content="ru_RU"><meta property="og:type" content="website"><meta property="og:site_name" content="ВинилБро70"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${url}/assets/photo-${image}.webp"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="assets/mark.svg" type="image/svg+xml"><link rel="preload" href="assets/roboto-cyr.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="styles.css">${home?'<link rel="stylesheet" href="assets/leaflet.css">':''}<script type="application/ld+json">${JSON.stringify(business)}</script></head>
<body id="top" ${project?'data-project="'+project.id+'"':''}>${header(home)}<main id="main">${content}</main>${footer()}${dialog()}<script id="site-data" type="application/json">${JSON.stringify({projects}).replaceAll('<','\\u003c')}</script><script defer src="app.js"></script></body></html>`;
 fs.writeFileSync(new URL('dist/'+file,import.meta.url),html);
}
write('index.html',title,desc,hero()+works()+servicesSection()+studio()+reviewsSection()+contacts(),true);
write('works.html','Каталог работ — ВинилБро70, Томск','Фотографии автомобилей, оклейки отдельных деталей, графики и защиты кузова в студии ВинилБро70.',works(true));
for(const p of projects) write(projectUrl(p),p.name+' — '+p.shade+' | ВинилБро70',p.name+' — '+p.shade+'. Фотографии работы студии ВинилБро70 в Томске.',projectPage(p),false,p);
fs.writeFileSync(new URL('dist/sitemap.xml',import.meta.url),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['','works.html',...projects.map(projectUrl)].map(s=>'<url><loc>'+url+'/'+s+'</loc></url>').join('')+'</urlset>');
fs.writeFileSync(new URL('dist/robots.txt',import.meta.url),'User-agent: *\nAllow: /\nSitemap: '+url+'/sitemap.xml\n');
