# Bloggy: A Full-Stack Blogging Platform

Bloggy is a full-stack web application that allows users to register, log in, and create, edit, and view blog posts. It features a React-based frontend and a Node.js/Express backend with a PostgreSQL database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm
- PostgreSQL

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory and add the following environment variables:

    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
    TOKEN_SECRET="your-secret-key"
    ```

    Run the database migrations:

    ```bash
    npx prisma migrate dev
    ```

3.  **Frontend Setup:**

    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

### Backend

To start the backend development server, run the following command from the `backend` directory:

```bash
npm run dev
```

The server will be running on `http://localhost:3000`.

### Frontend

To start the frontend development server, run the following command from the `frontend` directory:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## API Routes

### Authentication

| Method | Endpoint    | Description         | Auth Required |
| :----- | :---------- | :------------------ | :------------ |
| `POST` | `/register` | Register a new user | No            |
| `POST` | `/login`    | Log in a user       | No            |

#### `POST /register`

Registers a new user.

-   **Request Body:**

    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

-   **Response:**

    ```json
    {
        "message": "Registered Successfully"
    }
    ```

#### `POST /login`

Logs in a user and returns a JWT.

-   **Request Body:**

    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

-   **Response:**

    ```json
    {
        "message": "success login true",
        "body": {
            "user": {
                "email": "john.doe@example.com",
                "id": "user-id",
                "name": "John Doe"
            },
            "accessToken": "your-jwt-token"
        }
    }
    ```

### Posts

| Method  | Endpoint        | Description           | Auth Required |
| :------ | :-------------- | :-------------------- | :------------ |
| `GET`   | `/posts`        | Get all posts         | No            |
| `GET`   | `/posts/:postId`| Get a single post     | No            |
| `POST`  | `/posts`        | Create a new post     | Yes           |
| `PATCH` | `/posts/:postId`| Update an existing post| Yes           |

#### `POST /posts`

Creates a new post.

-   **Request Body:**

    ```json
    {
        "title": "My First Post",
        "content": "This is the content of my first post."
    }
    ```

-   **Response:**

    The newly created post object.

#### `PATCH /posts/:postId`

Updates an existing post. The user must be the author of the post.

-   **Request Body:**

    ```json
    {
        "title": "Updated Title",
        "content": "Updated content."
    }
    ```

-   **Response:**

    The updated post object.

## Technologies Used

### Backend

-   **Node.js**
-   **Express** - Web framework
-   **Prisma** - ORM for database access
-   **PostgreSQL** - Database
-   **JSON Web Tokens (JWT)** - For authentication
-   **bcrypt.js** - For password hashing
-   **TypeScript**

### Frontend

-   **React** - UI library
-   **Vite** - Build tool
-   **Redux Toolkit** - State management
-   **RTK Query** - Data fetching and caching
-   **TanStack Router** - Routing
-   **Material-UI** - Component library
-   **Tailwind CSS** - CSS framework
-   **TypeScript**
