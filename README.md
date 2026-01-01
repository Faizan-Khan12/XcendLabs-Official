# XcendLabs - AI Automation & Growth Agency Website

A modern, multi-page React website built with Vite for XcendLabs agency. Features smooth animations, responsive design, and a stunning WebGL fluid cursor effect.

![XcendLabs](public/xcendlabs%20logo.png)

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with component-based architecture |
| **Vite** | Fast build tool with HMR (Hot Module Replacement) |
| **React Router DOM** | Client-side routing for multi-page navigation |
| **CSS Modules** | Scoped styling per component |
| **WebGL** | Fluid cursor animation effect |

---

## 📁 Project Structure

```
e:\XcendLabs\
├── public/
│   └── xcendlabs logo.png        # Logo asset
│
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx        # Navigation with React Router
│   │   │   └── Navbar.module.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx          # Hero section
│   │   │   └── Hero.module.css
│   │   ├── Stats/
│   │   │   ├── Stats.jsx         # Counter animation
│   │   │   └── Stats.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx        # Simple footer
│   │   │   └── Footer.module.css
│   │   └── FluidCanvas/
│   │       └── FluidCanvas.jsx   # WebGL fluid cursor effect
│   │
│   ├── pages/                    # Page components (routes)
│   │   ├── Home.jsx              # Full landing page with all sections
│   │   ├── Home.module.css
│   │   ├── ServicesPage.jsx      # Detailed services page
│   │   ├── ServicesPage.module.css
│   │   ├── WhyUsPage.jsx         # Why Us comparison page
│   │   ├── WhyUsPage.module.css
│   │   ├── TestimonialsPage.jsx  # Customer reviews page
│   │   ├── TestimonialsPage.module.css
│   │   ├── AboutUsPage.jsx       # Company story + team page
│   │   └── AboutUsPage.module.css
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useScrollReveal.js    # Scroll-triggered animations
│   │   └── useScrollSpy.js       # Active section tracking
│   │
│   ├── styles/
│   │   └── global.css            # Global styles, CSS variables, reset
│   │
│   ├── App.jsx                   # Root component with Router
│   └── main.jsx                  # Entry point
│
├── index.html                    # HTML template with SEO meta tags
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite configuration
└── README.md                     # This file
```

---

## 📦 Dependencies

### Production Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x"
}
```

### Dev Dependencies

```json
{
  "@vitejs/plugin-react": "^4.x",
  "vite": "^5.x"
}
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd XcendLabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173/`

4. **Build for production**
   ```bash
   npm run build
   ```
   Output in `dist/` folder

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 📄 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home.jsx` | Full landing page with Hero, Stats, Services, Why Us, Testimonials, Team, and CTA |
| `/services` | `ServicesPage.jsx` | Detailed services with 6 cards |
| `/why-us` | `WhyUsPage.jsx` | Comparison table + 4-step process |
| `/testimonials` | `TestimonialsPage.jsx` | Full customer reviews grid |
| `/about` | `AboutUsPage.jsx` | Company story + team cards |

---

## 🏠 Home Page Sections

The Home page (`/`) displays an overview of everything:

1. **Hero** - Main tagline and CTA
2. **Stats** - Animated counter (500+ automations, 76+ hours saved, 98% success)
3. **Services** - 4 service cards with features
4. **Why Us** - Comparison table (XcendLabs vs Others)
5. **Testimonials** - 4 customer reviews
6. **Team** - 3 team member cards
7. **CTA Band** - Book a Call, Email, WhatsApp buttons

---

## 🎨 Features

### Visual
- **WebGL Fluid Cursor** - Interactive cursor trail effect (desktop only)
- **Gradient Animations** - Smooth color transitions
- **Scroll Reveal** - Elements animate on scroll
- **Hover Effects** - Cards lift and glow on hover

### Technical
- **CSS Modules** - Scoped styles prevent conflicts
- **Responsive Design** - Mobile, tablet, desktop breakpoints
- **SEO Optimized** - Meta tags, Open Graph, JSON-LD
- **Accessibility** - Skip links, focus states, ARIA labels

### Responsive Breakpoints
| Breakpoint | Target |
|------------|--------|
| `480px` | Small mobile |
| `768px` | Mobile |
| `900px` | Navbar hamburger menu |
| `1024px` | Tablet |
| `1920px` | Desktop |

---

## 🔧 Configuration

### Customization Points

| File | What to Customize |
|------|-------------------|
| `src/pages/Home.jsx` | Services, testimonials, team data |
| `src/pages/AboutUsPage.jsx` | Team member info and story |
| `src/pages/TestimonialsPage.jsx` | Customer reviews |
| `src/pages/ServicesPage.jsx` | Service offerings |
| `src/styles/global.css` | Colors (CSS variables) |
| `index.html` | SEO meta tags, URLs |

### CSS Variables (global.css)

```css
:root {
  --bg-1: #0a0f1e;       /* Page background */
  --accent: #22d3ee;     /* Primary accent (cyan) */
  --accent-2: #a78bfa;   /* Secondary accent (violet) */
  --text-1: #ffffff;     /* Primary text */
  --text-2: #c8d0e0;     /* Secondary text */
}
```

---

## 📧 Contact Configuration

Update these in `src/pages/Home.jsx`:

```javascript
// Email
href="mailto:hello@xcendlabs.com"

// WhatsApp (replace 1234567890 with real number)
href="https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20XcendLabs%20services."

// Calendly
href="https://calendly.com/xcendlabs/30min"
```

---

## 🖼️ Assets

- Place logo at: `public/xcendlabs logo.png`
- Recommended format: PNG with transparency
- Suggested size: 200x200px minimum

---

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL fluid effect disabled on mobile devices for performance.

---

## 📜 Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production
npm run lint     # Run ESLint (if configured)
```

---

## 🔗 External Services

| Service | Purpose | URL |
|---------|---------|-----|
| Google Fonts | Typography (Inter, Space Grotesk) | fonts.googleapis.com |
| Calendly | Booking calls | calendly.com |
| WhatsApp | Direct messaging | wa.me |

---

## 📝 License

© 2024 XcendLabs. All rights reserved.

---

## 👥 Team

Built with ❤️ by the XcendLabs team.
