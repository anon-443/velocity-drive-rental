# Velocity Drive — Car Rental Management System

**Velocity Drive** is a responsive car-rental management system created as an internship project. It uses an original warm editorial interface to help visitors discover vehicles, compare rental details, and submit a validated browser-local booking request.

| Live project | Source code | Project type |
| --- | --- | --- |
| [velodrive-rentals.me](https://velodrive-rentals.me) | [GitHub repository](https://github.com/anon-443/velocity-drive-rental) | React internship project |

> This is an educational static demonstration. Availability, estimates, favourites, and booking requests are presented honestly as browser-local demo behaviour, not live commercial reservations.

## Internship requirement coverage

| Requirement | Implementation in Velocity Drive |
| --- | --- |
| **Attractive homepage** | A responsive hero, company introduction, featured vehicle storytelling, clear calls to action, and a professional visual system |
| **Car listing section** | **13** typed demo vehicles with model-specific images, daily price, fuel, seating, class, and availability state |
| **Search and filters** | Name/model search, vehicle category, fuel, daily-rate, passenger-capacity, date availability, and sort controls |
| **Booking form** | A three-step request flow for contact details, dates, vehicle selection, validation, estimate review, and request reference |
| **Responsive design** | Mobile-first stacking for navigation, booking controls, filters, fleet cards, forms, and vehicle-detail pages; tablet and desktop grids scale progressively |
| **Navigation and footer** | Sticky responsive navigation, smooth section/page navigation, footer contact and social links, and an accessible mobile menu |

## Key features

| Area | Included features |
| --- | --- |
| **Homepage and fleet** | Editorial hero, branch and date controls, featured vehicles, a 13-car fleet, filters, sorting, search, and availability feedback |
| **Vehicle details** | Dedicated model routes, complete vehicle imagery, description, pricing, technical details, planning dates, similar vehicles, sharing, and favourites |
| **Booking experience** | Compact multi-step form, field validation, vehicle selection, date rules, transparent demo estimate, and browser-local request reference |
| **Responsive user experience** | Compact mobile navigation, stacked controls, touch-friendly filters, fluid typography, reduced-motion support, and dark mode |
| **Additional portfolio features** | Local browser persistence, vehicle comparison, contact inquiry form, FAQ, Booking Terms page, static social metadata, and a clearly labelled front-end admin demo |

## Mobile and responsive design

The interface is designed from small screens upward. On phones, navigation changes to a menu, booking controls and forms stack vertically, filter choices wrap instead of overflowing, and vehicle grids become single-column cards. Tablet and desktop breakpoints progressively introduce multi-column layouts without hiding required booking, search, or vehicle information.

## Technology

The project is built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**. It uses **Wouter** for routes, **React Hook Form** for form validation, **date-fns** for date logic, browser `localStorage` for clearly labelled demo persistence, and **Vitest** for automated checks.

## Run locally

Install a current Node.js version and pnpm, then run the following commands from the project directory.

```bash
pnpm install
pnpm dev
```

Run the checks used for the project:

```bash
pnpm check
pnpm test
pnpm build:pages
```

The `build:pages` command generates the static GitHub Pages output, including crawler-readable vehicle pages.

## Project structure

```text
client/src/     React pages, components, typed fleet data, styles, and interactions
server/         Automated Vitest coverage and application support code
scripts/        Static-site and vehicle social-page generation scripts
validation/     Local validation notes
```

## Submission notes

For the internship submission, include the source-code folder, screenshots of the live desktop and mobile layouts, this README, the GitHub repository link, and the hosted demo link. The project deliberately avoids claiming live payment, real-time inventory, or verified customer reviews because no production service is connected.
