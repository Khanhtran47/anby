<!-- PROJECT LOGO -->
<a href="https://github.com/Khanhtran47/anby">
  <img src="public/assets/images/logo.webp" alt="Logo" width="80" height="80" align="right">
</a>

# [Anby](https://anby.trandk.live)

A Zenless Zone Zero (ZZZ) companion app that provides a comprehensive database of agents, w-engines and more.

> **Warning** This app is a work in progress.

## Features

- Built with [Next.js](https://nextjs.org/)
- TypeScript support
- [ShadcnUI](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [Knip](https://knip.dev) for code quality and [Lefthook](https://lefthook.js.org/) for Git hooks
- [Storybook](https://storybook.js.org/) for UI development, checkout the [Storybook](https://khanhtran47.github.io/anby/) demo
- [Vitest](https://vitest.dev/) for testing
- Built-in Image Optimization Component powered by [wsrv.nl](https://wsrv.nl/)
- Optimize SVG icons with SVG sprite generation

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

Follow these instructions to set up the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (v8 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Khanhtran47/anby.git
cd anby
```

2. Install dependencies using pnpm:

```bash
pnpm install
```

### Development

To start the development server, run:

```bash
pnpm dev
```

This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Scripts

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

### Environment Variables

Create a `.env.local` file for local environment variables. See the `.example.env` file for required variables.

### Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKhanhtran47%2Fanby&env=NEXT_PUBLIC_CORS_PROXY%2CNEXT_PUBLIC_OPTIMIZE_IMAGES_ENDPOINT%2CHAKUSHIN_API_URL)
