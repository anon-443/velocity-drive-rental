# Publish the Static Internship Demo with GitHub Pages

The included GitHub Actions workflow publishes a **static demonstration** of Velocity Drive. It keeps browser-local Favorites, booking history, filters, comparisons, forms, and vehicle pages, but it does not use the full-stack sign-in or database features.

## 1. Make the repository eligible for GitHub Pages

Open [the Velocity Drive repository](https://github.com/anon-443/velocity-drive-rental), then choose **Settings → General → Change repository visibility → Public**. On GitHub Free, public repositories are the appropriate route for a Pages site. Do not enable the old “Deploy from a branch” option because the workflow creates the built website automatically.

## 2. Activate the workflow

1. Open **Actions** in the repository and select **Deploy static internship demo to GitHub Pages**.
2. If GitHub asks to enable workflows, approve it.
3. Open **Settings → Pages** and select **Source: GitHub Actions**.
4. Run the workflow once, or push any small change to `main`. It builds the static version, stages its vehicle images, and deploys the result.

Before the custom domain is connected, GitHub will display a temporary Pages address. Use it to confirm the fleet opens, date filters work, and Favorites remain after a refresh.

## 3. Add `velodrive-rentals.me` in GitHub

In the repository, open **Settings → Pages**. Under **Custom domain**, enter `velodrive-rentals.me` and save it. GitHub includes the `CNAME` file in the published build, so the setting persists across deployments.

## 4. Enter these DNS records at your domain registrar

Open the DNS/Zone Editor for `velodrive-rentals.me`. Create these records exactly. If a record named `@` already exists and is being used for another website, replace only that conflicting web-hosting record.

| Type | Host / Name | Value / Target | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | Default / Auto |
| A | `@` | `185.199.109.153` | Default / Auto |
| A | `@` | `185.199.110.153` | Default / Auto |
| A | `@` | `185.199.111.153` | Default / Auto |
| CNAME | `www` | `anon-443.github.io` | Default / Auto |

Do **not** delete MX, SPF, DKIM, or DMARC records if you use email on the domain. Do not add a wildcard `*` DNS record.

## 5. Turn on HTTPS

Return to **Settings → Pages** after GitHub recognizes the records. When the HTTPS option becomes available, select **Enforce HTTPS**. Then test both `https://velodrive-rentals.me` and `https://www.velodrive-rentals.me`.

## Static-demo limitation

GitHub Pages serves static files only. The Pages version therefore intentionally uses browser storage for Favorites and does not offer Manus OAuth sign-in, protected APIs, or cross-device sync. Those full-stack features remain available in the managed project deployment.

## References

1. [GitHub Docs: Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
2. [GitHub Docs: About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
