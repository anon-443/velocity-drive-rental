# Velocity Drive — Final Handoff Guide

## 1. Fix `pnpm is not recognized` on Windows

Your command prompt cannot find pnpm because it is not installed, or Windows has not refreshed its command-path settings after installation.

First, open **Command Prompt** and check whether Node.js and npm are installed:

```bat
node -v
npm -v
```

If both commands show version numbers, install pnpm globally:

```bat
npm install -g pnpm
pnpm --version
```

Then close Command Prompt completely, open a **new** Command Prompt, return to the project folder, and run:

```bat
cd /d "D:\Internship\Sqrock\Phase 1\velocity-drive-rental-final"
pnpm install
pnpm dev
```

If `node` or `npm` is also not recognized, install the current Node.js LTS release first, then reopen Command Prompt and run the commands above. As an alternative, Windows users with Winget can run:

```bat
winget install -e --id pnpm.pnpm
```

The official pnpm installation instructions are available at [pnpm Installation](https://pnpm.io/installation).

## 2. Use the reusable skill in future projects

The reusable skill is named **Internship Car-Rental Delivery**. Add the attached `.skill` package to your skills library. For a future project, describe your task naturally, for example:

> Build a responsive car-rental management system for my internship. Use the Internship Car-Rental Delivery skill. Include a homepage, vehicle listings, search and filters, booking validation, mobile layouts, GitHub Pages deployment, and a safe project backup.

The skill will guide the work through the following stages:

| Stage | What it covers |
| --- | --- |
| Requirements | Turn the internship rubric into code-verifiable features |
| Build | Fleet data, responsive booking controls, listings, filters, and validated requests |
| Polish | Screenshot-led UI fixes, typography, spacing, contrast, and reduced-motion-safe animation |
| Validation | Type checks, tests, production build, desktop and mobile inspection |
| Handoff | GitHub README, public-repository safety, GitHub Pages, custom domain, and source ZIP backup |

## 3. UI/UX changes and bug fixes completed

| Area | Final improvements |
| --- | --- |
| Visual direction | Original warm ivory, sand, taupe, espresso, and amber editorial vehicle-rental aesthetic |
| Homepage | Improved hero positioning, clearer booking controls, responsive spacing, and readable icons |
| Fleet | Twelve-vehicle inventory, realistic demo rates, filters, sorting, date-aware demo availability, compact pill filters, and four-column desktop card alignment |
| Cards | Consistent image sizing, daily-price formatting with `/day`, technical rails, hover feedback, favorites, compare actions, and detail links |
| Booking | Native-friendly date controls, form validation, animated request steps, confirmation state, and honest demo wording |
| Detail pages | Vehicle journals with galleries, specifications, sharing, similar vehicles, favorites, and comparison support |
| Contact | Compact inquiry form, accessible FAQ, left-aligned contact introduction, and removal of the oversized contact card |
| Quality | Dark mode, reduced-motion support, responsive layout checks, accessible focus behavior, test coverage, and static crawler-readable vehicle pages |
| Public delivery | GitHub README, public repository description, GitHub Pages deployment, custom domain, security audit, and project archive |

## 4. Secure local configuration

The project does **not** include real API keys, database passwords, session secrets, or production credentials. Keep any future secrets in a private `.env` file on your own computer only.

Use `LOCAL_ENV_TEMPLATE.txt` as a safe placeholder reference. Copy the values you need into a private `.env` file beside `package.json`; never commit, upload, email, or screenshot that `.env` file. The `.gitignore` file is configured to exclude `.env` and related credential formats.

For the current static GitHub Pages demo, you normally only need:

```env
VITE_STATIC_DEMO=true
PUBLIC_SITE_URL=https://velodrive-rentals.me
```

Leave the optional server, database, OAuth, and secret fields blank unless you intentionally add those services on your own private deployment.

## 5. Final project links

| Resource | Link |
| --- | --- |
| Live project | [https://velodrive-rentals.me](https://velodrive-rentals.me) |
| GitHub repository | [https://github.com/anon-443/velocity-drive-rental](https://github.com/anon-443/velocity-drive-rental) |
| GitHub Pages URL | [https://anon-443.github.io/velocity-drive-rental/](https://anon-443.github.io/velocity-drive-rental/) |

The GitHub Pages URL redirects to the custom domain because the repository is configured to use `velodrive-rentals.me` as its Pages domain.

## Reference

[1] [pnpm Installation](https://pnpm.io/installation)
