# Velocity Drive — Car Rental Management System

Velocity Drive is a responsive React and Tailwind CSS car-rental frontend created as an internship project. It presents an editorial vehicle-rental experience with a first-page booking search, date-aware demo availability, vehicle discovery, booking-request validation, and browser-persistent saved vehicles and reservation references.

## Key Features

- Responsive homepage with a vehicle-led hero and booking controls.
- Fleet listings with vehicle images, daily rates, fuel type, transmission, seat capacity, and availability details.
- Search, vehicle-class filtering, price sorting, and date-aware availability windows.
- Five pick-up branch options in Bishkek.
- Booking-request form with client-side validation and estimated pricing.
- Saved vehicles and reservation history stored in browser LocalStorage.
- Responsive navigation, working contact links, social links, and newsletter feedback.

## Technology Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Run Locally

1. Install Node.js 20 or later.
2. Run `pnpm install`.
3. Run `pnpm dev`.
4. Open the local URL printed in the terminal.

## Build for Production

Run `pnpm build` to create a production build.

## Notes

Vehicle rates, branch information, and date availability are realistic frontend demonstration data. A production deployment should connect the booking flow to verified inventory, payment, and customer-support services.
