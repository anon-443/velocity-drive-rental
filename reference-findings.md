# Hero Search-Bar Reference Findings

The visual issue is concentrated in the hero search bar. The reference shows duplicate calendar affordances in each date control: the intended Lucide calendar at the left and the browser-native date-picker indicator at the right, which crowds the short date placeholder. The control groups also need clearer horizontal boundaries and a fixed icon lane so labels, values, and chevrons do not compete for the same space.

The correction will retain accessible date input behavior while exposing one intentional calendar icon per date control, separating dropdown chevrons into their own fixed area, and giving each field a structured desktop divider with an uncluttered mobile stack.

## Published-Site and Reference-Site Findings

The published page contains no project-source copy for the reported badge. The **“Made with Manus”** element is appended outside the Velocity Drive application root, so it is a hosting-level display element rather than website content and cannot be removed through the site’s React/CSS source.

The automotive reference uses a substantially wider desktop content region with a broad edge-to-edge visual rhythm and larger primary imagery. The Velocity Drive update should use a larger desktop container, a taller hero media stage, a more generous section width, and an enlarged desktop display scale while retaining the current mobile layout and brand system.

## Advanced Fleet and Contact Findings

The fleet uses one page-level source of truth for search term, type, price range, passenger capacity, sort order, and selected rental dates. Filters remain client-side demo behavior and retain the selected date window when discovery filters are reset. The filter rail uses a short state transition without claiming a live inventory search.

The dedicated contact destination owns the `#contact` anchor; the footer uses a distinct identifier. Contact form success is a local frontend acknowledgement until an actual message service is connected. The FAQ uses the existing accessible accordion primitive.

## Visual Review Refinements

Every major section carries a roadbook device—editorial numbering, a route rule, an amber entry mark, or technical spec framing. The identity remains graphic-first, with the mark given stronger visual weight than the supporting wordmark. Velocity Amber stays reserved for action, active state, availability, and intentional editorial entry marks.

## Vehicle Detail Expansion Findings

The application currently routes only the homepage and fallback page, while fleet data contains a single hero image and compact discovery-level specifications. Detail routes require a stable slug or ID route, a `getCarById` lookup, a multi-image gallery, richer model-specific fields, and a return path to the fleet. Favorites already use local persistence in the homepage state, so detail pages need a shared Favorites provider or a small storage-backed helper that updates both the listing and detail route consistently.

The homepage currently owns saved-car state, while vehicle cards only expose separate reserve and heart actions. Detail navigation should be an explicit card action rather than stealing existing save or reserve controls. A shared storage-backed Favorites hook can keep the browser-persistent heart state synchronized across the listing, saved desk, and vehicle route.

The responsive vehicle journal layout works as a staged desktop spread and compresses cleanly to a mobile gallery, specification rail, and stacked actions. Keep the gallery selection, Favorites heart, reservation entry action, return-to-fleet path, and technical data visible without depending on hover at narrow widths.

The vehicle journal already provides a persistent Favorite state and an uncluttered action panel, making its secondary action row the appropriate location for sharing. The Favorites desk has a natural comparison entry point once at least two vehicles are saved; that comparison must state that Favorites are local-browser data and allow the visitor to switch the two selected vehicles without leaving the route.
