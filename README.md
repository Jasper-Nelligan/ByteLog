# ByteLog - Daily Update App

This application was built for the HireUp Full Stack Developer Challenge. It leverages the T3 Stack—featuring Next.js, TypeScript, Tailwind CSS, tRPC, Prisma, and Zod—along with Shadcn UI for component styling and PostgreSQL as the database.

## Features:

- **Simulated Authentication**: Users can sign in using a simulated authentication form
- **Daily Update Submission**: Submit text-based daily updates through a form with validation powered by Zod.
- **Data Persistence with PostgreSQL**: Updates are stored in a PostgreSQL database and retrieved via Prisma, allowing users to view their full update history. Updates are filtered by user, as required.
- **Post Analytics**: Includes insights such as **total number of posts**, **posts per month**, and the **most frequently used words**.
- **Dark Mode**

## Setup

1. Clone or download this repository
1. Run `npm install` in your terminal. Make sure you have Node.js (v18 or higher) installed.
1. Create a `.env` file in the root, and add the following environment variable:

    ```
    DATABASE_URL=postgresql://postgres:xNubgRg4z3f3RTR9@db.aesuruxzavkowkrupubf.supabase.co:5432/postgres
    ```

    This connects to a live database, so please do not share this secret anywhere else.
1. Run these prisma commands:

    ```
    npx prisma generate
    npx prisma migrate dev
    ```

1. Run `npm run dev`, and open http://localhost:3000/ in your browser to view this project