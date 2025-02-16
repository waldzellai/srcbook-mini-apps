# Srcbook Mini-Apps

This repository is a monorepo containing micro-web utilities built with [Srcbook](https://srcbook.com), an AI-powered development environment. These mini-apps showcase various practical web utilities and tools created using Srcbook's capabilities.

## Structure

```
srcbook-mini-apps/
├── packages/                      # All mini-apps are stored here
│   └── deep-work-tracker-next/   # Deep work session tracking app (Next.js)
└── package.json                  # Root monorepo configuration
```

## Projects

### Deep Work Timer
A web application for tracking deep work sessions and productivity metrics. Built with:
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Client-side state management
- Local storage persistence

## Development

This monorepo uses Turborepo for build system orchestration. To get started:

```bash
# Install dependencies
npm install

# Run all apps in development mode
npm run dev

# Build all apps
npm run build
```

## Deployment

Each package in this monorepo should be deployed independently:

1. Deep Work Timer (packages/deep-work-tracker-next):
   ```bash
   cd packages/deep-work-tracker-next
   ```
   Then create a new Vercel project pointing to this directory:
   - Framework: Next.js
   - Root Directory: . (current directory)
   - Build Command: next build
   - Install Command: npm install
   - Output Directory: .next

This independent deployment strategy allows each app to:
- Have its own configuration
- Deploy independently of other apps
- Scale according to its own needs
- Maintain separate development cycles

## About Srcbook

Srcbook is an innovative development environment that leverages AI to enhance the software development process. Learn more:

- [Srcbook Website](https://srcbook.com)
- [Srcbook GitHub Repository](https://github.com/srcbookdev/srcbook)
