# Velocity Drive

**Velocity Drive** is a responsive car-rental management system created as an internship project. It presents an original warm editorial interface for discovering vehicles and submitting booking requests.

**Live demo:** [velodrive-rentals.me](https://velodrive-rentals.me)  
**Repository:** [anon-443/velocity-drive-rental](https://github.com/anon-443/velocity-drive-rental)

> This is an educational static demo. Booking requests, availability, and user actions are clearly presented as browser-local demo behaviour rather than live commercial reservations.

## Highlights

| Area | Included features |
| --- | --- |
| **Homepage** | Editorial hero, collection-branch search controls, featured vehicle content, and clear call-to-action buttons |
| **Fleet discovery** | Twelve vehicles with images, daily pricing, fuel type, seating capacity, category, filters, search, and sorting |
| **Booking flow** | Date selection, contact validation, vehicle selection, estimate-oriented booking request steps, and a confirmation state |
| **Vehicle research** | Individual vehicle pages, galleries, detailed specifications, similar vehicles, sharing, favorites, and comparison |
| **Responsive design** | Purposeful layouts for mobile, tablet, laptop, and wide desktop screens |
| **Portfolio extras** | Dark mode, local browser persistence, reduced-motion-safe animation, demo admin controls, FAQ, contact form, legal page, and crawler-readable vehicle pages |

## Technology

The interface is built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Supporting libraries include **Wouter** for routes, **React Hook Form** for forms, **date-fns** for date utilities, and **Vitest** for tests.

## Run locally

Install Node.js and pnpm, then run the following commands from the project directory:

```bash
pnpm install
pnpm dev
```

Run the quality checks with:

```bash
pnpm check
pnpm test
```

To create the static GitHub Pages output, including crawler-readable vehicle pages, run:

```bash
pnpm build:pages
```

## Project structure

```text
client/src/           React pages, components, data, styles, and interactions
server/               Tests and application support code
scripts/              Static-page and vehicle-page generation scripts
validation/           Local validation notes
```

## Internship submission

The project includes source code, a hosted live link, responsive layouts, vehicle listings, search and filtering, booking-form validation, navigation, a footer, and optional enhancement features. Add screenshots from the live demo and this README to the final internship submission.

## Notes

This project is built for learning and portfolio demonstration. A production rental service would require real-time inventory, payment integration, secure user management, and business-approved legal and privacy content.
