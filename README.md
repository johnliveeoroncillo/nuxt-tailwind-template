# Project Documentation

## Overview
This project is a **Nuxt 3** application that includes several key features such as **Trade-Up Requests, Booking System, Item Receiving, GRN Issuance, and Role-Based Portals** for suppliers and internal operations. The system allows administrators to manage users for different roles.

## Folder Structure

```bash
.
├── assets/            # Static assets (CSS, images, etc.)
│   ├── css/           # Stylesheets
│   ├── img/           # Image assets
│
├── components/        # Vue components
│   ├── ui/            # UI-specific components
│   ├── templates/     # Template components
│
├── composables/                    # Reusable functions and utilities
│   ├── composables.enums.ts        # Enum definitions
│   ├── composables.interface.ts    # Interface definitions
│   ├── useApis.ts                  # API-related composable functions
│   ├── useAuth.ts                  # Authentication composables
│
├── interfaces/        # TypeScript interfaces
│
├── layouts/           # Layout components
│   ├── default.vue    # Default layout
│
├── lib/               # Library and utility functions
│   ├── prisma.ts      # Prisma client setup
│   ├── utils.ts       # General utilities
│
├── middleware/        # Nuxt middleware
│   ├── auth.global.ts # Global authentication middleware
│
├── pages/             # Nuxt pages
│   ├── dashboard.vue  # Dashboard page
│   ├── index.vue      # Home page
│
├── plugins/           # Nuxt plugins
│   ├── global.ts      # Global plugin setup
│   ├── pinia.ts       # Pinia store plugin
│
├── prisma/            # Database schema and migrations
│   ├── migrations/    # Prisma migration files
│   ├── schema.prisma  # Prisma schema definition
│
├── public/            # Public assets (icons, static files)
│   ├── icons/         # Icon assets
│   ├── favicon.ico    # Favicon
│   ├── robots.txt     # Robots.txt file
│
├── server/            # Server-side API routes and middleware
│   ├── api/           # API endpoints
│   │   ├── update-profile.ts    # Update user profile
│   │   ├── login.post.ts        # Login API
│   │   ├── logout.delete.ts     # Logout API
│   │   ├── register.post.ts     # User registration API
│   ├── middleware/              # Server middleware
│   │   ├── authorizer.global.ts # Authorization middleware
│   │   ├── request.global.ts    # Request handling middleware
│   ├── plugins/                 # Server-side plugins
│   │   ├── hooks.ts.bak         # Hook plugin (backup)
│   │   ├── socket.io.ts         # WebSocket integration
│   ├── utils/                   # Server utilities
│
├── stores/            # Pinia state management stores
│   ├── auth.ts        # Authentication store
│   ├── index.ts       # Store index file
│
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
   npx prisma migrate dev
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Features
- **Authentication**: User login, logout, and registration
- **Role-Based Access Control**: Different portals for suppliers and internal users
- **Booking System**: Manage booking requests
- **Trade-Up Requests**: Allow users to submit trade-up requests
- **Item Receiving & GRN Issuance**: Track and issue GRNs
- **Admin Dashboard**: Manage users and system configurations

## Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---
**ISIP - Innovative Solutions Infinite Possibilities**

