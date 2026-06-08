// ============================================================
// VENKY PORTFOLIO - Main Application Script
// ============================================================
import * as THREE from 'three';

// ============================================================
// DATA LAYER (LocalStorage)
// ============================================================
const STORAGE_KEY = 'venky_portfolio_works_v1';
const ADMIN_SESSION_KEY = 'venky_admin_session';
const ADMIN_CREDS = { user: 'admin', pass: 'venky2026' };

function getWorks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch (e) { return []; }
}
function saveWorks(works) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
}
function isAdminLoggedIn() {
  return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

// ============================================================
// 3D PARTICLE BACKGROUND
// ============================================================
const bgCanvas = document.getElementById('three-bg');
const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 25;

const particlesGeo = new THREE.BufferGeometry();
const count = window.innerWidth < 768 ? 500 : 1500;
const pos = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
const c1 = new THREE.Color('#6a9bcc');
const c2 = new THREE.Color('#788c5d');
const c3 = new THREE.Color('#faf9f5');
for (let i = 0; i < count; i++) {
  pos[i * 3] = (Math.random() - 0.5) * 50;
  pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
  pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  const m = Math.random();
  const c = m < 0.5 ? c1.clone().lerp(c2, m * 2) : c2.clone().lerp(c3, (m - 0.5) * 2);
  colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const particlesMat = new THREE.PointsMaterial({
  size: 0.09, vertexColors: true, blending: THREE.AdditiveBlending,
  depthWrite: false, transparent: true, opacity: 0.75
});
const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

const orbs = [];
for (let i = 0; i < 3; i++) {
  const g = new THREE.SphereGeometry(0.4 + Math.random() * 0.6, 32, 32);
  const m = new THREE.MeshBasicMaterial({
    color: i === 0 ? 0x6a9bcc : i === 1 ? 0x788c5d : 0xfaf9f5,
    transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const orb = new THREE.Mesh(g, m);
  orb.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10 - 5);
  orb.userData = { phase: Math.random() * Math.PI * 2 };
  scene.add(orb);
  orbs.push(orb);
}

let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  targetX += (mouseX - targetX) * 0.04;
  targetY += (mouseY - targetY) * 0.04;
  particles.rotation.y += 0.0003;
  particles.rotation.x += 0.0001;
  particles.position.x += (targetX * 2 - particles.position.x) * 0.015;
  particles.position.y += (targetY * 1.5 - particles.position.y) * 0.015;
  orbs.forEach((orb, i) => {
    const p = orb.userData.phase;
    orb.position.x += Math.sin(t * 0.5 + p) * 0.008;
    orb.position.y += Math.cos(t * 0.7 + p) * 0.008;
    orb.position.z += Math.sin(t * 0.3 + p) * 0.004;
    orb.scale.setScalar(1 + Math.sin(t * 1.2 + p) * 0.25);
  });
  renderer.render(scene, camera);
}
animate();

// ============================================================
// PAGE TEMPLATES
// ============================================================
const pages = {
  portfolio() {
    return `
    <div class="page active" id="page-portfolio">
      <nav class="nav" id="nav">
        <div class="nav-inner">
          <div class="nav-logo gradient-text" onclick="scrollToTop()">Venky</div>
          <div class="nav-links">
            <a onclick="scrollToSection('hero')">Home</a>
            <a onclick="scrollToSection('services')">Services</a>
            <a onclick="scrollToSection('work')">Work</a>
            <a onclick="scrollToSection('contact')">Contact</a>
            <a onclick="showPage('admin-login')" class="btn btn-glass">Admin</a>
          </div>
        </div>
      </nav>
      <section class="hero" id="hero"><div class="container"><div class="hero-content">
        <div class="hero-badge"><span class="dot"></span> Open for freelance projects</div>
        <h1>I build <span class="gradient-text">websites & automations</span> that work while you sleep</h1>
        <p>Full-stack developer & AI automation expert. I create stunning web applications, e-commerce stores, and intelligent workflow automations that save you time and grow your business — 24/7.</p>
        <div class="hero-cta">
          <a onclick="scrollToSection('contact')" class="btn btn-primary">Start Your Project →</a>
          <a onclick="scrollToSection('work')" class="btn btn-glass">View My Work</a>
        </div>
      </div></div></section>
      <section class="section" id="services"><div class="container">
        <h2>What I <span class="gradient-text">Deliver</span></h2>
        <p style="color:var(--text-secondary);margin-top:1rem;max-width:500px">End-to-end digital solutions — from concept to deployment, with AI-powered intelligence built in.</p>
        <div class="services-grid">
          <div class="glass-card service-card" data-magnetic>
            <div class="service-icon">🌐</div>
            <h3>Website Development</h3>
            <p>Custom-built, blazing-fast websites with modern tech stacks. Portfolio sites, landing pages, and full-scale web platforms that convert visitors into customers.</p>
          </div>
          <div class="glass-card service-card" data-magnetic>
            <div class="service-icon">⚡</div>
            <h3>Web Applications</h3>
            <p>SaaS products, dashboards, and interactive web apps built with React, Laravel, and cutting-edge frameworks. Scalable, secure, and user-focused.</p>
          </div>
          <div class="glass-card service-card" data-magnetic>
            <div class="service-icon">🤖</div>
            <h3>AI Automations</h3>
            <p>Intelligent workflow automation using AI agents. Automate customer support, data processing, email campaigns, and repetitive tasks — save 20+ hours/week.</p>
          </div>
        </div>
      </div></section>
      <section class="section" id="work"><div class="container">
        <h2>Recent <span class="gradient-text">Projects</span></h2>
        <p style="color:var(--text-secondary);margin-top:1rem">A curated selection of websites, applications, and automation systems I've built.</p>
        <div class="work-grid" id="work-grid"></div>
        <div class="empty-state" id="work-empty" style="display:none">
          <div class="icon">🚀</div>
          <p>Projects coming soon. The admin is currently curating the portfolio. Check back shortly!</p>
        </div>
      </div></section>
      <section class="section"><div class="container"><div class="about-grid">
        <div>
          <h2>Why <span class="gradient-text">Work With Me</span></h2>
          <p style="color:var(--text-secondary);margin-top:1rem;line-height:1.7">I'm Venky — a full-stack developer with deep expertise in building web experiences and AI-powered automation systems. Every project I take on gets my full attention, from pixel-perfect design to bulletproof backend logic. I don't just write code — I build solutions that drive real business results.</p>
          <div style="margin-top:2rem"><a onclick="scrollToSection('contact')" class="btn btn-primary">Let's Talk →</a></div>
        </div>
        <div class="stat-cards">
          <div class="glass-card stat-card"><div class="stat-number gradient-text" id="stat-projects">50+</div><div class="stat-label">Projects Delivered</div></div>
          <div class="glass-card stat-card"><div class="stat-number gradient-text" id="stat-clients">30+</div><div class="stat-label">Happy Clients</div></div>
          <div class="glass-card stat-card"><div class="stat-number gradient-text">3+</div><div class="stat-label">Years Experience</div></div>
          <div class="glass-card stat-card"><div class="stat-number gradient-text">100%</div><div class="stat-label">Commitment</div></div>
        </div>
      </div></div></section>
      <section class="section contact-section" id="contact"><div class="container">
        <h2>Let's <span class="gradient-text">Connect</span></h2>
        <p style="color:var(--text-secondary);margin-top:1rem">Ready to start your project? Reach out directly.</p>
        <div class="glass-card contact-card">
          <div class="contact-item"><span style="font-size:1.5rem">📞</span><div style="text-align:left"><div style="font-size:.8rem;color:var(--text-muted)">Phone</div><div style="font-weight:600;font-size:1.1rem">+91 9381084784</div></div></div>
          <div class="contact-item"><span style="font-size:1.5rem">📍</span><div style="text-align:left"><div style="font-size:.8rem;color:var(--text-muted)">Location</div><div style="font-weight:600">India — Remote Worldwide</div></div></div>
          <div class="contact-item"><span style="font-size:1.5rem">💬</span><div style="text-align:left"><div style="font-size:.8rem;color:var(--text-muted)">Response Time</div><div style="font-weight:600">Within 24 hours</div></div></div>
        </div>
        <div style="margin-top:2rem">
          <a href="https://wa.me/919381084784?text=Hi%20Venky%2C%20I%27d%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener" class="btn btn-primary" style="background:#25D366;font-size:1rem;padding:.9rem 2rem">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </div></section>
      <footer class="footer"><p>© 2026 Venky. Built with passion & precision. All rights reserved.</p></footer>
    </div>`;
  },
  adminLogin() {
    return `
    <div class="page active" id="page-admin-login">
      <nav class="nav scrolled"><div class="nav-inner">
        <div class="nav-logo gradient-text" onclick="showPage('portfolio')" style="cursor:pointer">Venky</div>
        <a onclick="showPage('portfolio')" style="color:var(--text-secondary);text-decoration:none;cursor:pointer">← Back to Portfolio</a>
      </div></nav>
      <div class="login-container">
        <div class="glass-card login-card">
          <h2>Admin <span class="gradient-text">Portal</span></h2>
          <p>Sign in to manage your portfolio.</p>
          <div class="error-msg" id="login-error">Invalid credentials. Please try again.</div>
          <div class="form-group"><label>Username</label><input type="text" id="login-user" placeholder="admin" autocomplete="username"></div>
          <div class="form-group"><label>Password</label><input type="password" id="login-pass" placeholder="••••••••" autocomplete="current-password" onkeydown="if(event.key==='Enter') adminLogin()"></div>
          <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="adminLogin()">Sign In</button>
          <p style="text-align:center;margin-top:1.5rem;font-size:.8rem;color:var(--text-muted)">Default: <code style="background:#ffffff10;padding:2px 6px;border-radius:4px">admin</code> / <code style="background:#ffffff10;padding:2px 6px;border-radius:4px">venky2026</code></p>
        </div>
      </div>
    </div>`;
  },
  adminDashboard() {
    return `
    <div class="page active" id="page-admin-dashboard">
      <div class="admin-layout">
        <aside class="admin-sidebar">
          <div class="admin-logo gradient-text">Venky Admin</div>
          <nav class="admin-nav">
            <a class="active" data-tab="works" onclick="adminTab('works')">📁 My Works</a>
            <a data-tab="add" onclick="adminTab('add')">➕ Add New Work</a>
            <a onclick="adminLogout()" style="color:#f87171">🚪 Logout</a>
            <div style="margin-top:1rem;padding-top:1.5rem;border-top:1px solid var(--border)">
              <a onclick="showPage('portfolio')" style="color:var(--text-secondary)">← View Portfolio</a>
            </div>
          </nav>
        </aside>
        <main class="admin-main">
          <div class="admin-tab" id="tab-works">
            <div class="admin-header">
              <h2>My Works</h2>
              <button class="btn btn-primary btn-sm" onclick="adminTab('add')">+ Add New</button>
            </div>
            <div class="work-list" id="admin-work-list"></div>
            <div class="empty-state" id="admin-empty" style="display:none"><div class="icon">📭</div><p>No works added yet. Click "Add New Work" to get started.</p></div>
          </div>
          <div class="admin-tab" id="tab-add" style="display:none">
            <div class="admin-header">
              <h2 id="form-title">Add New Work</h2>
              <button class="btn btn-glass btn-sm" onclick="resetForm();adminTab('works')">← Back</button>
            </div>
            <div class="admin-card">
              <form id="work-form" onsubmit="return saveWork(event)">
                <input type="hidden" id="work-id">
                <div class="form-group"><label>Project Title *</label><input type="text" id="work-title" placeholder="E-Commerce Platform for Client X" required></div>
                <div class="form-group"><label>Category *</label>
                  <select id="work-category" required>
                    <option value="">Select category...</option>
                    <option value="Website">Website</option>
                    <option value="Web Application">Web Application</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form-group"><label>Description</label><textarea id="work-desc" placeholder="Describe the project, technologies used, and results achieved..."></textarea></div>
                <div class="form-group"><label>Project URL (optional)</label><input type="url" id="work-url" placeholder="https://example.com"></div>
                <div class="form-group"><label>Thumbnail Image</label>
                  <div class="upload-area" onclick="document.getElementById('work-image-input').click()">
                    <span style="font-size:2rem">📸</span>
                    <p>Click to upload an image (optional)</p>
                  </div>
                  <input type="file" id="work-image-input" accept="image/*" style="display:none" onchange="previewImage(event)">
                  <img class="preview-img" id="work-preview" style="display:none">
                </div>
                <div style="display:flex;gap:1rem;flex-wrap:wrap">
                  <button type="submit" class="btn btn-primary" style="flex:1;min-width:180px;justify-content:center" id="submit-btn">Publish Work</button>
                  <button type="button" class="btn btn-glass" onclick="resetForm();adminTab('works')">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>`;
  }
};

// ============================================================
// PAGE NAVIGATION
// ============================================================
function showPage(pageId) {
  const root = document.getElementById('page-root');
  if (pageId === 'portfolio') {
    root.innerHTML = pages.portfolio();
    renderPortfolioWorks();
    attachMagneticEffects();
    const nav = document.getElementById('nav');
    if (nav) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      });
    }
  } else if (pageId === 'admin-login') {
    root.innerHTML = pages.adminLogin();
    setTimeout(() => {
      const u = document.getElementById('login-user');
      if (u) u.focus();
    }, 100);
  } else if (pageId === 'admin-dashboard') {
    if (!isAdminLoggedIn()) { showPage('admin-login'); return; }
    root.innerHTML = pages.adminDashboard();
    renderAdminWorks();
  }
  window.scrollTo(0, 0);
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function scrollToSection(id) {
  showPage('portfolio');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 150);
}

function attachMagneticEffects() {
  document.querySelectorAll('[data-magnetic]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  });
}

// ============================================================
// RENDER PORTFOLIO WORKS
// ============================================================
function getCategoryEmoji(cat) {
  const map = { 'AI Automation':'🤖','E-Commerce':'🛒','Dashboard':'📊','Web Application':'⚡','Website':'🌐','Landing Page':'📄','Other':'💻' };
  return map[cat] || '💻';
}

function renderPortfolioWorks() {
  const grid = document.getElementById('work-grid');
  const empty = document.getElementById('work-empty');
  if (!grid) return;
  const works = getWorks();
  grid.innerHTML = '';
  if (works.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  const pEl = document.getElementById('stat-projects');
  const cEl = document.getElementById('stat-clients');
  if (pEl) pEl.textContent = Math.max(50, works.length) + '+';
  if (cEl) cEl.textContent = Math.max(30, Math.floor(works.length * 1.5)) + '+';
  works.forEach((w, idx) => {
    const card = document.createElement('div');
    card.className = 'work-card';
    card.style.animation = `fadeInUp .6s var(--trans) ${idx * 0.08}s both`;
    card.onclick = () => { if (w.url) window.open(w.url, '_blank'); };
    const imgHTML = w.image ? `<img src="${w.image}" alt="${escapeHtml(w.title)}">` : getCategoryEmoji(w.category);
    card.innerHTML = `<div class="work-image">${imgHTML}</div><div class="work-info"><span class="work-tag">${escapeHtml(w.category)}</span><h3>${escapeHtml(w.title)}</h3><p>${escapeHtml(w.desc || 'Full-stack project delivered with modern technologies.')}</p></div>`;
    grid.appendChild(card);
  });
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

// ============================================================
// TOAST
// ============================================================
let toastTimer;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ============================================================
// ADMIN
// ============================================================
function adminLogin() {
  const user = (document.getElementById('login-user') || {}).value?.trim();
  const pass = (document.getElementById('login-pass') || {}).value?.trim();
  const err = document.getElementById('login-error');
  if (user === ADMIN_CREDS.user && pass === ADMIN_CREDS.pass) {
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    if (err) err.classList.remove('show');
    showToast('Welcome back, Venky!', 'success');
    showPage('admin-dashboard');
  } else {
    if (err) err.classList.add('show');
  }
}

function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  showToast('Logged out', 'success');
  showPage('portfolio');
}

function adminTab(tabName) {
  document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.admin-nav a').forEach(a => a.classList.remove('active'));
  const target = document.getElementById('tab-' + tabName);
  if (target) target.style.display = 'block';
  const navLink = document.querySelector(`.admin-nav a[data-tab="${tabName}"]`);
  if (navLink) navLink.classList.add('active');
  if (tabName === 'works') renderAdminWorks();
}

function renderAdminWorks() {
  const list = document.getElementById('admin-work-list');
  const empty = document.getElementById('admin-empty');
  if (!list) return;
  const works = getWorks();
  list.innerHTML = '';
  if (works.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  works.forEach(w => {
    const item = document.createElement('div');
    item.className = 'work-list-item';
    const thumb = w.image ? `<img src="${w.image}" alt="${escapeHtml(w.title)}">` : getCategoryEmoji(w.category);
    item.innerHTML = `<div class="work-list-thumb">${thumb}</div><div class="work-list-info"><h4>${escapeHtml(w.title)}</h4><span>${escapeHtml(w.category)} · ${new Date(w.createdAt).toLocaleDateString()}</span></div><div class="work-list-actions"><button class="btn btn-glass btn-sm" onclick="editWork('${w.id}')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteWork('${w.id}')">Delete</button></div>`;
    list.appendChild(item);
  });
}

let currentImageData = null;
function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    showToast('Image must be under 2MB', 'error');
    event.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    currentImageData = e.target.result;
    const preview = document.getElementById('work-preview');
    if (preview) { preview.src = currentImageData; preview.style.display = 'block'; }
  };
  reader.readAsDataURL(file);
}

function saveWork(event) {
  event.preventDefault();
  const id = document.getElementById('work-id').value;
  const title = document.getElementById('work-title').value.trim();
  const category = document.getElementById('work-category').value;
  const desc = document.getElementById('work-desc').value.trim();
  const url = document.getElementById('work-url').value.trim();
  if (!title || !category) { showToast('Title and category are required', 'error'); return false; }
  const works = getWorks();
  if (id) {
    const idx = works.findIndex(w => w.id === id);
    if (idx >= 0) {
      works[idx] = { ...works[idx], title, category, desc, url, image: currentImageData || works[idx].image };
    }
    showToast('Work updated successfully!', 'success');
  } else {
    works.unshift({
      id: 'work_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      title, category, desc, url, image: currentImageData, createdAt: Date.now()
    });
    showToast('Work published to portfolio!', 'success');
  }
  saveWorks(works);
  resetForm();
  adminTab('works');
  return false;
}

function resetForm() {
  const form = document.getElementById('work-form');
  if (form) form.reset();
  const idField = document.getElementById('work-id');
  if (idField) idField.value = '';
  const preview = document.getElementById('work-preview');
  if (preview) preview.style.display = 'none';
  currentImageData = null;
  const fileInput = document.getElementById('work-image-input');
  if (fileInput) fileInput.value = '';
  const titleEl = document.getElementById('form-title');
  if (titleEl) titleEl.textContent = 'Add New Work';
  const btn = document.getElementById('submit-btn');
  if (btn) btn.textContent = 'Publish Work';
}

function editWork(id) {
  const works = getWorks();
  const w = works.find(x => x.id === id);
  if (!w) return;
  document.getElementById('work-id').value = w.id;
  document.getElementById('work-title').value = w.title;
  document.getElementById('work-category').value = w.category;
  document.getElementById('work-desc').value = w.desc || '';
  document.getElementById('work-url').value = w.url || '';
  currentImageData = w.image || null;
  if (w.image) {
    const preview = document.getElementById('work-preview');
    preview.src = w.image;
    preview.style.display = 'block';
  }
  document.getElementById('form-title').textContent = 'Edit Work';
  document.getElementById('submit-btn').textContent = 'Update Work';
  adminTab('add');
}

function deleteWork(id) {
  if (!confirm('Delete this work? This cannot be undone.')) return;
  let works = getWorks();
  works = works.filter(w => w.id !== id);
  saveWorks(works);
  renderAdminWorks();
  showToast('Work deleted', 'success');
}

// ============================================================
// EXPOSE GLOBALS
// ============================================================
window.showPage = showPage;
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.adminTab = adminTab;
window.saveWork = saveWork;
window.resetForm = resetForm;
window.editWork = editWork;
window.deleteWork = deleteWork;
window.previewImage = previewImage;

// ============================================================
// FLOATING WHATSAPP BUTTON
// ============================================================
function injectFloatingWhatsApp() {
  if (document.getElementById('wa-float')) return;
  const link = document.createElement('a');
  link.id = 'wa-float';
  link.href = 'https://wa.me/919381084784?text=Hi%20Venky%2C%20I%27d%20like%20to%20discuss%20a%20project';
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', 'Chat on WhatsApp');
  link.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    <span class="wa-float-tooltip">Chat with me</span>`;
  document.body.appendChild(link);
}

// ============================================================
// BOOT
// ============================================================
showPage('portfolio');
injectFloatingWhatsApp();
