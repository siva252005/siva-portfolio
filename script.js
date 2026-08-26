/**
 * Siva S — Data Analyst Portfolio
 * Interactive client-side behavior & validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─── 1. NAVBAR SCROLL & ACTIVE LINK OBSERVER ─────────────────────────────
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Highlight active link on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // ─── 2. MOBILE HAMBURGER MENU ────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  if (hamburger && navLinksContainer) {
    const toggleMenu = () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking any navigation link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // ─── 3. SCROLL REVEAL ANIMATIONS ─────────────────────────────────────────
  const animateElements = document.querySelectorAll('[data-animate]');
  
  if ('IntersectionObserver' in window) {
    const animateObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    animateElements.forEach((el) => animateObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    animateElements.forEach((el) => el.classList.add('animated'));
  }

  // ─── 4. CONTACT FORM VALIDATION & FEEDBACK ──────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const clearErrors = () => {
      [nameInput, emailInput, messageInput].forEach((input) => {
        if (input) input.classList.remove('error');
      });
      [nameError, emailError, messageError].forEach((err) => {
        if (err) err.classList.remove('visible');
      });
      if (formSuccess) formSuccess.classList.remove('visible');
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        if (nameInput) nameInput.classList.add('error');
        if (nameError) nameError.classList.add('visible');
        isValid = false;
      }

      // Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal || !emailRegex.test(emailVal)) {
        if (emailInput) emailInput.classList.add('error');
        if (emailError) emailError.classList.add('visible');
        isValid = false;
      }

      // Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal || messageVal.length < 5) {
        if (messageInput) messageInput.classList.add('error');
        if (messageError) messageError.classList.add('visible');
        isValid = false;
      }

      if (isValid) {
        // Show success state
        if (formSuccess) {
          formSuccess.classList.add('visible');
        }
        contactForm.reset();

        setTimeout(() => {
          if (formSuccess) formSuccess.classList.remove('visible');
        }, 6000);
      }
    });

    // Real-time error removal on input
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('error');
          const errorSpan = document.getElementById(`${input.id}Error`);
          if (errorSpan) errorSpan.classList.remove('visible');
        });
      }
    });
  }
});
