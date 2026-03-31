(function () {
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');
  const year = document.getElementById('year');

  if (year) year.textContent = String(new Date().getFullYear());

  function setOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.contains('is-open');
      setOpen(!isOpen);
    });

    nav.addEventListener('click', function (e) {
      const target = e.target;
      if (target && target.tagName === 'A') {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    document.addEventListener('click', function (e) {
      const target = e.target;
      if (!target) return;
      const clickInNav = nav.contains(target);
      const clickOnToggle = toggle.contains(target);
      if (!clickInNav && !clickOnToggle) setOpen(false);
    });
  }
})();
