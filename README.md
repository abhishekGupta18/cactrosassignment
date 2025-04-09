# Task Management API

## Project Overview

This project is a RESTful API for task management built with Node.js, Express, and MongoDB. It allows users to create an account, log in, and manage their tasks. The API provides endpoints for authentication and task management operations (create, read, update, delete).

### Key Features

- User authentication with JWT
- Create and manage tasks
- Secure password handling with bcrypt
- MongoDB database for data storage

## Local Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Installation Steps

1. Clone the repository

   ```bash
   git clone https://github.com/abhishekGupta18/cactrosassignment.git
   cd cactrosassignment
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. Start the development server

   ```bash
   installed nodemon
   created the dev and start script
   npm run dev
   ```

5. The API will be available at `http://localhost:3000`

## Deployed API

### Base URL

[https://cactrosassignment.onrender.com](https://cactrosassignment.onrender.com)

### Postman Collection

A Postman collection with all API endpoints and example requests is available at:
[Task Management API Collection](https://www.postman.com/flight-pilot-74004691/workspace/my-workspace/collection/29492939-d701a505-506a-4c0a-8b1a-0758a65bdca9?action=share&creator=29492939)

## API Endpoints

### Authentication

#### Register a new user

- **URL**: `/signUp`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "client added successfully!!",
    "data": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "token": "jwt_token_string"
  }
  ```

#### Login

- **URL**: `/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "data": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "token": "jwt_token_string"
  }
  ```

### Task Management

**Note**: All task endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

#### Create Task

- **URL**: `/task/create`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Complete project",
    "description": "Finish the task management API project"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "task added successfully",
    "data": {
      "_id": "task_id",
      "title": "Complete project",
      "description": "Finish the task management API project",
      "clientId": "user_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Get All Tasks

- **URL**: `/tasks`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "msg": "all tasks of loggedIn client",
    "data": [
      {
        "_id": "task_id",
        "title": "Complete project",
        "description": "Finish the task management API project",
        "clientId": "user_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ]
  }
  ```

#### Update Task

- **URL**: `/task/update/:id`
- **Method**: `PATCH`
- **Body**:
  ```json
  {
    "title": "Updated task title",
    "description": "Updated task description"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Task updated successfully",
    "data": {
      "_id": "task_id",
      "title": "Updated task title",
      "description": "Updated task description",
      "clientId": "user_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Delete Task

- **URL**: `/delete/task/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "msg": "Task deleted successfully",
    "data": {
      "_id": "task_id",
      "title": "Task title",
      "description": "Task description",
      "clientId": "user_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

## Deployment Details

The API is deployed on Render, a cloud platform for hosting web services.

- **Platform**: Render
- **Deployment URL**: [https://cactrosassignment.onrender.com](https://cactrosassignment.onrender.com)
- **Environment**: Node.js
- **Database**: MongoDB Atlas

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcrypt
- **Deployment**: Render

## Additional Information

- The API uses JWT for authentication, stored as cookies
- Tasks are sorted by creation date (newest first)
- All routes are protected with authentication middleware
- Error handling is implemented for all endpoints
