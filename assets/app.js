// Aktif kategori ve güvenli mobil scroll
(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = (hash) => {
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === hash));
    const active = links.find((a) => a.getAttribute('href') === hash);
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  links.forEach((a) => {
    a.addEventListener('click', (event) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      const navHeight = nav.offsetHeight + 18;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
      setActive(a.getAttribute('href'));
    });
  });

  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible?.target?.id) setActive(`#${visible.target.id}`);
  }, {
    root: null,
    threshold: [0.15, 0.3, 0.5],
    rootMargin: '-90px 0px -55% 0px'
  });

  sections.forEach((section) => io.observe(section));

  if (location.hash && document.querySelector(location.hash)) {
    setTimeout(() => {
      const target = document.querySelector(location.hash);
      const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 18;
      window.scrollTo({ top, behavior: 'auto' });
      setActive(location.hash);
    }, 80);
  } else if (sections[0]?.id) {
    setActive(`#${sections[0].id}`);
  }
})();
