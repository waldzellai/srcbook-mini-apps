# Srcbook Mini-Apps

This repository is a monorepo containing micro-web utilities built with [Srcbook](https://srcbook.com), an AI-powered development environment. These mini-apps showcase various practical web utilities and tools created using Srcbook's capabilities.

## Structure

```
srcbook-mini-apps/
├── packages/           # All mini-apps are stored here
│   └── deep-work-tracker/  # Deep work session tracking app
└── package.json       # Root monorepo configuration
```

Each package in the `packages` directory is deployable to Vercel and contains its own:
- Source code
- Dependencies
- Build configuration
- Deployment settings

## Projects

- **Deep Work Tracker**: A web application for tracking deep work sessions and productivity metrics

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

Each package can be deployed independently to Vercel. When setting up a new deployment:
1. Select the specific package directory as the project root
2. Vercel will automatically detect the framework and configure build settings

## About Srcbook

Srcbook is an innovative development environment that leverages AI to enhance the software development process. Learn more:

- [Srcbook Website](https://srcbook.com)
- [Srcbook GitHub Repository](https://github.com/srcbookdev/srcbook)

## Repository Structure

This monorepo is organized with each mini-app in its own directory, containing its complete source code and dependencies. This structure allows for independent development while maintaining a centralized repository for all Srcbook-generated utilities.
