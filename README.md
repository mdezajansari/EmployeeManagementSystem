# Employee Management System (EMS)

A **Full Stack Employee Management System** built with a modern Java + React tech stack.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java 17, Spring Boot 3, Spring Security, JWT |
| **Database** | MySQL |
| **Frontend** | React (Vite), Tailwind CSS |
| **Auth** | Role-Based Access Control (Admin / Employee) |

---

## 🚀 Features

### Admin Panel
- Dashboard with summary cards (Employees, Departments, Payroll, Leaves)
- Manage Employees — Add, View, Edit employees
- Manage Departments — Add, Edit, Delete departments
- Salary Management — View salary history, add new salary records
- Leave Management — View and filter leave applications (Pending / Approved / Rejected)
- Change Password

### Employee Portal
- Personal Dashboard
- My Profile
- My Salary History
- My Leave — View leave status, Apply for new leave
- Change Password

---

## 📁 Project Structure

```
EMS/
├── backend/          # Spring Boot REST API
│   └── src/main/java/com/ems/backend/
│       ├── controller/
│       ├── entity/
│       ├── repository/
│       ├── security/
│       └── dto/
│
└── frontend/         # React + Vite SPA
    └── src/
        ├── components/
        ├── api/
        └── App.jsx
```

---

## ⚙️ Setup & Running Locally

### Backend

1. Create a MySQL database named `ems_db`
2. Copy `.env.example` to `.env` and fill in your credentials
3. Set environment variables:
   ```
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_jwt_secret_key
   ```
4. Run:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   API runs on **http://localhost:8080**

### Frontend

1. Copy `frontend/.env.example` to `frontend/.env`
2. Set:
   ```
   VITE_API_BASE_URL=http://localhost:8080
   ```
3. Run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App runs on **http://localhost:5173**

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| Frontend | [Netlify](https://netlify.com) |
| Backend | [Render](https://render.com) |
| Database | [PlanetScale](https://planetscale.com) or [Railway](https://railway.app) |

Set `VITE_API_BASE_URL` in your Netlify environment variables to your Render backend URL.

---

## 🔑 Test Credentials

| Role | Email | Password |
|---|---|---|
| Admin | Admin@gmail.com | password |
| User | user@gmail.com | password |

---

## 👤 Author

Built by **MD EZAJ**
