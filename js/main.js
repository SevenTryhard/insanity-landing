/* ============================================
   INSANITY TATTOO SUPPLIES - MAIN JS
   Cyberpunk × Premium × Underground
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  Loader.init();
  Navigation.init();
  Cursor.init();
  ScrollReveal.init();
  Particles.init();
  Parallax.init();
  Forms.init();
  Toast.init();
});

/* ============================================
   LOADING SCREEN
   ============================================ */

const Loader = {
  init() {
    this.screen = document.querySelector('.loading-screen');
    if (this.screen) {
      // Minimum loading time for effect
      setTimeout(() => {
        this.hide();
      }, 2000);
    }
  },

  hide() {
    if (this.screen) {
      this.screen.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => {
        this.screen.remove();
      }, 800);
    }
  }
};

/* ============================================
   NAVIGATION
   ============================================ */

const Navigation = {
  init() {
    this.navbar = document.querySelector('.navbar');
    this.toggle = document.querySelector('.navbar-toggle');
    this.menu = document.querySelector('.navbar-menu');
    
    if (!this.navbar) return;

    // Scroll effect
    window.addEventListener('scroll', () => this.onScroll());
    
    // Mobile toggle
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu on link click (mobile)
    document.querySelectorAll('.navbar-menu a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  },

  onScroll() {
    const scrolled = window.scrollY > 50;
    this.navbar.classList.toggle('scrolled', scrolled);
  },

  toggleMenu() {
    this.toggle.classList.toggle('active');
    this.menu.classList.toggle('active');
    document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
  },

  closeMenu() {
    if (window.innerWidth <= 768) {
      this.toggle.classList.remove('active');
      this.menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

/* ============================================
   CUSTOM CURSOR
   ============================================ */

const Cursor = {
  init() {
    // Only on desktop
    if (window.innerWidth > 1024) {
      this.create();
      this.addListeners();
    }
  },

  create() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
  },

  addListeners() {
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    });

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .category-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
    });
  }
};

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */

const ScrollReveal = {
  init() {
    this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (this.elements.length === 0) return;

    // Use Intersection Observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after revealing (one-time animation)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.elements.forEach(el => observer.observe(el));
  }
};

/* ============================================
   PARTICLES SYSTEM
   ============================================ */

const Particles = {
  init() {
    this.container = document.querySelector('.hero-particles');
    if (this.container) {
      this.create();
    }
  },

  create() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      this.createParticle(i);
    }
  },

  createParticle(index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = 15 + Math.random() * 10;
    const size = 2 + Math.random() * 4;
    
    particle.style.left = left + '%';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    this.container.appendChild(particle);
  }
};

/* ============================================
   PARALLAX EFFECTS
   ============================================ */

const Parallax = {
  init() {
    this.elements = document.querySelectorAll('[data-parallax]');
    if (this.elements.length === 0) return;

    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('mousemove', (e) => this.onMouse(e));
  },

  onScroll() {
    this.elements.forEach(el => {
      const speed = el.dataset.parallax || '0.5';
      const yPos = -(window.scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  },

  onMouse(e) {
    // Subtle mouse parallax for hero
    const hero = document.querySelector('.hero-content');
    if (hero) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      hero.style.transform = `translate(${x}px, ${y}px)`;
    }
  }
};

/* ============================================
   FORMS HANDLING
   ============================================ */

const Forms = {
  init() {
    this.forms = document.querySelectorAll('form');
    this.forms.forEach(form => this.setupForm(form));
  },

  setupForm(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Simulate submission
      this.submit(form, data);
    });
  },

  async submit(form, data) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Loading state
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success
    submitBtn.textContent = '¡Enviado!';
    form.reset();
    
    // Show toast
    Toast.show('Mensaje enviado correctamente. Te contactaremos pronto.');
    
    // Reset button
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 3000);
  }
};

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */

const Toast = {
  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },

  show(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<div class="toast-message">${message}</div>`;
    
    this.container.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    // Remove after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }
};

/* ============================================
   COUNTDOWN TIMER
   ============================================ */

const Countdown = {
  init(element) {
    this.element = element;
    if (!this.element) return;

    // Set end date (7 days from now for demo)
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 7);
    
    this.update();
    setInterval(() => this.update(), 1000);
  },

  update() {
    const now = new Date();
    const diff = this.endDate - now;

    if (diff <= 0) {
      this.element.innerHTML = '<div class="timer-block"><div class="timer-value">00</div><div class="timer-label">EXPIRED</div></div>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.element.innerHTML = `
      <div class="timer-block">
        <div class="timer-value">${String(days).padStart(2, '0')}</div>
        <div class="timer-label">Días</div>
      </div>
      <div class="timer-block">
        <div class="timer-value">${String(hours).padStart(2, '0')}</div>
        <div class="timer-label">Hrs</div>
      </div>
      <div class="timer-block">
        <div class="timer-value">${String(minutes).padStart(2, '0')}</div>
        <div class="timer-label">Min</div>
      </div>
      <div class="timer-block">
        <div class="timer-value">${String(seconds).padStart(2, '0')}</div>
        <div class="timer-label">Seg</div>
      </div>
    `;
  }
};

/* ============================================
   PRODUCT FILTER (Shop Page)
   ============================================ */

const ProductFilter = {
  init() {
    this.buttons = document.querySelectorAll('.filter-btn');
    this.products = document.querySelectorAll('.product-card');
    
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => this.filter(btn));
    });
  },

  filter(btn) {
    // Update active state
    this.buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.dataset.category;
    
    this.products.forEach(product => {
      if (category === 'all' || product.dataset.category === category) {
        product.style.display = 'block';
        setTimeout(() => {
          product.style.opacity = '1';
          product.style.transform = 'scale(1)';
        }, 100);
      } else {
        product.style.opacity = '0';
        product.style.transform = 'scale(0.9)';
        setTimeout(() => {
          product.style.display = 'none';
        }, 300);
      }
    });
  }
};

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

/* ============================================
   NUMBER COUNTER ANIMATION
   ============================================ */

const Counter = {
  init() {
    this.counters = document.querySelectorAll('[data-count]');
    if (this.counters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach(counter => observer.observe(counter));
  },

  animate(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    };

    update();
  }
};

// Initialize counter on page load
Counter.init();

// Initialize countdown if element exists
const timerElement = document.querySelector('.promo-timer');
if (timerElement) {
  Countdown.init(timerElement);
}

// Initialize product filter if on shop page
if (document.querySelector('.filter-btn')) {
  ProductFilter.init();
}
