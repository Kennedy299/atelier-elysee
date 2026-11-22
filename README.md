# ATELIER ÉLYSÉE — Architecture & Haute Interior Design

An internationally recognized luxury interior architecture and design studio web application built from the ground up with a bespoke design system, editorial aesthetics, and full-stack functionality.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-Proprietary-gold.svg)]()

---

## 1. Brand Identity & Design Direction

**Atelier Élysée** represents Parisian architectural poise, material honesty, and quiet luxury. 

### Visual Identity Tokens
- **Warm Ivory Background:** `#F7F5F0`
- **Soft Beige Secondary:** `#E9E3D9`
- **Deep Charcoal Primary Typography:** `#242321`
- **Muted Taupe Secondary Typography:** `#827B72`
- **Earthy Ochre Brown Accent:** `#A58A70`
- **Pure White Cards:** `#FFFFFF`

### Editorial Typography
- **Headings & Display:** *Cormorant Garamond* & *Playfair Display* (Editorial Serif)
- **Body & Technical Navigation:** *Inter* & *Manrope* (Clean geometric sans-serif)

---

## 2. Architecture & Pages

### Public Website
1. **Home Experience (`/`):**
   - Full-bleed immersive hero: *"Spaces That Tell Your Story"* with dual CTAs.
   - Studio introduction: *"Designing Spaces. Creating Experiences."*
   - Asymmetrical editorial grid of featured works.
   - Six structured discipline overviews with custom iconography.
   - Design manifesto: *"Less, But Better"* with large materiality photograph.
   - The Four-Stage Design Journey (Discovery, Concept, Development, Implementation).
   - Client commendation testimonials with realistic patron feedback.
   - Final editorial call to action.
2. **About the Studio (`/about`):**
   - Studio provenance, founding philosophy, and mission/vision statements.
   - Four core values: *Material Honesty, Volumetric Harmony, Timeless Restraint, Artisanal Provenance*.
   - Creative Directorship profiles (Éléonore de Vauquelin, Julian Vance, Camille Laurent, Marc Solis) with credentials and portraits.
   - International press mentions (*Architectural Digest, Elle Décoration, Wallpaper**).
3. **Services & Disciplines (`/services`):**
   - In-depth architectural dossiers for:
     1. Residential Interior Design
     2. Commercial Interior Design
     3. Space Planning & Architecture
     4. Furniture & Curated Styling
     5. Historic & Contemporary Renovation
     6. Advisory & Design Consultation
   - Deliverables checklist, suitability criteria, and dedicated commission triggers.
4. **Portfolio of Selected Works (`/projects` & `/projects/:slug`):**
   - Category filtering (*All, Residential, Commercial, Hospitality, Renovation*).
   - Rich project detail pages with concept narrative, materials palette, client brief, challenge/solution execution, and client quotes.
   - Interactive **Before & After Transformation Slider** allowing horizontal reveal comparison between historical state and completed handover.
   - Full-screen keyboard-navigable image **Lightbox** viewer with zoom.
5. **Editorial Journal (`/journal` & `/journal/:slug`):**
   - Monograph articles on travertine sourcing, volumetric lighting, and Haussmannian dialogue.
   - Live keyword search bar and category filtering.
   - Rich manuscript view with author cards, pull quotes, and keyword tagging.
6. **Contact Directorship (`/contact`):**
   - Validated inquiry form capturing budget tier, service type, location, and project vision.
   - Direct studio contact details for Paris (Place Vendôme) and New York (Tribeca).
   - Interactive Frequently Asked Questions accordion.
7. **Consultation Booking System (`/consultation`):**
   - Multi-step interactive scheduling interface.
   - Selection of consultation formats (*In-Studio Discovery, Virtual Advisory, On-Site Audit, Commercial Spatial Strategy*).
   - Interactive date picker and time slot selection.
   - Instant confirmation receipt with reference code (e.g., `ELY-2025-XXXX`).

---

## 3. Administrator Dashboard (`/admin`)

A secure executive console providing complete operational control over studio inquiries and content:
- **Authentication:** Protected routing via session tokens (`/admin/login`). Demo shortcut button included for testing.
- **Executive Metrics:** Real-time metrics tracking active projects, total inquiries, pending consultations, published articles, and conversion rates.
- **Client Inquiries Manager (`/admin/enquiries`):** Filter by status (*new, contacted, archived*), review project messages, update workflow states, append internal director notes, or delete records.
- **Consultation Scheduler (`/admin/consultations`):** Manage reserved appointments, approve/reschedule/complete sessions, and access client contact information.
- **Projects CRUD (`/admin/projects`):** Create, update, or delete architectural projects. Upload cover photos, set materials, toggle homepage featured status, and configure before/after comparison imagery.
- **Journal Manager (`/admin/journal`):** Compose and publish articles, edit manuscripts, toggle draft/published status, and manage tags.
- **Testimonials Manager (`/admin/testimonials`):** Manage client reviews and ratings.

---

## 4. Technology Stack & Database

- **Frontend:** React 18, Vite 6, TypeScript, Tailwind CSS, Lucide React, Framer Motion.
- **Backend:** Node.js, Express 4, Multer (image uploads), CORS.
- **Data Layer:** 
  - File-backed persistent database (`server/data/db.json`) pre-seeded with luxury content for immediate zero-config execution.
  - Full PostgreSQL / Supabase migration schema provided in `server/schema.sql` (defining tables for `administrators`, `projects`, `project_materials`, `project_images`, `services`, `journal_articles`, `testimonials`, `contact_enquiries`, `consultation_bookings`, and `newsletter_subscribers`).

---

## 5. Getting Started & Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone or navigate to the project directory
cd "C:\Users\Eddy\.gemini\antigravity\scratch\atelier-elysee"

# Install dependencies (already completed in scratch)
npm install
```

### Running the Application

#### Option A: Unified Full-Stack Production Mode
Build the client and start the production Express server serving both the API and frontend on port 5000:
```bash
npm run build
npm run server
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

#### Option B: Development Mode with Hot Reload
In terminal 1 (start API server on port 5000):
```bash
npm run server
```
In terminal 2 (start Vite dev server on port 5173 with proxy):
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 6. Administrative Credentials (Demo)

- **Login URL:** [http://localhost:5000/admin/login](http://localhost:5000/admin/login)
- **Username:** `elysee_admin`
- **Password:** `atelier2025!`
*(Alternatively, click the "Fill Demo Credentials" button on the login screen)*

---

## 7. Deployment Instructions

### Vercel / Netlify (Frontend)
1. Set build command: `npm run build`
2. Set output directory: `dist`
3. Configure API rewrite in `vercel.json` or `_redirects` to point `/api/*` to your backend instance or serverless functions.

### Docker / Cloud Run (Full-Stack Container)
Create a `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "server"]
```
Deploy to Google Cloud Run, Render, Railway, or AWS ECS with port `5000`.

---
© 2025 ATELIER ÉLYSÉE. All rights reserved.
