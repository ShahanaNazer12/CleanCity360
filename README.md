# 🌍 Clean City 360

Clean City 360 is a full-stack MERN-based Garbage Management System that enables citizens to raise waste collection requests, workers to manage assigned tasks by area, and administrators to monitor and control city sanitation operations efficiently.

---

## 🚀 Features

### 👤 User Module
- User Registration & Login (JWT Authentication)
- Raise Garbage Collection Requests
- Track Request Status
- View Completed Requests

### 👷 Worker Module
- Secure Worker Login
- View Assigned Area
- Manage Assigned Requests
- Update Request Status (Pending → In Progress → Completed)

### 🛠️ Admin Module
- Manage Users & Workers
- Assign Workers to Areas
- Monitor All Requests
- View Completed Services

---

## 🏗️ Tech Stack

### 🔹 Frontend
- React.js
- Redux Toolkit
- Axios
- React Bootstrap

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (Password Hashing)

---

## 📂 Project Structure

CLEANCITY360/
│
├── backend/
│   ├── config/            # Database & app configuration
│   ├── controllers/       # Business logic
│   ├── middlewares/       # Auth & custom middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── app.js             # Express app setup
│   ├── server.js          # Server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── user/          # User dashboard pages
│   │   ├── worker/        # Worker dashboard pages
│   │   ├── components/    # Reusable components
│   │   ├── pages/
│   │   ├── redux/         # Redux slices
│   │   ├── assets/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── README.md
└── .gitignore

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ShahanaNazer12/CleanCity360.git
cd cleancity360

2️⃣ Backend Setup
cd backend
npm install

Run backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev   