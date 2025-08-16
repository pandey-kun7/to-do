# To-Do Web App

A simple and intuitive web application for managing your daily tasks.

## Features

*   User authentication (signup and login)
*   Create, view, and delete tasks
*   Secure password handling with JWT authentication
*   Responsive design for use on various devices

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB with Mongoose
*   **Frontend:** EJS (Embedded JavaScript templates), CSS
*   **Authentication:** JSON Web Tokens (JWT)
*   **Environment Variables:** dotenv
*   **Development:** nodemon

## Prerequisites

*   Node.js and npm installed
*   MongoDB installed and running

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/to-do.git
    cd to-do
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/to-do
    JWT_SECRET=your_jwt_secret
    ```

4.  **Start the application:**
    ```bash
    npm start
    ```

## Project Structure

```
to-do/
├── .gitignore
├── delete_tasks.js
├── index.js
├── package-lock.json
├── package.json
├── connection/
│   └── index.js        # MongoDB connection
├── middlewares/
│   └── auth.js         # Authentication middleware
├── models/
│   ├── tasks.js        # Task schema
│   └── users.js        # User schema
├── node_modules/
├── routes/
│   └── users.js        # User and task routes
├── services/
│   └── auth.js         # Authentication services
├── styles/
│   ├── login-style.css
│   ├── signup-style.css
│   └── tasks-style.css
└── views/
    ├── login.ejs
    ├── signup.ejs
    └── welcome.ejs
```

## API Endpoints

*   `GET /signup`: Renders the signup page.
*   `POST /signup`: Creates a new user.
*   `GET /login`: Renders the login page.
*   `POST /login`: Logs in a user.
*   `GET /`: Renders the home page with user's tasks.
*   `POST /`: Creates a new task.
*   `DELETE /:id`: Deletes a task by its ID.
