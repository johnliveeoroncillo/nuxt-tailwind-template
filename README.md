# Project Documentation

## Overview
This project is a **Nuxt 3** boilerplate that includes the ff:
- Client & Server (All-in-one)
- Postgre database listener
- Websockets
- Auth middlwares
- Sample APIs
- Prisma
- Event Invocations
- Validators
- Email Templating
- many more features coming soon...

## Folder Structure

```bash
.
├── assets/            # Static assets (CSS, images, etc.)
│   ├── css/           # Stylesheets
│   ├── img/           # Image assets
├── components/        # Vue components
│   ├── ui/            # UI-specific components
│   ├── templates/     # Template components
├── composables/                    # Reusable functions and utilities
│   ├── composables.enums.ts        # Enum definitions
│   ├── composables.interface.ts    # Interface definitions
│   ├── useApis.ts                  # API-related composable functions
│   ├── useAuth.ts                  # Authentication composables
├── constants/         # Constants and Enums declaration
├── interfaces/        # TypeScript interfaces
├── layouts/           # Layout components
│   ├── default.vue    # Default layout
├── lib/               # Library and utility functions
│   ├── prisma.ts      # Prisma client setup
├── middleware/        # Nuxt middleware (Executed alphabetically)
│   ├── auth.global.ts # Global authentication middleware
├── pages/             # Nuxt pages
│   ├── dashboard.vue  # Dashboard page
│   ├── index.vue      # Home page
├── plugins/           # Nuxt plugins
│   ├── global.ts      # Global plugin setup
│   ├── pinia.ts       # Pinia store plugin
├── prisma/            # Database schema and migrations
│   ├── migrations/    # Prisma migration files
│   ├── schema.prisma  # Prisma schema definition
├── public/            # Public assets (icons, static files)
│   ├── icons/         # Icon assets
│   ├── favicon.ico    # Favicon
│   ├── robots.txt     # Robots.txt file
├── server/            # Server-side API routes and middleware
│   ├── api/           # API endpoints
│   ├── email/         # Email templates (e.g. welcome.ejs)
│   ├── middleware/              # Server middleware
│   │   ├── authorizer.global.ts # Authorization middleware
│   │   ├── request.global.ts    # Request handling middleware
│   ├── plugins/                 # Server-side plugins
│   │   ├── hooks.ts.bak         # Hook plugin (backup)
│   │   ├── socket.io.ts         # WebSocket integration
│   ├── events/                  # List of event functions
│   ├── utils/                   # Server utilities (BE)
│   │   ├── prisma.ts            # Prisma configuration
│   │   ├── protected-routes.ts  # Protected routes config
│   │   ├── response.handler.ts  # Response handler class
│   │   ├── validator.ts         # Reusable validator
├── shared/            # Shared folder which server and client can access
│   ├── utils          # Shared utility folder (Auto-Imported)
├── types/             # Custom extend data types
├── stores/            # Pinia state management stores
│   ├── auth.ts        # Authentication store
│   ├── index.ts       # Store index file
├── utils/             # Front-end utilities
│   ├── index.ts       # General utilities
├── .editorconfig      # Editor configuration
├── .env               # Environment variables
├── .env.example       # Example environment file
├── .gitignore         # Git ignore file
├── tsconfig.json      # TypeScript configuration
```

## Technologies Used
- **Nuxt 3** - Vue.js framework for server-side rendering and static site generation
- **TypeScript** - Typed JavaScript for maintainability
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **Prisma** - ORM for database interactions
- **WebSockets** - Real-time communication via `socket.io`

## Setup and Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the environment variables:
   ```sh
   cp .env.example .env
   ```
   Update the `.env` file with the required credentials.

4. Run database migrations:
   ```sh
   npm run prisma:deploy
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Production
```sh
npm run build
npm run start
```

## Environment
```sh
APP_NAME=
SECRET_KEY=
SSR=


# Database
DATABASE_URL=mysql://username:password!@localhost:3306/databaseName?connection_limit=5
# Optional: For Postgre SQL
PULSE_API_KEY=

# Page Limit
PAGE_LIMIT=50

# Email Config
SMTP_HOST=
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_PORT=
SMTP_FROM=
```

## Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---
**ISIP - Innovative Solutions Infinite Possibilities**
Created By: <a href="https://github.com/johnliveeoroncillo">JL</a>

