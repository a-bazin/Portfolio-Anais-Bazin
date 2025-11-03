// Init robuste + update après chargement (évite l'effet "figé")
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-scroll-container]');
  if (!container) return;

  if (typeof window.LocomotiveScroll !== 'function') {
    console.error('[Locomotive] non chargée');
    // Fallback visuel pour que la page reste lisible
    document.querySelectorAll('.appear').forEach(el => el.classList.add('is-inview'));
    return;
  }

  const scroll = new LocomotiveScroll({
    el: container,
    smooth: true,
    tablet: { smooth: true },
    smartphone: { smooth: true }
  });

  // Update après le chargement des images
  const imgs = Array.from(document.images || []);
  if (imgs.length === 0) scroll.update();
  let remaining = imgs.length;
  const done = () => { if (--remaining === 0) scroll.update(); };
  imgs.forEach(img => {
    if (img.complete) done();
    else {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    }
  });

  // Ceinture + bretelles
  window.addEventListener('load', () => {
    scroll.update();
    setTimeout(() => scroll.update(), 50);
  });

  // Navigation douce avec Locomotive
  document.querySelectorAll('a[data-scroll-to]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = a.getAttribute('href');
      if (!target || !target.startsWith('#')) return;
      e.preventDefault();
      scroll.scrollTo(target, { offset: 0, duration: 800, easing: [0.25, 0.00, 0.35, 1.00] });
    });
  });

  // Thème selon visibilité de #color (optionnel)
  const colorEl = document.getElementById('color');
  const applyBodyTheme = () => {
    if (colorEl && colorEl.classList.contains('is-inview')) {
      document.body.style.background = '#000101';
      document.body.style.color = '#fefeff';
    } else {
      document.body.style.background = '#fefeff';
      document.body.style.color = '#000101';
    }
  };
  applyBodyTheme();
  scroll.on('scroll', applyBodyTheme);
});
