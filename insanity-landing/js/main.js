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
  Tilt3D.init();
  CyberEffects.init();
  NeonFlicker.init();
});

/* ============================================
   3D TILT EFFECT FOR CARDS
   ============================================ */

const Tilt3D = {
  init() {
    this.cards = document.querySelectorAll('.category-card, .product-card, .testimonial-card');
    if (window.innerWidth <= 1024) return; // Disable on mobile
    
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
    });
  },

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    card.style.transition = 'transform 0.1s ease-out';
    
    // Add glow effect based on mouse position
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 42, 122, 0.1), transparent 70%), var(--carbon-black)`;
  },

  handleMouseLeave(e, card) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    card.style.transition = 'transform 0.5s ease-out, background 0.5s ease-out';
    card.style.background = 'var(--carbon-black)';
  }
};

/* ============================================
   CYBERPUNK INTERACTIVE EFFECTS
   ============================================ */

const CyberEffects = {
  init() {
    this.createGlitchEffect();
    this.createNeonPulse();
    this.createMatrixRain();
  },

  createGlitchEffect() {
    // Random glitch effect on hero title
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    setInterval(() => {
      glitchTexts.forEach(text => {
        if (Math.random() > 0.95) {
          text.style.animation = 'none';
          text.offsetHeight; // Trigger reflow
          text.style.animation = 'glitch-anim 0.3s';
        }
      });
    }, 3000);
  },

  createNeonPulse() {
    const neonElements = document.querySelectorAll('.section-label, .product-badge');
    
    neonElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animation = 'neon-pulse 2s infinite';
      }, index * 200);
    });
  },

  createMatrixRain() {
    // Only on larger screens
    if (window.innerWidth < 1024) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.03';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const drops = [];
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(8, 5, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#ff2a7a';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
};

/* ============================================
   NEON FLICKER EFFECT
   ============================================ */

const NeonFlicker = {
  init() {
    this.elements = document.querySelectorAll('.text-glow, .btn-primary');
    this.flickerRandomly();
  },

  flickerRandomly() {
    const randomElement = this.elements[Math.floor(Math.random() * this.elements.length)];
    if (randomElement && Math.random() > 0.7) {
      randomElement.style.opacity = '0.8';
      setTimeout(() => {
        randomElement.style.opacity = '1';
      }, 50 + Math.random() * 100);
    }
    
    setTimeout(() => this.flickerRandomly(), 2000 + Math.random() * 3000);
  }
};

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

/* ============================================
   3D CUBE SCROLL - Rubik's Cube Effect
   ============================================ */

const CubeScroll = {
  init() {
    this.container = document.querySelector('.cube-scroll-container');
    this.wrapper = document.querySelector('.cube-scroll-wrapper');
    this.sections = document.querySelectorAll('section');
    
    if (!this.container || !this.wrapper) return;
    
    // Disable on mobile
    if (window.innerWidth <= 1024) {
      this.disable();
      return;
    }
    
    this.currentSection = 0;
    this.isAnimating = false;
    this.totalSections = this.sections.length;
    
    this.setupSections();
    this.createIndicators();
    this.addEventListeners();
    this.addRubikPattern();
  },

  setupSections() {
    // Assign each section to a cube face
    this.sections.forEach((section, index) => {
      section.dataset.cubeIndex = index;
      section.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
  },

  createIndicators() {
    // Create scroll progress cube indicator
    const indicator = document.createElement('div');
    indicator.className = 'scroll-cube-indicator';
    indicator.innerHTML = `
      <div class="scroll-cube">
        <div class="scroll-cube-face">▲</div>
        <div class="scroll-cube-face">▶</div>
        <div class="scroll-cube-face">▼</div>
        <div class="scroll-cube-face">◀</div>
        <div class="scroll-cube-face">◆</div>
        <div class="scroll-cube-face">◇</div>
      </div>
    `;
    document.body.appendChild(indicator);
    
    // Create vertical progress bar
    const progress = document.createElement('div');
    progress.className = 'scroll-progress-container';
    progress.innerHTML = `
      <div class="scroll-progress-cube">
        <div class="scroll-progress-bar">
          <div class="scroll-progress-fill"></div>
        </div>
        <div class="scroll-progress-markers">
          ${Array.from({length: this.totalSections}, (_, i) => 
            `<div class="scroll-marker" style="top: ${(i / (this.totalSections - 1)) * 100}%" data-index="${i}"></div>`
          ).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(progress);
    
    this.progressFill = progress.querySelector('.scroll-progress-fill');
    this.markers = progress.querySelectorAll('.scroll-marker');
    
    // Update initial marker
    this.markers[0].classList.add('active');
  },

  addEventListeners() {
    // Wheel scroll
    window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
    
    // Touch events for swipe
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    window.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          this.nextSection();
        } else {
          this.prevSection();
        }
      }
    }, { passive: true });
    
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        this.nextSection();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.prevSection();
      }
    });
  },

  handleWheel(e) {
    e.preventDefault();
    
    if (this.isAnimating) return;
    
    if (e.deltaY > 0) {
      this.nextSection();
    } else {
      this.prevSection();
    }
  },

  nextSection() {
    if (this.currentSection < this.totalSections - 1 && !this.isAnimating) {
      this.currentSection++;
      this.rotateCube();
    }
  },

  prevSection() {
    if (this.currentSection > 0 && !this.isAnimating) {
      this.currentSection--;
      this.rotateCube();
    }
  },

  rotateCube() {
    this.isAnimating = true;
    
    const rotations = [
      { x: 0, y: 0 },      // Front
      { x: 0, y: -90 },    // Right
      { x: 0, y: -180 },   // Back
      { x: 0, y: -270 },   // Left
      { x: -90, y: 0 },    // Top
      { x: 90, y: 0 },     // Bottom
    ];
    
    const rot = rotations[this.currentSection % rotations.length];
    
    // Apply rotation to wrapper
    this.wrapper.style.transform = `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`;
    
    // Update progress
    this.updateProgress();
    
    // Re-enable scroll after animation
    setTimeout(() => {
      this.isAnimating = false;
    }, 1000);
  },

  updateProgress() {
    const progress = (this.currentSection / (this.totalSections - 1)) * 100;
    this.progressFill.style.height = `${progress}%`;
    
    // Update markers
    this.markers.forEach((marker, index) => {
      marker.classList.toggle('active', index === this.currentSection);
    });
  },

  addRubikPattern() {
    // Add subtle Rubik's cube pattern to body
    const pattern = document.createElement('div');
    pattern.className = 'rubik-pattern';
    document.body.appendChild(pattern);
  },

  disable() {
    // Remove cube effects on mobile
    if (this.container) {
      this.container.style.position = 'relative';
      this.container.style.height = 'auto';
      this.container.style.overflow = 'visible';
    }
    
    if (this.wrapper) {
      this.wrapper.style.transform = 'none';
    }
    
    // Remove indicators
    document.querySelectorAll('.scroll-cube-indicator, .scroll-progress-container').forEach(el => el.remove());
  }
};

// Initialize cube scroll on load
CubeScroll.init();
