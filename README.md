
# ⚖️ Judiciary Information System (JIS)

A full-stack web application for managing court case records and workflows involving **Judges**, **Lawyers**, and **Registrars**. Built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

---

## 🚀 Features

### 🔐 Authentication
- Role-based login/signup (Registrar, Judge, Lawyer)
- Secure JWT token stored in HTTP-only cookies

### 👩‍⚖️ Registrar Dashboard
- Register new court cases
- View, search, and filter pending/closed cases
- Update hearing dates, summaries, adjournments
- Close cases with judgment summaries

### 🧑‍⚖️ Judge Dashboard
- View all resolved (closed) cases
- Search by crime type
- View detailed case records
- Track number of cases viewed

### ⚖️ Lawyer Dashboard
- Search and review past resolved cases
- View judgment summaries, hearings, and adjournments
- View count tracked for billing/analytics

---

## 🛠️ Tech Stack

| Layer        | Tech                    |
|--------------|-------------------------|
| Frontend     | React.js, Tailwind CSS  |
| Backend      | Node.js, Express.js     |
| Database     | MongoDB + Mongoose      |
| Auth         | JWT (HTTP-only cookie)  |
| State Mgmt   | Redux Toolkit           |
| API Testing  | Postman                 |

---

## 🗂️ Folder Structure

```
├── backend/
│   ├── models/         # Mongoose models (User, Case)
│   ├── routes/         # API route files (auth, cases)
│   ├── middleware/     # Auth middleware
│   └── server.js       # Entry point for Express server
├── frontend/
│   ├── components/     # Shared UI components (Header, CaseTable)
│   ├── pages/          # Route pages by role
│   ├── utils/          # Constants, redux slices
│   └── App.js          # Main routing file
```

---

## 🧑‍💻 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)

### 📦 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file with:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

App runs at `http://localhost:5137`

---

## 📬 API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /logout`

### Cases
- `POST /api/cases/register` – Registrar
- `PATCH /api/cases/update-hearing/:cin`
- `PATCH /api/cases/add-summary/:cin`
- `PATCH /api/cases/adjourn/:cin`
- `PATCH /api/cases/close/:cin`
- `GET /api/cases/pending`
- `GET /api/cases/resolved?from&to`
- `GET /api/cases/status/:cin`
- `GET /api/cases/search?keyword=...`

### Users
- `PATCH /api/users/viewed-case` – For tracking lawyer/judge activity

---

## 📌 Todo / Improvements

- [ ] Add PDF export for case summaries
- [ ] Implement notifications for hearing dates
- [ ] Role-specific dashboards with analytics
- [ ] Case edit/delete features (admin only)

---



---

## 🙌 Built With ❤️ By

Developed as a judiciary case management platform to simplify workflows for court officials.
