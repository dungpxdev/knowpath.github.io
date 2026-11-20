// Knowpath Single-Page User Guide Application Logic
// Adheres strictly to: Guard clauses only, NO if-else, NO ternary (? :) operators, const wherever practical

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCopyButtons();
  initTabs();
  initMobileMenu();
  initScrollSpy();
});

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('knowpath-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let activeTheme = 'light';
  if (storedTheme === 'dark') {
    activeTheme = 'dark';
  }
  if (!storedTheme && systemPrefersDark) {
    activeTheme = 'dark';
  }

  applyTheme(activeTheme);

  if (!themeToggleBtn) {
    return;
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let nextTheme = 'light';
    if (currentTheme !== 'dark') {
      nextTheme = 'dark';
    }
    applyTheme(nextTheme);
    localStorage.setItem('knowpath-theme', nextTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  if (!themeIcon) {
    return;
  }

  if (theme === 'dark') {
    // Sun icon for dark mode (click to switch to light)
    themeIcon.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    return;
  }

  // Moon icon for light mode (click to switch to dark)
  themeIcon.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;
}

function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      let textToCopy = '';

      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          textToCopy = targetElement.textContent.trim();
        }
      }

      if (!textToCopy) {
        const textAttr = button.getAttribute('data-copy-text');
        if (textAttr) {
          textToCopy = textAttr;
        }
      }

      if (!textToCopy) {
        return;
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalContent = button.innerHTML;
        button.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-success)">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color: var(--color-success)">Copied!</span>
        `;

        setTimeout(() => {
          button.innerHTML = originalContent;
        }, 2000);
      });
    });
  });
}

function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs-container');
  tabContainers.forEach((container) => {
    const navButtons = container.querySelectorAll('.tab-btn');
    const panes = container.querySelectorAll('.tab-pane');

    navButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        if (!targetTab) {
          return;
        }

        navButtons.forEach((b) => b.classList.remove('active'));
        panes.forEach((p) => p.classList.remove('active'));

        btn.classList.add('active');

        const activePane = container.querySelector(`.tab-pane[data-tab-content="${targetTab}"]`);
        if (!activePane) {
          return;
        }
        activePane.classList.add('active');
      });
    });
  });
}

function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggleBtn) {
    return;
  }
  if (!navLinks) {
    return;
  }

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  const links = navLinks.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const sectionId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      });
    },
    {
      rootMargin: '-20% 0px -70% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}
