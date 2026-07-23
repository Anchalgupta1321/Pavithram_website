# Pavithram Foods Website

Welcome to the official frontend repository for [Pavithram Foods](https://www.pavithramfoods.com/). This is a modern, high-performance e-commerce and brand showcase application built with Next.js and React.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Static Export)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** Custom CSS, Framer Motion (for smooth animations)
- **Data Source:** WordPress Headless CMS / Static JSON Fallbacks
- **Deployment:** Cloudflare Pages

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Building for Production

To create an optimized production build (static export):

```bash
npm run build
```

The statically exported HTML/CSS/JS files will be generated in the `out/` directory.

## 📁 Project Structure

- `src/app/` - Next.js App Router pages, global styles, and layouts.
- `src/components/` - Reusable React components (e.g., Navbar, Footer).
- `src/services/` - API integration logic (WordPress fetchers, CF7 form submissions).
- `src/data/` - Static fallback data to ensure the site builds even if the CMS is unreachable.
- `public/` - Static assets (images, videos, and Cloudflare `_redirects`).

## 🔗 Live Site
[https://www.pavithramfoods.com](https://www.pavithramfoods.com)
