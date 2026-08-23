# Velocity Drive — Car Rental Management System

Velocity Drive is an internship-ready, responsive car-rental management system built with React, TypeScript, Tailwind CSS, and a small authenticated backend. It pairs an editorial automotive interface with fleet discovery, booking-request validation, dedicated vehicle pages, Favorites, comparison, and crawler-readable social metadata.

## Included functionality

| Area | Included implementation |
| --- | --- |
| Fleet discovery | Search, vehicle class, daily rate, passenger capacity, and date-aware availability filters. |
| Booking experience | Native date controls, collection branches, a validated multi-step booking request, dynamic cost estimates, and browser booking history. |
| Vehicle research | Individual vehicle pages, galleries, specifications, sharing, and two-to-three vehicle comparison including insurance and GPS add-ons. |
| Accounts and Favorites | OAuth sign-in, a protected Favorites API, and database-backed Favorites that follow the same account across devices. |
| Sharing and SEO | Build-time static vehicle pages with canonical, Open Graph, and Twitter metadata using `https://velodrive-rentals.me`. |
| Legal navigation | Dedicated Booking Terms and Conditions page linked from the site footer. |

## Technology stack

React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, Wouter, Express, tRPC, Drizzle ORM, MySQL-compatible database storage, and OAuth authentication are used in the project.

## Local development

Install Node.js 20 or later and pnpm. Run the following commands from the project directory:

```bash
pnpm install
pnpm dev
```

The application uses built-in OAuth and database configuration in its managed deployment environment. For a self-hosted deployment, provide compatible database and OAuth environment variables before running the application.

## Production build

Run the following command to build the web application, generate the crawler-readable vehicle pages, and bundle the server:

```bash
pnpm build
```

The build reads `PUBLIC_SITE_URL`. It is configured as `https://velodrive-rentals.me`, ensuring vehicle canonical, Open Graph, and Twitter URLs use the final custom domain.

## GitHub and deployment

The supplied source archive is intended for a GitHub repository and contains the application source, database schema, tests, and documentation. It excludes dependency folders, generated output, logs, and private environment files.

For the simplest no-cost path, keep the authenticated app on the managed project hosting and connect `velodrive-rentals.me` from the project **Settings → Domains** panel. Add the exact DNS records that the panel displays at your domain registrar, then wait for verification and SSL issuance. Uploading the source to GitHub is still useful for your internship submission and portfolio.

> **Booking Terms notice:** The Booking Terms page is a project draft and should be reviewed by a qualified lawyer before it is relied on as production legal terms.
