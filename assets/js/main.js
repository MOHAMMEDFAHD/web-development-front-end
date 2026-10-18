/* ==========================================================================
   Front-End Bootcamp · main.js
   --------------------------------------------------------------------------
   All the interactivity for both pages, in plain JavaScript. No libraries,
   no build step, no frameworks. Just the language and the browser.

   How this file is organised
   --------------------------
   The whole file is wrapped in one function that runs itself straight away
   (an IIFE, "immediately invoked function expression"). That keeps every
   variable private, so nothing we write here can clash with other scripts.

   Inside it you will find small, independent features. Each one:
     1. looks for its elements in the page using data-* attributes,
     2. quietly does nothing if they are not there,
     3. never assumes another feature exists.
   That is why the same script can serve index.html and about.html: each
   page only "switches on" the features whose markup it contains.

   Why data-* attributes and not classes?
   Classes belong to CSS. If a designer renames .button to .btn, the script
   should not break. data-* attributes are a clear signal that says "a
   script depends on this element".

   Compatibility
   -------------
   The script uses ES2015+ (const, let, arrow functions, template strings),
   which every browser released in the last several years understands. When
   a feature needs a newer API (IntersectionObserver, the Clipboard API,
   <dialog>), we check for it first and fall back gracefully.

   The table of contents
   ---------------------
     01. Tiny helpers
     02. Safe storage
     03. Toast messages
     04. Theme toggle
     05. Mobile navigation
     06. Scroll effects (header, progress bar, back to top)
     07. Scroll spy (highlight the current link)
     08. Reveal on scroll
     09. Number counters
     10. Copy buttons for code
     11. Tabs
     12. Lesson progress tracker
     13. Remembered checkboxes
     14. Sortable tables
     15. Table filter
     16. Forms: validation and helpers
     17. Dialogs
     18. Accordion "open all"
     19. Code playground
     20. Quiz
     21. Footer year
     22. Start everything
   ========================================================================== */

(function () {
  'use strict';

  /* ========================================================================
     01. TINY HELPERS
     Short names for things we type all the time.
     ======================================================================== */

  // Find one element. The second argument lets us search inside a parent.
  const $ = (selector, parent = document) => parent.querySelector(selector);

  // Find many elements and return a real array, so we get map, filter, etc.
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  // The visitor's motion preference, from their operating system settings.
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = () => motionQuery.matches;

  // Is the page right-to-left? We need this for arrow-key navigation.
  const isRtl = () => document.documentElement.dir === 'rtl';

  // A debounce waits until the user stops doing something for a moment
  // before running the function. Perfect for "update while typing".
  function debounce(callback, wait) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => callback.apply(this, args), wait);
    };
  }


  /* ========================================================================
     02. SAFE STORAGE
     localStorage remembers small bits of data in the visitor's browser.
     It can throw an error (private mode, blocked cookies, full disk), so we
     wrap every call in try/catch. If storage fails, the site still works,
     it just forgets things on reload.
     ======================================================================== */

  const PREFIX = 'feb-'; // "front-end bootcamp", keeps our keys together

  const storage = {
    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(PREFIX + key);
        return value === null ? fallback : JSON.parse(value);
      } catch (error) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (error) {
        // Nothing to do. We tried, and the page still works.
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(PREFIX + key);
      } catch (error) {
        // Same as above.
      }
    }
  };


  /* ========================================================================
     03. TOAST MESSAGES
     A toast is a small message that pops up and fades away by itself.
     The region in the HTML has aria-live="polite", so screen readers read
     every new toast without us doing anything extra.
     ======================================================================== */

  function toast(message, type = 'info', duration = 3500) {
    const region = $('[data-toast-region]');
    if (!region) return;

    const item = document.createElement('div');
    item.className = `toast toast--${type}`;
    item.textContent = message; // textContent, never innerHTML, for user text
    region.appendChild(item);

    setTimeout(() => {
      item.classList.add('is-leaving');
      // Remove it once the fade-out transition has finished.
      item.addEventListener('transitionend', () => item.remove(), { once: true });
      // Safety net in case transitions are turned off (reduced motion).
      setTimeout(() => item.remove(), 400);
    }, duration);
  }


  /* ========================================================================
     04. THEME TOGGLE
     The inline script in the <head> already applied the right theme before
     the page appeared. Here we only handle the button and remember the
     choice for next time.
     ======================================================================== */

  function initThemeToggle() {
    const root = document.documentElement;
    const buttons = $$('[data-theme-toggle]');
    if (!buttons.length) return;

    // The colours for the mobile browser bar, matching our CSS tokens.
    const barColors = { light: '#f5f6f7', dark: '#0a0a23' };

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      buttons.forEach((button) => button.setAttribute('aria-pressed', String(theme === 'dark')));
      $$('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', barColors[theme]));
    }

    // Sync the buttons with whatever the head script decided.
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        // The head script reads this key as a plain string, so we store
        // it directly instead of going through JSON like other values.
        try {
          localStorage.setItem(PREFIX + 'theme', next);
        } catch (error) {
          // Not saved, but the theme still changed for this visit.
        }
      });
    });

    // If the visitor never picked a theme, follow their system setting
    // live, for example when the phone switches to dark mode at sunset.
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    const hasSavedTheme = () => {
      try {
        return Boolean(localStorage.getItem(PREFIX + 'theme'));
      } catch (error) {
        return false;
      }
    };
    const onSystemChange = (event) => {
      if (!hasSavedTheme()) applyTheme(event.matches ? 'dark' : 'light');
    };

    // Older Safari only knows addListener, newer browsers prefer addEventListener.
    if (systemDark.addEventListener) {
      systemDark.addEventListener('change', onSystemChange);
    } else if (systemDark.addListener) {
      systemDark.addListener(onSystemChange);
    }
  }


  /* ========================================================================
     05. MOBILE NAVIGATION
     Opens and closes the menu on small screens. Note how we always keep
     aria-expanded in sync with the visual state.
     ======================================================================== */

  function initMobileNav() {
    const toggle = $('[data-nav-toggle]');
    const nav = $('[data-site-nav]');
    if (!toggle || !nav) return;

    const open = () => {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    const close = (returnFocus = false) => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    };

    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    toggle.addEventListener('click', () => (isOpen() ? close() : open()));

    // Pressing Escape closes the menu and puts focus back on the button,
    // so keyboard users never lose their place.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) close(true);
    });

    // Clicking a link inside the menu closes it (important for #anchors,
    // otherwise the menu would stay open and cover the section).
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) close();
    });

    // Clicking anywhere outside the header closes it too.
    document.addEventListener('click', (event) => {
      if (isOpen() && !event.target.closest('[data-site-header]')) close();
    });

    // If the window grows to desktop size while the menu is open, reset it.
    const desktop = window.matchMedia('(min-width: 960px)');
    const onResize = () => {
      if (desktop.matches) close();
    };
    if (desktop.addEventListener) desktop.addEventListener('change', onResize);
  }


  /* ========================================================================
     06. SCROLL EFFECTS
     Three features share ONE scroll listener: the header shadow, the
     progress bar and the back-to-top button.

     Scroll events can fire dozens of times per frame. requestAnimationFrame
     batches the work so it runs at most once per screen refresh. The
     { passive: true } option promises the browser we will never call
     preventDefault(), which lets it scroll without waiting for us.
     ======================================================================== */

  function initScrollEffects() {
    const header = $('[data-site-header]');
    const bar = $('[data-scroll-progress]');
    const backToTop = $('[data-back-to-top]');
    let ticking = false;

    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

      if (header) header.classList.toggle('is-scrolled', scrollTop > 8);
      // We pass the value to CSS through a custom property, and CSS turns
      // it into a scaleX() transform. JS calculates, CSS draws.
      if (bar) bar.style.setProperty('--progress', progress.toFixed(4));
      if (backToTop) backToTop.classList.toggle('is-visible', scrollTop > 600);

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', debounce(update, 150));
    update(); // run once on load, the page may open half-way down

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        // Move keyboard focus to the top as well, otherwise the next Tab
        // press would jump back down to where the button was.
        const brand = $('.brand');
        if (brand) brand.focus({ preventScroll: true });
      });
    }
  }


  /* ========================================================================
     07. SCROLL SPY
     Highlights the link of the section you are currently reading, both in
     the main nav and in the lessons table of contents.

     IntersectionObserver tells us when an element enters or leaves the
     screen, without us measuring anything on every scroll. The rootMargin
     below shrinks the "screen" to a thin band across its middle, so a
     section counts as current when it crosses the middle of the window.
     ======================================================================== */

  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;

    // Collect every in-page link (href starting with #) in the navs.
    const links = $$('.site-nav__link[href^="#"], [data-toc] a[href^="#"]');
    if (!links.length) return;

    // Map each section id to the links that point at it.
    const linksById = new Map();
    links.forEach((link) => {
      const id = decodeURIComponent(link.getAttribute('href').slice(1));
      if (!id) return;
      if (!linksById.has(id)) linksById.set(id, []);
      linksById.get(id).push(link);
    });

    const sections = Array.from(linksById.keys())
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const related = linksById.get(entry.target.id) || [];
        related.forEach((link) => link.classList.toggle('is-active', entry.isIntersecting));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
  }


  /* ========================================================================
     08. REVEAL ON SCROLL
     Fades sections in as they enter the screen. The CSS only hides them
     when html has the .js class, so without this script nothing is ever
     hidden. Always design your effects so failure leaves content visible.
     ======================================================================== */

  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;

    const revealAll = () => items.forEach((item) => item.classList.add('is-revealed'));

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target); // reveal once, then stop watching
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    items.forEach((item) => observer.observe(item));

    // Before printing, show everything, or half the lesson prints blank.
    window.addEventListener('beforeprint', revealAll);
  }


  /* ========================================================================
     09. NUMBER COUNTERS
     Counts from 0 up to data-count-to when the number scrolls into view.
     The HTML already contains the final number, so screen readers and
     people without JavaScript always get the right value.
     ======================================================================== */

  function initCounters() {
    const counters = $$('[data-count-to]');
    if (!counters.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    // Ease-out cubic: fast at the start, gentle at the end.
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    function animate(element) {
      const target = Number(element.getAttribute('data-count-to')) || 0;
      const duration = 1200;
      let start = null;

      function step(timestamp) {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        element.textContent = String(Math.round(target * easeOut(progress)));
        if (progress < 1) window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((counter) => observer.observe(counter));
  }


  /* ========================================================================
     10. COPY BUTTONS FOR CODE
     We CREATE the buttons here instead of writing them in the HTML. If the
     script fails to load, there are no dead buttons on the page.
     ======================================================================== */

  // Copies text and returns a Promise that resolves to true or false.
  function copyText(text) {
    // The modern API only works on https or localhost.
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(() => true, () => false);
    }

    // The old fallback: put the text in a hidden textarea, select, copy.
    return new Promise((resolve) => {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      let ok;
      try {
        ok = document.execCommand('copy');
      } catch (error) {
        ok = false;
      }
      helper.remove();
      resolve(ok);
    });
  }

  function initCodeCopy() {
    $$('.code-block').forEach((block) => {
      const code = $('code', block);
      if (!code) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-block__copy';
      button.textContent = 'نسخ';
      button.setAttribute('aria-label', 'نسخ الكود');
      block.appendChild(button);

      button.addEventListener('click', () => {
        // textContent gives us the code as plain text, with the &lt; and
        // &gt; already turned back into < and > by the browser.
        copyText(code.textContent).then((ok) => {
          button.textContent = ok ? 'تم النسخ' : 'تعذّر النسخ';
          toast(ok ? 'نُسخ الكود إلى الحافظة' : 'لم نتمكن من النسخ، حدّد النص يدوياً', ok ? 'success' : 'error', 2000);
          setTimeout(() => {
            button.textContent = 'نسخ';
          }, 2000);
        });
      });
    });
  }


  /* ========================================================================
     11. TABS
     Follows the WAI-ARIA tabs pattern:
       - only the selected tab is in the Tab order (tabindex 0),
       - arrow keys move between tabs,
       - Home and End jump to the first and last tab.
     In RTL the arrows are mirrored: the left arrow moves to the NEXT tab,
     because "next" sits to the left when you read right-to-left.
     ======================================================================== */

  function initTabs() {
    $$('[data-tabs]').forEach((container) => {
      const tabs = $$('[role="tab"]', container);
      const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
      if (!tabs.length) return;

      function select(index, setFocus = true) {
        tabs.forEach((tab, i) => {
          const active = i === index;
          tab.setAttribute('aria-selected', String(active));
          tab.tabIndex = active ? 0 : -1;
          if (panels[i]) panels[i].hidden = !active;
        });
        if (setFocus) tabs[index].focus();
      }

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => select(index));

        tab.addEventListener('keydown', (event) => {
          const last = tabs.length - 1;
          const forwardKey = isRtl() ? 'ArrowLeft' : 'ArrowRight';
          const backwardKey = isRtl() ? 'ArrowRight' : 'ArrowLeft';
          let next = null;

          if (event.key === forwardKey) next = index === last ? 0 : index + 1;
          if (event.key === backwardKey) next = index === 0 ? last : index - 1;
          if (event.key === 'Home') next = 0;
          if (event.key === 'End') next = last;

          if (next !== null) {
            event.preventDefault(); // stop the page from scrolling
            select(next);
          }
        });
      });

      // Start with whichever tab the HTML marked as selected.
      const initial = Math.max(0, tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'));
      select(initial, false);
    });
  }


  /* ========================================================================
     12. LESSON PROGRESS TRACKER
     Every lesson ends with an "I finished this lesson" checkbox. We store
     the finished lesson ids as an array in localStorage and update the
     <progress> bar, the label, the lesson card and the table of contents.
     ======================================================================== */

  function initLessonProgress() {
    const checks = $$('[data-lesson-check]');
    if (!checks.length) return;

    const bar = $('[data-course-progress]');
    const label = $('[data-course-progress-label]');
    const resetButton = $('[data-progress-reset]');
    const total = checks.length;

    // A Set is like an array that never holds the same value twice.
    const done = new Set(storage.get('lessons', []));

    function render() {
      checks.forEach((check) => {
        const id = check.getAttribute('data-lesson-check');
        const finished = done.has(id);
        check.checked = finished;

        const lesson = check.closest('.lesson');
        if (lesson) lesson.classList.toggle('is-complete', finished);

        const tocLink = $(`[data-toc] a[href="#${id}"]`);
        if (tocLink) tocLink.classList.toggle('is-done', finished);
      });

      if (bar) {
        bar.max = total;
        bar.value = done.size;
        bar.textContent = `${done.size} من ${total}`;
      }
      if (label) label.textContent = `${done.size} من ${total}`;
    }

    checks.forEach((check) => {
      check.addEventListener('change', () => {
        const id = check.getAttribute('data-lesson-check');
        if (check.checked) {
          done.add(id);
        } else {
          done.delete(id);
        }
        storage.set('lessons', Array.from(done));
        render();

        if (check.checked && done.size === total) {
          toast('أحسنت! أكملت جميع دروس المختبر. حان وقت التحدي النهائي.', 'success', 5000);
        }
      });
    });

    if (resetButton) {
      resetButton.addEventListener('click', () => {
        done.clear();
        storage.remove('lessons');
        render();
        toast('أُعيد ضبط تقدّمك');
      });
    }

    render();
  }


  /* ========================================================================
     13. REMEMBERED CHECKBOXES
     Any checkbox with data-persist="some-key" remembers its state.
     The accessibility checklist in lesson 14 uses this.
     ======================================================================== */

  function initPersistedCheckboxes() {
    $$('input[type="checkbox"][data-persist]').forEach((box) => {
      const key = 'check-' + box.getAttribute('data-persist');
      box.checked = storage.get(key, false) === true;
      box.addEventListener('change', () => storage.set(key, box.checked));
    });
  }


  /* ========================================================================
     14. SORTABLE TABLES
     Click a column header to sort by it, click again to flip the order.
     aria-sort tells screen readers how the table is currently sorted, and
     the CSS draws the little triangle from the same attribute.
     ======================================================================== */

  function initTableSort() {
    // Intl.Collator sorts Arabic text correctly. numeric:true also puts
    // "10" after "9" instead of after "1".
    const collator = new Intl.Collator('ar', { numeric: true, sensitivity: 'base' });

    $$('table[data-sortable]').forEach((table) => {
      const tbody = table.tBodies[0];
      const headers = $$('thead th', table);
      if (!tbody) return;

      headers.forEach((th, columnIndex) => {
        const button = $('.sort-button', th);
        if (!button) return;

        button.addEventListener('click', () => {
          const type = button.getAttribute('data-sort-type') || 'text';
          const ascending = th.getAttribute('aria-sort') !== 'ascending';

          // Reset every other column.
          headers.forEach((other) => other.setAttribute('aria-sort', 'none'));
          th.setAttribute('aria-sort', ascending ? 'ascending' : 'descending');

          const rows = Array.from(tbody.rows);
          rows.sort((a, b) => {
            const x = a.cells[columnIndex].textContent.trim();
            const y = b.cells[columnIndex].textContent.trim();
            const result = type === 'number' ? Number(x) - Number(y) : collator.compare(x, y);
            return ascending ? result : -result;
          });

          // appendChild MOVES an existing element, it does not copy it.
          // Appending the rows in the new order is all the sorting needs.
          rows.forEach((row) => tbody.appendChild(row));
        });
      });
    });
  }


  /* ========================================================================
     15. TABLE FILTER
     Hides the rows that do not contain what you type in the search box.
     ======================================================================== */

  function initTableFilter() {
    $$('[data-table-filter]').forEach((input) => {
      const tableId = input.getAttribute('data-table-filter');
      const table = document.getElementById(tableId);
      if (!table || !table.tBodies[0]) return;

      const rows = Array.from(table.tBodies[0].rows);
      const counter = $(`[data-table-count="${tableId}"]`);
      const empty = $(`[data-table-empty="${tableId}"]`);

      // Lower-case and trim so "HTML" matches "html".
      const normalise = (text) => text.toLowerCase().trim();

      function filter() {
        const query = normalise(input.value);
        let visible = 0;

        rows.forEach((row) => {
          const match = !query || normalise(row.textContent).includes(query);
          row.hidden = !match;
          if (match) visible += 1;
        });

        if (counter) counter.textContent = query ? `${visible} من ${rows.length} صفوف` : '';
        if (empty) empty.hidden = visible !== 0;
      }

      input.addEventListener('input', debounce(filter, 120));
    });
  }


  /* ========================================================================
     16. FORMS
     We build on the browser's own Constraint Validation API instead of
     writing our own rules. The HTML attributes (required, type="email",
     minlength, pattern) do the checking, and input.validity tells us WHAT
     went wrong. Our only job is to show a friendly message in Arabic.
     ======================================================================== */

  // Picks a message based on which rule failed.
  function messageFor(field) {
    const v = field.validity;
    if (v.valueMissing) {
      if (field.type === 'checkbox') return 'يجب الموافقة للمتابعة.';
      if (field.type === 'radio') return 'اختر أحد الخيارات.';
      return 'هذا الحقل مطلوب.';
    }
    if (v.typeMismatch && field.type === 'email') return 'اكتب بريداً إلكترونياً صحيحاً، مثل name@example.com';
    if (v.typeMismatch) return 'القيمة المكتوبة غير صالحة.';
    if (v.tooShort) return `يجب ألا يقل النص عن ${field.minLength} أحرف. كتبت ${field.value.length} حتى الآن.`;
    if (v.tooLong) return `يجب ألا يزيد النص عن ${field.maxLength} حرفاً.`;
    if (v.patternMismatch) return field.title || 'الصيغة غير صحيحة.';
    if (v.rangeUnderflow || v.rangeOverflow) return 'القيمة خارج النطاق المسموح.';
    return field.validationMessage;
  }

  // Finds the <p class="field__error"> that belongs to a field, through
  // the ids listed in its aria-describedby attribute.
  function errorElementFor(field) {
    const ids = (field.getAttribute('aria-describedby') || '').split(/\s+/);
    const errorId = ids.find((id) => id.endsWith('-error'));
    return errorId ? document.getElementById(errorId) : null;
  }

  function showFieldState(field) {
    // Only text-like controls get the red/green border treatment.
    const styled = field.classList.contains('input');
    const errorElement = errorElementFor(field);
    const valid = field.checkValidity();

    if (styled) {
      field.classList.toggle('is-invalid', !valid);
      field.classList.toggle('is-valid', valid && field.value !== '');
    }
    field.setAttribute('aria-invalid', String(!valid));
    if (errorElement) errorElement.textContent = valid ? '' : messageFor(field);
    return valid;
  }

  function clearFieldState(form) {
    $$('.input', form).forEach((field) => {
      field.classList.remove('is-invalid', 'is-valid');
      field.removeAttribute('aria-invalid');
    });
    $$('.field__error', form).forEach((element) => {
      element.textContent = '';
    });
  }

  // Human-readable Arabic labels for the summary dialog.
  const fieldLabels = {
    fullName: 'الاسم',
    email: 'البريد',
    phone: 'الهاتف',
    password: 'كلمة المرور',
    birthdate: 'تاريخ الميلاد',
    level: 'المستوى',
    topics: 'الاهتمامات',
    country: 'الدولة',
    editor: 'المحرر',
    hours: 'ساعات أسبوعياً',
    favoriteColor: 'اللون المفضل',
    cv: 'السيرة الذاتية',
    goal: 'الهدف',
    terms: 'الموافقة'
  };

  // Turns FormData into a small <dl> list inside the dialog.
  function renderSummary(form, target) {
    const data = new FormData(form);
    const grouped = {};

    // A field like "topics" can appear several times (checkboxes), so we
    // collect every value under the same name.
    data.forEach((value, name) => {
      let shown = value;
      if (name === 'password') shown = '********';            // never echo passwords
      if (value instanceof File) shown = value.name || '';    // just the file name
      if (name === 'terms') shown = 'نعم';

      // For radios, checkboxes and selects the value is a code like
      // "beginner". People should see the words they clicked instead.
      const control = form.querySelector(`[name="${name}"][value="${CSS.escape(String(value))}"]`);
      if (control && (control.type === 'radio' || control.type === 'checkbox') && name !== 'terms') {
        const label = control.closest('label');
        if (label) shown = label.textContent.trim();
      }
      const select = form.querySelector(`select[name="${name}"]`);
      if (select && select.selectedIndex > 0) shown = select.options[select.selectedIndex].textContent.trim();

      if (shown === '') return;
      (grouped[name] = grouped[name] || []).push(shown);
    });

    target.textContent = ''; // clear the old summary
    Object.keys(grouped).forEach((name) => {
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = fieldLabels[name] || name;
      dd.textContent = grouped[name].join('، ');
      target.append(dt, dd);
    });
  }

  function initForms() {
    $$('form[data-validate]').forEach((form) => {
      // We take over the messages, so silence the default bubbles.
      // This only happens when JS runs, see the comment in index.html.
      form.setAttribute('novalidate', '');

      const fields = $$('input, select, textarea', form).filter((field) => field.willValidate);

      // Show errors after the user leaves a field (blur), then update them
      // live while they fix it. Showing errors on the very first keystroke
      // feels like being shouted at.
      fields.forEach((field) => {
        field.addEventListener('blur', () => {
          field.dataset.touched = 'true';
          showFieldState(field);
        });
        field.addEventListener('input', () => {
          if (field.dataset.touched) showFieldState(field);
        });
      });

      form.addEventListener('submit', (event) => {
        // No server in this project, so we always stop the real submit.
        event.preventDefault();

        const invalid = fields.filter((field) => !showFieldState(field));
        fields.forEach((field) => {
          field.dataset.touched = 'true';
        });

        if (invalid.length) {
          invalid[0].focus(); // take the user straight to the first problem
          // Three radio buttons in one group are ONE question, so we count
          // unique names, not individual inputs.
          const problems = new Set(invalid.map((field) => field.name || field.id)).size;
          toast(`عدد الحقول التي تحتاج إلى مراجعة: ${problems}`, 'error');
          return;
        }

        // The small newsletter form on about.html only needs a thank you.
        if (form.hasAttribute('data-simple-form')) {
          toast('شكراً! سنرسل لك موعد البث القادم.', 'success');
          form.reset();
          clearFieldState(form);
          return;
        }

        // The full registration form shows a summary in a dialog.
        const dialog = document.getElementById('form-dialog');
        const summary = $('[data-form-summary]');
        if (dialog && summary) {
          renderSummary(form, summary);
          openDialog(dialog);
        } else {
          toast('تم التسجيل بنجاح', 'success');
        }
      });

      // The reset button empties the fields, we also empty the messages.
      form.addEventListener('reset', () => {
        // Wait one tick, because reset fires BEFORE the values are cleared.
        setTimeout(() => {
          clearFieldState(form);
          fields.forEach((field) => delete field.dataset.touched);
          form.dispatchEvent(new Event('feb:reset'));
        }, 0);
      });
    });

    initCharCounters();
    initPasswordTools();
    initRangeOutputs();
  }

  // Live "used / max" counter under textareas with data-char-count.
  function initCharCounters() {
    $$('[data-char-count]').forEach((field) => {
      const output = $(`[data-char-count-output="${field.id}"]`);
      if (!output) return;
      const max = field.maxLength > 0 ? field.maxLength : null;

      const update = () => {
        const length = field.value.length;
        output.textContent = max ? `${length} / ${max}` : String(length);
        // Turn the counter red in the last 10 percent.
        output.style.color = max && length >= max * 0.9 ? 'var(--color-danger)' : '';
      };

      field.addEventListener('input', update);
      if (field.form) field.form.addEventListener('feb:reset', update);
      update();
    });
  }

  // Show/hide password button and a simple strength meter.
  function initPasswordTools() {
    $$('[data-password-toggle]').forEach((button) => {
      const input = document.getElementById(button.getAttribute('data-password-toggle'));
      if (!input) return;

      button.addEventListener('click', () => {
        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        button.textContent = showing ? 'إظهار' : 'إخفاء';
        button.setAttribute('aria-pressed', String(!showing));
        input.focus();
      });
    });

    const words = ['ضعيفة جداً', 'ضعيفة', 'متوسطة', 'جيدة', 'قوية'];

    $$('[data-password-meter]').forEach((meter) => {
      const id = meter.getAttribute('data-password-meter');
      const input = document.getElementById(id);
      const text = $(`[data-password-text="${id}"]`);
      if (!input) return;

      // One point for each good habit. This is a teaching example, real
      // sites should use a proper library such as zxcvbn.
      const score = (value) => {
        let points = 0;
        if (value.length >= 8) points += 1;
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) points += 1;
        if (/\d/.test(value)) points += 1;
        if (/[^A-Za-z0-9]/.test(value)) points += 1;
        return points;
      };

      const update = () => {
        const points = input.value ? score(input.value) : 0;
        meter.value = points;
        if (text) text.textContent = input.value ? `القوة: ${words[points]}` : 'ثماني خانات على الأقل';
      };

      input.addEventListener('input', update);
      if (input.form) input.form.addEventListener('feb:reset', update);
    });
  }

  // Shows the current value of a range slider in its <output>.
  function initRangeOutputs() {
    $$('[data-range-output]').forEach((output) => {
      const input = document.getElementById(output.getAttribute('data-range-output'));
      if (!input) return;
      const update = () => {
        output.textContent = input.value;
      };
      input.addEventListener('input', update);
      if (input.form) input.form.addEventListener('feb:reset', update);
      update();
    });
  }


  /* ========================================================================
     17. DIALOGS
     The native <dialog> element does the hard parts for us: it traps focus,
     closes on Escape, and returns focus to the button that opened it.
     For very old browsers we fall back to just toggling the open attribute.
     ======================================================================== */

  function openDialog(dialog) {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  function initDialogs() {
    $$('[data-dialog-open]').forEach((button) => {
      const dialog = document.getElementById(button.getAttribute('data-dialog-open'));
      if (dialog) button.addEventListener('click', () => openDialog(dialog));
    });

    $$('dialog').forEach((dialog) => {
      // Buttons marked data-dialog-close inside the dialog close it.
      $$('[data-dialog-close]', dialog).forEach((button) => {
        button.addEventListener('click', () => closeDialog(dialog));
      });

      // Clicking the dark backdrop closes the dialog. A click on the
      // backdrop is reported as a click on the dialog element itself,
      // while clicks on the content hit the inner elements.
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) closeDialog(dialog);
      });
    });
  }


  /* ========================================================================
     18. ACCORDION "OPEN ALL / CLOSE ALL"
     details/summary already works without us. This only adds the button
     that opens or closes every item at once.
     ======================================================================== */

  function initAccordionToggle() {
    $$('[data-accordion-toggle]').forEach((button) => {
      const accordion = document.getElementById(button.getAttribute('data-accordion-toggle'));
      if (!accordion) return;

      button.addEventListener('click', () => {
        const items = $$('details', accordion);
        // If anything is closed, open everything. Otherwise close everything.
        const shouldOpen = items.some((item) => !item.open);
        items.forEach((item) => {
          item.open = shouldOpen;
        });
      });
    });
  }


  /* ========================================================================
     19. CODE PLAYGROUND
     Takes the HTML from the textarea and shows it inside the sandboxed
     iframe using the srcdoc attribute. sandbox="" in the HTML blocks all
     scripts inside the preview, so typing a <script> tag there cannot touch
     this page. The code is saved locally so a refresh does not lose it.
     ======================================================================== */

  function initPlayground() {
    const root = $('[data-playground]');
    if (!root) return;

    const editor = $('[data-playground-input]', root);
    const output = $('[data-playground-output]', root);
    const runButton = $('[data-playground-run]', root);
    const resetButton = $('[data-playground-reset]', root);
    const liveToggle = $('[data-playground-live]', root);
    if (!editor || !output) return;

    // The original sample, so "reset" can bring it back.
    const original = editor.value;
    const saved = storage.get('playground', null);
    if (typeof saved === 'string' && saved.trim()) editor.value = saved;

    // A tiny base style so the preview does not look like 1995.
    const baseStyles = 'body{font-family:system-ui,sans-serif;line-height:1.6;padding:16px;color:#1b1b32}' +
      'img{max-width:100%}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:4px 8px}';

    function run() {
      output.srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${baseStyles}</style></head><body>${editor.value}</body></html>`;
      storage.set('playground', editor.value);
    }

    if (runButton) runButton.addEventListener('click', run);

    if (resetButton) {
      resetButton.addEventListener('click', () => {
        editor.value = original;
        storage.remove('playground');
        run();
        toast('أُعيد الكود الأصلي');
      });
    }

    // Ctrl + Enter (or Cmd + Enter on a Mac) runs the code from the keyboard.
    editor.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        run();
      }
    });

    // Live mode re-renders while you type, with a small delay.
    const liveRun = debounce(run, 400);
    editor.addEventListener('input', () => {
      if (liveToggle && liveToggle.checked) liveRun();
    });

    run(); // show the starting code straight away
  }


  /* ========================================================================
     20. QUIZ
     Each question is a fieldset with data-answer. We compare the checked
     radio with it, colour the fieldset, and show the score in <output>.
     ======================================================================== */

  function initQuiz() {
    $$('form[data-quiz]').forEach((form) => {
      const questions = $$('[data-answer]', form);
      const result = $('[data-quiz-result]', form);

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let score = 0;

        questions.forEach((question) => {
          const picked = $('input[type="radio"]:checked', question);
          const correct = picked && picked.value === question.getAttribute('data-answer');
          question.classList.toggle('is-correct', Boolean(correct));
          question.classList.toggle('is-wrong', !correct);
          if (correct) score += 1;
        });

        const total = questions.length;
        let message = 'راجع الدروس وحاول مرة أخرى، لا بأس أبداً.';
        if (score === total) message = 'ممتاز! إجابات كاملة.';
        else if (score >= total * 0.6) message = 'جيد جداً، بقي القليل.';

        if (result) result.textContent = `نتيجتك: ${score} من ${total}. ${message}`;
        storage.set('quiz-best', Math.max(score, storage.get('quiz-best', 0)));
      });

      form.addEventListener('reset', () => {
        questions.forEach((question) => question.classList.remove('is-correct', 'is-wrong'));
        if (result) result.textContent = '';
      });
    });
  }


  /* ========================================================================
     21. FOOTER YEAR
     Keeps the copyright year current without editing the HTML each January.
     ======================================================================== */

  function initYear() {
    const year = String(new Date().getFullYear());
    $$('[data-year]').forEach((element) => {
      element.textContent = year;
    });
  }


  /* ========================================================================
     22. START EVERYTHING
     Thanks to "defer" the HTML is already parsed when this runs, but the
     readyState check keeps the script safe if someone loads it without
     defer one day. Each feature runs inside its own try/catch, so one
     broken feature can never take the others down with it.
     ======================================================================== */

  function init() {
    const features = [
      initThemeToggle,
      initMobileNav,
      initScrollEffects,
      initScrollSpy,
      initReveal,
      initCounters,
      initCodeCopy,
      initTabs,
      initLessonProgress,
      initPersistedCheckboxes,
      initTableSort,
      initTableFilter,
      initForms,
      initDialogs,
      initAccordionToggle,
      initPlayground,
      initQuiz,
      initYear
    ];

    features.forEach((feature) => {
      try {
        feature();
      } catch (error) {
        // Log it for developers, keep the page alive for visitors.
        console.error(`[bootcamp] ${feature.name} failed:`, error);
      }
    });

    // A little hello for the curious ones who open the DevTools console.
    console.info('أهلاً بك في معسكر الواجهات الأمامية! هذا الملف هو assets/js/main.js، اقرأه وعدّل عليه بحرية.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
