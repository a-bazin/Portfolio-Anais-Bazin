// Enlève le mode "no-js" si tu as suivi la fallback CSS
document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-scroll-container]');
  const colorEl = document.getElementById('color');

  // Sécurités : si le conteneur n'existe pas ou si la lib n'est pas chargée
  if (!container) {
    console.error('[Locomotive] data-scroll-container introuvable');
    return;
  }
  if (typeof LocomotiveScroll !== 'function') {
    console.error('[Locomotive] librairie non chargée. Vérifie le chemin: ./lib/locomotive-scroll.js');
    // fallback : montre les éléments animés quand même
    document.querySelectorAll('.appear').forEach(el => el.classList.add('is-inview'));
    return;
  }

  // Init Locomotive
  const scroll = new LocomotiveScroll({
    el: container,
    smooth: true,
    tablet: { smooth: true },
    smartphone: { smooth: true }
  });

  // Mise à jour initiale des classes (au cas où)
  scroll.update();

  // Body color au scroll
  const applyBodyTheme = () => {
    if (colorEl && colorEl.classList.contains('is-inview')) {
      document.body.style.background = '#000101';
      document.body.style.color = '#fefeff';
    } else {
      document.body.style.background = '#fefeff';
      document.body.style.color = '#000101';
    }
  };

  // Appel immédiat + à chaque scroll Locomotive
  applyBodyTheme();
  scroll.on('scroll', applyBodyTheme);

  console.log('[Locomotive] initialisé ✔️');
});
