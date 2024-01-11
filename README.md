# BCGov CITZ IMB Playground

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](Redirect-URL)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

[![NodeJS](https://img.shields.io/badge/Node.js_20-43853D?style=for-the-badge&logo=node.js&logoColor=white)](NodeJS)
[![Typescript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](Typescript)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)](React)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](Express)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

<br />

<details>
<summary><h2>TL/DR</h2></summary>

Set up by following the steps at [Basic Setup Guide](#basic-setup-guide).

**What is this app for?** - Used to test CITZ IMB node packages.

</details>

---

## Table of Contents

- [General Information](#general-information)
- [Basic Setup Guide](#basic-setup-guide) - **Start Here!**
- [Directory Structure](#directory-structure) - How the repo is designed.
- [Scripts](#scripts) - Scripts for running and working on web app.
- [Included Packages](#included-packages) - Which CITZ IMB node packages are being tested.

## General Information

- Running on a NodeJS:20 with React, Express, and Postgres.
- Used to test CITZ IMB node packages.

---

<br />

## Basic Setup Guide

1. Create a `.env` file based on the `example.env` file.

2. Run `npm run up` to start the app.

[Return to Top](#bcgov-citz-imb-playground)

<br />

## Directory Structure

```
.
├── src/
|   ├── backend/                            # Express API.
|   |   ├── scripts/                        # Utility scripts used to run the server.
|   |   ├── src/                             
|   |   |   ├── migrations/                 # Migrations on database (check src/backend/README).
|   |   |   ├── modules/                    # Modules of functionality (routes, controllers, entities, services).
|   |   |   └── utils/                      # Utility functions for the express api.
|   |   ├── config.ts                       # Utilizes env vars and exports common variables.
|   |   ├── dataSource.ts                   # Connection to database and configuration with typeorm.
|   |   ├── express.ts                      # Express configuration and base route configuration.
|   |   ├── index.ts                        # Server and database connection initialization.
|   |   └── package.json                    # Configure packages.
|   ├── frontend/                           # React.
|   |   ├── src/                             
|   |   |   ├── assets/                     # Images.
|   |   |   ├── components/                 
|   |   |   |   ├── common/                 # Common or reusable visual components.
|   |   |   |   ├── icons/                  # Icons as svg components.
|   |   |   |   └── layout/                 # Layout components like PageLayout.
|   |   |   ├── css/                        # Base styles and variables.
|   |   |   ├── pages/                      # Page components.
|   |   |   ├── AppRouter.tsx               # Router for loading pages at routes.
|   |   |   ├── global.d.ts                 # Global type declarations (used for config endpoint).
|   |   |   └── main.tsx                    # Main JavaScript run in index.html.
|   |   ├── index.html                      # Set web app meta data and title.
|   |   ├── nginx.conf                      # Configure proxy pass for prod build.
|   |   ├── package.json                    # Configure packages.
|   |   └── vite.config.ts                  # Configure vite server and proxy pass for dev build.
```

[Return to Top](#bcgov-citz-imb-playground)

<br />

## Scripts

```bash
# Start the web app (ensure env vars set).
$ npm run up
```

```bash
# Stop the web app.
$ npm run down
```

```bash
# Prune all containers, images and volumes.
$ npm run prune
```

```bash
# Clean install packages in frontend (requires prune and up to affect live site).
$ npm run install:frontend
```

```bash
# Clean install packages in backend (requires prune and up to affect live site).
$ npm run install:backend
```

```bash
# Shell into frontend container.
# Type 'exit' + ENTER to exit shell.
$ npm run shell:frontend
```

```bash
# Shell into backend container (used when working with migrations).
# Type 'exit' + ENTER to exit shell.
$ npm run shell:backend
```

```bash
# Shell into database container.
# Type 'exit' + ENTER to exit shell.
$ npm run shell:database
```

[Return to Top](#bcgov-citz-imb-playground)

<br />


## Included Packages

- [@bcgov/citz-imb-kc-react] - Integrating with Pathfinder SSO Keycloak in a NodeJS App.
- [@bcgov/citz-imb-kc-express] - Integrating with Pathfinder SSO Keycloak in a NodeJS App.
- [@bcgov/citz-imb-kc-css-api] - Integrating with Pathfinder SSO Keycloak CSS API.
- [@bcgov/citz-imb-richtexteditor] - Reusable rich text editor component.

[Return to Top](#bcgov-citz-imb-playground)


<!-- Link References -->

[@bcgov/citz-imb-kc-react]: https://github.com/bcgov/citz-imb-kc-react
[@bcgov/citz-imb-kc-express]: https://github.com/bcgov/citz-imb-kc-express
[@bcgov/citz-imb-kc-css-api]: https://github.com/bcgov/citz-imb-kc-css-api
[@bcgov/citz-imb-richtexteditor]: https://github.com/bcgov/citz-imb-richtexteditor
