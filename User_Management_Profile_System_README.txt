
# User Management & Profile System (Full Stack Application)

This project consists of a **backend** that handles user authentication, profile management, and CRUD operations, and a **frontend** built with React that interacts with the backend to display user profiles and allow login and registration.

## Features:
- **User Registration & Login** with JWT Authentication
- **Profile Management** (view, edit, upload images)
- **Admin Role Management** (only admins can delete users)
- **Image Upload** to Cloudinary
- **Profile Editing** for name, age, and biography

## Technologies Used:
### Backend:
- **Node.js** with **Express.js** for the server
- **MongoDB** with **Mongoose** for data storage
- **bcrypt** for password hashing
- **JWT** for authentication
- **Cloudinary** for storing profile images
- **Multer** for handling file uploads
- **Helmet** for security
- **dotenv** for environment variables
- **CORS** for handling cross-origin requests

### Frontend:
- **React** for UI
- **React Router** for navigation
- **CSS** for styling

## Setup Instructions:

### 1. Backend Setup:

#### Install Dependencies:
```bash
cd backend
npm install
```

#### Environment Setup:
Create a `.env` file in the backend folder with the following values:
```env
MONGO_URI=<your-mongo-db-uri>
JWT_Private_key=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

#### Start the Server:
```bash
npm start
```
The server will run on port `5000` by default.

---

### 2. Frontend Setup:

#### Install Dependencies:
```bash
cd frontend
npm install
```

#### Run the React App:
```bash
npm start
```
The React application will run on port `3000` by default.

---

## Backend API Endpoints:

### 1. **User Routes:**

- **Register a New User:**  
  `POST /add-user`  
  **Request Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Login User:**  
  `POST /login`  
  **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Get User Data (Authenticated):**  
  `GET /user`  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer <jwt-token>"
  }
  ```

- **Delete a User (Admin Only):**  
  `DELETE /deleteUser/:id`  
  **Params:**  
  `id`: User ID to delete

---

### 2. **Profile Routes:**

- **Get User Profile (Authenticated):**  
  `GET /profile`

- **Update User Profile (Authenticated):**  
  `PUT /update-profile`  
  **Request Body:**
  ```json
  {
    "name": "Updated Name",
    "age": 30,
    "biography": "Updated biography"
  }
  ```

- **Upload Profile Picture (Authenticated):**  
  `POST /upload`  
  **Form Data:**  
  `image`: The profile image file

- **Get All Profiles:**  
  `GET /profiles`

---

## Frontend Features:

### 1. **Login Page:**
The login page allows users to authenticate by entering their email and password. Upon successful login, a JWT token is stored in `localStorage` and the user is redirected to the profile page.

### 2. **Home Page:**
Displays all users and their profiles. Only admins can delete users. The profile image is shown, and if a profile image is missing, a placeholder image is shown.

### 3. **Profile Page:**
- Displays the logged-in user's profile information (name, age, biography).
- Allows the user to edit their profile and upload a new profile picture.
- If the user is in edit mode, they can change their name, age, and biography.
- The user can upload a profile image using the Cloudinary integration.

### 4. **Navbar:**
- Provides links to login, register, home page, and profile page.
- Allows logged-in users to logout.

---

## Authentication Flow:
1. **Login:** The user provides their credentials (email, password).
2. **JWT Token:** On successful login, the backend generates a JWT token, which is stored in `localStorage` on the frontend.
3. **Authenticated Routes:** Any route requiring authentication (like updating profiles) includes the token in the `Authorization` header for the backend to verify.
4. **Logout:** The token is removed from `localStorage` when the user logs out.

---

## Security Considerations:
- **Password Storage:** Passwords are hashed using bcrypt before being stored in the database.
- **Token Expiry:** The JWT token expires after 2 hours for enhanced security.
- **CORS:** The backend allows requests only from the specified frontend origins (configured in the `allowedOrigins` array).

---

## Conclusion:
This project provides a simple but complete full-stack application for managing users and their profiles with authentication, profile editing, and image upload functionality. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React.
