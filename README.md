# SIS Student Opportunity Hub

A simple, free, mobile-friendly opportunity directory for The Self Improvement Society at UNB Saint John.

## How to use it

1. Open `opportunities.js`.
2. Replace the sample opportunities with your real opportunities.
3. For each opportunity, add:
   - title
   - organization
   - category
   - location
   - type
   - description
   - application/link
4. Open `index.html` in your browser to test it.

## Put it online with GitHub Pages

1. Create a new GitHub repository, for example `SIS-Opportunity-Hub`.
2. Upload `index.html` and `opportunities.js`.
3. Go to Settings → Pages.
4. Select "Deploy from a branch".
5. Select the `main` branch and `/root`.
6. Save.
7. GitHub will give you a public website link.

## Adding new opportunities

The easiest method is to edit the `opportunities` array in `opportunities.js`.

For example:

{
  title: "Example Volunteer Role",
  organization: "Example Organization",
  category: "Volunteer",
  location: "Saint John",
  type: "Weekly",
  description: "Short description here.",
  link: "https://example.com"
}

## Recommended long-term setup

Use a Google Form for students/organizations to submit opportunities. Review submissions yourself, then add approved opportunities to `opportunities.js`.

This keeps the public website simple and avoids needing a paid database or AI API.
