# ByteLog - Daily Update App

This application leverages the T3 Stack—featuring Next.js, TypeScript, Tailwind CSS, tRPC, Prisma, and Zod—along with Shadcn UI for component styling and PostgreSQL as the database.

## Features:

- **Simulated Authentication**: Users can sign in using a simulated authentication form
- **Daily Update Submission**: Submit text-based daily updates through a form with validation powered by Zod.
- **Data Persistence with PostgreSQL**: Updates are stored in a PostgreSQL database and retrieved via Prisma, allowing users to view their full update history. Updates are filtered by user, as required.
- **Post Analytics**: Includes insights such as **total number of posts**, **posts per month**, and the **most frequently used words**.
- **Dark Mode**

## Setup

Make sure you have Node.js (v18 or higher) installed. Then, follow these steps:

1. Clone or download this repository
1. Run `npm install --legacy-peer-deps` in your terminal. For the purposes of this demo project, please use `--legacy-peer-deps` to ignore incompatibilities.
1. Set up Supabase. For this, you'll need to:

    1. Go to Supabase and create a new project
    1. After the project is created, copy the Direct Connection string (PostgreSQL URI format).
    1. Create a `.env` file in the root, and add your direct connection string there:

    ```
    DATABASE_URL=[YOUR_CONNECTION_STRING]
    ```

1. Run these prisma commands:

    ```
    npx prisma generate
    npx prisma db push
    ```

    This will create the necessary tables and structures in your Supabase database.

1. Run `npm run dev`, and open http://localhost:3000/ in your browser to view this project
1. Finally, to access and post updates, log in using these credentials:
    ```
    Username: mockUser
    Password: password
    ```

## Demo

You can find a live demo of this project here:

https://byte-log-sigma.vercel.app/
