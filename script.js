(function () {
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');
  const year = document.getElementById('year');
  const nameInput = document.getElementById('client-name');
  const messageInput = document.getElementById('whatsapp-message');
  const whatsappLink = document.getElementById('whatsapp-prefill');

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

  if (messageInput && whatsappLink) {
    const baseUrl = 'https://wa.me/22657155536';

    function buildMessage() {
      const name = nameInput ? nameInput.value.trim() : '';
      const message = messageInput.value.trim();
      if (!name) return message;
      return message + '\n\nNom / structure : ' + name;
    }

    function syncWhatsAppLink() {
      const text = buildMessage();
      whatsappLink.href = text ? baseUrl + '?text=' + encodeURIComponent(text) : baseUrl;
    }

    syncWhatsAppLink();
    messageInput.addEventListener('input', syncWhatsAppLink);
    if (nameInput) nameInput.addEventListener('input', syncWhatsAppLink);
  }
})();
