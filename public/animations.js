/* ──────────────────────────────────────────────
   AI-Native Dark — Animation Engine
   Reusable JS for the motion patterns from
   pedro-garcia.dev: typewriters, terminal stream,
   table type+collapse, shimmer-on-scroll.

   Usage:
     <script src="animations.js"></script>
     anim.typeHTML(el, html, 38);
     anim.observeShimmer('.shim');
     anim.scrollProgress('#scrollbar');
     ...

   All functions are async/Promise-based so you can
   sequence them with `await`.
   ────────────────────────────────────────────── */

(() => {
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  let cancelAll = false;
  const setCancel = (v) => { cancelAll = v; };
  const isCancelled = () => cancelAll;

  /* ── Typewriter (plain text) ─────────────────
     Use for: terminal output, inputs, anything
     without HTML structure.
  ────────────────────────────────────────────── */
  const typeText = (el, text, speed = 18) => new Promise(res => {
    let i = 0;
    const tick = () => {
      if (cancelAll) { el.textContent = text; return res(); }
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, speed);
      else res();
    };
    tick();
  });

  /* ── Typewriter (HTML-aware) ─────────────────
     Tags are atomic — written instantly, not
     letter-by-letter. Cursor sits at the caret.
     Use for: headings + body copy with <strong>,
     <span class="accent">, <br/>, etc.

     IMPORTANT: capture the HTML BEFORE clearing,
     and lock the element's height so the page
     doesn't reflow when the text is being typed.

       const html = el.innerHTML;
       el.style.minHeight = el.offsetHeight + 'px';
       el.innerHTML = '<span class="type-cursor"></span>';
       await anim.typeHTML(el, html, 38);
       el.style.minHeight = '';
  ────────────────────────────────────────────── */
  const typeHTML = (el, html, speed = 28) => new Promise(res => {
    let i = 0;
    const tick = () => {
      if (cancelAll) { el.innerHTML = html; return res(); }
      if (html[i] === '<') {
        const close = html.indexOf('>', i);
        if (close < 0) { el.innerHTML = html; return res(); }
        i = close + 1;
      } else {
        i++;
      }
      if (i >= html.length) { el.innerHTML = html; return res(); }
      el.innerHTML = html.slice(0, i) + '<span class="type-cursor"></span>';
      // small jitter for a natural rhythm
      setTimeout(tick, speed + (Math.random() * speed * 0.4 - speed * 0.2));
    };
    tick();
  });

  /* ── Hero typing setup ───────────────────────
     Reserves height, captures HTML, parks cursor.
     Returns {h1Html, ledeHtml, type()} so you can
     run other animations first and type at the end.

       const hero = anim.prepHero('.hero h1[data-typing]',
                                  '.hero .lede[data-typing]');
       await hero.type();         // both, h1 then lede
       // or: await hero.typeH1(); await hero.typeLede();
  ────────────────────────────────────────────── */
  const prepHero = (h1Sel, ledeSel, opts = {}) => {
    const h1 = document.querySelector(h1Sel);
    const lede = document.querySelector(ledeSel);
    const h1Html = h1 ? h1.innerHTML.trim() : '';
    const ledeHtml = lede ? lede.innerHTML.trim() : '';
    if (h1) {
      h1.style.minHeight = h1.offsetHeight + 'px';
      h1.innerHTML = '<span class="type-cursor"></span>';
      h1.classList.add('ready');
    }
    if (lede) {
      lede.style.minHeight = lede.offsetHeight + 'px';
      lede.innerHTML = '';
      lede.classList.add('ready');
    }
    const speed = opts.speed || { h1: 38, lede: 14 };
    const gap = opts.gap ?? 160;
    return {
      h1, lede, h1Html, ledeHtml,
      typeH1: async () => {
        if (!h1) return;
        await typeHTML(h1, h1Html, speed.h1);
        h1.style.minHeight = '';
      },
      typeLede: async () => {
        if (!lede) return;
        await typeHTML(lede, ledeHtml, speed.lede);
        lede.style.minHeight = '';
      },
      type: async () => {
        if (h1) { await typeHTML(h1, h1Html, speed.h1); h1.style.minHeight = ''; }
        if (gap) await wait(gap);
        if (lede) { await typeHTML(lede, ledeHtml, speed.lede); lede.style.minHeight = ''; }
      },
      skip: () => {
        if (h1) { h1.innerHTML = h1Html; h1.style.minHeight = ''; }
        if (lede) { lede.innerHTML = ledeHtml; lede.style.minHeight = ''; }
      }
    };
  };

  /* ── Terminal stream overlay ─────────────────
     The "generate experience.profile()" intro.
     Pass a config: {overlaySelector, promptSelector,
     outSelector, cursorSelector, skipSelector,
     storageKey, prompt, lines}.

       const term = anim.terminalStream({
         overlaySelector: '#gen',
         promptSelector:  '#genPrompt',
         outSelector:     '#genOut',
         cursorSelector:  '#genCursor',
         skipSelector:    '#genSkip',
         storageKey:      'pg-intro-played',
         prompt: 'generate experience.profile("you") --stream',
         lines:  ['→ line 1', '→ line 2', '→ render: ok ✓'],
       });
       await term.playIfFirstVisit(onSkip);
  ────────────────────────────────────────────── */
  const terminalStream = (cfg) => {
    const overlay  = document.querySelector(cfg.overlaySelector);
    const promptEl = document.querySelector(cfg.promptSelector);
    const outEl    = document.querySelector(cfg.outSelector);
    const cursor   = document.querySelector(cfg.cursorSelector);
    const skipBtn  = document.querySelector(cfg.skipSelector);

    const dismiss = () => {
      if (!overlay) return;
      overlay.classList.add('done');
      setTimeout(() => overlay.remove(), 600);
      if (cfg.storageKey) sessionStorage.setItem(cfg.storageKey, '1');
    };

    const play = async () => {
      await wait(cfg.startDelay ?? 250);
      await typeText(promptEl, cfg.prompt, cfg.promptSpeed ?? 22);
      if (cancelAll) return;
      await wait(cfg.afterPromptDelay ?? 380);
      let acc = '';
      for (const line of cfg.lines) {
        if (cancelAll) return;
        const start = acc;
        for (let j = 0; j <= line.length; j++) {
          if (cancelAll) return;
          outEl.textContent = start + line.slice(0, j);
          await wait(cfg.charSpeed ?? 8);
        }
        acc = start + line + '\n';
        outEl.textContent = acc;
        await wait(cfg.lineDelay ?? 140);
      }
      if (cursor) cursor.style.background = 'var(--text-3)';
      await wait(cfg.endDelay ?? 500);
      if (!cancelAll) dismiss();
    };

    return {
      play,
      dismiss,
      onSkip: (handler) => {
        if (!skipBtn) return;
        skipBtn.addEventListener('click', () => {
          cancelAll = true;
          dismiss();
          handler && handler();
        });
      },
      playIfFirstVisit: async () => {
        if (cfg.storageKey && sessionStorage.getItem(cfg.storageKey)) {
          overlay && overlay.remove();
          return false;
        }
        await play();
        cancelAll = false;
        return true;
      }
    };
  };

  /* ── Key/value table: type then collapse ─────
     Pattern: dl > div > (dt, dd). The card types
     each row in sequence, then optionally collapses
     to a compact subset of keys.

       const t = anim.typeAndCollapseTable({
         tableSelector: '.info-card dl > div',
         cardSelector:  '.info-card',
         keepKeys:      ['rol','foco','estado'],
         compactClass:  'compact',
         collapseClass: 'collapsed',
       });
       await t.type();
       await t.collapse();   // optional
       // or t.revealInstant() for the skip path
  ────────────────────────────────────────────── */
  const typeAndCollapseTable = (cfg) => {
    const rows = Array.from(document.querySelectorAll(cfg.tableSelector));
    const card = document.querySelector(cfg.cardSelector);
    const data = rows.map(row => {
      const dt = row.querySelector('dt');
      const dd = row.querySelector('dd');
      return {
        row, dt, dd,
        key: dt ? dt.textContent : '',
        valueHTML: dd ? dd.innerHTML.trim() : ''
      };
    });
    // blank out
    rows.forEach(r => { r.style.opacity = '0'; });
    data.forEach(p => {
      if (p.dt) p.dt.textContent = '';
      if (p.dd) p.dd.innerHTML = '';
    });

    const keepSet = new Set(cfg.keepKeys || []);
    const compact = cfg.compactClass || 'compact';
    const collapsed = cfg.collapseClass || 'collapsed';

    return {
      type: async () => {
        for (const p of data) {
          if (cancelAll) break;
          p.row.style.opacity = '1';
          for (let i = 0; i <= p.key.length; i++) {
            if (cancelAll) break;
            if (p.dt) p.dt.textContent = p.key.slice(0, i);
            await wait(cfg.keySpeed ?? 14);
          }
          await wait(60);
          const html = p.valueHTML;
          let i = 0;
          while (i < html.length) {
            if (cancelAll) break;
            if (html[i] === '<') {
              const close = html.indexOf('>', i);
              if (close < 0) break;
              i = close + 1;
            } else { i++; }
            if (p.dd) p.dd.innerHTML = html.slice(0, i);
            await wait(cfg.valueSpeed ?? 10);
          }
          if (p.dd) p.dd.innerHTML = html;
          await wait(cfg.rowDelay ?? 60);
        }
      },
      collapse: async (onCollapse) => {
        await wait(cfg.preCollapseDelay ?? 500);
        data.forEach(p => {
          if (!keepSet.has(p.key)) p.row.classList.add(collapsed);
        });
        if (card) card.classList.add(compact);
        if (onCollapse) await onCollapse();
      },
      revealInstant: () => {
        data.forEach(p => {
          if (p.dt) p.dt.textContent = p.key;
          if (p.dd) p.dd.innerHTML = p.valueHTML;
          p.row.style.opacity = '1';
          if (keepSet.size && !keepSet.has(p.key)) p.row.classList.add(collapsed);
        });
        if (card && keepSet.size) card.classList.add(compact);
      }
    };
  };

  /* ── Photo / element fade-in on signal ───────
     Adds the 'shown' class after a delay. Use in
     concert with CSS that transitions opacity +
     transform on .shown.
  ────────────────────────────────────────────── */
  const fadeIn = async (selector, delay = 280) => {
    await wait(delay);
    const el = document.querySelector(selector);
    if (el) el.classList.add('shown');
  };

  /* ── Scroll progress bar ────────────────────── */
  const scrollProgress = (selector) => {
    const bar = document.querySelector(selector);
    if (!bar) return;
    const upd = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', upd, { passive: true });
    upd();
  };

  /* ── Shimmer-regen word on scroll ────────────
     Markup:
       <span class="shim" data-alts="opt1|opt2|opt3">opt1</span>

     The element shimmers when it scrolls into view.
     If data-alts is set, cycles through the
     alternatives on each re-entry.

       anim.observeShimmer('.shim');
  ────────────────────────────────────────────── */
  const observeShimmer = (selector, opts = {}) => {
    const els = document.querySelectorAll(selector);
    els.forEach(el => { el.dataset.original = el.textContent; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.dataset.shimmed === '1' && !opts.repeat) return;
        el.dataset.shimmed = '1';
        const alts = (el.dataset.alts || '').split('|').filter(Boolean);
        el.classList.remove('active');
        void el.offsetWidth; // reflow to restart animation
        el.classList.add('active');
        if (alts.length) {
          const cur = el.textContent.trim();
          const idx = Math.max(0, alts.indexOf(cur));
          const next = alts[(idx + 1) % alts.length];
          // brief mid-shimmer swap
          setTimeout(() => { el.textContent = next; }, 350);
        }
      });
    }, { threshold: opts.threshold ?? .7 });
    els.forEach(el => io.observe(el));
    return io;
  };

  /* ── Count-up numbers ────────────────────────
     Markup: <span data-countto="40" data-suffix="k+">0</span>

       anim.countUp('[data-countto]');
  ────────────────────────────────────────────── */
  const countUp = (selector, opts = {}) => {
    const els = document.querySelectorAll(selector);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.dataset.counted === '1') return;
        el.dataset.counted = '1';
        const to = parseFloat(el.dataset.countto);
        const suffix = el.dataset.suffix || '';
        const dur = parseInt(el.dataset.dur || opts.dur || 1100, 10);
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = Math.round(to * eased);
          el.textContent = v.toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: opts.threshold ?? .5 });
    els.forEach(el => io.observe(el));
    return io;
  };

  // Public API
  window.anim = {
    wait, setCancel, isCancelled,
    typeText, typeHTML,
    prepHero, terminalStream,
    typeAndCollapseTable, fadeIn,
    scrollProgress, observeShimmer, countUp,
  };
})();
