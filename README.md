# Property Management Dashboard

A modern web application for managing property listings built with Next.js.

## Features

- **User Authentication**: Secure login and session management with NextAuth.js
- **Property Management**: Create, read, update, and delete property listings
- **Interactive Data Grid**: Advanced data grid with sorting, filtering, and pagination
- **Responsive Design**: Mobile-friendly interface that works across devices
- **Modern UI**: Clean, intuitive interface built with Shadcn UI components
- **Custom Hooks**: Reusable logic for property and form management

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, AG Grid, Lucide Icons
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form, Zod validation

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd property-management-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Seeding Data

To seed the database with sample properties:

1. Log in to the application
2. Make a GET request to `/api/properties/seed` endpoint
3. This will create 200 sample properties for testing

## Project Structure

```
/src
  /app                   # Next.js App Router
    /api                 # API routes
      /auth              # Authentication endpoints
      /properties        # Properties CRUD endpoints
    /dashboard           # Dashboard page and components
    /login               # Login page
    /register            # Register page
  /components            # Shared UI components
    /ui                  # Shadcn UI components
  /hooks                 # Custom React hooks
    useProperties.ts      # Property management hook
    usePropertyForm.ts     # Property form management hook
  /lib                   # Utility functions and types
  /prisma                # Prisma schema and migrations
```

## Features in Detail

### Authentication

- Email/password authentication with NextAuth.js CredentialsProvider
- Protected routes with Middleware
- Session management with NextAuth.js

### Property Management

- Property listing with advanced filtering and sorting using ag-grid
- Add/edit property form with validation
- Bulk data seeding for testing

### Data Grid

- Sortable and filterable columns
- Pagination
- Action buttons for each row

## License

This project is licensed under the MIT License - see the LICENSE file for details.
