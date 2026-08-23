# Connect `velodrive-rentals.me`

Your GitHub repository stores the project source code. It does not host the current Velocity Drive application. The live application includes an Express server, OAuth sign-in, and database-backed Favorites, so it must remain on full-stack hosting rather than GitHub Pages.

## Step-by-step

1. Open the Velocity Drive project management panel and select **Settings → Domains**.
2. Choose **Add custom domain** and enter `velodrive-rentals.me`.
3. The Domains panel will display the exact DNS records for this project. Leave that panel open.
4. Sign in to the company where you bought `velodrive-rentals.me`, open its **DNS** or **DNS Zone** page, and add or update the records exactly as shown in the Domains panel.
5. Use the record for `@` (the root domain) for `velodrive-rentals.me`. Add the separate `www` record only if you also want `www.velodrive-rentals.me` to work.
6. Keep existing MX, SPF, DKIM, and DMARC records if you use email on the domain. Do not add wildcard DNS records such as `*`.
7. Save the DNS changes, return to **Settings → Domains**, and wait until the domain status becomes verified and HTTPS is active.
8. Visit `https://velodrive-rentals.me`. Vehicle social previews will use this domain because `PUBLIC_SITE_URL` is already configured for it.

## Important distinction

Do **not** enable GitHub Pages for this project unless you intentionally convert it into a static-only demo. GitHub Pages can use custom domains, but it cannot run this project’s protected Favorites API, OAuth callback, or database layer. The GitHub repository remains the correct place for your internship source-code submission and version history.

## If the domain does not verify

Confirm that the DNS record type, host/name, and target match the values shown by the project Domains panel. Remove conflicting root-domain records only when your registrar requires replacement, and keep all email records intact. DNS propagation can take time; recheck the status in the Domains panel after saving.

## Reference

[GitHub Docs: Managing a custom domain for a GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
