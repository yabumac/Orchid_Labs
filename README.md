# 🌺 Orchid Labs

> **Next-Generation Cognitive Engineering & Spatial 3D Web Studio**  
> An open-architecture digital studio delivering full control, radical performance, and high-craft interactive experiences.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-black?style=flat-square&logo=threedotjs)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

---

## ✨ Overview

**Orchid Labs** is a multidisciplinary engineering and design studio collective. We operate at the convergence of autonomous AI agent orchestration, WebGL spatial 3D interactions, high-throughput distributed software architecture, and bespoke digital publishing systems.

Designed with an editorial, ultra-modern aesthetic inspired by the forefront of creative web technology, Orchid Labs provides an immersive, interactive digital flagship.

---

## 🚀 Key Features & Highlights

### 🌀 1. Interactive 3D Kinetic Sculpture (WebGL / Three.js)
- **Parametric Turbine Disc Ribbon**: 64 metallic blades arranged along a 3D toroidal curve with dynamic rim lighting and specular reflections.
- **Physical Material Presets**: On-the-fly switching between **Liquid Chrome**, **Orchid Prism**, **Deep Obsidian**, and **Gold Aurora**.
- **Interactive Kinetic Waves**: Real-time mouse parallax tilt, click-to-ripple wave propagation, drag-to-rotate in 3D space, and wireframe topology inspection.
- **Overlaid Release Telemetry**: Floating release card featuring live system status (`⚡ 12ms Edge Latency • LIVE`).

### 🎛️ 2. The Interactive Studio Lab Sandbox
- **Autonomous Multi-Agent Dispatcher**: In-browser simulation demonstrating multi-step AI reasoning, memory recall, and tool calling with step-by-step latency tracking.
- **Spatial Audio Synthesizer**: 12-band real-time harmonic frequency equalizer visualizer with Dolby Atmos specs and Web Audio DSP capabilities.
- **Architecture Benchmarking**: Live comparison against legacy monolithic architectures showcasing sub-12ms global TTFB and zero cold-start execution.

### 🔍 3. Global Command Palette (`⌘K` / `Ctrl+K`)
- Instant keyboard-driven navigation across services, lab simulations, case studies, and inquiries.
- Fuzzy filtering with categorical grouping and keyboard shortcut indicators.

### 💼 4. Selected Works & Capabilities Matrix
- **Featured Works**: Filterable project portfolio spanning Cognitive AI, Spatial 3D Web, Digital Books, and Audio Engineering.
- **10 Core Capabilities**: Comprehensive showcase covering Software Engineering, AI Agents, UI/UX Craft, Spatial Sound, Digital Books, EdTech, and Tech Advisory.

### 📐 5. Interactive Project Scope Estimator
- Interactive multi-select pills for service categories, budget tiers, and target timelines.
- Form validation powered by **React Hook Form** + **Zod** with instant **Sonner** toast feedback.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript | Component architecture with full type safety |
| **3D & Spatial Graphics** | Three.js | Parametric WebGL rendering, shaders & lighting |
| **Styling & Design System** | Tailwind CSS v4 | Custom design tokens, glassmorphism & typography |
| **Typography** | Plus Jakarta Sans & JetBrains Mono | High-contrast grotesque sans & monospace fonts |
| **Motion & Animation** | Framer Motion | Choreographed entrance reveals and layout morphs |
| **Form Management** | React Hook Form + Zod | Schema-validated inquiry workflows |
| **Icons & Notifications** | Lucide React + Sonner | Accessible iconography and stacked toast feedback |
| **Build & Tooling** | Vite 5 | Lightning-fast HMR and optimized production bundles |

---

## 📁 Project Structure

```bash
Orchid_Labs/
├── public/                 # Static assets and favicons
├── src/
│   ├── assets/             # Brand logos and iconography
│   ├── components/
│   │   ├── 3d/
│   │   │   └── KineticSculpture.tsx   # Three.js 3D parametric ring
│   │   ├── ui/                        # Radix UI & design system primitives
│   │   ├── FeaturedWorks.tsx          # Filterable project portfolio
│   │   ├── GlassNavbar.tsx            # Floating navigation with dropdowns
│   │   ├── InteractiveStudioLab.tsx   # Live agent & audio sandbox
│   │   ├── LiquidBackground.tsx       # Ambient light and grid canvas
│   │   └── SearchDialog.tsx           # Global Command Palette (⌘K)
│   ├── hooks/                         # Custom React hooks
│   ├── lib/                           # Utility functions & class mergers
│   ├── App.tsx                        # Master layout & section orchestration
│   ├── index.css                      # Global styles, variables & fonts
│   └── main.tsx                       # React application bootstrap
├── index.html              # HTML shell with Google Fonts preconnect
├── package.json            # Dependencies & scripts
└── vite.config.ts          # Vite configuration
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js**: v18+ (v20+ recommended)
- **npm** or **bun** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yabumac/Orchid_Labs.git
   cd Orchid_Labs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or the port displayed in your terminal).

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment

The production build in `dist/` can be deployed to any modern static hosting provider:

- **Vercel**: Deploy directly by linking your GitHub repository.
- **Netlify**: Set build command to `npm run build` and publish directory to `dist`.
- **GitHub Pages**: Deploy the compiled `dist/` output.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📬 Contact & Connect

- **Website**: [orchidlabs.com](#)
- **Email**: [hello@orchidlabs.com](mailto:hello@orchidlabs.com)
- **GitHub**: [@yabumac](https://github.com/yabumac)
- **Studio Location**: San Francisco, CA // Global Collective
