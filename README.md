# 🚀 Venky — AI-Driven Web & Automation Portfolio

A stunning 3D animated portfolio website for freelance web development, web applications, and AI automation services. Features a public portfolio showcase and a secure admin portal for managing projects.

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS%20%7C%20Three.js-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### Public Portfolio
- **3D animated background** — Three.js particle system with mouse-reactive parallax
- **Floating orbs** with smooth ambient animation
- **Glassmorphism UI** — premium frosted glass cards
- **Magnetic hover effects** on service cards
- **Gradient typography** with animated stat counters
- **Smooth scroll navigation** with section snapping
- **Fully responsive** — mobile, tablet, desktop
- **Lazy loading** with reduced-motion respect

### Admin Portal (Protected)
- **Secure login** (default: `admin` / `venky2026`)
- **Full CRUD** for portfolio projects
- **Image upload** (base64, up to 2MB per image)
- **7 categories**: Website, Web Application, AI Automation, E-Commerce, Dashboard, Landing Page, Other
- **Local storage** persistence — works offline
- **Live preview** of uploaded content

### Services Showcase
- 🌐 Website Development
- ⚡ Web Applications
- 🤖 AI Automations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| 3D Engine | [Three.js](https://threejs.org/) r160 |
| Styling | Pure CSS (no framework bloat) |
| Data | Browser LocalStorage |
| Deployment | Static — works anywhere |

---

## 📁 Project Structure

```
portfolio/
├── index.html        # Main HTML with embedded CSS
├── app.js            # Three.js + application logic (ES module)
└── README.md         # This file
```

---

## 🚀 Quick Start

### Option 1 — Local Server
```bash
cd portfolio
python -m http.server 8000
# Open http://localhost:8000
```

### Option 2 — Direct
Open `index.html` directly in any modern browser (Chrome/Edge/Firefox/Safari).

> **Note:** Some browsers restrict `import` from `file://`. Use a local server for best results.

---

## 🔐 Admin Access

1. Click the **Admin** button in the navigation
2. Sign in with default credentials:
   - **Username:** `admin`
   - **Password:** `venky2026`
3. Manage your portfolio projects from the dashboard

> 💡 **To change credentials**, edit `ADMIN_CREDS` in `app.js`:
> ```js
> const ADMIN_CREDS = { user: 'admin', pass: 'venky2026' };
> ```

---

## 📞 Contact

**Venky**
- 📱 Phone: +91 9381084784
- 📍 Location: India — Remote Worldwide
- 💬 Response Time: Within 24 hours

---

## 📄 License

MIT — Free to use, modify, and distribute.

---

Built with passion & precision. © 2026 Venky.
