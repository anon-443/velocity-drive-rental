# GitHub Upload and Custom Domain Guide

Velocity Drive can use your existing **velodrive-rentals.me** domain. You do not need to purchase another domain or change the `.me` extension. The project already generates canonical, Open Graph, and Twitter metadata with this exact public URL.

## Recommended setup

This version includes a server, OAuth sign-in, and database-backed Favorites. Keep the live application on its managed full-stack hosting, then use GitHub for your internship source-code submission and portfolio. GitHub Pages is not appropriate for this build because it serves static files only and cannot run the protected Favorites API or database logic.

| Goal | Recommended action |
| --- | --- |
| Submit the code | Upload the supplied source archive to a GitHub repository. |
| Keep sign-in and cross-device Favorites working | Use the project’s managed full-stack hosting. |
| Use your own URL | Attach `velodrive-rentals.me` from the project **Settings → Domains** panel. |

## Upload the source to GitHub

Download and extract `velocity-drive-rental-github-source-current.zip`. On GitHub, create a new repository named `velocity-drive-rental`. Leave the options to add a README, `.gitignore`, or licence unchecked because the extracted project already includes those files.

The easiest approach is GitHub Desktop. Choose **Add an Existing Repository from your Hard Drive**, select the extracted folder, then choose **Publish repository**. You can also use the terminal from the extracted project folder:

```bash
git init -b main
git add .
git commit -m "Add Velocity Drive car rental management system"
git remote add origin https://github.com/YOUR-USERNAME/velocity-drive-rental.git
git push -u origin main
```

Do not upload `.env` files, tokens, passwords, database URLs, or generated `node_modules` folders. The supplied archive has already excluded them. GitHub’s official guide also recommends creating the remote repository without an initial README before pushing an existing local project.[1]

## Connect `velodrive-rentals.me`

Open this project’s management panel and choose **Settings → Domains**. Enter `velodrive-rentals.me` and begin the custom-domain connection. The panel will show the exact DNS records required for this project; copy those values exactly into the DNS manager at the company where you bought the domain.

| DNS task | What to do |
| --- | --- |
| Root domain | Add or replace the record shown for `@` / `velodrive-rentals.me`. |
| `www` address | Add the CNAME record shown for `www` if you also want `www.velodrive-rentals.me`. |
| Email records | Keep existing MX, SPF, DKIM, and DMARC records if you use email on the domain. |
| Verification | Return to **Settings → Domains** and wait for the domain to verify and TLS/SSL to activate. |

After verification, open `https://velodrive-rentals.me` and use it as your final internship live link. Do not change the `PUBLIC_SITE_URL` setting: it is already set to this domain.

## Final account check

When you are ready, use the **Sign in** control in the site header. Save a vehicle, refresh the page, and then sign in on another device with the same account. The same Favorites should appear because they are now stored with the account rather than only in a browser.

## Reference

[1] [GitHub Docs: Adding locally hosted code to GitHub](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
