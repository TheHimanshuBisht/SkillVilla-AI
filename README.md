# SkillVilla

A full-stack MERN learning platform. This repository currently contains the **backend authentication system**: user signup, login with JWT, and protected routes. The frontend and remaining features are under development.

## Features (implemented)

- User signup with input validation and duplicate-email check
- Password hashing with **bcrypt** (plain passwords are never stored)
- Login that returns a signed **JWT** (valid for 7 days)
- Reusable **auth middleware** that protects private routes
- Protected `GET /me` route returning the logged-in user's profile (without the password)
- Centralised error handling with proper HTTP status codes

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas with Mongoose |
| Auth | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` |
| Config | `dotenv` |
| Testing | Postman |

## Project Structure

```
SkillVilla/
└── Backend/
    ├── server.js                  # Entry point: loads env, connects DB, starts server
    ├── .env                       # Secrets (not committed)
    └── src/
        ├── app.js                 # Express app setup and route mounting
        ├── db/
        │   └── db.js              # MongoDB connection
        ├── models/
        │   └── user.model.js      # User schema
        ├── routes/
        │   └── auth.routes.js     # Signup, login, /me
        └── middlewares/
            └── auth.middleware.js # JWT verification
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- A MongoDB Atlas cluster (or a local MongoDB instance)

### Installation

```bash
git clone <https://github.com/TheHimanshuBisht/SkillVilla-AI.git>
cd SkillVilla/Backend
npm install
```

### Environment variables

Create a `.env` file inside `Backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret_string
```

Generate a strong secret with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Run the server

```bash
npx nodemon server.js
```

The server runs on `http://localhost:3000`. You should see:

```
server is running on port 3000
Database Connected Successfully
```

## API Reference

Base URL: `http://localhost:3000/api/auth`

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/signup` | No | Create a new account |
| POST | `/login` | No | Log in and receive a JWT |
| GET | `/me` | Yes | Get the current user's profile |

### POST `/signup`

Request body:

```json
{
  "name": "Test User",
  "email": "test@gmail.com",
  "password": "12345678"
}
```

Responses:

| Status | Meaning |
|---|---|
| 201 | Account created |
| 400 | Missing fields, or password shorter than 8 characters |
| 409 | An account with this email already exists |
| 500 | Server error |

### POST `/login`

Request body:

```json
{
  "email": "test@gmail.com",
  "password": "12345678"
}
```

Success response (200):

```json
{
  "message": "Login Successful",
  "token": "<jwt_token>",
  "user": { "id": "...", "name": "Test User", "email": "test@gmail.com" }
}
```

| Status | Meaning |
|---|---|
| 200 | Login successful |
| 400 | Email or password missing |
| 401 | Invalid email or password |
| 500 | Server error or missing `JWT_SECRET` |

### GET `/me` (protected)

Send the token in the request header:

```
Authorization: Bearer <jwt_token>
```

| Status | Meaning |
|---|---|
| 200 | Returns the user profile (password excluded) |
| 401 | No token, or invalid / expired token |
| 404 | User no longer exists |

## How Authentication Works

1. **Signup:** the password is hashed with bcrypt (10 salt rounds) and the user is saved in MongoDB.
2. **Login:** the server finds the user and checks the password with `bcrypt.compare`. If it matches, it creates a JWT containing the user's id and email, signed with `JWT_SECRET`.
3. **Protected routes:** the client sends the token as `Authorization: Bearer <token>`. The auth middleware verifies the signature and expiry with `jwt.verify`, attaches the decoded data to `req.user`, and passes the request to the route.

## Security Practices

- Passwords are hashed, never stored in plain text
- The password field is hidden from queries by default (`select: false`)
- Login returns the same error message for a wrong email and a wrong password, which prevents user enumeration
- Secrets are stored in `.env` and excluded from Git
- Tokens expire after 7 days

## Roadmap

- [x] Backend authentication (signup, login, JWT, protected routes)
- [ ] Frontend with React (signup, login, protected pages)
- [ ] Remaining feature routes
- [ ] Deployment (Render for backend, Vercel for frontend)

## Author

**Himanshu Bisht**

- GitHub: [TheHimanshuBisht](github.com/TheHimanshuBisht)
- LinkedIn: linkedin.com/in/himanshu-bisht-031aa8330/

