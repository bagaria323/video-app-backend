# VideoTube - Full-Stack Video Sharing Platform

VideoTube is a complete, full-stack MERN (MongoDB, Express, React, Node.js) application designed to replicate the core functionalities of a modern video-sharing platform like YouTube. This project demonstrates a deep understanding of backend architecture, API design, frontend state management, and modern deployment practices.

**Live Demo:**
*   **Frontend (Vercel):** [https://video-app-frontend-beige.vercel.app/](https://video-app-frontend-beige.vercel.app/)
*   **Backend API (Render):** [https://video-app-backend-rb16.onrender.com/](https://video-app-backend-rb16.onrender.com/)

---

## Key Features

*   **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens) with access and refresh tokens.
*   **Video Upload:** Seamless video and thumbnail uploads handled by `multer` and persisted on **Cloudinary**.
*   **Video Playback:** A dedicated page for streaming videos.
*   **Full CRUD Functionality:** Users can create, read, update, and delete their own video content.
*   **Interactive Features:** Like and unlike videos, with real-time UI updates.
*   **Protected Routes:** Secure routes and actions that are only accessible to authenticated users.
*   **Responsive UI:** A clean and modern user interface built with **Tailwind CSS** that works on both desktop and mobile devices.
*   **Robust Backend:** A well-structured API with proper error handling, middleware, and controllers.

---

## Tech Stack

### Backend
*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **MongoDB:** NoSQL database for storing user and video data.
*   **Mongoose:** ODM for modeling and managing data in MongoDB.
*   **JWT (JSON Web Token):** For secure user authentication.
*   **bcrypt:** For hashing user passwords.
*   **Cloudinary:** Cloud-based service for image and video management.
*   **Multer:** Middleware for handling `multipart/form-data` (file uploads).
*   **Cookie-parser & CORS:** Standard middleware for handling cookies and cross-origin requests.

### Frontend
*   **React.js:** JavaScript library for building user interfaces.
*   **Vite:** Next-generation frontend tooling for a fast development experience.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **React Router:** For client-side routing and navigation.
*   **Axios:** Promise-based HTTP client for making API requests.

---

## Getting Started (Local Development)

To run this project on your local machine, you will need to set up both the backend and frontend separately.

### Prerequisites
*   Node.js (v18 or later)
*   npm or yarn
*   A MongoDB Atlas account (for the database)
*   A Cloudinary account (for file storage)

### Installation

1.  **Clone both repositories** into a main project folder:
    ```bash
    git clone https://github.com/your-username/video-app-backend.git
    git clone https://github.com/your-username/video-app-frontend.git
    ```

2.  **Setup the Backend:**
    ```bash
    cd video-app-backend
    npm install
    ```
    *   Create a `.env` file in the root of the backend folder and add the environment variables listed below.
    *   Run the development server:
        ```bash
        npm run dev
        ```

3.  **Setup the Frontend:**
    ```bash
    cd ../video-app-frontend
    npm install
    ```
    *   Run the development server (in a new terminal):
        ```bash
        npm run dev
        ```
    *   The frontend will run on `http://localhost:5173` and connect to your local backend server.

---

## Environment Variables

The backend requires the following environment variables to be set in a `.env` file:

```env
PORT=8000
DATABASE_URL=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_super_secret_access_key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_other_super_secret_refresh_key
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
