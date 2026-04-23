/**
 * CMS DATA LOADER - Decap CMS Integration
 * Carga y renderiza datos desde archivos JSON
 * Prioridad: #1 Productos, #2 Promociones, #3 Configuracion
 */

const CMSData = {
  products: [],
  categories: [],
  promotions: null,
  config: null,
  loaded: false,

  async init() {
    try {
      await Promise.all([
        this.loadProducts(),
        this.loadCategories(),
        this.loadPromotions(),
        this.loadConfig()
      ]);
      this.loaded = true;
      this.renderAll();
      console.log('CMS Data cargado');
    } catch (error) {
      console.error('Error:', error);
    }
  },

  async loadProducts() {
    const files = ['phoenix-v3-rotary.json','cyber-coil-pro.json','neuro-liner-x1.json',
                   'dynamic-black-set.json','neon-color-pack.json','pure-white-30ml.json',
                   'kwadron-starter-kit.json','tattoo-flux-rl.json','cheyenne-magnum.json',
                   'guantes-nitrilo-100pk.json','green-soap-500ml.json','saniderm-aftercare.json'];
    
    const products = await Promise.all(
      files.map(async f => {
        try {
          const r = await fetch(`data/products/${f}`);
          return r.ok ? await r.json() : null;
        } catch(e) { return null; }
      })
    );
    this.products = products.filter(p => p).sort((a,b) => a.order - b.order);
  },

  async loadCategories() {
    const files = ['machines.json','inks.json','cartridges.json','safety.json','accessories.json','supplies.json'];
    const categories = await Promise.all(
      files.map(async f => {
        try {
          const r = await fetch(`data/categories/${f}`);
          return r.ok ? await r.json() : null;
        } catch(e) { return null; }
      })
    );
    this.categories = categories.filter(c => c);
  },

  async loadPromotions() {
    try {
      const r = await fetch('data/promotions.json');
      if (r.ok) this.promotions = await r.json();
    } catch(e) {}
  },

  async loadConfig() {
    try {
      const r = await fetch('data/config.json');
      if (r.ok) this.config = await r.json();
    } catch(e) {}
  },

  renderAll() {
    this.renderHero();
    this.renderCategories();
    this.renderProducts();
    this.renderPromotions();
    this.renderTestimonials();
    this.renderBenefits();
    this.renderFooter();
  },

  renderHero() {
    if (!this.config?.hero) return;
    const h = this.config.hero;
    const lines = document.querySelectorAll('.hero-title .line');
    if (lines[0]) lines[0].textContent = h.titleLine1;
    if (lines[1]) lines[1].textContent = h.titleLine2;
    if (lines[2]) {
      lines[2].textContent = h.highlight;
      lines[2].setAttribute('data-text', h.highlight);
    }
    const sub = document.querySelector('.hero-subtitle');
    if (sub) sub.textContent = h.subtitle;
  },

  renderCategories() {
    if (!this.categories.length) return;
    const container = document.querySelector('.categories-grid');
    if (!container) return;
    container.innerHTML = this.categories.map((cat,i) => `
      <a href="tienda.html#${cat.slug}" class="category-card reveal delay-${(i+1)*100}">
        <div class="category-icon">${cat.icon}</div>
        <h3 class="category-title">${cat.name}</h3>
        <p class="category-count">${cat.productCount}+ Productos</p>
      </a>
    `).join('');
  },

  renderProducts() {
    if (!this.products.length) return;
    const container = document.querySelector('.products-grid');
    if (!container) return;
    
    const isShop = document.querySelector('.shop-filters');
    const productsToRender = isShop ? this.products : this.products.filter(p => p.featured).slice(0,3);
    
    container.innerHTML = productsToRender.map((p,i) => `
      <div class="product-card reveal delay-${((i%3)+1)*100}" data-category="${p.category}">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-image">
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;background:linear-gradient(135deg,#1a1a1a,#242424);">${p.icon||'📦'}</div>
          <div class="product-overlay">
            <button class="product-quick-add" onclick="Toast.show('${p.name} agregado')">Agregar</button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${this.getCategoryName(p.category)}</span>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-footer">
            <span class="product-price">$${p.price}${p.oldPrice?` <span class="old">$${p.oldPrice}</span>`:''}</span>
            <div class="product-rating">${'★'.repeat(p.rating).split('').map(()=>'<span class="filled">★</span>').join('')+'☆'.repeat(5-p.rating).split('').map(()=>'<span>☆</span>').join('')}</div>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderPromotions() {
    if (!this.promotions) return;
    const active = this.promotions.mainPromotions.find(p => p.id === this.promotions.activePromo && p.isActive);
    if (!active) return;
    
    const title = document.querySelector('.promo-title');
    const label = document.querySelector('.promo-label');
    const desc = document.querySelector('.promo-description');
    const product = document.querySelector('.promo-product');
    
    if (title) title.innerHTML = `${active.title.split(' ')[0]} <span>${active.title.split(' ').slice(1).join(' ')}</span>`;
    if (label) label.textContent = active.subtitle;
    if (desc) desc.textContent = active.description;
    if (product) product.textContent = `-${active.discount}`;
  },

  renderTestimonials() {
    if (!this.config?.testimonials) return;
    const container = document.querySelector('.testimonials-grid');
    if (!container) return;
    
    container.innerHTML = this.config.testimonials.map((t,i) => `
      <div class="testimonial-card reveal delay-${(i+1)*100}">
        <div class="testimonial-rating">${'★'.repeat(t.rating)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.avatar}</div>
          <div class="testimonial-info">
            <h4>${t.author}</h4>
            <p>${t.role}</p>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderBenefits() {
    if (!this.config?.benefits) return;
    const container = document.querySelector('.benefits-grid');
    if (!container) return;
    
    container.innerHTML = this.config.benefits.map((b,i) => `
      <div class="benefit-item reveal${i>0?` delay-${i*100}`:''}">
        <div class="benefit-icon">${b.icon}</div>
        <h3 class="benefit-title">${b.title}</h3>
        <p class="benefit-text">${b.text}</p>
      </div>
    `).join('');
  },

  renderFooter() {
    if (!this.config?.footer) return;
    const desc = document.querySelector('.footer-description');
    const copy = document.querySelector('.footer-copyright');
    if (desc) desc.textContent = this.config.footer.description;
    if (copy) copy.textContent = this.config.footer.copyright;
  },

  getCategoryName(id) {
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : id;
  }
};

document.addEventListener('DOMContentLoaded', () => CMSData.init());
window.CMSData = CMSData;