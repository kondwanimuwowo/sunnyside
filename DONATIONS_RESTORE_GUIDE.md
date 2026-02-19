# Donation System Restore Guide

This guide restores the donation UI exactly as it was before the temporary removal.

## 1. Re-enable the Donate route
- Edit `src/routes/index.jsx`.
- Re-add the lazy import for `@pages/Donate`.
- Re-add the route: `path="donate" element={<Donate />}`.

## 2. Restore the Donate route constant
- Edit `src/utils/constants.js`.
- Re-add `DONATE: "/donate"` in `ROUTES`.

## 3. Restore Donate entry points in the UI
- `src/components/layout/Navbar.jsx`
  - Replace the primary CTA back to `Donate Now`.
  - Link it to `ROUTES.DONATE`.
- `src/components/layout/Footer.jsx`
  - Re-add `{ path: ROUTES.DONATE, label: "Donate" }` to `supportLinks`.
- `src/components/home/HeroSection.jsx`
  - Change the primary button back to:
    - `onClick={() => navigate(ROUTES.DONATE)}`
    - Label: `Support Our Mission`
- `src/components/home/CTASection.jsx`
  - Replace the text and tiles back to the donation copy and amounts.
  - Set the primary CTA back to:
    - `onClick={() => navigate(ROUTES.DONATE)}`
    - Label: `Make a Difference Today`
  - Change the secondary CTA label back to `Learn About Our Impact`.
- `src/pages/Services.jsx`
  - Re-add the `Support Our Work` button in the volunteer section:
    - `onClick={() => navigate(ROUTES.DONATE)}`

## 4. Remove the temporary banner
- Edit `src/components/layout/Layout.jsx`.
- Remove the amber banner block that mentions donations being unavailable.

## 5. Verify the Donate page still exists
The page and components remain in place, only hidden from navigation and routing.
Check:
- `src/pages/Donate.jsx`
- `src/components/donate/*`

## 6. Optional: Restore donation-related analytics/hooks
If you want them active again (for example if some were disabled later), ensure these still exist and are wired:
- `src/services/analytics.js` (donation tracking)
- `src/hooks/useDonation.js`
- `src/context/DonationContext.jsx`

## 7. Environment checklist
When donations are live again, confirm:
- `.env` has `VITE_LENCO_PUBLIC_KEY` and `VITE_LENCO_SANDBOX`.
- If using local dev with Vercel serverless, use `vercel dev` so `/api` is available.

## 8. Quick sanity checks
- `/donate` route renders correctly.
- Hero/CTA/Services buttons lead to `/donate`.
- Navbar and footer show Donate.
- Donation checkout flow loads (Lenco script loads on Donate page).

---
If you want a one-click restore in the future, we can add a feature flag to toggle all of this from a single env var or config.
