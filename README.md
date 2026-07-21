# Full-Stack Portfolio & Admin Workspace

A modern, high-performance developer portfolio and administrative dashboard built with React (TypeScript), Express, Node.js, and MongoDB.

---

## 🚀 Tech Stack

### **Frontend**
- **Core**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React & React Icons

### **Backend**
- **Core**: Node.js + Express + TypeScript
- **Database**: MongoDB via Mongoose
- **Authentication**: JWT (JSON Web Tokens) with Bcrypt password hashing
- **Security & Utilities**: CORS, Express-Rate-Limit, Express JSON error handling

---

## 📁 Repository Structure

```text
portfolio/
├── frontend/             # React SPA (Vite + TypeScript + Tailwind)
│   ├── src/
│   │   ├── config/       # API configuration
│   │   ├── pages/        # Public pages & Admin Workspace
│   │   └── utils/        # Admin fetch & helper utilities
│   └── package.json
└── backend/              # Express REST API (TypeScript + Node.js)
    ├── src/
    │   ├── config/       # Database setup
    │   ├── controllers/  # Route logic handlers
    │   ├── middleware/   # Authentication & validation
    │   ├── models/       # Mongoose schemas (Blog, Project, Product, Contact, Admin)
    │   ├── routes/       # Express route endpoints
    │   └── scripts/      # Database seed scripts
    └── package.json
```

---

## ⚙️ Environment Configuration

### **Backend (`backend/.env`)**
Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=prabhatyadav.dbg@gmail.com
ADMIN_PASSWORD=your_secure_password_here
```

### **Frontend (`frontend/.env`)**
Create a `.env` file inside the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000
```

---

## 🛠️ Quick Start & Setup

### **1. Install Dependencies**

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

---

### **2. Seed the Admin User**

Run the database seed script to initialize or update the admin credentials in MongoDB:

```bash
cd backend
npx ts-node src/scripts/seedAdmin.ts
```

---

### **3. Run Development Servers**

#### Start Backend Server:
```bash
cd backend
npm run dev
```

#### Start Frontend Server:
```bash
cd frontend
npm run dev
```

---

## 🔐 Security Features

- **JWT Authentication**: Secured admin endpoints (`POST/PUT/DELETE`) guarded by authentication middleware.
- **Login Rate Limiting**: Max 5 failed authentication attempts trigger a 15-minute temporary lockout.
- **Strict CORS Policy**: Requests strictly restricted to configured `CLIENT_URL`.
- **Sanitized JSON Parser**: Express error handler prevents unhandled parser rejections on invalid payloads.
