# Full-Stack Post Application

This is a simple full-stack application for managing posts. It consists of a React frontend and a Node.js/Express backend.

## Project Structure

The project is a monorepo with two main directories:

-   `frontend/`: Contains the React application.
-   `backend/`: Contains the Node.js/Express server.

## Getting Started

### Prerequisites

-   Node.js and npm
-   PostgreSQL

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    -   Create a `.env` file in the `backend` directory.
    -   Add your PostgreSQL connection string to the `.env` file:
        ```
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
        ```

4.  **Run database migrations:**
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The server will be running at `http://localhost:3000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be running at `http://localhost:5173`.

## Technologies Used

### Backend

-   Node.js
-   Express
-   Prisma
-   PostgreSQL
-   TypeScript

### Frontend

-   React
-   Vite
-   TypeScript
-   TanStack Router
-   Redux Toolkit
-   Material-UI
-   Tailwind CSS
