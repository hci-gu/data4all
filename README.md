# Data4All – Kungsbacka Data Portal

Data4All is a Next.js 14 application that showcases datasets and user activity for the Kungsbacka municipality open-data portal. PocketBase serves as the headless backend for authentication, authorization, and content management, while the interface is built with React, TypeScript, and Tailwind CSS. The application provides search, detailed dataset views, activity feeds, and profile pages where users can manage their information and datasets.

## Table of contents
- [Architecture and tech stack](#architecture-and-tech-stack)
- [Key features](#key-features)
- [Code structure](#code-structure)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install dependencies](#install-dependencies)
  - [Configure environment variables](#configure-environment-variables)
  - [Run PocketBase locally](#run-pocketbase-locally)
  - [Seed the database](#seed-the-database)
  - [Start the web client](#start-the-web-client)
- [Testing and quality assurance](#testing-and-quality-assurance)
- [Deployments and infrastructure](#deployments-and-infrastructure)
- [Troubleshooting](#troubleshooting)
- [Additional resources](#additional-resources)

## Architecture and tech stack

| Component | Technology | Details |
| --- | --- | --- |
| Frontend | [Next.js 14](https://nextjs.org/) / React 18 | Uses the App Router with server actions and authentication middleware. |
| UI | Tailwind CSS, Radix UI, shadcn/ui | Design system for forms, navigation, and reusable components. |
| Backend | [PocketBase](https://pocketbase.io/) | Manages users, roles, datasets, tags, and activity logs. |
| Typing/validation | TypeScript, Zod | Shared schemas between client and server. |
| Testing | Playwright | End-to-end tests covering login, search, and dataset flows. |

## Key features

- **Authentication and authorization** – Login, registration, profile updates, and account deletion go through PocketBase and are exposed via server actions. Middleware ensures only authenticated users can access protected routes.
- **Search and filtering** – An autosuggest search field looks up both datasets and users, updating URL parameters so results can be shared.
- **Dataset pages** – Detailed views show metadata, tags, related datasets, and activity feeds. Authorized users can edit outbound links.
- **Profile pages** – Users can update their profile, switch roles, sign out or delete their account, and review the datasets they own.
- **Activity feed** – Aggregates events tied to datasets and users to provide an overview of recent changes.

## Code structure

```text
src/
├─ app/                    # App Router routes grouped by authentication state
│  ├─ (not sign in)/       # Public routes (sign in, create account, panic)
│  ├─ (sign in)/           # Authenticated routes (home, datasets, profiles)
│  ├─ actions/             # Server actions for PocketBase operations
│  └─ globals.css          # Global styles
├─ components/             # Reusable UI and domain components
├─ lib/                    # Utilities such as env handling and slugification
├─ middleware.ts           # Next.js middleware for access control
├─ types/                  # Zod schemas and shared types
seed/                      # Scripts and data for seeding PocketBase
pocketbase/                # Dockerfile and migrations for PocketBase
deploy/                    # Kubernetes manifests for deployment
```

## Getting started

### Prerequisites
- Node.js 18 or later
- [pnpm](https://pnpm.io/) 8+
- Docker (to run PocketBase locally via container)

### Install dependencies
```bash
pnpm install
```

### Configure environment variables
Create a `.env.local` in the project root:

```bash
echo "NEXT_PUBLIC_POCKETBASE=http://localhost:8090" > .env.local
```

`NEXT_PUBLIC_POCKETBASE` should point to your PocketBase instance and is used by both server actions and the client.

### Run PocketBase locally
The easiest way to run PocketBase locally is via the included Dockerfile.

```bash
# build the container
docker build -t data4all-pocketbase ./pocketbase

# start PocketBase on http://localhost:8090
# (the 8090->8080 mapping matches the seed script default)
docker run --rm -p 8090:8080 data4all-pocketbase
```

When PocketBase starts for the first time it does not create an admin user automatically. Visit `http://localhost:8090/_/` to create one. The seed script expects `admin@email.com` / `password123` by default; update `seed/seed.ts` if you prefer different credentials.

### Seed the database
With PocketBase running, populate it with demo data:

```bash
pnpm seed
```

The script reads `seed/seedData.json`, creates tags, roles, users, datasets, and events, and clears existing test data before import.

### Start the web client
Start the Next.js development server:

```bash
pnpm dev
```

Then visit [http://localhost:3000](http://localhost:3000). Middleware redirects unauthenticated visitors to `/sign-in`; use one of the seeded accounts to log in.

## Testing and quality assurance

- **End-to-end**: `pnpm test` runs the Playwright specs in `tests/`, provided both the web app (`pnpm dev`) and PocketBase are running.
- **Linting**: `pnpm lint`
- **Formatting**: `pnpm format`

For interactive debugging, run `pnpm test:ui` to open the Playwright test runner.

## Deployments and infrastructure

The `deploy/` directory contains Kubernetes manifests for PocketBase (`api.yaml`) and the web client (`web.yaml`). These examples illustrate how to deploy the production services with persistent storage for PocketBase data and environment variables that point the frontend to the backend.

## Troubleshooting

| Problem | Solution |
| --- | --- |
| **"401 Unauthorized" on API calls** | Verify the `pb_auth` cookie exists and that the PocketBase token is valid. Expired tokens automatically redirect to `/panic`. |
| **Seed script fails** | Ensure PocketBase runs at `http://localhost:8090` and that the admin credentials in `seed/seed.ts` are correct. |
| **Playwright tests cannot find elements** | Make sure you have seeded data and that both the app and PocketBase are running before starting the tests. |

## Additional resources

- [Next.js documentation](https://nextjs.org/docs)
- [PocketBase documentation](https://pocketbase.io/docs/)
- [Playwright documentation](https://playwright.dev/docs/intro)
