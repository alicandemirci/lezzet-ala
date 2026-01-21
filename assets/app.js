// Menü: aktif kategori highlight (scroll spy)
(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
  };

  // tıklamada aktif (smooth scroll CSS ile)
  links.forEach(a => a.addEventListener('click', () => setActive(a.getAttribute('href'))));

  // scroll spy
  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

    if (visible?.target?.id) setActive('#' + visible.target.id);
  }, {
    threshold: [0.25, 0.4, 0.55, 0.7],
    rootMargin: "-80px 0px -55% 0px"
  });

  sections.forEach(s => io.observe(s));

  if (location.hash) setActive(location.hash);
  else if (sections[0]?.id) setActive('#' + sections[0].id);
})();
// Satır içi foto: aç/kapa (aynı kart içinde tek açık kalsın)
(() => {
  const buttons = document.querySelectorAll('.row-photo-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.row');
      const card = btn.closest('.card');
      const panel = row?.querySelector('.row-photo');
      if (!row || !panel || !card) return;

      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // aynı kart içindeki diğer açık panelleri kapat
      card.querySelectorAll('.row-photo-btn[aria-expanded="true"]').forEach(b => {
        if (b === btn) return;
        b.setAttribute('aria-expanded', 'false');
        const r = b.closest('.row');
        const p = r?.querySelector('.row-photo');
        if (p) p.hidden = true;
      });

      // toggle
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
})();
