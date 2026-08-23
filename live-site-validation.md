# Live Site Validation Log

## 2026-08-23 — Initial GitHub Pages deployment

- GitHub Actions completed the static demo build and deployment successfully after GitHub Pages was enabled.
- GitHub Pages accepted `velodrive-rentals.me` and reported a successful DNS check in the repository Settings → Pages screen.

The first navigation captured the document before its JavaScript finished loading. A subsequent rendered-page check confirmed that `http://velodrive-rentals.me/` loads the complete Velocity Drive interface, including the navigation, hero search, full four-vehicle fleet, Favorites desk, contact form, FAQ, footer links, and portable local image assets.

The visible **Find vehicles** control was activated successfully and moved the user to the fleet section. Selecting the **SUV** filter reduced the displayed inventory to the Kia Sorento Hybrid, confirming that the client-side type filter works on the deployed static version.

The Kia Sorento Hybrid detail route loaded with its gallery, specifications, share control, and booking request entry point. Selecting **Favorite** changed its label to **Favorited** and displayed the confirmation toast, proving that the static demo’s browser-local Favorites experience works.

The booking request modal opened from the vehicle detail page, progressed from selection review to the customer-details step, and stopped the request when all required fields were empty. It displayed specific validation messages for the full name, email address, phone number, and driver’s license ID fields.

The generated static output was served locally and loaded the **Booking Terms** route directly, including its full terms content and footer navigation. The direct **Compare** route also loaded successfully and rendered the expected empty state that asks the user to save at least two vehicles before comparing them.

After the GitHub Pages release containing direct route shells completed successfully, `http://velodrive-rentals.me/booking-terms/` loaded directly on the live custom domain and rendered the full Booking Terms page. The initial blank frame cleared once the JavaScript application finished loading.

The live custom-domain **Compare** route loaded the expected Favorites empty state, and the direct Kia Sorento Hybrid vehicle route loaded the full vehicle journal with its image gallery, specifications, Favorite state, share control, and booking action.

The redeployed home page was visually checked at desktop width. The **Find vehicles** label and arrow are now fully visible, centered, and contained inside the dark action button; the hero search grid no longer clips the control. The saved Favorite also remained visible in the Drive desk after navigating back to the home page.

With two browser-local Favorites, the live **Compare** page rendered the Kia Sorento Hybrid and Hyundai IONIQ 5 side by side, including daily rate, insurance, GPS navigation, combined add-on estimate, power, drivetrain, cabin, efficiency, cargo, and notable features.

The live inquiry form accepted non-personal test values, reset its fields after submission, and displayed the success toast: “Your inquiry is ready for the Velocity Drive team.” The static form provides client-side confirmation only; it does not send an email or create a backend inquiry record.

The complete live booking request flow was exercised with non-personal test values. It accepted contact details, a September 15–17, 2026 rental window, and the GPS add-on; recalculated the two-day estimate from $156 to $172; then showed reservation confirmation **VD-1XCCTB** together with the dates, price, and a client-side success toast. The reservation was added only to the browser-local demo drive desk.

## 2026-08-23 — Responsive hero and navigation refinement

GitHub Actions workflow **32645731391** completed successfully for commit `dad9a41`. The refreshed custom-domain homepage was then checked after JavaScript completed loading. It renders the corrected three-line hero headline, with “well-planned” kept intact, balanced copy/image columns, more deliberate surrounding whitespace, and a fully contained **Find vehicles** action.

The responsive static build was also checked at **375 × 812** and **1440 × 900** before release. The phone layout retains readable three-line typography, header spacing, and clear hero-image framing; the wider layout presents an intentional editorial two-column composition. The new transition layer uses brief opacity/translate movement plus a non-blocking top progress cue, while automatically suppressing motion for visitors who request reduced motion.

## 2026-08-23 — Cross-page editorial refinement

GitHub Actions workflow **32646121984** completed successfully for commit `07cc540`. The live custom-domain **Compare** route was checked with two retained browser-local Favorites. It rendered the revised vehicle selectors, image-led comparison headers, specification rail, warm add-on estimate row, and the full side-by-side feature set for the Kia Sorento Hybrid and Hyundai IONIQ 5.

The live **Booking Terms** route was checked at desktop width and at **375 × 812**. The reading rail, numbered terms cards, and booking-information panel remain legible and properly spaced on both layouts. Together with the live homepage check, this confirms the refreshed editorial system is present across the primary rental experience while navigation transitions remain concise and respect reduced-motion preferences.

After the final cross-page deployment, the live homepage was rechecked with the hero, the complete fleet surface, retained Favorites, and the unclipped search action all present. A client-side return from Booking Terms reached the homepage successfully; the transition implementation remains covered by the reduced-motion-aware source regression test, while the rapid visual cue is intentionally brief and non-blocking.

The final live vehicle-detail URL for the Kia Sorento Hybrid returned the expected static crawler page with its journal label, model details, daily rate, hero image, and cabin-feature content. The equivalent rendered vehicle journal was visually checked from the current static build with its gallery, specification panel, and request action intact; the detail-surface styles are shared by the final deployed CSS bundle.

A final settled homepage capture confirmed that the hero image loads normally after the initial paint. The corrected headline, deliberate desktop spacing, and visible Find vehicles control remain intact in the final Pages release.

The live rendered vehicle journal was then opened through the query bridge, confirming the current production bundle presents the gallery, favorite state, specification surface, and request action. A monitored client-side return from that journal to the fleet observed the `.route-progress` cue being added and reached `/` successfully. The shared route wrapper uses `useReducedMotion`, `mode="wait"`, and a short transform/opacity transition; the same responsive component is used by the mobile layout, which was separately checked at phone width on the live terms route.

For the phone viewport, the live query-bridge route change was run at **375 × 812** with a short virtual-time capture. The resulting production DOM included the `route-progress` cue while navigation was in progress, confirming that the same non-blocking feedback is present in the mobile render as well as desktop.

## 2026-08-23 — Hero-search text visibility repair

GitHub Actions workflow **32647327446** completed successfully for commit `51b85c5`. The wide custom-domain homepage was captured at **1548 × 1120** after deployment. The pick-up branch, both date values and hints, vehicle class, and **Find vehicles** action are now fully readable in the five-column layout. At the intermediate laptop breakpoint the controls intentionally switch to two roomy columns, while the phone layout remains stacked and readable.

## 2026-08-23 — Wider header and hero composition

GitHub Actions workflow **32648242375** completed successfully for commit `cee508c`. The header and hero now use a dedicated full-width shell rather than a capped framework container. On the deployed custom domain, the shell measured **1265 px** within a **1280 px** browser viewport, with only the scrollbar outside it and 32 px of safe internal padding. The laptop and phone checks preserve readable content and controls while removing the excessive desktop side bands.

## 2026-08-23 — Fleet presentation, compact header, and night mode

GitHub Actions workflow **32649409440** completed successfully for commit `2c2eaf4`. The live homepage exposes the available-vehicles banner directly below the booking controls, including the four live inventory previews and its fleet-scroll action. It also presents the accessible **Use night mode** control in the global header. Local desktop, ultra-wide, and controlled phone checks confirmed the compact scroll header, stored preference, readable dark surfaces, and populated comparison matrix before the release.

## 2026-08-23 — Fleet-card and section-rhythm refinement

GitHub Actions workflow **32651280697** completed successfully for commit `86c30cf`. After its JavaScript bundle settled, the live homepage rendered the complete search surface, four-vehicle fleet banner, filter rail, featured Kia Sorento Hybrid card, three supporting cards, Favorites desk, contact form, FAQ, and footer. The live DOM exposed the expected detail, save, and reserve controls for every vehicle.

The live Kia Sorento Hybrid journal loaded directly with the gallery, share and Favorite controls, reservation action, six-specification panel, and cabin-and-technology section. Its route labels and specification labels render with the shared compact eyebrow treatment, while the page retains the updated section spacing and the persisted night-mode control.
