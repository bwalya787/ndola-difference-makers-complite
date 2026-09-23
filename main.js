// ===== Mobile Menu Toggle =====
(function () {
  var toggle = document.getElementById('mobileToggle');
  var nav = document.getElementById('mobileNav');
  var menuIcon = document.getElementById('menuIcon');
  var closeIcon = document.getElementById('closeIcon');

  if (!toggle || !nav) return;

  function setMenu(open) {
    nav.classList.toggle('open', open);
    if (menuIcon) menuIcon.classList.toggle('hidden', open);
    if (closeIcon) closeIcon.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });

  // Close the menu after selecting a page.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  // Close with Escape for keyboard users.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setMenu(false);
  });
})();

// ===== Header Scroll Shadow =====
(function () {
  var header = document.getElementById('header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== Services Category Filter =====
(function () {
  var pills = document.querySelectorAll('.filter-pill');
  var cards = document.querySelectorAll('.svc-card[data-categories]');
  if (!pills.length || !cards.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var filter = pill.getAttribute('data-filter');

      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');

      cards.forEach(function (card) {
        var cats = card.getAttribute('data-categories').split(' ');
        if (filter === 'all' || cats.indexOf(filter) !== -1) {
          card.style.display = '';
          card.classList.remove('fade-in');
          void card.offsetWidth;
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ===== Contact Form Validation =====
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var successBox = document.getElementById('formSuccess');

  function showError(field, msg) {
    var errorEl = document.getElementById(field + 'Error');
    var input = document.getElementById(field);
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }
    if (input) input.classList.add('error');
  }

  function clearError(field) {
    var errorEl = document.getElementById(field + 'Error');
    var input = document.getElementById(field);
    if (errorEl) errorEl.classList.add('hidden');
    if (input) input.classList.remove('error');
  }

  function validate() {
    var valid = true;
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');

    if (name) {
      if (!name.value.trim()) { showError('name', 'Name is required'); valid = false; }
      else clearError('name');
    }
    if (email) {
      if (!email.value.trim()) { showError('email', 'Email is required'); valid = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError('email', 'Please enter a valid email'); valid = false; }
      else clearError('email');
    }
    if (message) {
      if (!message.value.trim()) { showError('message', 'Message is required'); valid = false; }
      else clearError('message');
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
    var subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
    var message = document.getElementById('message').value.trim();

    // Static-host friendly fallback: open the user's email client.
    var mailSubject = encodeURIComponent(subject || 'Website enquiry from ' + name);
    var mailBody = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + (phone || 'Not provided') + '\n\n' +
      message
    );

    window.location.href =
      'mailto:ndoladifferencemakersl@gmail.com?subject=' + mailSubject +
      '&body=' + mailBody;
  });

  ['name', 'email', 'message'].forEach(function (field) {
    var input = document.getElementById(field);
    if (input) {
      input.addEventListener('input', function () { clearError(field); });
    }
  });
})();
