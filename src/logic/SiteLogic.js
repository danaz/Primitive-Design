import { Logic } from '../lib/Logic.js';
import { BRANDS } from '../data/brands.js';
import { PRODUCTS, GROUP_SHOTS } from '../data/products.js';
import { CATEGORIES, SORTS, SORT_TITLES } from '../data/catalog.js';
import { MOOD_IMAGES, MOOD_SLOTS } from '../data/mood.js';
import { HERO_INTRO } from '../data/intro.js';

export default class SiteLogic extends Logic {
  state = {
    view: 'home', productId: 'yamakawa-cl049', brandId: 'yamakawa',
    prevView: 'home', mxTop: '20px', mxRight: 'var(--gx)',
    filterCat: 'All', filterBrand: 'All', sort: 'featured', search: '', searchActiveIdx: 0,
    menuOpen: false, searchOpen: false, cartOpen: false, inquiryOpen: false, panelOpen: false, brandPanelOpen: false, visitOpen: false,
    inquiryProduct: null, lightboxOpen: false, galleryIdx: 0,
    cart: [], toast: null, apptSent: false, theme: 'light', brandsVariant: 'image', imageAlt: 'alt5',
    gridFading: false, mainFade: false, failed: {},
    introPlaying: false, introStage: 'done', introCount: 0, cloneVisible: [false,false,false,false], introTargets: [null,null,null,null]
  };

  BR = BRANDS;

  PROD = PRODUCTS;

  CATS = CATEGORIES;


  MOOD = MOOD_IMAGES;
  MOOD_SLOTS = MOOD_SLOTS;

  SORTS = SORTS;
  SORT_TITLES = SORT_TITLES;

  playVids(){ document.querySelectorAll('.pd-card video').forEach(v=>{ v.muted=true; v.defaultMuted=true; v.loop=true; v.playsInline=true; if(v.paused) v.play().catch(()=>{}); }); }
  fitCover(){ const R = document.documentElement;
    const hl0 = [...document.querySelectorAll('.pd-edgrid .pd-hero30')].find(e => e.offsetHeight > 0);
    const t0 = hl0 && hl0.parentElement && hl0.parentElement.querySelector('.pd-tile'), tile = t0 && (t0.parentElement === hl0.parentElement ? t0 : t0.parentElement);
    document.querySelectorAll('[data-cover-fit]').forEach(e => { if(e !== tile) e.removeAttribute('data-cover-fit'); });
    if(!tile || window.innerWidth <= 900){ R.style.removeProperty('--cover-maxw'); return; }
    tile.setAttribute('data-cover-fit', '');
    const card = t0.querySelector('.pd-card'); if(!card || !card.offsetHeight) return;
    const ar = card.offsetWidth / card.offsetHeight, cell = tile.parentElement;
    const hl = hl0;
    const top = tile.getBoundingClientRect().top + window.scrollY;
    const hlH = hl ? hl.offsetHeight + parseFloat(getComputedStyle(hl).marginTop || 0) : 0;
    const extra = Math.max(0, tile.offsetHeight - card.offsetHeight - (tile === t0 ? 0 : 0));
    const avail = window.innerHeight - top - hlH - extra - 28;
    R.style.setProperty('--cover-maxw', Math.max(240, Math.round(avail * ar)) + 'px'); }
  noOrphans(){ if(window.innerWidth > 900) return; document.querySelectorAll('p').forEach(p => {
      const w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT); let last = null, n; while((n = w.nextNode())) if(n.nodeValue.trim()) last = n;
      if(!last) return; const v = last.nodeValue, s = v.trimEnd(), i = s.lastIndexOf(' '); if(i > 0 && s.lastIndexOf('\u00a0') < i && s.length - i < 16) last.nodeValue = v.slice(0, i) + '\u00a0' + v.slice(i + 1); }); }
  componentDidMount(){
    { let q = 0; const run = () => { cancelAnimationFrame(q); q = requestAnimationFrame(() => this.noOrphans()); };
      new MutationObserver(run).observe(document.body, { childList:true, subtree:true, characterData:true }); run(); }
    { const fc = () => { clearTimeout(this._fcT); this._fcT = setTimeout(() => this.fitCover(), 60); }; window.addEventListener('resize', fc); [300, 1200, 3000, 4500].forEach(ms => setTimeout(() => this.fitCover(), ms)); }
    if(!window.__pdIntro){ window.__pdIntro=true; const r=document.documentElement; r.setAttribute('data-intro-wait',''); const t0=Date.now();
      const go=()=>{ r.removeAttribute('data-intro-wait'); r.setAttribute('data-intro',''); setTimeout(()=>r.removeAttribute('data-intro'),3600); };
      const iv=setInterval(()=>{ const im=document.querySelector('.pd-tile[data-hero="anchor"] .pd-card>img'); const ok=im&&im.complete&&im.naturalWidth>0&&document.fonts.status==='loaded'; if(ok||Date.now()-t0>4000){ clearInterval(iv); requestAnimationFrame(()=>requestAnimationFrame(go)); } },60); }
    if(!window.__pdIxArm){ window.__pdIxArm=true; let p0=null;
      document.addEventListener('mousemove',e=>{ const ix=document.querySelector('.pd-ix:not(.pd-ix-armed)'); if(!ix){p0=null;return;}
        if(!p0){p0=[e.clientX,e.clientY];return;} if(Math.hypot(e.clientX-p0[0],e.clientY-p0[1])>8){ix.classList.add('pd-ix-armed');p0=null;} },{passive:true}); }
    this.rasterIntro();
    this._vidIv = setInterval(()=>this.playVids(), 1200); this.playVids();
    /* hammer loop: same frames as the source animation, played slower on a canvas (no src swapping, no flicker) */
    this._hamFrames = Array.from({length:34},(_,i)=>{ const im=new Image(); im.decoding='async'; im.src='assets/hammer/f'+String(i).padStart(2,'0')+'.jpg'; return im; });
    this._hamI = 0; this._hamLast = 0;
    const HAM_MS = 170;
    const hamTick = (t) => {
      this._hamRaf = requestAnimationFrame(hamTick);
      if(t - this._hamLast < HAM_MS) return;
      const box = document.querySelector('.pd-abouthammer'); if(!box) return;
      const fr = this._hamFrames; if(!fr.every(im=>im.complete && im.naturalWidth)) return;
      let cv = box.querySelector('canvas.pd-hamcv');
      if(!cv){ cv=document.createElement('canvas'); cv.className='pd-hamcv'; cv.width=fr[0].naturalWidth; cv.height=fr[0].naturalHeight; cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none'; box.appendChild(cv); }
      this._hamLast = t;
      cv.getContext('2d').drawImage(fr[this._hamI], 0, 0, cv.width, cv.height);
      this._hamI = (this._hamI + 1) % fr.length;
    };
    this._hamRaf = requestAnimationFrame(hamTick);
    this._onScroll = () => {
      this.revealCheck();
      const on = (window.scrollY || window.pageYOffset || 0) > 40;
      if(on !== this._scrolled){ this._scrolled = on; document.documentElement.classList.toggle('pd-scrolled', on); }
    };
    this._onResize = () => { const c = this.effCols(); if(c !== this._cols){ this._cols = c; this.forceUpdate(); } this.layoutMasonry(); };
    window.addEventListener('scroll', this._onScroll, { passive:true });
    window.addEventListener('resize', this._onResize, { passive:true });
    window.addEventListener('load', ()=>this.layoutMasonry());
    this._onClick = (e) => this.handleClick(e);
    document.addEventListener('click', this._onClick);
    this._onKey = (e) => this.handleKey(e);
    document.addEventListener('keydown', this._onKey);
    this._onImgLoad = (e) => { if(e.target && e.target.tagName==='IMG'){ clearTimeout(this._relayout); this._relayout = setTimeout(()=>{ this.layoutMasonry(); this.revealCheck(); }, 80); } };
    document.addEventListener('load', this._onImgLoad, true);
    this._onImgErr = (e) => { const el=e.target; if(!el || el.tagName!=='IMG') return; el.style.display='none'; const raw=el.getAttribute('data-src'); if(raw) this.markFailed(raw)(); };
    document.addEventListener('error', this._onImgErr, true);
    this._reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._lastY = -1;
    this._loop = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      if(y !== this._lastY){ this._lastY = y; this.revealCheck(); }
      this._rafId = requestAnimationFrame(this._loop);
    };
    this._rafId = requestAnimationFrame(this._loop);
    if(typeof IntersectionObserver!=='undefined'){
      this._io = new IntersectionObserver((entries)=>{
        entries.forEach(en=>{ if(en.isIntersecting){ this.revealEl(en.target); this._io.unobserve(en.target); } });
      }, { rootMargin:'0px 0px -2% 0px' });
    }
    document.documentElement.dataset.theme = this.effTheme();
    document.documentElement.dataset.variant = this.state.brandsVariant;
    document.documentElement.dataset.cover = this.state.imageAlt==='wide' ? 'wide' : this.state.imageAlt ? 'alt' : ''; document.documentElement.dataset.alt2 = (this.state.imageAlt==='alt2' || ['alt3','alt4','alt5'].includes(this.state.imageAlt)) ? 'on' : ''; document.documentElement.dataset.alt4 = (this.state.brandsVariant==='image' && ['alt4','alt5'].includes(this.state.imageAlt)) ? 'on' : ''; document.documentElement.dataset.alt5 = (this.state.brandsVariant==='image' && this.state.imageAlt==='alt5') ? 'on' : '';
    document.documentElement.dataset.blend = (this.state.blendOn ?? this.props.heroBlend) ? 'on' : 'off';
    requestAnimationFrame(()=>this.afterRender());
    [80, 250, 600, 1200, 2400].forEach(ms=>setTimeout(()=>{ this.layoutMasonry(); this.revealCheck(); }, ms));
    this.setState({introPlaying:false, introStage:'done'});
    this._assetsN=0; this.forceUpdate();
  }
  effTheme(){ return this.state.theme; }
  componentDidUpdate(){ this.playVids(); document.querySelectorAll('.pd-pair img[data-pair]').forEach(el=>{ const v=el.getAttribute('data-pair')==='A'?this._pairA:this._pairB; if(v){ if(el.getAttribute('src')!==v){ el.setAttribute('src',v); el.setAttribute('data-src',v); el.style.display=''; } } }); document.documentElement.dataset.theme = this.effTheme(); document.documentElement.dataset.variant = this.state.brandsVariant; document.documentElement.dataset.cover = this.state.imageAlt==='wide' ? 'wide' : this.state.imageAlt ? 'alt' : ''; document.documentElement.dataset.alt2 = (this.state.imageAlt==='alt2' || ['alt3','alt4','alt5'].includes(this.state.imageAlt)) ? 'on' : ''; document.documentElement.dataset.alt4 = (this.state.brandsVariant==='image' && ['alt4','alt5'].includes(this.state.imageAlt)) ? 'on' : ''; document.documentElement.dataset.alt5 = (this.state.brandsVariant==='image' && this.state.imageAlt==='alt5') ? 'on' : ''; document.documentElement.dataset.blend = (this.state.blendOn ?? this.props.heroBlend) ? 'on' : 'off'; requestAnimationFrame(()=>this.afterRender()); }
  componentWillUnmount(){ clearInterval(this._vidIv); cancelAnimationFrame(this._hamRaf); window.removeEventListener('scroll', this._onScroll); window.removeEventListener('resize', this._onResize); document.removeEventListener('click', this._onClick); document.removeEventListener('keydown', this._onKey); document.removeEventListener('error', this._onImgErr, true); document.removeEventListener('load', this._onImgLoad, true); this.clearIntroTimers(); }

  /* ---- intro: four pieces compose on the page, then fly into their place in the grid ---- */
  HERO_INTRO = HERO_INTRO;
  INTRO_EASE = 'cubic-bezier(.16,1,.3,1)';
  clearIntroTimers(){ ['_t0','_t1','_t2','_t3','_ct0','_ct1','_ct2','_ct3','_ct4','_settle'].forEach(k=>clearTimeout(this[k])); this.stopCycles(); }
  heroLayer(i){
    const key = this.HERO_INTRO[i].key;
    if(key.indexOf('mood-')===0){ const m = this.MOOD[parseInt(key.slice(5),10)] || this.MOOD[0]; return { src:m.src, fit:'cover', pad:'0', bg:'var(--media)', filter:'none' }; }
    const b = this.brandDecorate(this.BR[key]);
    return { src:b.image || '', fit:b.fit || 'contain', pad:b.pad || '0', bg:b.tileBg || 'var(--media)', filter:b.filter || 'none' };
  }
  buildPool(i){
    const shot = this.PROD.filter(p=>p.images && p.images.length>0).map(p=>{ const d = this.decorate(p); return { src:d.cover, fit:'cover', pad:'0', bg:'var(--media)', filter:'none' }; });
    const mood = this.MOOD.map(m=>({ src:m.src, fit:'cover', pad:'0', bg:'var(--media)', filter:'none' }));
    const all = shot.concat(mood).filter(x=>x.src);
    const rot = all.slice(i*3 % Math.max(1,all.length)).concat(all.slice(0, i*3 % Math.max(1,all.length)));
    const hero = this.heroLayer(i);
    const flat = { src:hero.src, fit:'cover', pad:'0', bg:'var(--media)', filter:'none' };
    return [flat].concat(rot.filter(x=>x.src!==hero.src).slice(0,5));
  }
  startCycles(){
    this.stopCycles();
    this._pools = this.HERO_INTRO.map((h,i)=>this.buildPool(i));
    this._swaps = this.HERO_INTRO.map((h,i)=>setTimeout(()=>this.swapToHero(i), 620 + i*430));
  }
  stopCycles(){ if(this._swaps){ this._swaps.forEach(t=>clearTimeout(t)); this._swaps=null; } }
  openingImage(i){
    const pool = this._pools && this._pools[i];
    if(!pool || pool.length<2) return null;
    return pool[1 + (i % (pool.length-1))];
  }
  swapToHero(i){
    if(this.state.introStage!=='assemble') return;
    const hero = this._pools && this._pools[i] && this._pools[i][0];
    if(!hero) return;
    this.setState(s=>{
      const top=(s.cloneTop||[0,0,0,0]).slice(), A=(s.cloneA||[null,null,null,null]).slice(), B=(s.cloneB||[null,null,null,null]).slice();
      if(top[i]===0){ B[i]=hero; top[i]=1; } else { A[i]=hero; top[i]=0; }
      return { cloneTop:top, cloneA:A, cloneB:B };
    });
  }
  settleToHero(){
    this.stopCycles();
    this.setState(s=>{
      const top=(s.cloneTop||[0,0,0,0]).slice(), A=(s.cloneA||[null,null,null,null]).slice(), B=(s.cloneB||[null,null,null,null]).slice();
      this.HERO_INTRO.forEach((h,i)=>{ const hero=this.heroLayer(i); if(top[i]===0){ if(A[i]&&A[i].src!==hero.src){ B[i]=hero; top[i]=1; } } else if(B[i]&&B[i].src!==hero.src){ A[i]=hero; top[i]=0; } });
      return { cloneTop:top, cloneA:A, cloneB:B };
    });
  }
  effCols(){
    const base = Math.max(2, Math.min(6, this.props.homeColumns ?? 4));
    const w = (typeof window !== 'undefined' && window.innerWidth) || 1440;
    if(w <= 900) return 2;
    if(w <= 1100) return Math.min(3, base);
    return base;
  }
  lockScroll(on){
    const html = document.documentElement;
    if(on){ this._sbw = window.innerWidth - html.clientWidth; html.style.overflow='hidden'; if(this._sbw>0) html.style.paddingRight=this._sbw+'px'; }
    else { html.style.overflow=''; html.style.paddingRight=''; }
  }
  heroCards(){ return this.HERO_INTRO.map(h=>document.querySelector('.pd-tile[data-hero="'+h.key+'"] .pd-card')); }
  runIntro(){
    this._settled = false;
    this.clearIntroTimers();
    window.scrollTo(0,0);
    this.lockScroll(true);
    document.querySelectorAll('[data-reveal]').forEach(el=>{ el.__revealed=false; el.__rInit=false; });
    this.heroCards().forEach(c=>{ if(c){ c.style.transition='none'; c.style.opacity='0'; } });
    this._pools = this.HERO_INTRO.map((h,i)=>this.buildPool(i));
    const openA = this.HERO_INTRO.map((h,i)=>this.openingImage(i));
    this.setState({ introPlaying:true, introStage:'empty', introCount:0, cloneVisible:[false,false,false,false], introTargets:[null,null,null,null], cloneA:openA, cloneB:[null,null,null,null], cloneTop:[0,0,0,0] });
    this._t0 = setTimeout(()=>{
      this.setState({introStage:'assemble'});
      this.HERO_INTRO.forEach((h,i)=>{ this['_ct'+i] = setTimeout(()=>{ this.setState(s=>{ const v=s.cloneVisible.slice(); v[i]=true; return { cloneVisible:v, introCount:i+1 }; }); }, i*130); });
    }, 200);
    this._ct4 = setTimeout(()=>this.startCycles(), 200);
    this._t1 = setTimeout(()=>this.beginFlip(), 3050);
  }
  skipIntro(){ if(this.state.introStage==='flip'||this.state.introStage==='cross') return; this.clearIntroTimers(); this.beginFlip(); }
  beginFlip(){
    this.clearIntroTimers();
    this.layoutMasonry();
    const targets = this.heroCards().map((c,i)=>{
      const clone = document.querySelector('[data-clone="'+i+'"]');
      if(!c || !clone) return null;
      const r = c.getBoundingClientRect(), q = clone.getBoundingClientRect();
      const s = r.width / q.width;
      return { transform: 'translate('+(r.left-q.left).toFixed(1)+'px,'+(r.top-q.top).toFixed(1)+'px) scale('+s.toFixed(4)+')' };
    });
    this.setState({ introStage:'flip', introTargets:targets, cloneVisible:[true,true,true,true], introCount:4 });
    this._t2 = setTimeout(()=>this.crossfade(), 1100);
  }
  flyWordmark(){
    const word = document.getElementById('pd-intro-word');
    const logo = document.getElementById('pd-header-logo');
    if(!word || !logo) return 0;
    const w = word.getBoundingClientRect(), l = logo.getBoundingClientRect();
    const fs = el => parseFloat(getComputedStyle(el).fontSize) || 1;
    const scale = fs(logo) / fs(word);
    const dx = l.left - w.left;
    const dy = (l.top + l.height / 2) - (w.top + w.height / 2);
    logo.style.opacity = '0';
    this._logoEl = logo;
    word.style.transition = 'transform 1s ' + this.INTRO_EASE;
    word.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px) scale(' + scale.toFixed(4) + ')';
    return 1150;
  }
  crossfade(){
    this.heroCards().forEach(c=>{ if(c){ c.style.transition='none'; void c.offsetHeight; c.style.opacity='1'; } });
    this.setState({introStage:'cross'});
    const flight = this.flyWordmark();
    this._t3 = setTimeout(()=>{
      if(this._logoEl){ this._logoEl.style.opacity=''; this._logoEl=null; }
      this.setState({ introPlaying:false, introStage:'done' });
      this.lockScroll(false);
      this.heroCards().forEach(c=>{ if(c){ c.style.transition=''; c.style.opacity=''; } });
      const heroTiles = this.HERO_INTRO.map(h=>document.querySelector('.pd-tile[data-hero="'+h.key+'"]'));
      heroTiles.forEach(el=>{ if(el){ el.__revealed=true; el.__rInit=true; el.style.opacity=''; el.style.transform=''; el.style.transition=''; } });
      requestAnimationFrame(()=>{ this.initReveal(); this.revealCheck(true); });
    }, Math.max(600, flight));
  }
  endIntro(){ this.skipIntro(); }

  /* ---- reveal + masonry ---- */
  afterRender(){
    this.initReveal(); this.layoutMasonry();
    requestAnimationFrame(()=>this.layoutMasonry());
    clearTimeout(this._relayout); this._relayout = setTimeout(()=>{ this.layoutMasonry(); this.revealCheck(); }, 160);
  }
  layoutMasonry(){
    document.querySelectorAll('.pd-grid').forEach(grid=>{
      const rowH = parseFloat(getComputedStyle(grid).gridAutoRows) || 8;
      const tiles = [...grid.querySelectorAll('.pd-tile')];
      tiles.forEach(t=>{
        const h = Math.max(t.scrollHeight, t.offsetHeight, t.getBoundingClientRect().height);
        if(h > 2){
          const span = 'span ' + Math.max(1, Math.round(h / rowH));
          if(t.style.gridRowEnd !== span) t.style.gridRowEnd = span;
          t.__h = h;
        }
        if(!t.__ro && typeof ResizeObserver!=='undefined'){
          t.__ro = new ResizeObserver(()=>{
            const nh = Math.max(t.scrollHeight, t.offsetHeight);
            if(Math.abs(nh - (t.__h || 0)) < 2) return;
            clearTimeout(this._relayout); this._relayout = setTimeout(()=>this.layoutMasonry(), 90);
          });
          t.__ro.observe(t);
        }
      });
    });
  }
  initReveal(){
    const els = document.querySelectorAll('[data-reveal]'); if(!els.length) return;
    const hero = this.state.introPlaying ? this.HERO_INTRO.map(h=>h.key) : [];
    els.forEach(el=>{ if(el.__rInit) return; el.__rInit=true;
      if(this._reduce || el.closest('.pd-ix') || (el.dataset.hero && hero.indexOf(el.dataset.hero)>=0)){ el.__revealed=true; el.style.opacity=''; el.style.transform=''; return; }
      el.style.opacity='0'; el.style.transform='translateY(10px)';
      el.style.transition='opacity .5s cubic-bezier(.2,.8,.2,1), transform .5s cubic-bezier(.2,.8,.2,1)';
      if(this._io) this._io.observe(el);
    });
    if(!this.state.introPlaying) this.revealCheck(!this._firstRevealDone), this._firstRevealDone = true;
  }
  revealEl(el, d){
    if(!el || el.__revealed) return;
    el.__revealed = true;
    const delay = d || 0;
    el.style.transitionDelay = delay+'ms';
    el.style.opacity='1'; el.style.transform='translateY(0)';
    setTimeout(()=>{ el.style.transition=''; el.style.transitionDelay=''; el.style.transform=''; el.style.opacity=''; }, 900+delay);
  }
  revealCheck(stagger){
    if(this._reduce) return;
    let n = 0;
    document.querySelectorAll('[data-reveal]').forEach(el=>{
      if(el.__revealed) return;
      const r = el.getBoundingClientRect();
      if(r.bottom > 0 && r.top < window.innerHeight*0.98){
        el.__revealed=true;
        const d = stagger ? Math.min(n*70, 1200) : 0; n++;
        el.style.transitionDelay = d+'ms';
        el.style.opacity='1'; el.style.transform='translateY(0)';
        setTimeout(()=>{ el.style.transition=''; el.style.transitionDelay=''; el.style.transform=''; el.style.opacity=''; }, 900+d);
      }
    });
  }

  materialsList(){
    if(this._mats) return this._mats;
    const M=[
      {name:'Bent beech',origin:'Central Europe · Thonet',re:/beech/i,text:'Solid beech is steamed until pliable, then bent into iron moulds and left to dry in shape. Michael Thonet developed the method in the mid-19th century; it still lets a chair be built from a few continuous, load-bearing curves.',props:'Dense, close-grained, pale; takes stain and lacquer evenly',care:'Dust with a dry cloth; keep away from radiators and direct sun'},
      {name:'Rattan',origin:'Southeast Asia · woven in Japan',re:/rattan/i,text:'A climbing palm from tropical forests. The solid core is heated and bent for frames; the glossy outer skin is split into strands for binding and weaving. Light for its strength, it flexes rather than breaks.',props:'Light, springy, warm honey tone that deepens with age',care:'Wipe with a damp cloth now and then; avoid very dry heat'},
      {name:'Cane',origin:'Rattan skin',re:/cane/i,text:'Thin strips peeled from rattan and woven into an open, often hexagonal, mesh. It lets a seat breathe and gives slightly under the body.',props:'Fine, translucent weave; firm with a little give',care:'Occasionally wipe the underside with a damp cloth to keep the fibres supple'},
      {name:'Hand-woven cord',origin:'Woven by hand over steel',re:/cord/i,text:'Synthetic cord is wrapped and knotted by hand over a welded steel frame, one seat at a time. The cord is made for outdoor life, so the same pieces work on a terrace or at a dining table.',props:'Weatherproof, colour-fast, soft to the touch',care:'Rinse with water and mild soap; dry in the open air'},
      {name:'Steel',origin:'Tubular and solid frames',re:/steel|chrom/i,text:'Steel gives a frame strength at a small section, which is why it carries woven seats, cantilevers and thin legs. It is finished with powder coating or chrome.',props:'Strong, slender, precise',care:'Wipe with a soft dry cloth; use a non-abrasive cleaner on chrome'},
      {name:'Teak and solid wood',origin:'Indonesia',re:/teak|solid wood/i,text:'Primitive pieces carved by hand from a single block, then restored slowly before they reach the gallery. Teak is rich in natural oils, which help it resist moisture and wear.',props:'Heavy, oily, tool marks left visible',care:'Feed with a natural oil once or twice a year; outdoors it weathers to silver-grey'},
      {name:'Polypropylene',origin:'Injection-moulded',re:/polypropylene/i,text:'A thermoplastic moulded into a single shell with no joints. It is light, stackable and recyclable, and keeps its colour through daily use.',props:'Light, smooth, through-coloured',care:'Clean with water and a mild detergent'},
      {name:'Leather',origin:'Hides, tanned and cut by hand',re:/leather/i,text:'Each hide carries its own marks and variations in tone. Over years of use leather softens and develops a patina that is part of its value.',props:'Supple, durable, ages with use',care:'Keep out of direct sun; condition once or twice a year'},
      {name:'Upholstery',origin:'Fabrics, foams and frames',re:/foam|upholster|fabric/i,text:'Sofas and armchairs are built on solid wood frames with springs and layered cold foam, then covered in a fabric or leather chosen with the client from the maker\u2019s range.',props:'Made to order, wide choice of covers',care:'Vacuum regularly; treat spills with a dry cloth straight away'}
    ];
    this._mats = M.map(m=>{
      const all=this.PROD.filter(p=>m.re.test((p.materials||'')+' '+(p.desc||'')));
      const pieces=all.filter(p=>p.images&&p.images.length).slice(0,4).map(p=>({id:p.id,name:p.name,cover:this.imgSrc(p.images[0])}));
      return {name:m.name,origin:m.origin,text:m.text,props:m.props,care:m.care,pieces,countLabel:all.length? all.length+(all.length===1?' piece':' pieces'):'On request'};
    }).filter(m=>m.pieces.length);
    return this._mats;
  }
  /* ---- navigation ---- */
  go(view, opts={}){
    if(view==='brands') view='home';
    this.lockScroll(false);
    const s = { view, visitOpen:false, prevView: this.state.view==='collection' ? (this.state.prevView||'home') : this.state.view, menuOpen:false, searchOpen:false, cartOpen:false, inquiryOpen:false, lightboxOpen:false, panelOpen:false, apptSent:false };
    if(view==='brand'){ s.brandId = opts.id || this.state.brandId; }
    this.setState(s);
    if(view==='collection'){ this.lockScroll(true); return; }
    try{ window.scrollTo(0,0); }catch(e){}
  }
  openPanel(id){
    this.lockScroll(true);
    this.setState({ panelOpen:true, brandPanelOpen:false, productId:id, galleryIdx:0, searchOpen:false, cartOpen:false, lightboxOpen:false });
  }
  openBrandPanel(id, pieceId, vIdx){
    this.lockScroll(true);
    this.setState({ brandPanelOpen:true, panelOpen:false, brandId:id, bpanelPiece:pieceId || '', bpanelIdx:+vIdx || 0, searchOpen:false, cartOpen:false, lightboxOpen:false });
  }
  closeBrandPanel(){ if(this.state.view!=='collection') this.lockScroll(false); this.setState({ brandPanelOpen:false }); }
  closePanel(){ this.lockScroll(false); this.setState({ panelOpen:false, lightboxOpen:false, inquiryOpen:false }); }

  handleKey(e){
    if(this.state.searchOpen){
      const results = this.getSearchResults();
      if(e.key==='Escape'){ this.setState({searchOpen:false}); this.lockScroll(false); }
      else if(e.key==='ArrowDown'){ e.preventDefault(); this.setState(s=>({searchActiveIdx: Math.min((s.searchActiveIdx||0)+1, Math.max(0,results.length-1))})); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); this.setState(s=>({searchActiveIdx: Math.max((s.searchActiveIdx||0)-1, 0)})); }
      else if(e.key==='Enter'){ e.preventDefault(); const r = results[Math.min(this.state.searchActiveIdx||0, results.length-1)]; if(r) this.openPanel(r.id); }
      return;
    }
    if(this.state.lightboxOpen){
      const p = this.curProduct(); if(!p) return;
      if(e.key==='Escape') this.setState({lightboxOpen:false});
      else if(e.key==='ArrowLeft' && p.images.length>1) this.shiftGallery(-1,p);
      else if(e.key==='ArrowRight' && p.images.length>1) this.shiftGallery(1,p);
    } else if(e.key==='Escape'){
      if(this.state.inquiryOpen){ this.setState({inquiryOpen:false}); return; }
      if(this.state.visitOpen){ this.setState({visitOpen:false}); this.lockScroll(false); return; }
      if(this.state.brandPanelOpen){ this.closeBrandPanel(); return; }
      if(this.state.view==='collection' && !this.state.panelOpen){ this.go(this.state.prevView && this.state.prevView!=='collection' ? this.state.prevView : 'home'); return; }
      if(this.state.inquiryOpen) this.setState({inquiryOpen:false});
      else if(this.state.cartOpen) this.setState({cartOpen:false});
      else if(this.state.panelOpen) this.closePanel();
      else if(this.state.menuOpen) this.setState({menuOpen:false});
    }
  }
  shiftGallery(dir,p){
    if(!p || !p.variants || p.images.length<2) return;
    this.setState({mainFade:true});
    clearTimeout(this._imgT);
    this._imgT = setTimeout(()=>this.setState(s=>({galleryIdx:(s.galleryIdx+dir+p.images.length)%p.images.length, mainFade:false})), 140);
  }
  scrollIndexList(delay){
    clearTimeout(this._ixScrollT);
    this._ixScrollT = setTimeout(()=>{
      const box = document.querySelector('.pd-ix'), head = document.getElementById('pd-ix-listhead');
      if(!box || !head) return;
      let off = 0;
      for(let el = head; el && el !== box; el = el.offsetParent) off += el.offsetTop;
      const top = Math.max(0, Math.min(off - 24, box.scrollHeight - box.clientHeight));
      box.scrollTop = top;
    }, delay || 0);
  }
  splitBody(text){
    const t = (text || '').trim();
    if(t.length < 220) return [t, ''];
    const parts = t.match(/[^.!?]+[.!?]+[\s]*/g);
    if(!parts || parts.length < 3) return [t, ''];
    let acc = 0, cut = 0, half = t.length / 2, bestGap = Infinity;
    parts.forEach((p,i)=>{
      acc += p.length;
      const gap = Math.abs(acc - half);
      if(i < parts.length - 1 && gap < bestGap){ bestGap = gap; cut = i + 1; }
    });
    return [parts.slice(0, cut).join('').trim(), parts.slice(cut).join('').trim()];
  }
  applyFilter(patch){
    this.setState({gridFading:true});
    clearTimeout(this._fadeT);
    this._fadeT = setTimeout(()=>{ this.setState(Object.assign({gridFading:false}, patch)); requestAnimationFrame(()=>this.revealCheck(true)); }, 180);
  }

  handleClick(e){
    const pdfA = e.target.closest('a[href$=".pdf"]');
    if(pdfA && !/^https?:/i.test(pdfA.getAttribute('href'))){ e.preventDefault();
      const w = window.open('', '_blank'); const url = new URL(pdfA.getAttribute('href'), location.href).href;
      fetch(url, { credentials:'include' }).then(r=>{ if(!r.ok) throw 0; return r.blob(); })
        .then(b=>{ const u = URL.createObjectURL(new Blob([b], { type:'application/pdf' })); if(w) w.location.href = u; else location.href = u; })
        .catch(()=>{ if(w) w.close(); this.setState({ toast:'Catalogue unavailable' }); });
      return; }
    if(e.target.closest('.pd-thumb,[data-action="bvariant"],[data-action="gallery"]')) document.documentElement.removeAttribute('data-pvk');
    if(window.innerWidth <= 760){ const R = document.documentElement.style, bb = document.querySelector('.pd-burger'), br = bb && bb.getBoundingClientRect();
      if(br && br.width){ R.setProperty('--mx-top', Math.round(br.top)+'px'); R.setProperty('--mx-right', Math.round(window.innerWidth - br.right)+'px'); }
      const tc = e.target.closest('[data-brand-open]'), cd = tc && tc.querySelector('.pd-card'), cr = cd && cd.getBoundingClientRect();
      if(tc) document.documentElement.removeAttribute('data-pvk');
      const himg = cd && cd.querySelector('img');
      const isCover = tc && tc === [...document.querySelectorAll('.pd-edgrid .pd-tile')].find(x => x.offsetHeight > 0);
      if(isCover && himg && !(cd.querySelector('video'))){ const drawn = (im, z) => { const cs = getComputedStyle(im); if(cs.objectFit !== 'contain' || !im.naturalWidth) return null;
          const W = im.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), H = im.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
          const s = Math.min(W/im.naturalWidth, H/im.naturalHeight); return im.naturalHeight * s * z; };
        const hz = parseFloat(getComputedStyle(himg).getPropertyValue('--imgz')) || 1, hh = drawn(himg, hz);
        const cen = (im, box, z) => { const cs = getComputedStyle(im), r = box.getBoundingClientRect(); return { x: r.width/2 + (parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight))/2*z, y: r.height/2 + (parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom))/2*z }; };
        const hc = cen(himg, himg.parentElement, hz);
        const fit = () => { const mi = document.querySelector('.pd-panel-center .pd-panel-frame>img'); if(!mi || !hh) return;
          const go = () => { const mh = drawn(mi, 1); if(mh){ const k = hh/mh, mc = cen(mi, mi.parentElement, k); R.setProperty('--pv-k', k.toFixed(4)); R.setProperty('--pv-dx', Math.round(hc.x - mc.x)+'px'); R.setProperty('--pv-dy', Math.round(hc.y - mc.y)+'px'); document.documentElement.setAttribute('data-pvk','on'); } };
          if(mi.complete && mi.naturalWidth) go(); else mi.addEventListener('load', go, { once:true }); };
        setTimeout(fit, 30); setTimeout(fit, 350); }
      if(cr && cr.width){ R.setProperty('--pv-top', Math.round(Math.max(64, Math.min(cr.top, 120)))+'px'); if(isCover) R.setProperty('--pv-w', Math.round(cr.width)+'px'); else R.removeProperty('--pv-w'); } }
    const bopen = e.target.closest('[data-brand-open]');
    if(bopen){ e.preventDefault(); const bid=bopen.dataset.brandOpen; if(bid && this.BR[bid]){ const pid=bopen.dataset.piece; let vix = bopen.dataset.variant; const timg = bopen.querySelector('img'); if(!vix && pid==='horm-vad' && timg && /horm-vad-olive/.test(timg.getAttribute('src')||'')) vix = 1; this.openBrandPanel(bid, (pid && this.PROD.some(p=>p.id===pid && p.brand===bid)) ? pid : '', vix); } return; }
    const open = e.target.closest('[data-open]');
    if(open){ e.preventDefault(); if(open.dataset.open) this.openPanel(open.dataset.open); return; }
    const nav = e.target.closest('[data-go]');
    const act = e.target.closest('[data-action]');
    if(nav){ e.preventDefault(); if(nav.dataset.go) this.go(nav.dataset.go, { id:nav.dataset.id }); return; }
    if(!act) return;
    const a = act.dataset.action; e.preventDefault();
    if(a==='menu'){ const on = !this.state.menuOpen; const bb = document.querySelector('.pd-burger'); const r = on && bb ? bb.getBoundingClientRect() : null;
      this.setState(r && r.width ? {menuOpen:on, mxTop:Math.round(r.top)+'px', mxRight:Math.round(window.innerWidth - r.right)+'px'} : {menuOpen:on}); this.lockScroll(on); }
    else if(a==='blend') this.setState(s=>({blendOn: !s.blendOn}));
    else if(a==='variant') this.setState(s=> s.brandsVariant!=='image' ? { brandsVariant:'image', imageAlt:true } : !s.imageAlt ? { brandsVariant:'text', imageAlt:false } : s.imageAlt===true ? { imageAlt:'alt2' } : s.imageAlt==='alt2' ? { imageAlt:'alt3' } : s.imageAlt==='alt3' ? { imageAlt:'alt4' } : s.imageAlt==='alt4' ? { imageAlt:'alt5' } : { brandsVariant:'image', imageAlt:false });
    else if(a==='replayintro'){ this.closePanel(); this.setState({view:'home'}); requestAnimationFrame(()=>this.runIntro()); }
    else if(a==='skipintro') this.skipIntro();
    else if(a==='search'){ this.setState({searchOpen:true, menuOpen:false, search:'', searchActiveIdx:0}); this.lockScroll(true); }
    else if(a==='closesearch'){ this.setState({searchOpen:false}); this.lockScroll(false); }
    else if(a==='cart') this.setState({cartOpen:true});
    else if(a==='closecart') this.setState({cartOpen:false});
    else if(a==='closepanel') this.closePanel();
    else if(a==='closebrandpanel') this.closeBrandPanel();
    else if(a==='bvariant') this.setState({bpanelIdx: parseInt(act.dataset.idx,10) || 0});
    else if(a==='visit'){ this.setState({visitOpen:true, menuOpen:false}); this.lockScroll(true); }
    else if(a==='closevisit'){ this.setState({visitOpen:false}); this.lockScroll(false); }
    else if(a==='closeinquiry') this.setState({inquiryOpen:false});
    else if(a==='closecollection') this.go(this.state.prevView && this.state.prevView!=='collection' ? this.state.prevView : 'home');
    else if(a==='ixtoggle'){ this.setState(s=>({ ixOpen: s.ixOpen===act.dataset.value ? null : act.dataset.value }));
      { const box = act.closest('.pd-ix'), t0 = performance.now(); if(box && !act.classList.contains('pd-ix-row-on')){
        const step = () => { const br = box.getBoundingClientRect(), rr = act.getBoundingClientRect();
          const over = rr.bottom + 24 - br.bottom, room = rr.top - br.top - 72;
          if(over > 0 && room > 0) box.scrollTop += Math.min(over, room, 28);
          if(performance.now() - t0 < 900) requestAnimationFrame(step); };
        requestAnimationFrame(step); } } }
    else if(a==='filtercat'){ try{ act.blur(); }catch(err){} this.setState({ixOpen:null}); this.applyFilter({filterCat:act.dataset.value}); this.scrollIndexList(280); }
    else if(a==='clearfilters') this.applyFilter({filterCat:'All',filterBrand:'All',sort:'featured',search:''});
    else if(a==='sort'){ const i = this.SORTS.indexOf(this.state.sort); this.applyFilter({sort:this.SORTS[(i+1)%this.SORTS.length]}); }
    else if(a==='whatsapp'){ const st=this.state; const p = st.brandPanelOpen && st.bpanelPiece ? this.PROD.find(x=>x.id===st.bpanelPiece) : (st.panelOpen ? this.curProduct() : null); const txt = p ? 'Hello, I would like to ask about '+p.name+(p.brandName?' by '+p.brandName:'')+'.' : 'Hello, I would like to get in touch.'; window.open('https://wa.me/972508385580?text='+encodeURIComponent(txt),'_blank','noopener'); }
    else if(a==='gallery') this.shiftGallery(+act.dataset.idx - this.state.galleryIdx, this.curProduct());
    else if(a==='lightbox'){ const p=this.curProduct(); if(p && p.images.length && !this.state.failed[p.images[this.state.galleryIdx]]) this.setState({lightboxOpen:true}); }
    else if(a==='closelightbox') this.setState({lightboxOpen:false});
    else if(a==='lbprev'){ this.shiftGallery(-1, this.curProduct()); }
    else if(a==='lbnext'){ this.shiftGallery(1, this.curProduct()); }
    else if(a==='bpadd') this.addPiece(this.state.bpanelPiece);
    else if(a==='bpcontact'){ const bp = this.PROD.find(x=>x.id===this.state.bpanelPiece); this.setState({ inquiryOpen:true, inquiryProduct: bp ? bp.name : null }); }
    else if(a==='primary') this.primaryAction();
    else if(a==='secondary') this.openInquiry();
    else if(a==='removecart') this.setState(s=>({cart:s.cart.filter(c=>c.id!==act.dataset.id)}));
    else if(a==='submitcart'){ this.setState({cart:[],cartOpen:false}); this.flash('Inquiry list sent. We will be in touch'); }
  }

  /* first paint shows the halftone of the hero, then dissolves into the photograph */
  rasterIntro(){
    if(this._rasterDone) return; this._rasterDone = true;
    const RASTER = this.assetUrl('assets/hero-light-frama-raster.png');
    const pre = new Image(); pre.decoding='async'; pre.src = RASTER;
    const t0 = Date.now();
    const tick = setInterval(()=>{
      const main = document.querySelector('.pd-tile[data-hero="anchor"] .pd-card img');
      if(!main){ if(Date.now()-t0 > 6000) clearInterval(tick); return; }
      clearInterval(tick);
      if(!/hero-light-frama/.test(main.getAttribute('data-src')||main.src)) return;
      const card = main.parentNode;
      const ov = main.cloneNode(false);
      ov.removeAttribute('data-src'); ov.removeAttribute('loading'); ov.alt = '';
      ov.setAttribute('aria-hidden','true');
      ov.style.position='absolute'; ov.style.inset='0'; ov.style.width='100%'; ov.style.height='100%';
      ov.style.zIndex='1'; ov.style.pointerEvents='none'; ov.style.opacity='0';
      ov.style.transition='opacity 1.6s cubic-bezier(.4,0,.2,1)';
      main.style.transition='opacity .6s ease'; main.style.opacity='0';
      card.appendChild(ov);
      const ready = im => (im.naturalWidth > 0) ? Promise.resolve() : Promise.race([ new Promise(r=>{ im.addEventListener('load',r,{once:true}); im.addEventListener('error',r,{once:true}); }), new Promise(r=>setTimeout(r,2500)) ]);
      main.loading = 'eager'; main.removeAttribute('loading');
      /* coarse halftone first, resolving into the fine one, then the photograph */
      const ov2 = ov.cloneNode(false); ov2.style.zIndex='2';
      card.appendChild(ov2);
      ov.src = RASTER; ov2.src = this.assetUrl('assets/hero-light-frama-raster2.png');
      const wait = ms => new Promise(r=>setTimeout(r,ms));
      Promise.all([ready(ov), ready(ov2)]).then(()=>{
        ov2.style.transition='opacity .5s ease'; ov2.style.opacity='1';
        return wait(750);
      }).then(()=>{
        ov.style.transition='none'; ov.style.opacity='1';
        ov2.style.transition='opacity 1s cubic-bezier(.4,0,.2,1)'; ov2.style.opacity='0';
        return Promise.all([ready(main), wait(1100)]);
      }).then(()=>{
        ov2.remove();
        main.style.transition='none'; main.style.opacity='1';
        requestAnimationFrame(()=>{ ov.style.transition='opacity 1.6s cubic-bezier(.4,0,.2,1)'; ov.style.opacity='0'; });
        setTimeout(()=>{ ov.remove(); main.style.transition=''; }, 1800);
      });
    }, 60);
  }
  /* ---- data helpers ---- */
  curProduct(){ return this.PROD.find(p=>p.id===this.state.productId); }
  assetUrl(src){
    if(!src) return null;
    if(!this._assets || !this._assetsN){ const m={}; let n=0; document.querySelectorAll('img[data-asset]').forEach(i=>{ m[i.dataset.asset]=i.getAttribute('src'); n++; }); this._assets=m; this._assetsN=n; }
    return this._assets[src] || src;
  }
  imgSrc(src){ return (src && !this.state.failed[src]) ? this.assetUrl(src) : null; }
  markFailed(src){ return ()=>{ if(!src || this.state.failed[src]) return; this.setState(s=>({ failed: Object.assign({}, s.failed, {[src]:true}) })); }; }
  priceLabel(p){
    if(!this.props.showPrices) return '';
    if(!p || !p.price) return '';
    if(p.price.type==='fixed') return '₪' + p.price.amount.toLocaleString();
    if(p.price.type==='from') return '₪' + p.price.amount.toLocaleString() + (p.price.max ? '–' + p.price.max.toLocaleString() : '');
    return 'On request';
  }
  priceNote(p){ return (this.props.showPrices && p && p.price && p.price.type==='from') ? (p.price.max ? 'Price range by size and configuration. Final price depends on size, finish and upholstery.' : 'Base model price. Final price depends on size, finish and upholstery.') : ''; }
  addPiece(id){
    const p = this.PROD.find(x=>x.id===id); if(!p) return;
    if(this.state.cart.find(c=>c.id===p.id)){ this.setState({cartOpen:true}); return; }
    this.setState(s=>({cart:[...s.cart,{id:p.id,name:p.name,brandName:(this.BR[p.brand]||{}).name||'',priceLabel:this.priceLabel(p)||'On request',cover:this.imgSrc(p.images[0])}]}));
    this.flash('Added to your inquiry list');
  }
  primaryAction(){
    const p = this.curProduct(); if(!p) return;
    const assisted = this.props.assistedOnly || p.price.type!=='fixed';
    if(assisted){ this.openInquiry(); }
    else if(this.state.cart.find(c=>c.id===p.id)){ this.setState({cartOpen:true}); }
    else { this.setState(s=>({cart:[...s.cart,{id:p.id,name:p.name,brandName:this.BR[p.brand].name,priceLabel:this.priceLabel(p)||'₪'+p.price.amount.toLocaleString(),cover:this.imgSrc(p.images[0])}]})); this.flash('Added to your inquiry list'); }
  }
  openInquiry(){ const p=this.curProduct(); this.setState({ inquiryOpen:true, inquiryProduct:p?p.name:null }); }
  onInquiry = (e)=>{ e.preventDefault(); const f=e.target; const v=[...f.querySelectorAll('input,textarea')].map(x=>x.value.trim());
    const body=new URLSearchParams({'form-name':'inquiry', product:this.state.inquiryProduct||'General', name:v[0]||'', email:v[1]||'', phone:v[2]||'', message:v[3]||''});
    const btn=f.querySelector('button[type=submit]'); if(btn){ btn.disabled=true; btn.style.opacity='.5'; }
    fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:body.toString() })
      .then(r=>{ if(!r.ok) throw 0; this.setState({inquiryOpen:false}); this.flash('Thank you, your inquiry has been sent'); })
      .catch(()=>{ if(btn){ btn.disabled=false; btn.style.opacity=''; } this.flash('Could not send. Please email ' + ['info','primitiveanddesign.com'].join(String.fromCharCode(64))); }); };
  onAppointment = (e)=>{ e.preventDefault(); this.setState({apptSent:true}); };
  onSearch = (e)=>{ this.setState({search:e.target.value, searchActiveIdx:0}); };
  onBrandFilter = (e)=>{ this.applyFilter({filterBrand:e.target.value}); };
  stop = (e)=>{ e.stopPropagation(); };
  flash(msg){ this.setState({toast:msg}); clearTimeout(this._t); this._t=setTimeout(()=>this.setState({toast:null}),2200); }
  getSearchResults(){
    const q = (this.state.search||'').trim().toLowerCase();
    if(!q) return [];
    return this.PROD.filter(p=>{
      const brandName = this.BR[p.brand].name.toLowerCase();
      return brandName.includes(q) || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }).slice(0,8).map(p=>this.decorate(p));
  }
  primaryLabel(p){
    const assisted = this.props.assistedOnly || p.price.type!=='fixed';
    if(p.price.type==='request') return 'Check availability';
    if(assisted) return 'Request details';
    return 'Add to inquiry';
  }
  secondaryLabel(p){ return (p.price.type==='fixed' && !this.props.assistedOnly) ? 'Request details' : 'Book appointment'; }
  brandDecorate(b){
    return Object.assign({}, b, {
      image: this.imgSrc(b.image),
      noImage: !this.imgSrc(b.image),
      raw: b.image || '',
      fit: b.fit || 'contain', pad: b.fit==='cover' ? '0' : '5%', zoom: b.fit==='cover' ? 1 : 0.9, filter: (b.id==='thonet') ? 'brightness(1.045)' : 'none',
      short: b.short || 'Collection details in preparation.',
      long: b.long || 'Collection details in preparation. Please contact the gallery for current availability from this house.'
    });
  }
  /* global rule: grid blocks show a single piece — group shots never act as covers */
  MULTI = GROUP_SHOTS;
  singleImgs(p){ return (p.images||[]).filter(s=>!this.MULTI.includes(s)); }
  decorate(p){
    const cover = this.imgSrc(this.singleImgs(p)[0]);
    const THUMBS = ['horm-leon-wood','magenta-bitton','mocoba-classic-3x3','mocoba-classic-5x2','norr11-ghost-coffee','horm-network','horm-le-jardin','horm-carlos','horm-bifronte','gaga-no5','yamakawa-c607','yamakawa-cl049','gaga-spot','gaga-double-d-low','gaga-2-rings','gaga-spot-stool','gaga-low-back','gaga-double-d','horm-him-her','thonet-s243','thonet-s33','yamakawa-cd177','yamakawa-cd079','horm-twist','horm-tahiti','koozo-footstool','thonet-118spfv','koozo-110','cuero-butterfly','koozo-jerry','koozo-fay','koozo-ryan','koozo-kylie','koozo-dennis','horm-cherish','horm-albino-torcia','yamakawa-cl081','yamakawa-bs603','yamakawa-cd080','yamakawa-cd277','yamakawa-cd019','yamakawa-cd160','yamakawa-td022','yamakawa-bs144','horm-vad','horm-tango','koozo-jason','thonet-118','gaga-lace-chair','gaga-cod','gaga-lace-armchair','gaga-square-chair','gaga-zigi','horm-stereo','koozo-robin','gaga-double-d-stool','gaga-ozy','gaga-bar-stool','indo-stool','indo-stool-light','gaga-zigi-dining','koozo-robin-sofa','thonet-s411','thonet-118fv','thonet-118spht','thonet-119spf'];
    return Object.assign({}, p, {
      thumb: THUMBS.includes(p.id) ? this.imgSrc('assets/thumb/'+(p.id==='gaga-spot'?'gaga-spot-v3':p.id)+'.png')+'?v=28' : (cover || null),
      shape: p.shape || (p.category==='Sofas' ? 'wide' : 'tall'),
      brandName: this.BR[p.brand].name,
      designer: p.designer || this.BR[p.brand].name,
      country: this.BR[p.brand].country,
      cover, noCover: !cover,
      raw: this.singleImgs(p)[0] || '',
      filter: p.lift ? 'brightness(1.045)' : 'none',
      zoom: (p.fit || (String(p.images[0]||'').endsWith('.gif') ? 'cover' : 'contain'))==='cover' ? 1 : 0.9,
      tileBg: p.bg || (String(p.images[0]||'').endsWith('.gif') ? '#141414' : 'var(--media)'),
      fit: p.fit || (String(p.images[0]||'').endsWith('.gif') ? 'cover' : 'contain'),
      pad: (p.fit==='cover' || String(p.images[0]||'').endsWith('.gif')) ? '0' : '9%',
      padSmall: (p.fit==='cover' || String(p.images[0]||'').endsWith('.gif')) ? '0' : '12%',
      padPanel: (p.fit==='cover' || String(p.images[0]||'').endsWith('.gif')) ? '0' : '6%',
      ar: p.ar || '4 / 5',
      priceLabel: this.priceLabel(p)
    });
  }
  buildSpecs(p){
    const rows=[];
    if(p.dims) rows.push({label:'Dimensions',value:p.dims});
    if(p.materials) rows.push({label:'Materials',value:p.materials});
    if(p.colors) rows.push({label:'Finish',value:p.colors});
    if(p.use) rows.push({label:'Suitability',value:p.use});
    if(p.stackable) rows.push({label:'Stackable',value:'Yes'});
    rows.push({label:'Category',value:p.category});
    return rows;
  }
  priceNum(p){ return (p.price && p.price.amount) ? p.price.amount : Number.MAX_SAFE_INTEGER; }

  renderVals(){
    const st = this.state;
    const view = st.view;
    const gridColumns = this.props.gridColumns ?? 5;
    const gridMin = {3:380,4:300,5:236,6:196}[gridColumns] || 236;
    const captionClass = (this.props.captionMode==='always') ? '' : 'pd-cap-hover';

    const brandList = Object.values(this.BR).filter(b=>b.id!=='indo' && b.id!=='norr11' && b.id!=='magenta' && b.id!=='mocoba').map(b=>this.brandDecorate(b));
    const brandCards = brandList.filter(b=>b.image).map(b=>Object.assign({}, b, { go:'brand', heroKey:b.id, look:'hero|'+b.id, kind:'product', tileClass:'', hasCap:true, ar:'4 / 5', tileBg:'var(--media)' }));
    const brandRest = brandList.filter(b=>!b.image);
    const moodTiles = this.MOOD.filter(m=>m.src!=='assets/mood-03.jpg' && m.src!=='assets/mood-04.jpg').map((m,i)=>({ id:'mood-'+i, kind:'ambient', go:'', heroKey:'mood-'+i, tileClass:'pd-tile-mood', hasCap:false, ar:m.ar, image:this.imgSrc(m.src), raw:m.src, name:m.alt, country:'', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'var(--surface2)' })).filter(m=>m.image)
      .map(m=> m.raw !== 'assets/mood-07.jpg' ? m : { id:'thonet', pieceId:'thonet-s411', kind:'product', go:'brand', heroKey:'', look:'thonet|leather|dark', tileClass:'', hasCap:true, ar:'3 / 2', wideAr:'3 / 2',
        image:this.imgSrc('assets/thonet-s411-wide-trim.png'), raw:'assets/thonet-s411-wide-trim.png', name:'S 411', country:'THONET', alt:'Thonet S 411 armchair in black leather and chrome',
        fit:'contain', pad:'8% 0', zoom:1, filter:'brightness(1.045)', tileBg:'var(--media)' })
      .map(m=> m.raw !== 'assets/mood-02.jpg' ? m : { id:'thonet', pieceId:'thonet-118', kind:'product', go:'brand', heroKey:'', look:'thonet|wood|light', tileClass:'', hasCap:true, ar:'3 / 2', wideAr:'3 / 2',
        image:this.imgSrc('assets/thonet-118m-trim.png'), raw:'assets/thonet-118m-trim.png', name:'118', country:'THONET', alt:'Thonet 118 chair in natural beech',
        fit:'contain', pad:'8% 0', zoom:1, filter:'brightness(1.045)', tileBg:'var(--media)' })
      .map(m=> m.raw !== 'assets/mood-06.jpg' ? m : { id:'koozo', pieceId:'koozo-robin', kind:'product', go:'brand', heroKey:'', look:'koozo|fabric|light', tileClass:'', hasCap:true, ar:'3 / 2', wideAr:'3 / 2',
        image:this.imgSrc('assets/koozo-robin-junior-hero.png'), raw:'assets/koozo-robin-junior-hero.png', name:'Robin Junior', country:'KOOZO', alt:'Robin Junior sofa by KOOZO',
        fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#FFFFFF' });
    /* curation rule: product shots and ambient scenes always alternate along the grid */
    /* product photography from the library carries the grid; ambient shots are the accent */
    const usedImages = {};
    brandCards.forEach(b=>{ usedImages[b.image] = true; });
    usedImages['assets/horm-stereo.gif'] = true;
    const lookOf = p => {
      const s = ((p.materials||'') + ' ' + (p.name||'') + ' ' + (p.colors||'') + ' ' + (p.desc||'')).toLowerCase();
      const mat = /woven|cord|rattan|mesh|wicker/.test(s) ? 'woven'
        : /beech|bentwood|wood|teak|birch|oak|plywood/.test(s) ? 'wood'
        : /polypropylene|plastic|shell/.test(s) ? 'plastic'
        : /upholster|fabric|leather|cushion/.test(s) ? 'soft'
        : /steel|chrome|metal|alumini/.test(s) ? 'metal' : 'other';
      const tone = /black|dark|espresso|graphite|anthracite/.test(s) ? 'dark'
        : /white|natural|beige|ivory|light|pale/.test(s) ? 'light' : 'mid';
      return (p.category || '') + '|' + mat + '|' + tone;
    };
    /* the home grid is frozen: library additions (new photos, specs) never reshape it */
    const GRID_SKIP = ['janua-bb11-clamp','janua-sk05-basic','freifrau-leya-low','freifrau-leya-high','freifrau-leya-wingback','freifrau-leya-barstool-low','freifrau-leya-bar-armchair-high','gaga-low-back','gaga-double-d','gaga-spot-stool','gaga-no5','gaga-no6','gaga-2-rings','horm-him-her','thonet-s33','yamakawa-c607','thonet-118spfv','koozo-110','cuero-butterfly','koozo-fay','koozo-ryan','koozo-kylie','koozo-dennis','koozo-jason','horm-tango','horm-vad','horm-albino-torcia','horm-cherish','yamakawa-cl081','yamakawa-bs603','yamakawa-cd080','yamakawa-cd277','yamakawa-cd019','yamakawa-cd160','yamakawa-td022','yamakawa-bs144','yamakawa-cd079','yamakawa-cd177'];
    const GRID_LEGACY = {
      'gaga-bar-stool': { images:['assets/gaga-ozy-natural-trim.png','assets/gaga-ozy-natural-rear-trim.png'] },
      'yamakawa-cl049': { materials:'Steel · Hand-woven rattan', colors:'Natural, dark', desc:'A high-backed rattan lounge chair (CL 049) with its matching footstool (CF 049), hand-woven in Japan.' },
      'koozo-jerry': { designer:'', desc:'A comfortable, timeless armchair to sit alongside the KOOZO sofas.', images:['assets/koozo-jerry.jpg'], dims:undefined, materials:undefined, colors:'Many fabrics and leathers' },
      'koozo-footstool': { desc:'An upholstered footstool from the KOOZO accessories range.', images:['assets/koozo-footstool-trim.png'] } };
    const pieceCards = this.PROD.filter(p=>p.images && p.images.length>0 && p.brand!=='indo' && p.brand!=='norr11' && p.brand!=='magenta' && p.brand!=='mocoba' && !GRID_SKIP.includes(p.id)).map(p0=>{
      const p = GRID_LEGACY[p0.id] ? Object.assign({}, p0, GRID_LEGACY[p0.id]) : p0;
      const d = this.decorate(p), br = this.BR[p.brand] || {};
      return { id:p.brand, pieceId:p.id, look:lookOf(p), kind:'product', go:'brand', heroKey:'piece-'+p.id, tileClass:'', hasCap:true, ar:'4 / 5',
        image:this.imgSrc(p.images[0]), raw:p.images[0], name:p.name, country:br.name || d.brandName,
        fit:d.fit==='cover' ? 'cover' : 'contain', pad:d.fit==='cover' ? '0' : '5%', zoom:d.fit==='cover' ? 1 : 0.9, filter:d.filter, tileBg:d.tileBg };
    }).filter(c=>c.image);
    { const perBrand = {}; for(let i=pieceCards.length-1;i>=0;i--){ const b=pieceCards[i].id; perBrand[b]=(perBrand[b]||0)+1; if(perBrand[b]>2) pieceCards.splice(i,1); } }
    /* ---- editorial grid: fixed row rhythm, 4 columns, empty cells allowed ---- */
    const homeCells = [];
    const homeItems = [];
    {
      const shotBrands = {};
      pieceCards.forEach(c=>{ shotBrands[c.id] = true; });
      const products = brandCards.filter(b=>!shotBrands[b.id]).concat(pieceCards)
        .filter(c=>!/^(norr11|magenta|mocoba)-/.test(c.pieceId||'') && c.brand!=='norr11' && c.brand!=='magenta' && c.brand!=='mocoba')
        .filter(c=>c.image !== 'assets/horm-stereo.gif' && c.raw !== 'assets/horm-stereo.gif' && c.pieceId !== 'thonet-118spht' && c.raw !== 'assets/koozo-robin-trim.png' && c.raw !== 'assets/koozo-robin-junior-hero.png' && c.pieceId !== 'koozo-robin' && c.pieceId !== 'thonet-s411' && c.pieceId !== 'thonet-118fv' && c.image !== 'assets/koozo-robin-trim.png' && c.image !== 'assets/thonet-118spht.gif' && c.image !== 'assets/thonet-118spht-trim.png')
        .map(c=> c.pieceId !== 'gaga-ozy' ? c : Object.assign({}, c, { id:'koozo', pieceId:'koozo-robin', look:'koozo|fabric|light', heroKey:'',
          image:this.imgSrc('assets/koozo-robin-junior-detail.jpg'), raw:'assets/koozo-robin-junior-detail.jpg', name:'Robin Junior', country:'KOOZO',
          fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'var(--surface2)' }));
      /* the intro pieces fly into the first rows, so they lead the pool */
      const heroKeys = this.HERO_INTRO.map(h=>h.key);
      products.sort((x,y)=>{
        const xi = heroKeys.indexOf(x.heroKey), yi = heroKeys.indexOf(y.heroKey);
        return (xi<0?99:xi) - (yi<0?99:yi);
      });
      const wide = (src, alt, key) => ({ id:'anchor', kind:'ambient', pieceId:'', go:'', heroKey:key,
        tileClass:'pd-tile-mood', hasCap:false, ar:'3 / 2', image:src, raw:src, name:alt, country:'', alt:alt,
        fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'var(--surface2)' });
      const heroLight = this.effTheme() === 'light';
      const ambient = [ heroLight
          ? ((this.state.brandsVariant==='image' && !this.state.imageAlt) ? Object.assign(wide('assets/hero-frama-table-context.webp','A wooden trestle table and an aluminium stool against a warm plaster wall','anchor'), { wideAr:'4 / 5' }) : Object.assign(wide('assets/hero-frama-woodstool.png','A FRAMA folding table and an aluminium stool against a warm plaster wall','anchor'), { wideAr:'4 / 5' }))
          : Object.assign(wide('assets/horm-stereo.gif','A white shell chair on chromed legs against black','anchor'), { wideAr:'4 / 3', id:'horm', pieceId:'horm-stereo', tileClass:'' }) ]
        .concat(moodTiles)
        ;
      /* editorial paragraphs are cut at a sentence, never mid-word */
      const cut = (t, max) => {
        t = String(t||'').trim();
        if(t.length <= max) return t;
        const head = t.slice(0, max);
        const dot = Math.max(head.lastIndexOf('. '), head.lastIndexOf('.\u201d'), head.lastIndexOf('? '), head.lastIndexOf('! '));
        if(dot > max * 0.45) return head.slice(0, dot + 1);
        const sp = head.lastIndexOf(' ');
        return (sp > 0 ? head.slice(0, sp) : head).replace(/[,;:\u2014-]$/, '') + '\u2026';
      };
      const texts = brandList.filter(b=>String(b.long||'').length > 140).map(b=>{
        const parts = String(b.long).split(/\n\n+/).map(t=>t.trim()).filter(Boolean);
        const p1 = b.blurb || cut(parts[0]||'', 220);
        const p2 = '';
        return { kind:'text', id:b.id, brandName:b.name, para1:p1, para2:p2 };
      });

      /* row rhythm: gap = empty cell, i1 = one column, i2 = two columns */
      const PAT = [
        ['gap','i2'],
        ['i2','text','i1'],
        ['i1','i2','text'],
        ['gap','text','i1','i1'],
        ['i2','text','i1'],
        ['i1','text','i1','i1']
      ];
      let ai = 0, ti = 0, prevBrands = {}; const usedText = {};
      for(let r=0; products.length && r < 24; r++){
        const pat = PAT[r % PAT.length];
        /* curation: one atmosphere frame per row, in the wide slot where there is one */
        const ambSlot = pat.indexOf('i2') >= 0 ? 'i2' : (r % PAT.length === 5 ? 'i1' : null);
        const row = [];
        const rowBrands = {};
        let ambTaken = false, r4i = 0;
        pat.forEach(slot=>{
          if(slot === 'gap'){ row.push({ kind:'gap', span:1 }); return; }
          if(slot === 'text'){
            const pool = texts.filter(x=>x.id!=='thonet');
            let t;
            if(r === 3) t = texts.find(x=>x.id==='thonet') || null;
            else if(r === 2){ ti++; t = texts.find(x=>x.id==='horm') || null; }
            else if(r === 4){ ti++; t = texts.find(x=>x.id==='yamakawa') || null; }
            else t = pool.length ? pool[ti++ % pool.length] : null;
            if(t) usedText[t.id] = true;
            row.push(t ? Object.assign({ span:1 }, t) : { kind:'gap', span:1 });
            return;
          }
          const span = slot === 'i2' ? 2 : 1;
          /* row 3's wide frame is a fixed editorial image */
          if(r === 2 && span === 2){
            ambTaken = true;
            row.push({ id:'horm', pieceId:'horm-stereo', kind:'ambient', go:'brand', heroKey:'anchor3',
              tileClass:'pd-tile-mood', hasCap:false, span:2, ar:'4 / 3',
              image:'assets/horm-stereo.gif', raw:'assets/horm-stereo.gif', variantIdx:0,
              name:'A white shell chair on chromed legs against black', country:'', alt:'A white shell chair on chromed legs against black',
              fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'var(--surface2)' });
            return;
          }
          if(!ambTaken && slot === ambSlot && ai < ambient.length){
            ambTaken = true;
            const am = ambient[ai++];
            row.push(Object.assign({}, am, { span, ar: span === 2 ? (am.wideAr || '3 / 2') : am.ar }));
            return;
          }
          /* row 2's single column is a fixed editorial frame */
          if(r === 1 && span === 1){
            row.push({ id:'frama', pieceId:'', kind:'product', go:'', heroKey:'', look:'frama|wood|light',
              tileClass:'pd-tile-mood', hasCap:true, span:1, ar:'5 / 4',
              image:'assets/frama-folding-flat-table.webp', raw:'assets/frama-folding-flat-table.webp',
              name:'Indonesian Stool', country:'PRIMITIVE', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'var(--surface2)' });
            rowBrands['frama'] = true;
            return;
          }
          /* row 3's single column is a fixed editorial frame */
          if(r === 2 && span === 1){
            row.push({ id:'horm', pieceId:'horm-stereo', kind:'product', go:'brand', heroKey:'', look:'horm|plastic|dark',
              tileClass:'', hasCap:true, span:1, ar:'4 / 3',
              image:'assets/horm-stereo-black-angle.jpg', raw:'assets/horm-stereo-black-angle.jpg', variantIdx:1,
              name:'Stereo', country:'HORM', fit:'contain', pad:'0', zoom:1.18, filter:'none', tileBg:'#FFFFFF' });
            rowBrands['horm'] = true;
            return;
          }
          /* row 4's two single columns are fixed editorial frames */
          if(r === 3 && span === 1){
            const fixed4 = [
              { image:'assets/thonet-s243-stack-black.webp', pieceId:'thonet-s243', name:'S 243', fit:'contain', pad:'5%', zoom:0.9, filter:'brightness(1.045)', tileBg:'#fff' },
              { image:'assets/thonet-118spht.gif', name:'118 SPHT', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#0E0D0B' }
            ][r4i++];
            if(fixed4){
              row.push({ id:'thonet', pieceId:fixed4.pieceId||'thonet-118spht', kind:'product', go:'brand', heroKey:'', look:'thonet|wood|light',
                tileClass:'', hasCap:true, span:1, ar:'4 / 5',
                image:fixed4.image, raw:fixed4.image,
                name:fixed4.name, country:'THONET', fit:fixed4.fit, pad:fixed4.pad, zoom:fixed4.zoom, filter:fixed4.filter, tileBg:fixed4.tileBg });
              rowBrands['thonet'] = true;
              return;
            }
          }
          if(!products.length){ row.push({ kind:'gap', span:1 }); return; }
          /* curation: never the same house side by side, or repeated from the row above */
          let k = products.findIndex(p=>!rowBrands[p.id] && !prevBrands[p.id]);
          if(k < 0) k = products.findIndex(p=>!rowBrands[p.id]);
          if(k < 0) k = 0;
          const p = products.splice(k,1)[0];
          rowBrands[p.id] = true;
          row.push(Object.assign({}, p, { span, ar: span === 2 ? '3 / 2' : '4 / 5' }));
        });
        prevBrands = rowBrands;
        row.forEach(c=>{
          c.isText = c.kind === 'text';
          c.isGap = c.kind === 'gap';
          c.isImg = !c.isText && !c.isGap;
          c.cls = c.isGap ? 'pd-edgap' : '';
          c.rev = homeCells.length;
          homeCells.push(c);
          if(c.isImg) homeItems.push(c);
        });
      }
    }
    /* curated swap: the KOOZO footstool sits beside its house, the Zigi dining chair takes its place */
    { const A = homeCells.find(c=>c.isImg && c.pieceId==='gaga-zigi-dining'), B = homeCells.find(c=>c.isImg && c.pieceId==='koozo-footstool');
      if(A && B){ const keep = ['span','ar','rev','cls','isText','isGap','isImg'];
        const a = Object.assign({}, A), b = Object.assign({}, B);
        Object.keys(a).forEach(k=>{ if(!keep.includes(k)) delete A[k]; }); Object.keys(b).forEach(k=>{ if(!keep.includes(k)) delete B[k]; });
        Object.keys(b).forEach(k=>{ if(!keep.includes(k)) A[k] = b[k]; }); Object.keys(a).forEach(k=>{ if(!keep.includes(k)) B[k] = a[k]; }); } }
    /* row 2 narrates the Indonesian stools */
    { const fi = homeCells.findIndex(c=>c.isImg && c.id==='frama');
      if(fi > 0 && homeCells[fi-1].isText) Object.assign(homeCells[fi-1], { brandName:'Indonesian Stools',
        para1:'Everyday stools from a private collection, imported from Indonesia. Simple and solid, they work as a seat, a side table or a bedside stool. Available in the store.', para2:'' }); }
    /* the KOOZO cluster: a gallery scene opens the row, the house text follows */
    { const ti = homeCells.map(c=>c.isText && c.id==='yamakawa').lastIndexOf(true), kb = this.BR.koozo;
      if(ti > 0 && kb && homeCells[ti-1].isImg){
        const im = homeCells[ti-1], keep = ['span','ar','rev','cls','isText','isGap','isImg'];
        const hi = homeItems.indexOf(im);
        Object.keys(im).forEach(k=>{ if(!keep.includes(k)) delete im[k]; });
        Object.assign(im, { id:'koozo', pieceId:'', kind:'ambient', go:'brand', heroKey:'', look:'koozo|fabric|light', tileClass:'pd-tile-mood', hasCap:false,
          image:this.imgSrc('assets/koozo-sofa-gallery.png'), raw:'assets/koozo-sofa-gallery.png', name:'A white KOOZO sofa in a gallery space', country:'', alt:'A white KOOZO sofa in a gallery space',
          fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'var(--surface2)' });
        if(hi < 0) homeItems.push(im);
        Object.assign(homeCells[ti], { id:'koozo', brandName:kb.name, para1:kb.blurb, para2:'' }); } }
    /* curated swap: the KOOZO footstool joins its house row, the white Stereo moves down beside CUERO */
    { const A = homeCells.find(c=>c.isImg && c.pieceId==='horm-stereo' && /white/.test(c.raw||'')), B = homeCells.find(c=>c.isImg && c.pieceId==='koozo-footstool');
      if(A && B){ const keep = ['span','ar','rev','cls','isText','isGap','isImg'];
        const a = Object.assign({}, A), b = Object.assign({}, B);
        Object.keys(a).forEach(k=>{ if(!keep.includes(k)) delete A[k]; }); Object.keys(b).forEach(k=>{ if(!keep.includes(k)) delete B[k]; });
        Object.keys(b).forEach(k=>{ if(!keep.includes(k)) A[k] = b[k]; }); Object.keys(a).forEach(k=>{ if(!keep.includes(k)) B[k] = a[k]; }); } }
    /* the three opening atmosphere frames sell the Indonesian stools */
    homeCells.forEach(c=>{ if(c.isImg && ['assets/hero-frama-woodstool.png','assets/mood-01.jpg','assets/frama-folding-flat-table.webp'].includes(c.raw)) Object.assign(c, { id:'indo', pieceId:'indo-stool', go:'brand' }); });
    homeCells.forEach(c=>{ if(c.isImg && c.raw==='assets/koozo-robin-junior-detail.jpg') c.variantIdx = 1; });
    /* the CUERO row closes with a Thonet S 411 H video */
    { const z = homeCells.find(c=>c.isImg && c.pieceId==='gaga-zigi-dining' && !/zigi-v-/.test(c.raw||''));
      if(z) Object.assign(z, { id:'thonet', pieceId:'thonet-s411', look:'thonet|leather|dark', heroKey:'', image:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', raw:'', video:'assets/cuero-row-video.mp4', ar:'16 / 9',
        name:'S 411 H', country:'THONET', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#FFFFFF' }); }
    /* the S 411 row carries the Thonet text, not Cuero's */
    { const tb = this.BR.thonet; homeCells.forEach(c=>{ if(tb && c.isText && c.id==='cuero') Object.assign(c, { id:'thonet', brandName:tb.name, para1:tb.short || tb.blurb || '', para2:'' }); }); }
    /* closing row: 119 SPF, the Gaga & Design text, then two portrait Zigi frames */
    { const i = homeCells.findIndex(c=>c.isImg && c.pieceId==='thonet-119spf');
      const gb = this.BR.gaga;
      if(i >= 0 && gb){ const row = homeCells.slice(i+1, i+4);
        const set = (c, o) => { Object.keys(c).forEach(k=>{ if(!['rev'].includes(k)) delete c[k]; }); Object.assign(c, o); };
        const img = (src) => ({ kind:'product', id:'gaga', pieceId:'gaga-zigi-dining', go:'brand', heroKey:'', look:'gaga|rope|light', tileClass:'', hasCap:true, span:1, ar:'4 / 5',
          image:this.imgSrc(src), raw:src, name:'COD Dining Chair', country:'Gaga & Design', fit:'contain', pad:'5%', zoom:0.9, filter:'brightness(1.045)', tileBg:'var(--media)',
          isText:false, isGap:false, isImg:true, cls:'' });
        while(row.length < 3){ const c = { rev: homeCells.length }; homeCells.push(c); row.push(c); }
        const first = homeCells[i]; const hi = homeItems.indexOf(first); if(hi >= 0) homeItems.splice(hi, 1);
        const gap = { kind:'gap', span:1, isText:false, isGap:true, isImg:false, cls:'pd-edgap' };
        set(first, Object.assign(img('assets/gaga-zigi-v-brown.png'), { image:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', raw:'assets/gaga-cod-video.mp4', video:'assets/gaga-cod-video.mp4', vScale:0.7, vShift:'0%', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#FFFFFF' }));
        set(row[0], img('assets/gaga-zigi-v-natural.png'));
        set(row[1], { kind:'text', id:'gaga', brandName:gb.name, para1:gb.blurb || '', para2:'', span:1, isText:true, isGap:false, isImg:false, cls:'' });
        set(row[2], Object.assign({}, gap));
        homeItems.push(first, row[0]);
        /* the Zigi pair opens its row: drop the tile that precedes it */
        const pi = homeCells.indexOf(first) - 1, prev = homeCells[pi];
        if(prev && prev.isImg){ homeCells.splice(pi, 1); const ph = homeItems.indexOf(prev); if(ph >= 0) homeItems.splice(ph, 1); }
        { const fi = homeCells.indexOf(first);
          for(let k = fi - 1; k >= Math.max(0, fi - 4); k--){ const c = homeCells[k];
            if(c !== row[1] && (c.kind==='text' || c.isText) && c.id==='gaga'){ homeCells.splice(k, 1); const ph = homeItems.indexOf(c); if(ph >= 0) homeItems.splice(ph, 1); break; } } }
      }
      for(let k = homeCells.length - 1; k >= 0; k--){ const c = homeCells[k];
        if(c.isImg && c.raw === 'assets/koozo-robin-chaise.jpg'){ homeCells.splice(k, 1); const ph = homeItems.indexOf(c); if(ph >= 0) homeItems.splice(ph, 1); } }
      /* the KOOZO row closes with a second sofa beside the footstool */
      { const fi = homeCells.findIndex(c=>c.isImg && c.pieceId==='koozo-footstool'), nx = homeCells[fi+1];
        const jp = this.PROD.find(p=>p.id==='koozo-jason');
        if(fi >= 0 && nx && nx.isGap && jp){ const d = this.decorate(jp), src = jp.images[0];
          Object.keys(nx).forEach(k=>{ if(k!=='rev') delete nx[k]; });
          Object.assign(nx, { kind:'product', id:'koozo', pieceId:'koozo-jason', go:'brand', heroKey:'', look:'koozo|fabric|light', tileClass:'', hasCap:true, span:1, ar:'4 / 5',
            image:this.imgSrc(src), raw:src, name:jp.name, country:'KOOZO', fit:'contain', pad:'5%', zoom:0.9, filter:d.filter, tileBg:d.tileBg,
            isText:false, isGap:false, isImg:true, cls:'' });
          homeItems.push(nx); } }
      /* Robin Junior stands alone, centred; S 411 drops to the Thonet row beside its S 411 H */
      { const ri = homeCells.findIndex(c=>c.isImg && c.raw==='assets/koozo-robin-junior-hero.png' && c.span===2);
        const si = homeCells.findIndex(c=>c.isImg && c.pieceId==='thonet-s411' && !c.video);
        if(ri >= 0 && si === ri + 1){
          const s = homeCells.splice(si, 1)[0];
          const g = () => ({ kind:'gap', span:1, isText:false, isGap:true, isImg:false, cls:'pd-edgap', rev:homeCells.length });
          homeCells.splice(ri + 1, 0, g()); homeCells.splice(ri, 0, g());
          const vi = homeCells.findIndex(c=>c.isImg && c.video);
          if(vi >= 0) homeCells.splice(vi + 1, 0, Object.assign(s, { span:1, ar:'4 / 5' }));
          else homeCells.push(Object.assign(s, { span:1, ar:'4 / 5' })); } }
      /* COD Lounge leaves the Thonet row and fills the open slot after the Freifrau text */
      { const ci = homeCells.findIndex(c=>c.isImg && c.pieceId==='gaga-cod');
        const fi = homeCells.findIndex(c=>c.isText && c.id==='freifrau');
        const gi = fi >= 0 ? homeCells.findIndex((c,k)=>k>fi && c.isGap) : -1;
        if(ci >= 0 && gi > ci){
          const cod = homeCells[ci];
          homeCells[gi] = Object.assign(cod, { rev:homeCells[gi].rev });
          homeCells.splice(ci, 1);
          const s4 = homeCells.find(c=>c.isImg && c.pieceId==='thonet-s411' && !c.video);
          if(s4) Object.assign(s4, { span:2, ar:'8 / 5' }); } }
      /* Freifrau row: Bifronte ambient replaces the Leon Wood tile, Vad Wood ambient replaces COD */
      { const fi = homeCells.findIndex(c=>c.isText && c.id==='freifrau');
        const swap = (cell, pid, src, ar) => { const p = this.PROD.find(q=>q.id===pid); if(!cell || !p) return;
          Object.assign(cell, { pieceId:pid, id:p.brand, image:this.imgSrc(src), raw:src, name:p.name, country:'HORM', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#fff', ar }); };
        if(fi >= 0){
          for(let k = fi - 1; k >= Math.max(0, fi - 3); k--){ const c = homeCells[k]; if(c.isImg){ swap(c, 'horm-albino-torcia', 'assets/home-albino-amb.png?v=2', '8 / 5'); c.tileBg='#111'; break; } }
          for(let k = fi + 1; k <= Math.min(homeCells.length - 1, fi + 3); k++){ const c = homeCells[k]; if(c.isImg){ swap(c, 'thonet-s243', 'assets/hero-thonet-s243-stack.png', '4 / 5'); c.country='THONET'; break; } } } }
      /* the S 411 H video (footstool of the S 411) takes the white Stereo's slot in the CUERO row; the Stereo leaves the grid */
      { const vi = homeCells.findIndex(c=>c.isImg && c.video), si = homeCells.findIndex(c=>c.isImg && c.pieceId==='horm-stereo' && /white/.test(c.raw||''));
        if(vi >= 0 && si >= 0){ const v = homeCells[vi], s = homeCells[si], keep = ['span','ar','rev','cls','isText','isGap','isImg'];
          Object.keys(s).forEach(k=>{ if(!keep.includes(k)) delete s[k]; });
          Object.keys(v).forEach(k=>{ if(!keep.includes(k)) s[k] = v[k]; });
          s.ar = '4 / 3'; s.vScale = 0.74; s.vShift = '-6%';
          homeCells.splice(vi, 1); const vh = homeItems.indexOf(v); if(vh >= 0) homeItems.splice(vh, 1); } } }
    const homeGridMin = {3:380,4:300,5:236,6:196}[this.props.homeColumns ?? 4] || 300;
    const brandOptions = Object.values(this.BR).map(b=>({id:b.id,name:b.name}));

    let filtered = this.PROD.slice();
    if(st.filterCat!=='All') filtered = filtered.filter(p=>p.category===st.filterCat);
    if(st.filterBrand!=='All') filtered = filtered.filter(p=>p.brand===st.filterBrand);
    if(this.props.showUnphotographed===false) filtered = filtered.filter(p=>p.images.length>0);
    if(st.sort==='price-asc') filtered.sort((a,b)=>this.priceNum(a)-this.priceNum(b));
    else if(st.sort==='price-desc') filtered.sort((a,b)=>{ const A=a.price.amount||0, B=b.price.amount||0; return B-A; });
    else if(st.sort==='name') filtered.sort((a,b)=>a.name.localeCompare(b.name));
    else filtered.sort((a,b)=>(b.images.length>0)-(a.images.length>0));
    filtered = filtered.map(p=>Object.assign(this.decorate(p), {openId:p.id, tileClass:'', hasCap:true}));
    let gridItems = filtered;
    if(this.props.showMood===true && st.filterCat==='All' && st.filterBrand==='All'){
      gridItems = filtered.slice();
      this.MOOD.forEach((m,i)=>{ const at = Math.min(this.MOOD_SLOTS[i], gridItems.length); gridItems.splice(at, 0, { id:'mood-'+i, isMood:true, openId:'', tileClass:'pd-tile-mood', hasCap:false, cover:this.imgSrc(m.src), noCover:false, raw:m.src, ar:m.ar, name:m.alt, fit:'cover', pad:'0', filter:'none', tileBg:'var(--surface2)', priceLabel:'' }); });
      gridItems = gridItems.filter(g=>!g.isMood || g.cover);
    }

    const categories = this.CATS.map(c=>({ value:c, label:c, cls: st.filterCat===c ? 'pd-chip-on' : '' }));
    const IX_HIDE = ['gaga-lace-armchair','gaga-zigi-dining','gaga-cod','gaga-lace-chair','gaga-square-chair','yamakawa-cd160', /* out of stock, data kept: */ 'indo-stool','indo-stool-light'], ixProd = this.PROD.filter(p=>!IX_HIDE.includes(p.id));
    const catCount = c => c==='All' ? ixProd.length : ixProd.filter(p=>p.category===c).length;
    const indexCats = this.CATS.map(c=>({ value:c, label: c==='All' ? 'Everything' : c, count: String(catCount(c)).padStart(2,'0'), cls: st.filterCat===c ? 'pd-ix-on' : '' }));
    const IXMOOD = { 'Sofas':'assets/koozo-sofa-gallery.png', 'Armchairs':'assets/mood-07.jpg', 'Chairs':'assets/mood-03.jpg', 'Bar stools':'assets/hero-frama-table-context.webp', 'Tables':'assets/mood-01.jpg', 'Storage & shelving':'assets/mood-08.webp', 'Beds':'assets/about-studio.webp', 'Accessories':'assets/horm-albino-torcia-white-mood.jpg' };
    const indexRows = filtered.filter(p=>!IX_HIDE.includes(p.id)).map(p=>Object.assign({}, p, {
      mood: p.mood ? this.imgSrc(p.mood) : '', moodVideo: (p.mood && /\.mp4$/i.test(p.mood)) ? this.assetUrl(p.mood) : '', moodImg: (p.mood && !/\.mp4$/i.test(p.mood)) ? this.imgSrc(p.mood) : '',
      ixPhoto: !!p.ixPhoto, ixPack: !p.ixPhoto, ixShots: (p.ixPicks || this.singleImgs(p)).slice(0,1).map(x=>this.imgSrc(x)), rowCls: st.ixOpen===p.id ? 'pd-ix-row-on' : '', moodPos: p.moodPos || '50% 50%', moodAr: p.moodAr || '16 / 9' })).sort((a,b)=>{
      const ba = (this.BR[a.brand] && this.BR[a.brand].name) || a.brand || '';
      const bb = (this.BR[b.brand] && this.BR[b.brand].name) || b.brand || '';
      return ba.localeCompare(bb) || a.name.localeCompare(b.name);
    });
    const indexListLabel = st.filterCat==='All' ? 'Everything' : st.filterCat;
    const hasFilters = st.filterCat!=='All' || st.filterBrand!=='All' || st.sort!=='featured';
    const headingLabel = st.filterBrand!=='All' ? this.BR[st.filterBrand].name : (st.filterCat==='All' ? 'Collection' : st.filterCat);

    const brand = this.brandDecorate(this.BR[st.brandId] || this.BR.yamakawa);
    const bpanelRaw = this.brandDecorate(this.BR[st.brandId] || this.BR.yamakawa);
    const bpanelBody = st.brandId==='cuero' ? [String(bpanelRaw.long || bpanelRaw.short || '').trim(), ''] : this.splitBody(bpanelRaw.long || bpanelRaw.short || '');
    const bpanel = Object.assign({}, bpanelRaw, { noImage: !bpanelRaw.image, body: bpanelBody[0], body2: bpanelBody[1] });
    const bpiece = st.bpanelPiece ? this.PROD.find(p=>p.id===st.bpanelPiece) : null;
    const bpd = bpiece ? this.decorate(bpiece) : null;
    const bpImages = bpd ? (bpiece.gallery || bpiece.images || []).map(s=>this.imgSrc(s)).filter(Boolean) : [];
    const bpIdx = Math.min(st.bpanelIdx || 0, Math.max(0, bpImages.length-1));
    const bpanelImage = bpd ? (bpImages[bpIdx] || bpd.cover) : bpanelRaw.image;
    const bpanelPair = !!(bpiece && bpiece.pairPanel && bpImages.length>=2);
    const bpiecePanel = bpiece ? {
      name: bpiece.name,
      priceLabel: this.priceLabel(bpiece) || 'On request',
      priceNote: this.priceNote(bpiece),
      desc: bpiece.desc || '',
      pdf: bpiece.pdf || '', video: bpiece.video || '',
      hasPdf: !!bpiece.pdf, hasVideo: !!bpiece.video, hasDocs: !!(bpiece.pdf || bpiece.video)
    } : { name:'', priceLabel:'', priceNote:'', desc:'', pdf:'', video:'', hasPdf:false, hasVideo:false, hasDocs:false };
    const bpieceSpecs = [];
    if(bpiece){
      const add=(label,value)=>{ if(value) bpieceSpecs.push({label,value}); };
      add('Designer', bpiece.designer || ((this.BR[bpiece.brand]||{}).name || ''));
      add('Dimensions', bpiece.dims || (bpiece.pdf ? 'See spec sheet' : (bpiece.brand==='koozo' ? 'Full specification on request' : '')));
      add('Materials', bpiece.materials);
      add('Finish', bpiece.colors);
      add('Suitability', bpiece.use);
      if(bpiece.stackable) add('Stackable','Yes');
      add('Category', bpiece.category);
      add('Availability', bpiece.availability);
    }
    const bpRaw = bpiece ? (bpiece.gallery || bpiece.images || []) : [], bpPhoto = /-mood/.test(bpRaw[bpIdx]||'');
    const bpanelVariants = (bpiece && bpiece.variants && bpImages.length > 1) ? bpImages.map((src,i)=>({ src, idx:i, border: i===bpIdx ? 'var(--ink)' : 'transparent', fit: /-mood/.test(bpRaw[i]||'') ? 'cover' : (bpd ? bpd.fit : 'contain') })) : [];
    const bpanelProducts = this.PROD.filter(p=>p.brand===(this.BR[st.brandId] ? st.brandId : 'yamakawa') && p.id!==st.bpanelPiece && this.singleImgs(p).length>0).sort((a,b)=>(b.images.length>0)-(a.images.length>0)).slice(0,6).map(p=>{ const d=this.decorate(p); return (d.thumb && /assets\/thumb\//.test(d.thumb)) ? Object.assign(d,{ cover:d.thumb, fit:'contain', padSmall:'0', pad:'0', tileBg:'#fff', filter:'none', zoom:1 }) : d; });
    const brandProducts = this.PROD.filter(p=>p.brand===st.brandId).sort((a,b)=>(b.images.length>0)-(a.images.length>0)).map(p=>this.decorate(p));

    const raw = this.curProduct() || this.PROD[0];
    const idx = Math.min(st.galleryIdx, Math.max(0, (raw.gallery||raw.images).length-1));
    const activeImage = this.imgSrc((raw.gallery||raw.images)[idx]);
    const product = Object.assign({}, this.decorate(raw), {
      activeImage, noCover: !activeImage, activeIdx: idx,
      rawActive: (raw.gallery||raw.images)[idx] || '',
      hasThumbs: !!raw.variants && (raw.gallery||raw.images).length>1, thumbWrap: (raw.gallery||raw.images).length>8 ? 'wrap' : 'nowrap',
      thumbs: (raw.gallery||raw.images).map((src,i)=>({ src: this.assetUrl(src), idx:i, border: i===idx?'var(--ink)':'transparent', fit: /-mood/.test(src)?'cover':this.decorate(raw).fit, pad: /-mood/.test(src)?'0':this.decorate(raw).padSmall })),
      ...(/-mood/.test((raw.gallery||raw.images)[idx]||'') ? { fit:'cover', padPanel:'0' } : {}), ...(/detail-mood/.test((raw.gallery||raw.images)[idx]||'') ? { shape:'tall' } : {}),
      specs: this.buildSpecs(raw),
      priceNote: this.priceNote(raw),
      availabilityNote: (raw.availability && raw.availability!==this.priceLabel(raw)) ? raw.availability : '',
      primaryLabel: this.primaryLabel(raw),
      secondaryLabel: this.secondaryLabel(raw),
      imgOpacity: st.mainFade ? 0 : 1,
      pdf: raw.pdf || null, video: raw.video || null,
      hasDocs: !!(raw.pdf || raw.video)
    });
    const related = this.PROD.filter(p=>p.brand===raw.brand && p.id!==raw.id).sort((a,b)=>(b.images.length>0)-(a.images.length>0)).slice(0,3).map(p=>this.decorate(p));
    const introClones = this.HERO_INTRO.map((h,i)=>{
      const tg = st.introTargets[i];
      const flipped = tg && (st.introStage==='flip'||st.introStage==='cross');
      const visible = st.cloneVisible[i];
      const dl = (i*55)+'ms';
      let transition, opacity, transform;
      if(st.introStage==='cross'){ transition='opacity .55s '+this.INTRO_EASE; opacity=0; transform=tg?tg.transform:'none'; }
      else if(flipped){ transition='transform 1.1s '+this.INTRO_EASE+' '+dl; opacity=1; transform=tg.transform; }
      else { transition='opacity .6s ease'; opacity=visible?1:0; transform='none'; }
      const dp = homeItems.find(x=>x.heroKey===h.key) || { image:'', fit:'cover', pad:'0', tileBg:'var(--media)', filter:'none' };
      const hero = { src: dp.image || '', fit: dp.fit, pad: dp.pad, bg: dp.tileBg, filter: dp.filter };
      const heroFlat = (st.introStage==='flip'||st.introStage==='cross') ? hero : { src: hero.src, fit:'cover', pad:'0', bg:'var(--media)', filter:'none' };
      const la = (st.cloneA && st.cloneA[i]) || heroFlat;
      const lb = (st.cloneB && st.cloneB[i]) || heroFlat;
      const top = (st.cloneTop && st.cloneTop[i]) || 0;
      return { src: hero.src,
        srcA: la.src, fitA: la.fit, padA: la.pad, bgA: la.bg, filterA: la.filter, opA: top===0 ? 1 : 0,
        srcB: lb.src, fitB: lb.fit, padB: lb.pad, bgB: lb.bg, filterB: lb.filter, opB: top===1 ? 1 : 0,
        left: h.left, top: h.top, width: h.width, height: h.height,
        opacity, transform, transition };
    });
    const cart = st.cart;
    const matches = this.getSearchResults();
    const activeIdx = matches.length ? Math.min(Math.max(st.searchActiveIdx||0,0), matches.length-1) : 0;

    /* KOOZO row: the gallery-sofa mood shot replaces the footstool; its first slot opens up */
    { const ai = homeCells.findIndex(c=>c.isImg && c.raw==='assets/koozo-sofa-gallery.png'), fi = homeCells.findIndex(c=>c.isImg && c.pieceId==='koozo-footstool');
      if(ai >= 0 && fi >= 0){ const A = homeCells[ai], F = homeCells[fi], keep = ['span','ar','rev','cls','isText','isGap','isImg'];
        const a = Object.assign({}, A);
        const fh = homeItems.indexOf(F); if(fh >= 0) homeItems.splice(fh, 1);
        Object.keys(F).forEach(k=>{ if(!keep.includes(k)) delete F[k]; });
        Object.keys(a).forEach(k=>{ if(!keep.includes(k)) F[k] = a[k]; });
        F.ar = '3 / 4';
        F.image = this.imgSrc('assets/koozo-sofa-koozo-white.jpg'); F.raw = 'assets/koozo-sofa-koozo-white.jpg';
        F.fit = 'contain'; F.pad = '0'; F.tileBg = '#fff';
        F.name = F.alt = 'A modular KOOZO sofa in off-white bouclé';
        { const J = homeCells.find(c=>c.isImg && c.pieceId==='koozo-jason'); if(J) J.ar = '3 / 4'; }
        { const ji = homeCells.findIndex(c=>c.isImg && c.pieceId==='koozo-jason'), ti = homeCells.findIndex(c=>c.isText && c.id==='koozo');
          if(ji === ai + 3 && ti > ai && ti < ji){ const J = homeCells[ji], T = homeCells[ti]; homeCells.splice(ai, 4, F, J, T, A); } }
        /* Robin Junior (2 cols) rises into the KOOZO row; the KOOZO pair drops into its centred slot */
        { const R = homeCells.find(c=>c.isImg && c.raw==='assets/koozo-robin-junior-hero.png' && c.span===2), J = homeCells.find(c=>c.isImg && c.pieceId==='koozo-jason');
          const fi2 = homeCells.indexOf(F);
          if(R && J && fi2 >= 0 && homeCells[fi2+1] === J){
            homeCells.splice(fi2, 2, R);
            const ri = homeCells.findIndex((c,i)=>c===R && i!==fi2);
            if(ri >= 0) homeCells.splice(ri, 1, F, J); } }
        /* the KOOZO pair trades places with the Thonet pair (S 243 + 118 SPHT) */
        { const S = homeCells.find(c=>c.isImg && c.raw==='assets/thonet-s243-stack-black.webp'), J = homeCells.find(c=>c.isImg && c.pieceId==='koozo-jason');
          const si = homeCells.indexOf(S), fi3 = homeCells.indexOf(F);
          if(S && J && si >= 0 && fi3 >= 0 && homeCells[fi3+1] === J){ const H = homeCells[si+1];
            if(H && H.isImg && H.pieceId==='thonet-118spht'){
              homeCells[si] = F; homeCells[si+1] = J; homeCells[fi3] = S; homeCells[fi3+1] = H; } } }
        /* the KOOZO row (Robin Junior) moves above the Yamakawa row (Him + Her) */
        { const run = i => { const out = []; let s = 0; while(i < homeCells.length && s < 4){ out.push(homeCells[i]); s += homeCells[i].span || 1; i++; } return s === 4 ? out : null; };
          const hi = homeCells.findIndex(c=>c.isImg && (c.pieceId==='horm-him-her' || c.pieceId==='thonet-118')), ri = homeCells.findIndex(c=>c.isImg && c.raw==='assets/koozo-robin-junior-hero.png');
          if(hi >= 0 && ri > hi){ const a = run(hi), b = run(ri);
            if(a && b && hi + a.length <= ri){ const mid = homeCells.slice(hi + a.length, ri);
              homeCells.splice(hi, ri + b.length - hi, ...b, ...mid, ...a); } } }
        /* Thonet pair → one 2-col landscape 118 SPHT video on black */
        { const si = homeCells.findIndex(c=>c.isImg && c.raw==='assets/thonet-s243-stack-black.webp'), H = homeCells[si+1];
          if(si >= 0 && H && H.isImg && H.pieceId==='thonet-118spht'){ const S = homeCells[si], sx = homeItems.indexOf(S); if(sx >= 0) homeItems.splice(sx, 1);
            Object.assign(H, { span:2, ar:'1660 / 1244', image:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', raw:'assets/thonet-118spht-wide.mp4',
              video:'assets/thonet-118spht-wide.mp4', vScale:1, vShift:'0%', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#0E0D0B' });
            homeCells.splice(si, 1); } }
        /* marketing test: the cover becomes the KOOZO pair, duplicated from the grid (centred, 2 cols) */
        { const hx = homeCells.findIndex(c=>c.isImg && c.heroKey==='anchor'), J = homeCells.find(c=>c.isImg && c.pieceId==='koozo-jason');
          if(this.state.brandsVariant !== 'image' && hx >= 0 && J && homeCells[hx].span === 2){ const H0 = homeCells[hx];
            const pick = c => ({ id:c.id, pieceId:c.pieceId, ar:c.ar, image:c.image, raw:c.raw, name:c.name, country:c.country, hasCap:c.hasCap, fit:c.fit, pad:c.pad, filter:c.filter, tileBg:c.tileBg, zoom:c.zoom });
            homeCells.splice(hx, 1, { kind:'pair', span:2, rev:H0.rev, cls:H0.cls, isImg:false, isText:false, isGap:false, isPair:true, pair:[Object.assign(pick(F), { id:'koozo', pieceId:'koozo-jason' }), Object.assign(pick(J), { hasCap:false, hover:true, hoverBg:"url('"+this.imgSrc('assets/koozo-cover-right-sale-white.png')+"')" })] }); } }
        /* S 411 H leaves the Thonet row; its slot stays empty so S 411 keeps its place */
        { const h = homeCells.find(c=>c.isImg && c.name==='S 411 H');
          if(h){ const sp = h.span, rv = h.rev, hx = homeItems.indexOf(h); if(hx >= 0) homeItems.splice(hx, 1);
            Object.keys(h).forEach(k=>delete h[k]); Object.assign(h, { kind:'gap', span:sp, rev:rv, isText:false, isGap:true, isImg:false, cls:'pd-edgap' }); } }
        F.name = F.alt = 'Detail of a KOOZO Jason sofa in bouclé';
        Object.assign(F, { id:'koozo', pieceId:'koozo-jason', heroKey:'', variantIdx:'' });
        const ah = homeItems.indexOf(A); if(ah >= 0) homeItems.splice(ah, 1, F);
        const sp = A.span, rv = A.rev; Object.keys(A).forEach(k=>delete A[k]);
        Object.assign(A, { kind:'gap', span:sp, rev:rv, isText:false, isGap:true, isImg:false, cls:'pd-edgap' }); } }
    /* curated swaps: Gaga No 5 (check) takes the CL 049 slot; the blue COD takes the Thonet 118 slot */
    { const keep=['span','ar','rev','cls','isText','isGap','isImg','wideAr'];
      const put=(c,o)=>{ if(!c) return; Object.keys(c).forEach(q=>{ if(!keep.includes(q)) delete c[q]; }); Object.assign(c,{ kind:'product', id:'gaga', go:'brand', heroKey:'', tileClass:'', hasCap:true, country:'Gaga & Design', zoom:1, filter:'brightness(1.045)', tileBg:'var(--media)' }, o); };
      { const g=homeCells.find(c=>c.isImg && c.pieceId==='yamakawa-cl049'); if(g){ const sp=g.span, rv=g.rev; Object.keys(g).forEach(q=>delete g[q]); Object.assign(g,{ kind:'gap', span:sp, rev:rv, isText:false, isGap:true, isImg:false, cls:'pd-edgap' }); const hi=homeItems.indexOf(g); if(hi>=0) homeItems.splice(hi,1); } }
      { const fx = homeCells.findIndex(c=>c.isImg && c.raw==='assets/koozo-sofa-koozo-white.jpg' && homeCells.indexOf(c) >= 0), pv = fx > 0 ? homeCells[fx-1] : null;
        if(pv && pv.isText){ const sp=pv.span, rv=pv.rev; Object.keys(pv).forEach(q=>delete pv[q]); Object.assign(pv,{ kind:'gap', span:sp, rev:rv, isText:false, isGap:true, isImg:false, cls:'pd-edgap' }); } }
      /* Albino Torcia row → two HORM Him + Her images, HORM text between them */
      { const ax = homeCells.findIndex(c=>c.isImg && c.pieceId==='horm-albino-torcia');
        if(ax >= 0){ const tx = homeCells.findIndex((c,k)=>k>ax && k<=ax+2 && c.isText), sx = homeCells.findIndex((c,k)=>k>ax && k<=ax+3 && c.isImg);
          const hb = this.BR.horm;
          const hh = (c, src, fit, pad, bg) => Object.assign(c, { kind:'product', id:'horm', pieceId:'horm-him-her', go:'brand', heroKey:'', variantIdx:'', video:'', tileClass:'', hasCap:true,
            look:'horm|shell|pair', image:this.imgSrc(src), raw:src, name:'Him + Her', alt:'HORM Him + Her chairs', country:'HORM', fit, pad, zoom:1, filter:'none', tileBg:bg });
          hh(homeCells[ax], 'assets/horm-him-side-pairscale.jpg', 'contain', '4% 0', '#FFFFFF'); homeCells[ax].capGhost = true;
          if(sx >= 0){ hh(homeCells[sx], 'assets/horm-himher-portrait.png', 'cover', '0', 'var(--surface2)'); homeCells[sx].capGhost = true; }
          if(tx >= 0 && hb) Object.assign(homeCells[tx], { id:'horm', brandName:hb.name, para1:hb.blurb || hb.short || '', para2:'' }); } }
      let s33Row = null;
      { const ti = homeCells.findIndex(c=>c.isText && c.brandName==='Indonesian Stools'), L = ti > 0 ? homeCells[ti-1] : null;
        const R0 = ti >= 0 ? homeCells[ti+1] : null;
        if(L && L.isImg){ s33Row = { L:{ span:L.span, ar:L.ar, rev:L.rev }, T:{ span:homeCells[ti].span, rev:homeCells[ti].rev }, R: R0 && R0.isImg ? { span:R0.span, ar:R0.ar, rev:R0.rev } : null };
          const hb = this.BR.horm; if(hb) Object.assign(homeCells[ti], { id:'horm', brandName:hb.name, para1:hb.blurb || hb.short || '', para2:'' });
          Object.assign(L, { id:'horm', pieceId:'horm-vad', go:'brand', kind:'product', heroKey:'', variantIdx:'', video:'', tileClass:'', look:'horm|shell|olive', country:'HORM', zoom:1, filter:'none', tileBg:'rgb(151,141,92)', 
          image:this.imgSrc('assets/horm-vad-olive.png'), raw:'assets/horm-vad-olive.png', name:'Vad Wood', alt:'HORM Vad Wood chair in black on wooden legs', fit:'contain', pad:'0' }); }
        else if(L && L.isImg) Object.assign(L, { id:'thonet', pieceId:'thonet-s33', go:'brand', kind:'product', heroKey:'', variantIdx:'', video:'', tileClass:'', look:'thonet|steel|light', country:'THONET', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#ECEDEC', 
          image:this.imgSrc('assets/thonet-s34v-detail.jpeg'), raw:'assets/thonet-s34v-detail.jpeg', name:'S 34 V', alt:'Thonet S 34 V cantilever armchair in green fabric with walnut armrests' });
        const R = ti >= 0 ? homeCells[ti+1] : null;
        if(R && R.isImg) Object.assign(R, { id:'horm', pieceId:'horm-vad', go:'brand', kind:'product', heroKey:'', variantIdx:'', video:'', tileClass:'', look:'horm|shell|olive', country:'HORM', zoom:1, filter:'none', tileBg:'rgb(151,141,92)', 
          image:this.imgSrc('assets/horm-vad-swivel-full.png'), raw:'assets/horm-vad-swivel-full.png', name:'Vad Girevole', alt:'HORM Vad Girevole swivel chair in olive fabric', fit:'cover', pad:'0' });
        else if(R && R.isImg) Object.assign(R, { id:'thonet', pieceId:'thonet-s33', go:'brand', kind:'product', heroKey:'', variantIdx:'', video:'', tileClass:'', look:'thonet|steel|light', country:'THONET', fit:'contain', pad:'6% 4%', zoom:1, filter:'none', tileBg:'rgb(232,235,235)', 
          image:this.imgSrc('assets/thonet-s33v-group.jpeg'), raw:'assets/thonet-s33v-group.jpeg', name:'S 33 V', alt:'Thonet S 33 V and S 34 V cantilever chairs in green and sand fabric' }); }
      { const t = homeCells.find(c=>c.isImg && c.pieceId==='thonet-118'), p = this.PROD.find(q=>q.id==='thonet-s411');
        if(t && p){ put(t, {}); Object.assign(t, { id:'thonet', pieceId:'thonet-s411', country:'THONET', look:'thonet|leather|dark', image:this.imgSrc('assets/thonet-s411-wide-trim.png'), raw:'assets/thonet-s411-wide-trim.png', name:p.name, alt:'Thonet S 411 armchair in black leather and chrome', fit:'contain', pad:'8% 0', zoom:1, filter:'brightness(1.045)', tileBg:'var(--media)' });
          const tx = homeCells.findIndex((c,k)=>Math.abs(k - homeCells.indexOf(t)) <= 1 && c.isText);
          if(tx >= 0) Object.assign(homeCells[tx], { id:'thonet', brandName:'Thonet', para1:'The German house that pioneered bentwood furniture, with light, structural forms shaped from steam-bent beech, and a lasting benchmark of modern design.', para2:'' });
          /* statement variant: the S 33 V / S 34 V row drops in below the S 411 row */
          Object.assign(t, { pieceId:'thonet-s33', look:'thonet|leather|dark', image:this.imgSrc('assets/thonet-s33-black.jpeg'), raw:'assets/thonet-s33-black.jpeg', name:'S 33', alt:'Thonet S 33 cantilever chair in black leather and chrome', fit:'contain', pad:'9% 0', zoom:1, filter:'none', tileBg:'#FFFFFF' });
          if(s33Row && tx >= 0){
            const th = { id:'thonet', pieceId:'thonet-s33', go:'brand', kind:'product', heroKey:'', variantIdx:'', video:'', tileClass:'', look:'thonet|steel|light', country:'THONET', zoom:1, filter:'none', hasCap:true, isImg:true, isText:false, isGap:false, cls:'' };
            const A = Object.assign({}, th, s33Row.L, { image:this.imgSrc('assets/thonet-s34v-detail.jpeg'), raw:'assets/thonet-s34v-detail.jpeg', name:'S 34 V', alt:'Thonet S 34 V cantilever armchair in green fabric with walnut armrests', fit:'cover', pad:'0', tileBg:'#ECEDEC' });
            const G = { kind:'gap', span:s33Row.T.span || 1, rev:s33Row.T.rev, isText:false, isGap:true, isImg:false, cls:'pd-edgap' };
            const row = [G, A];
            if(s33Row.R) row.push(Object.assign({}, th, s33Row.R, { image:this.imgSrc('assets/thonet-s33v-group.jpeg'), raw:'assets/thonet-s33v-group.jpeg', name:'S 33 V', alt:'Thonet S 33 V and S 34 V cantilever chairs in green and sand fabric', fit:'contain', pad:'6% 4%', tileBg:'rgb(232,235,235)' }));
            let at = homeCells.indexOf(t);
            homeCells.splice(at, 0, ...row); homeItems.push(A); if(row[2]) homeItems.push(row[2]);
            ['pieceId','look','image','raw','name','alt','fit','pad','zoom','filter','tileBg','hasCap'].forEach(k=>{ const v = A[k]; A[k] = t[k]; t[k] = v; }); }
          if(false){
            /* (retired) image-variant copy of the olive Vad row */
            const hb = this.BR.horm, vad = { id:'horm', pieceId:'horm-vad', go:'brand', kind:'product', heroKey:'', variantIdx:'', video:'', tileClass:'', look:'horm|shell|olive', country:'HORM', zoom:1, filter:'none', tileBg:'rgb(151,141,92)' };
            Object.assign(t, vad, { image:this.imgSrc('assets/horm-vad-olive.png'), raw:'assets/horm-vad-olive.png', name:'Vad Wood', alt:'HORM Vad Wood chair in black on wooden legs', fit:'contain', pad:'0' });
            if(tx >= 0){ if(hb) Object.assign(homeCells[tx], { id:'horm', brandName:hb.name, para1:hb.blurb || hb.short || '', para2:'' });
              const g = homeCells[tx+1];
              if(g && (g.isGap || g.isImg)){ const sp = g.span, rv = g.rev; Object.keys(g).forEach(q=>delete g[q]);
                Object.assign(g, vad, { span:sp, rev:rv, ar:'5 / 4', hasCap:true, isImg:true, isText:false, isGap:false, cls:'', image:this.imgSrc('assets/horm-vad-swivel-full.png'), raw:'assets/horm-vad-swivel-full.png', name:'Vad Girevole', alt:'HORM Vad Girevole swivel chair in olive fabric', fit:'cover', pad:'0' }); } } }
          /* the other (lower) S 411 tile becomes a Him + Her side view */
          const d = homeCells.filter(c=>c!==t && c.isImg && c.pieceId==='thonet-s411' && !c.video).pop();
          if(d) Object.assign(d, { id:'horm', pieceId:'horm-him-her', country:'HORM', look:'horm|shell|pair', heroKey:'', variantIdx:'', image:this.imgSrc('assets/horm-himher-opaca-pair.jpeg'), raw:'assets/horm-himher-opaca-pair.jpeg', name:'Him + Her', alt:'HORM Him + Her chairs', fit:'contain', pad:'4% 0', zoom:1, filter:'none', tileBg:'#FFFFFF' });
          if(d){ const di = homeCells.indexOf(d);
            for(let k = di - 1; k >= Math.max(0, di - 3); k--){ const c = homeCells[k];
              if(c.isText && c.id==='thonet' && k !== tx){ const sp=c.span, rv=c.rev; Object.keys(c).forEach(q=>delete c[q]); Object.assign(c,{ kind:'gap', span:sp, rev:rv, isText:false, isGap:true, isImg:false, cls:'pd-edgap' }); break; } } } } } }
    /* closing Gaga row: the video + natural pair sits centred (cols 2-3), no text */
    { const vi = homeCells.findIndex(c=>c.isImg && c.video==='assets/gaga-cod-video.mp4'), T = vi >= 0 ? homeCells[vi+2] : null;
      if(T && T.isText && T.id==='gaga'){ const sp = T.span, rv = T.rev; Object.keys(T).forEach(q=>delete T[q]);
        Object.assign(T, { kind:'gap', span:sp, rev:rv, isText:false, isGap:true, isImg:false, cls:'pd-edgap' });
        homeCells.splice(vi+2, 1); homeCells.splice(vi, 0, T); } }
    /* image variant: the second HORM text (Stereo row) repeats the first, so it goes */
    { const hs = homeCells.map((c,k)=>(c.isText && c.id==='horm') ? k : -1).filter(k=>k>=0);
      if(hs.length > 1){ const T = homeCells[hs[1]], sp = T.span, rv = T.rev; Object.keys(T).forEach(q=>delete T[q]); Object.assign(T, { kind:'gap', span:sp, rev:rv, isText:false, isGap:true, isImg:false, cls:'pd-edgap' }); } }
    /* statement variant: the second HORM text repeats the first, so it goes */
    if(false){ const hs = homeCells.map((c,k)=>(c.isText && c.id==='horm') ? k : -1).filter(k=>k>=0);
      if(hs.length > 1){ const T = homeCells[hs[1]], sp = T.span, rv = T.rev; Object.keys(T).forEach(q=>delete T[q]); Object.assign(T, { kind:'gap', span:sp, rev:rv, isText:false, isGap:true, isImg:false, cls:'pd-edgap' }); } }
    /* statement variant: the centred COD pair becomes 118 FV + 118 SPFV */
    if(false){ const vi = homeCells.findIndex(c=>c.isImg && c.video==='assets/gaga-cod-video.mp4'), N = vi >= 0 ? homeCells[vi+1] : null;
      const th = { id:'thonet', go:'brand', kind:'product', heroKey:'', variantIdx:'', video:'', vScale:1, vShift:'0%', tileClass:'', look:'thonet|beech|light', country:'THONET', zoom:1, filter:'none', hasCap:true, fit:'cover', pad:'0', tileBg:'#ECEDEC' };
      if(vi >= 0) Object.assign(homeCells[vi], th, { pieceId:'thonet-118fv', image:this.imgSrc('assets/thonet-118fv-pair.jpeg'), raw:'assets/thonet-118fv-pair.jpeg', name:'118 FV', alt:'Thonet 118 FV armchairs in black and natural beech with cane seats' });
      if(vi >= 0 && N && N.isImg){ const k = homeItems.indexOf(N); if(k >= 0) homeItems.splice(k, 1); homeCells.splice(vi+1, 1); const F = homeCells[vi]; Object.assign(F, { span:1, cls:'' });
        const P = homeCells[vi-1], Q = homeCells[vi+1]; if(P && P.isGap) P.span = 2; if(Q && Q.isGap){ homeCells[vi] = Q; homeCells[vi+1] = F; } } }
    /* image variant: the closing COD row (video + natural pair) is removed */
    { const vi = homeCells.findIndex(c=>c.isImg && c.video==='assets/gaga-cod-video.mp4');
      if(vi >= 0){ let s = vi > 0 && homeCells[vi-1].isGap ? vi-1 : vi, e = vi + 1; if(homeCells[e] && homeCells[e].isImg) e++; if(homeCells[e] && homeCells[e].isGap) e++;
        homeCells.slice(s, e).forEach(c=>{ const k = homeItems.indexOf(c); if(k >= 0) homeItems.splice(k, 1); }); homeCells.splice(s, e - s); } }
    let endPair = null;
    /* image variant: the KOOZO pair (logo sofa + Jason) closes the grid, cols 1-2 */
    { const F0 = homeCells.find(c=>c.isImg && c.raw==='assets/koozo-sofa-koozo-white.jpg'), J0 = homeCells.find(c=>c.isImg && c.pieceId==='koozo-jason' && c.raw!=='assets/koozo-sofa-koozo-white.jpg');
      if(F0 && J0){ const used = homeCells.reduce((s,c)=>s+(c.span||1),0) % 4, n = homeCells.length;
                const F1 = Object.assign({}, F0, { span:1, rev:n+1, cls:'pd-rowstart' }), J1 = Object.assign({}, J0, { span:1, rev:n+2, cls:'' });
        while(homeCells.length && homeCells[homeCells.length-1].isGap) homeCells.pop(); homeCells.push(F1, J1); homeItems.push(F1, J1); endPair = [F1, J1]; } }
    /* Image 2: a copy of the Image variant with the HORM Cherish photo as cover */
    if(this.state.brandsVariant === 'image' && this.state.imageAlt){ const A = homeCells.find(c=>c.isImg && c.heroKey==='anchor');
      if(A) Object.assign(A, { id:'horm', pieceId:'horm-cherish', go:'brand', video:'', image:this.imgSrc('assets/horm-cherish-cover.webp'), raw:'assets/horm-cherish-cover.webp', name:'Cherish', alt:'HORM Cherish chairs in yellow, natural and white', country:'HORM', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#111', span:2, ar:'1200 / 901' }); }
    if(this.state.brandsVariant === 'image' && (this.state.imageAlt==='alt2' || ['alt3','alt4','alt5'].includes(this.state.imageAlt))){ const A = homeCells.find(c=>c.isImg && c.heroKey==='anchor');
      if(A) Object.assign(A, { id:'horm', pieceId:'horm-him-her', go:'brand', video:'', image:this.imgSrc('assets/horm-him-side-white-cover.jpeg'), raw:'assets/horm-him-side-white-cover.jpeg', name:'Him + Her', alt:'HORM Him chair in white, side view', country:'HORM', fit:'contain', pad:'0', zoom:1, filter:'none', tileBg:'#FFFFFF', ar:'2951 / 2214' });
      /* Image 4: the cover takes the Statement setup, the KOOZO pair centred in cols 2-3 */
      const hx = A ? homeCells.indexOf(A) : -1, F = homeCells.find(c=>c.isImg && c.raw==='assets/koozo-sofa-koozo-white.jpg'), J = homeCells.find(c=>c.isImg && c.pieceId==='koozo-jason' && c.raw!=='assets/koozo-sofa-koozo-white.jpg');
      if(hx >= 0 && F && J){ const pick = c => ({ id:c.id, pieceId:c.pieceId, ar:c.ar, image:c.image, raw:c.raw, name:c.name, country:c.country, hasCap:c.hasCap, fit:c.fit, pad:c.pad, filter:c.filter, tileBg:c.tileBg, zoom:c.zoom });
        homeCells.splice(hx, 1, { kind:'pair', span:2, rev:A.rev, cls: ['alt4','alt5'].includes(this.state.imageAlt) ? 'pd-coverpair pd-coversolo' : 'pd-coverpair', isImg:false, isText:false, isGap:false, isPair:true, pair: ['alt3','alt4','alt5'].includes(this.state.imageAlt)
          ? ['assets/horm-him-side-white-cover.jpeg','assets/horm-him-3q-white.jpeg'].map(src => Object.assign(pick(F), { id:'horm', pieceId:'horm-him-her', image:this.imgSrc(src), raw:src, name:'Him + Her', country:'HORM', fit:'contain', pad:'0', zoom:1, filter:'none', tileBg:'#FFFFFF', hasCap:false }))
          : [Object.assign(pick(F), { id:'koozo', pieceId:'koozo-jason', hasCap:false }), Object.assign(pick(J), { hasCap:false, image:this.imgSrc('assets/koozo-cover-right-sale.png'), raw:'assets/koozo-cover-right-sale.png', ar:'3 / 4', fit:'contain', pad:'0', zoom:1, filter:'none', tileBg:'#F7F6F2' })] },
          { kind:'gap', span:1, rev:A.rev, isText:false, isGap:true, isImg:false, cls:'pd-edgap' });
        if(['alt4','alt5'].includes(this.state.imageAlt)){ const P = homeCells[hx]; P.pair = P.pair.slice(1); const cs='assets/home-cover-janua-basic.webp'; Object.assign(P.pair[0], { id:'janua', pieceId:'janua-sk05-basic', image:this.imgSrc(cs), raw:cs, name:'SK 05 Basic', country:'JANUA', fit:'cover', pad:'0', tileBg:'#3a3a3a', ar:'780 / 420' }); }
        if(this.state.imageAlt==='alt2'){ const P = homeCells[hx]; P.cls = 'pd-coverpair pd-coverport'; P.pair = [Object.assign(pick(F), { id:'anchor', pieceId:'', image:this.imgSrc('assets/hero-frama-folding-chairs.webp'), raw:'assets/hero-frama-folding-chairs.webp', name:'Folded wooden chairs leaning against a timber wall', country:'', ar:'4 / 5', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'var(--surface2)', hasCap:false, hover:false })]; } } }
    if(this.state.brandsVariant==='image' && ['alt4','alt5'].includes(this.state.imageAlt)){ const bx = homeCells.findIndex(c=>c.isImg && c.raw==='assets/horm-him-side-pairscale.jpg');
      if(bx >= 0){ const B = homeCells[bx]; const src='assets/home-mocoba-shelf-2400c.jpg';
        const N = Object.assign({}, B, { id:'mocoba', pieceId:'mocoba-classic-3x3', country:'MOCOBA', image:this.imgSrc(src), raw:src, alt:'Mocoba Classic shelving against a concrete wall', name:'Classic', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#FFFFFF', rev:homeCells.length, cls:'pd-rowstart2', hasCap:true, capGhost:false });
        const px = homeCells.findIndex((c,k)=>k>bx && c.isImg && c.raw==='assets/horm-himher-portrait.png'), at = px > bx ? px + 1 : bx + 1;
        homeCells.splice(at, 0, N, { kind:'gap', span:2, rev:homeCells.length+1, isText:false, isGap:true, isImg:false, cls:'pd-edgap' }); } }
    if(this.state.brandsVariant==='image') homeCells.forEach(c=>{ if(c.isImg && c.pieceId==='koozo-jason' && c.raw==='assets/koozo-jason.png' && !(typeof window!=='undefined' && (window.innerWidth <= 760 || window.matchMedia('(hover: none)').matches))) { const cream = true; c.hover = true; c.hoverCol = cream ? '#F7F6F2' : '#FFFFFF'; c.hoverBg = "url('"+this.imgSrc(cream ? 'assets/koozo-cover-right-sale.png' : 'assets/koozo-cover-right-sale-white.png')+"')"; } });
    /* the closing pair shows the two white Him chairs */
    if(endPair) ['assets/horm-him-3q-white.jpeg','assets/horm-him-side-white-cover.jpeg'].forEach((src,k)=> Object.assign(endPair[k], { id:'horm', pieceId:'horm-him-her', go:'brand', heroKey:'', variantIdx:'', video:'', image:this.imgSrc(src), raw:src, name:'Him + Her', alt:k ? 'HORM Him chair in white, side view' : 'HORM Him chair in white, three-quarter view', country:'HORM', fit:'contain', pad:'0', zoom:1, filter:'none', tileBg:'#FFFFFF', hasCap:true }));
    /* Image 5: the closing pair shows KOOZO Jason (still + film) so it doesn't repeat the cover */
    if(endPair && this.state.brandsVariant==='image' && ['alt3','alt4','alt5'].includes(this.state.imageAlt)){ const fr = 'assets/koozo-jason-frame.png';
      endPair.forEach((c,k)=> Object.assign(c, { id:'koozo', pieceId:'koozo-jason', image:this.imgSrc(k ? fr : 'assets/koozo-cube-armrest.jpg'), raw: k ? fr : 'assets/koozo-cube-armrest.jpg', video: k ? 'assets/koozo-jason-video.mp4' : '', vScale: k ? 0.7 : 1, vShift:'0%', vMask:'none', name:'Jason', alt:'KOOZO Jason sofa', country:'KOOZO', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#ECECEA', hasCap:true }, k ? {} : { pieceId:'', name:'Cube', alt:'KOOZO Cube sofa armrest in woven fabric' })); }
    if(endPair && endPair[0] && this.state.brandsVariant==='image' && ['alt3','alt4','alt5'].includes(this.state.imageAlt)){ const src='assets/horm-albino-torcia-white-mood.jpg';
      Object.assign(endPair[0], { id:'horm', pieceId:'horm-albino-torcia', go:'brand', image:this.imgSrc(src), raw:src, video:'', name:'Albino Torcia', alt:'HORM Albino Torcia side table with torch in white', country:'HORM', fit:'cover', pad:'0', zoom:1, filter:'none', tileBg:'#FFFFFF', hasCap:true }); }
    if(endPair && endPair[1] && this.state.brandsVariant==='image' && ['alt3','alt4','alt5'].includes(this.state.imageAlt)){
      const fr = ['front','angle','side','backangle','back','backangle','side','angle'].map((n,k)=>({ bg:"url('"+this.imgSrc('assets/yamakawa-c607-'+n+'.png')+"')", tf: k>4 ? 'scaleX(-1)' : 'none', delay: (k*1.8 - 14.4)+'s' }));
      Object.assign(endPair[1], { id:'yamakawa', pieceId:'yamakawa-c607', go:'brand', heroKey:'', variantIdx:'', image:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', raw:'assets/yamakawa-c607-front.png', video:'', hover:false, name:'C 607', alt:'Yamakawa C 607 chair rotating', country:'YAMAKAWA', fit:'contain', pad:'0', zoom:1, filter:'none', tileBg:'#F7F6F2', hasCap:true, spin:true, spinFrames:fr }); }
    if(endPair && endPair[1] && this.state.brandsVariant==='image' && ['alt3','alt4','alt5'].includes(this.state.imageAlt)){
      const n = homeCells.length, D0 = Object.assign({}, endPair[0], { rev:n+1, cls:'pd-rowstart' }), D1 = Object.assign({}, endPair[1], { rev:n+2, cls:'' });
      const at = homeCells.indexOf(endPair[1]) + 1; homeCells.splice(at, 0, D0); homeItems.push(D0);
      { const src='assets/home-nature-field.jpg', D2 = Object.assign({}, D0, { rev:n+3, cls:'pd-rowstart', id:'', pieceId:'', go:'', image:this.imgSrc(src), raw:src, video:'', name:'', alt:'Young rice plants and trees in morning light', country:'', fit:'cover', pad:'0', tileBg:'#FFFFFF', hasCap:false, capGhost:false, hover:false, noLink:true }); homeCells.splice(at+1, 0, D2); homeItems.push(D2); }
      ['front','charcoal'].forEach((n,k)=>{ const src='assets/yamakawa-c607-'+n+'.png'; Object.assign(endPair[k], { kind:'product', id:'yamakawa', pieceId:'yamakawa-c607', go:'brand', heroKey:'', variantIdx: k ? 1 : '', image:this.imgSrc(src), raw:src, video:'', hover:false, spin:false, spinFrames:[], name:'C 607', alt: k ? 'Yamakawa C 607 chair in charcoal rattan' : 'Yamakawa C 607 chair, front view', country:'YAMAKAWA', fit:'contain', pad:'0 6%', zoom:1, filter:'none', tileBg:'#F7F6F2', hasCap:true }); }); }
    homeCells.forEach(c=>{ if(c.capGhost){ c.hasCap = false; c.cls = ((c.cls||'')+' pd-capgap').trim(); } });
    /* 2-col video tiles share the 3:2 ratio of the 2-col image tiles */
    homeCells.forEach(c=>{ if(c.isImg && (c.video || /\.gif$/i.test(c.raw||'')) && c.span===2) c.ar = '3 / 2'; });
    { const mc = c => { if(!c || c.hasCap) return; const p = c.pieceId ? this.PROD.find(x=>x.id===c.pieceId) : null, b = this.BR[(p && p.brand) || c.id];
        if(!b && !p) return; c.mCap = true; c.mName = p ? p.name : (b.name || ''); c.mBrand = (p && b) ? String(b.name||'').toUpperCase() : (b && b.country ? String(b.country).toUpperCase() : ''); };
      homeCells.forEach(c=>{ if(c.isImg) mc(c); if(c.isPair && c.pair) c.pair.forEach(mc); }); }
    return {
      isHome:view==='home'||view==='collection', isCollection:view==='collection', isBrand:view==='brand', isAbout:view==='about', isMaterials:view==='materials', materialsList:this.materialsList(), visitOpen:st.visitOpen,
      showHeaderMeta: view!=='home' && view!=='collection', showVisitBtn: view!=='home' && view!=='collection' && view!=='about',
      navHome: (view==='home'||view==='brand') ? 'pd-chip-on' : '', navCollection: view==='collection' ? 'pd-chip-on' : '', navAbout: view==='about' ? 'pd-chip-on' : '',
      bpanelCenterCls: 'pd-panel-center',
      menuOpen:st.menuOpen, mxTop:st.mxTop||'20px', mxRight:st.mxRight||'var(--gx)', searchOpen:st.searchOpen, cartOpen:st.cartOpen, panelOpen:st.panelOpen,
      inquiryOpen:st.inquiryOpen, lightboxOpen:st.lightboxOpen, toast:st.toast, apptSent:st.apptSent,
      cartCount: cart.length, cart, cartEmpty:cart.length===0, cartHasItems:cart.length>0,
      inquiryKind: 'Email us', inquiryTitle: st.inquiryProduct || 'Get in touch',
      gridMin, captionClass, filterBrand:st.filterBrand, brandOptions, hasFilters, headingLabel,
      sortTitle: this.SORT_TITLES[st.sort], sortLabel: ({featured:'Featured','price-asc':'Price ↑','price-desc':'Price ↓',name:'A–Z'})[st.sort],
      gridOpacity: st.gridFading ? 0.1 : 1,
      homeColumns: this.effCols(),
      footSocialCol: Math.max(1, this.effCols() - 1), footLegalCol: Math.max(2, this.effCols()),
      brandList, brandCards, brandRest, hasBrandRest: brandRest.length>0, homeItems, homeCells: (st.brandsVariant==='image' || (this.props.statementBelowImage ?? true)) ? (()=>{ const fi = homeCells.some(c=>c.isPair) ? -1 : homeCells.findIndex(c=>c.isImg); const ctr = st.brandsVariant!=='image'; const up = st.brandsVariant==='text2'; return homeCells.map((c,i)=> i===fi ? Object.assign({},c,{headline:!up, headlineTop:up, hlCls: (st.brandsVariant==='image' && !st.imageAlt) ? 'pd-hl32' : '', hlAlign: ctr?'center':'left', hlItems: ctr?'center':'flex-start'}) : c); })() : homeCells, homeGridMin, filtered, gridItems, resultCount:filtered.length, indexCount:indexRows.length, noResults:filtered.length===0,
      searchHasQuery: !!(st.search||'').trim(),
      searchNoResults: !!(st.search||'').trim() && matches.length===0,
      searchResults: matches.map((r,i)=>Object.assign({}, r, {rowBg: i===activeIdx?'var(--surface)':'transparent'})),
      indexCats, indexRows, indexListLabel, indexTotal:this.PROD.length, indexCatCount:this.CATS.length-1,
      brandPanelOpen:st.brandPanelOpen, bpanel, bpanelImage, bpanelPair, bpanelPairImgs: bpanelPair ? bpImages.slice(0,2) : [], ...((this._pairA = bpanelPair ? bpImages[0] : null), (this._pairB = bpanelPair ? bpImages[1] : null), {}), bpanelSingle: !!bpanelImage && !bpanelPair, bpanelNoMedia: !bpanelImage, bpanelEmptyName: (bpiece && bpiece.name) || bpanel.name,
      bpieceHas: !!bpiece, bpiece: bpiecePanel, bpieceSpecs, bpanelShape: /detail-mood/.test(bpRaw[bpIdx]||'') ? 'tall' : (bpiece && (bpiece.shape==='wide' || bpiece.category==='Sofas')) ? 'wide' : 'tall',
      bpanelFit: bpPhoto ? 'cover' : bpd ? bpd.fit : (bpanelRaw.fit || 'contain'),
      bpanelPad: bpPhoto ? '0' : bpd ? bpd.pad : (bpanelRaw.pad || '0'),
      bpanelBg: bpd ? bpd.tileBg : (bpanelRaw.tileBg || 'var(--media)'),
      bpanelZoom: bpPhoto ? 1 : bpd ? bpd.zoom : (bpanelRaw.zoom || 1),
      mailText: ['info','primitiveanddesign.com'].join(String.fromCharCode(64)), mailHref: 'mai'+'lto:'+['info','primitiveanddesign.com'].join(String.fromCharCode(64)),
      waHref: (()=>{ const wp = st.brandPanelOpen && st.bpanelPiece ? this.PROD.find(x=>x.id===st.bpanelPiece) : (st.panelOpen ? this.curProduct() : null); const bn = wp ? ((this.BR[wp.brand]||{}).name||'') : ''; const txt = wp ? 'Hello, I would like to ask about '+wp.name+(bn?' by '+bn:'')+'.' : 'Hello, I would like to get in touch.'; return 'https://wa.me/972508385580?text='+encodeURIComponent(txt); })(),
      bpanelVariants, bpanelHasVariants: bpanelVariants.length > 0, ...(bpanelVariants.length > 8 ? { bpThumbWrap:'wrap', bpThumbH:'auto', bpThumbMt:'0', bpThumbTf:'none' } : { bpThumbWrap:'nowrap', bpThumbH:'0', bpThumbMt:'-14px', bpThumbTf:'translateY(14px)' }),
      bpanelProducts, bpanelHasProducts:bpanelProducts.length>0, bpanelCount:bpanelProducts.length,
      categories, brand, brandProducts, brandCount: brandProducts.length + (brandProducts.length===1?' piece':' pieces'),
      product, related, hasRelated:related.length>0,
      lightboxImage: product.activeImage,
      campSpacer: ((this.props.statementBelowImage ?? true) && st.brandsVariant!=='image'), showCamp: !((this.props.statementBelowImage ?? true) && st.brandsVariant!=='image'), variantImage: false, variantText: !((this.props.statementBelowImage ?? true) && st.brandsVariant!=='image'), showCollectionLine: st.brandsVariant!=='image',
      blendChipCls: (st.blendOn ?? this.props.heroBlend) ? 'pd-chip-on' : '',
      headerPadBottom: '0px',
      isDev: typeof location !== 'undefined' && !/netlify\.app|primitiveanddesign\.com/.test(location.hostname),
      variantLabel: st.brandsVariant==='image' ? (st.imageAlt==='alt5' ? '7' : st.imageAlt==='alt4' ? '6' : st.imageAlt==='alt3' ? '5' : st.imageAlt==='alt2' ? '4' : st.imageAlt ? '3' : '1') : '2',
      introPlaying: st.introPlaying,
      introBgOpacity: (st.introStage==='flip'||st.introStage==='cross') ? 0 : 1,
      introChromeOpacity: 1,
      introCountLabel: '0'+Math.max(1,st.introCount)+' / 04',
      introClone0: introClones[0], introClone1: introClones[1], introClone2: introClones[2], introClone3: introClones[3],
      onSearch:this.onSearch, onBrandFilter:this.onBrandFilter, onInquiry:this.onInquiry,
      onAppointment:this.onAppointment, stop:this.stop, closeInquiry:(e)=>{ if(e) e.stopPropagation(); this.setState({inquiryOpen:false}); }
    };
  }
}
