# CampusHub — Campus Events & Activities Platform

A frontend-only React + Tailwind CSS demo for the Campus Events & Activities Platform project.

## Requirements

- Node.js 20+ recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Demo accounts

All demo accounts use password `123456`.

| Role | Email |
|---|---|
| Student | student@campus.test |
| Organizer | organizer@campus.test |
| Admin | admin@campus.test |

You can also register a new Student account from the Register page.

## Main features

- Landing page and featured events
- Events listing with search, category filtering, and sorting
- Event details and registration
- Duplicate-registration and capacity checks in the frontend demo
- Student registrations and cancellation
- Organizer event create, edit, and delete
- Admin overview and event moderation
- Responsive layout for mobile, tablet, and desktop

## Project structure

```text
src/
  components/     Reusable UI components
  context/        Frontend auth and app data state
  data/           Static seed data and demo accounts
  pages/          Route-level pages
  App.jsx         Routes
  main.jsx        App entry point
  index.css       Global styles and Tailwind import
```

## Important project limitation

This is a **frontend-only prototype**. There is no Node/Express server, MongoDB database, real authentication, or server-side authorization. Demo users, events, and registrations are stored in the browser's `localStorage` and can be cleared by clearing site data.

The frontend checks are for demonstrating user flows only. They are not secure and must not be presented as backend validation. If the official project submission requires a working MERN backend, this prototype alone does not satisfy that requirement.

## Reset demo data

In the browser console, run:

```js
localStorage.clear();
location.reload();
```

## Build

```bash
npm run build
```
