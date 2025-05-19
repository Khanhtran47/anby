<!-- PROJECT LOGO -->
<br />
<div align="center">
<a href="https://github.com/Khanhtran47/anby">
  <img src="public/assets/images/logo.webp" alt="Logo" width="80" height="80">
</a>

<h1 align="center">
  <a href="https://anby.trandk.live">
    Anby
  </a>
</h1>
  <p align="center">
    A Zenless Zone Zero (ZZZ) companion app that provides a comprehensive database of agents, w-engines and more.
    <br />
  </p>
</div>

> **Warning** This app is a work in progress.

## Project Structure

```plaintext
.
├── app/           # Application routes and pages
├── components/    # Reusable UI components
├── context/       # React context providers
├── public/        # Static assets
├── resources/     # Additional resources (e.g., svg icons)
├── services/      # API and business logic
├── styles/        # Global and component styles
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── .github/       # GitHub workflows and configs
├── .storybook/    # Storybook configuration
├── .vscode/       # VSCode settings
├── ...            # Configuration and build files
```

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Built with [Next.js](https://nextjs.org/)
- TypeScript support
- [ShadcnUI](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [Knip](https://knip.dev) for code quality
- [Storybook](https://storybook.js.org/) for UI development
- [Vitest](https://vitest.dev/) for testing

## Scripts

- `dev` – Start the development server
- `build` – Build the application for production
- `build:icons` – Build svg sprite icons
- `start` – Start the production server
- `storybook` – Run Storybook dev
- `build-storybook` – Build Storybook static files
- `lint` – Run ESLint
- `prettier` – Run Prettier
- `typecheck` – Run TypeScript type checking
- `unused` – Check for unused files with Knip
- `clean` – Clean the `.next`, `storybook-static`, and `icons` directories

## Environment Variables

Create a `.env.local` file for local environment variables.

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKhanhtran47%2Fanby&env=NEXT_PUBLIC_CORS_PROXY%2CNEXT_PUBLIC_OPTIMIZE_IMAGES_ENDPOINT%2CLRU_CACHE%2CHAKUSHIN_API_URL)
