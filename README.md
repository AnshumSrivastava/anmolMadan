# Anmol Portfolio CMS

A modern, responsive portfolio website and CMS built with Next.js, React, TypeScript, Tailwind CSS and Supabase.

---

# 🛠️ Tech Stack

* Next.js `16.2.10`
* React `19.2.4`
* TypeScript `5`
* Tailwind CSS `4`
* Supabase
* GSAP
* Framer Motion
* Lenis
* React Hook Form
* Zod
* React Dropzone
* Lucide React
* Sonner

---

# 📦 Installation

## 1. Prerequisites

Install the following before starting:

* Node.js
* npm
* Git
* Supabase account/project

Check your installations:

```bash
node -v
npm -v
git --version
```

---

# 2. Clone the Repository

```bash
git clone https://github.com/DevashishThapa1401/anmol-portfolio.git
```

Enter the project:

```bash
cd anmol-portfolio/portfolio-cms
```

---

# 3. Install Dependencies

The project already contains all required dependencies in `package.json`.

You **do not need to install every package manually**.

Run:

```bash
npm install
```

This automatically installs all production and development dependencies listed in `package.json`.

---

# 📚 Production Dependencies

These are the packages used by the application itself.

## Next.js

```bash
npm install next@16.2.10
```

## React

```bash
npm install react@19.2.4 react-dom@19.2.4
```

## Supabase

```bash
npm install @supabase/ssr@0.12.0 @supabase/supabase-js@2.109.0
```

## GSAP

```bash
npm install gsap@3.15.0 @gsap/react@2.1.2
```

## Framer Motion

```bash
npm install framer-motion@12.42.2
```

## Lenis

```bash
npm install lenis@1.3.25
```

## Lucide React

```bash
npm install lucide-react@1.24.0
```

## React Hook Form

```bash
npm install react-hook-form@7.81.0
```

## React Hook Form Resolvers

```bash
npm install @hookform/resolvers@5.4.0
```

## Zod

```bash
npm install zod@4.4.3
```

## React Dropzone

```bash
npm install react-dropzone@15.0.0
```

## Next Themes

```bash
npm install next-themes@0.4.6
```

## Sonner

```bash
npm install sonner@2.0.7
```

## Tailwind Utilities

```bash
npm install tailwind-merge@3.6.0 clsx@2.1.1 class-variance-authority@0.7.1
```

---

# 🧰 Development Dependencies

These packages are used during development and building.

## TypeScript

```bash
npm install -D typescript@5
```

## Type Definitions

```bash
npm install -D @types/node@20 @types/react@19 @types/react-dom@19
```

## Tailwind CSS

```bash
npm install -D tailwindcss@4 @tailwindcss/postcss@4
```

## ESLint

```bash
npm install -D eslint@9 eslint-config-next@16.2.10
```

## React Compiler

```bash
npm install -D babel-plugin-react-compiler@1.0.0
```

---

# ⚡ Install Everything Manually

If you want to recreate the project from scratch without relying on the existing `package.json`, run:

```bash
npm install next@16.2.10 react@19.2.4 react-dom@19.2.4 @gsap/react@2.1.2 @hookform/resolvers@5.4.0 @supabase/ssr@0.12.0 @supabase/supabase-js@2.109.0 class-variance-authority@0.7.1 clsx@2.1.1 framer-motion@12.42.2 gsap@3.15.0 lenis@1.3.25 lucide-react@1.24.0 next-themes@0.4.6 react-dropzone@15.0.0 react-hook-form@7.81.0 sonner@2.0.7 tailwind-merge@3.6.0 zod@4.4.3
```

Then install development dependencies:

```bash
npm install -D @tailwindcss/postcss@4 @types/node@20 @types/react@19 @types/react-dom@19 babel-plugin-react-compiler@1.0.0 eslint@9 eslint-config-next@16.2.10 tailwindcss@4 typescript@5
```

> **Recommended:** Use `npm install` instead. The existing `package.json` already contains everything required.

---

# 🔐 Environment Variables

Create a file called:

```text
.env.local
```

in the project root.

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### ⚠️ Important

Never commit `.env.local` to GitHub.

Make sure `.gitignore` contains:

```gitignore
node_modules
.next
.env
.env.local
.env.*.local
```

---

# 🗄️ Supabase Setup

This project uses Supabase for:

* Database
* Authentication
* Storage
* Dynamic portfolio content
* Image uploads

Create a Supabase project and add its credentials to `.env.local`.

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

# ▶️ Run the Project

After installing everything:

```bash
npm run dev
```

The development server will start at:

```text
http://localhost:3000
```

---

# 📜 Available Scripts

## Development

```bash
npm run dev
```

Starts the Next.js development server.

## Production Build

```bash
npm run build
```

Creates an optimized production build.

## Production Server

```bash
npm run start
```

Starts the production server.

## Lint

```bash
npm run lint
```

Runs ESLint.

---

# 🚀 Quick Start

For someone setting up the project for the first time:

```bash
git clone https://github.com/DevashishThapa1401/anmol-portfolio.git

cd anmol-portfolio/portfolio-cms

npm install

npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# 📁 Project Structure

```text
portfolio-cms/
│
├── public/
│
├── src/
│   ├── app/
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── sections/
│   │   └── shared/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │   └── supabase/
│   │
│   ├── services/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   └── styles/
│
├── public/
│
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

# 🎨 Design System

The portfolio follows a minimal premium visual style.

### Colors

```text
Primary Background: #FAFAFA
Primary Text:       #000000
Secondary Text:     #52525B
Muted Text:         #A1A1AA
Borders:            rgba(0, 0, 0, 0.10)
```

### Design Principles

* Minimal UI
* Off-white backgrounds
* Black typography
* Neutral gray secondary text
* Thin borders
* Subtle rounded cards
* Smooth animations
* Responsive layouts
* Clean editorial typography

---

# 🧩 Main Features

## Hero

Dynamic hero content and image management.

## About

Dynamic personal information, credentials and audience information.

## Services

Manage services and service descriptions dynamically.

## Projects

Projects can be organized by categories such as:

* Web App
* Website
* SaaS
* AI
* Open Source
* Other

## Testimonials

Dynamic client testimonials with:

* Client name
* Designation
* Company
* Photo
* Testimonial message

## Companies

Experience and company history with:

* Company
* Role
* Start date
* End date
* Description
* Website

## Timeline

Dynamic professional journey/timeline.

## Gallery

Dynamic image gallery with horizontal animations.

## Contact

Contact information and contact form.

---

# 🖼️ Image Uploads

Images are managed using Supabase Storage.

The CMS supports:

* Image uploads
* Image previews
* Drag and drop
* Dynamic image URLs
* Supabase Storage integration

---

# 🔒 Security

Do not commit sensitive information such as:

```text
.env.local
API keys
Supabase service-role keys
Passwords
Private credentials
```

Only public Supabase credentials intended for browser use should be exposed through `NEXT_PUBLIC_*` variables.

---

# 🏗️ Production Build

Before deployment, test the production build:

```bash
npm run build
```

If the build succeeds:

```bash
npm run start
```

---

# 👨‍💻 Author

**Devashish Thapa**

Portfolio CMS built with:

```text
Next.js
React
TypeScript
Tailwind CSS
Supabase
GSAP
Framer Motion
Lenis
```

---

# 📄 License

This project is private and intended for portfolio use.

