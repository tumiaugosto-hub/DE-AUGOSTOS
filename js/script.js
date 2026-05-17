document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
      }
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const phoneInput = contactForm.querySelector('#phone');
    const messageInput = contactForm.querySelector('#message');

    function showError(input, msg) {
      const error = document.createElement('span');
      error.className = 'form-error';
      error.style.cssText = 'color:#e94560;font-size:0.8rem;margin-top:3px;display:block;';
      error.textContent = msg;
      const existing = input.parentNode.querySelector('.form-error');
      if (existing) existing.remove();
      input.parentNode.appendChild(error);
      input.style.borderColor = '#e94560';
    }

    function clearError(input) {
      const existing = input.parentNode.querySelector('.form-error');
      if (existing) existing.remove();
      input.style.borderColor = '#ddd';
    }

    nameInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        valid = false;
      } else if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        valid = false;
      } else {
        clearError(nameInput);
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        valid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        valid = false;
      } else {
        clearError(emailInput);
      }

      if (phoneInput.value.trim() && !/^[\d\s\+\-\(\)]{7,}$/.test(phoneInput.value.trim())) {
        showError(phoneInput, 'Please enter a valid phone number');
        valid = false;
      } else {
        clearError(phoneInput);
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, 'Message is required');
        valid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        valid = false;
      } else {
        clearError(messageInput);
      }

      if (valid) {
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(function () {
          contactForm.innerHTML = '<div style="text-align:center;padding:40px 20px;"><div style="font-size:3rem;margin-bottom:15px;color:#4CAF50;">&#10003;</div><h3 style="color:#1a1a2e;margin-bottom:10px;">Message Sent Successfully!</h3><p style="color:#666;">Thank you for contacting DE AUGOSTOS INVESTMENTS. We will get back to you shortly.</p></div>';
        }, 1500);
      }
    });
  }
});
