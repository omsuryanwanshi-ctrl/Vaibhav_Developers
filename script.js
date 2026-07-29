/* ==========================================================================
   VAIBHAV DEVELOPERS - PORTFOLIO INTERACTIVITY SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Cursor Light Follower
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // 2. Sticky Navbar & Active Navigation Highlight
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Sticky Glass Header
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back To Top Visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy Active Link
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Mobile Hamburger Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close menu when clicking a link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 4. Scroll Reveal Animations & Skill Bar Animations
  const revealElements = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.progress-bar-fill');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Trigger progress bars inside revealed skill cards
          if (entry.target.classList.contains('skills-section') || entry.target.querySelector('.progress-bar-fill')) {
            animateProgressBars();
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  function animateProgressBars() {
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute('data-progress');
      if (progress) {
        bar.style.width = `${progress}%`;
      }
    });
  }

  // Also trigger directly on scroll observer for skills section
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateProgressBars();
        }
      },
      { threshold: 0.2 }
    );
    skillsObserver.observe(skillsSection);
  }

  // 5. WhatsApp Contact Form Handler
  const contactForm = document.getElementById('whatsappContactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const mobile = document.getElementById('mobile').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !mobile || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Format WhatsApp Message
      const targetPhone = '917498287362';
      const formattedMessage = `Hello Vaibhav Developers,%0A%0AI would like to connect with you regarding Data Analytics & Business Intelligence services.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Mobile Number:* ${encodeURIComponent(mobile)}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(message)}`;

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${formattedMessage}`;

      // Open WhatsApp API in new window/app
      window.open(whatsappUrl, '_blank');
    });
  }

  // 6. Back To Top Smooth Scroll
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
