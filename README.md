# 📋 Task Manager API — Full-Stack Application

A comprehensive full-stack task management application with role-based permissions, JWT authentication, real-time filtering, and a modern responsive React dashboard. Built for scalability and production-ready deployment.

---

## 📌 Project Overview

**Task Manager** is an enterprise-ready task management system designed for teams and organizations. It provides:
- **Secure authentication** with JWT tokens and refresh mechanisms
- **Role-based access control** (USER/ADMIN) with granular permissions
- **Complete task lifecycle management** with status and priority tracking
- **Real-time filtering & search** with pagination support
- **Admin capabilities** for user management and oversight
- **RESTful API** with comprehensive documentation via Swagger
- **Modern UI** built with React and Tailwind CSS using neomorphism design

---
<table>
  <tr>
    <td><img src="./Screenshot 2026-04-21 214247.png" width="300"/></td>
    <td><img src="./Screenshot 2026-04-21 214654.png" width="300"/></td>
  </tr>
  <tr>
    <td><img src="./Screenshot 2026-04-21 214713.png" width="300"/></td>
    <td><img src="./Screenshot 2026-04-21 214728.png" width="300"/></td>
  </tr>
  <img src="./Screenshot 2026-04-21 214737.png" width="300"/>
</table>
## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  React + Vite + TypeScript + Tailwind CSS                        │
│  ├─ Login / Register Pages                                       │
│  ├─ Protected Dashboard                                          │
│  ├─ Task Management UI                                           │
│  ├─ User Management Panel (Admin)                                │
│  └─ Real-time Toast Notifications                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Axios API Calls
                           │ (JWT Bearer Token)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY / MIDDLEWARE                    │
├─────────────────────────────────────────────────────────────────┤
│  ├─ CORS & Helmet Security                                       │
│  ├─ Rate Limiting (300 requests/15min)                           │
│  ├─ Request Logging (Morgan)                                     │
│  ├─ JWT Authentication & Validation                              │
│  ├─ Role-Based Authorization                                     │
│  └─ Global Error Handling                                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    ▼──────▼──────▼
        ┌──────────────┬──────────────┐
        │ AUTH ROUTES  │ TASK ROUTES  │
        ├──────────────┼──────────────┤
        │ • Register   │ • Create     │
        │ • Login      │ • Read       │
        │ • Profile    │ • Update     │
        │              │ • Delete     │
        │              │ • Filter     │
        │              │ • Page       │
        └──────────────┴──────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL (Primary)                                            │
│  ├─ Users Table (id, email, name, password, role, timestamps)   │
│  ├─ Tasks Table (id, title, desc, status, priority, userId)     │
│  └─ Relationships (FK: userId → User)                            │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
User Input (Login)
    ↓
Client Validation
    ↓
API Call with Credentials
    ↓
Express Middleware (Rate Limit, Parse)
    ↓
Auth Controller → Bcrypt Password Verify
    ↓
JWT Token Generation
    ↓
Response with Token to Client
    ↓
Token Stored in LocalStorage
    ↓
Subsequent Requests + Bearer Token
    ↓
JWT Verification Middleware
    ↓
Role Check Middleware
    ↓
Route Handler (Task CRUD)
    ↓
Prisma ORM → PostgreSQL Query
    ↓
Response with Data
    ↓
Frontend Update & Display
```

---

## 🛠️ Tech Stack

| **Component** | **Technology** | **Purpose** |
|---|---|---|
| **Backend Runtime** | Node.js (LTS) | JavaScript runtime for server |
| **Backend Framework** | Express.js 5.x | REST API framework with middleware |
| **Language** | TypeScript 6.x | Type-safe JavaScript |
| **ORM** | Prisma 6.x | Database abstraction & migrations |
| **Database** | PostgreSQL 14+ | Relational data storage |
| **Authentication** | JWT (jsonwebtoken 9.x) | Token-based auth |
| **Password Hashing** | bcryptjs 3.x | Secure password storage |
| **Security** | Helmet, CORS | HTTP headers & cross-origin |
| **Rate Limiting** | express-rate-limit | DDoS & abuse prevention |
| **Logging** | Morgan, Winston | Request & application logs |
| **API Documentation** | Swagger/OpenAPI | Interactive API docs |
| **Frontend Framework** | React 19.x | UI library |
| **Build Tool** | Vite 8.x | Fast bundler & dev server |
| **Styling** | Tailwind CSS 4.x | Utility-first CSS |
| **HTTP Client** | Axios 1.x | Promise-based HTTP requests |
| **Form Management** | React Hook Form | Efficient form handling |
| **Routing** | React Router 7.x | Client-side navigation |
| **Notifications** | React Hot Toast | User feedback toasts |
| **Linting** | ESLint 9.x | Code quality |

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ User registration with email validation
- ✅ Secure JWT token generation & verification
- ✅ Refresh token mechanism for session extension
- ✅ Password hashing with bcryptjs (salt rounds: 10)
- ✅ Protected routes with authentication middleware
- ✅ CORS enabled for frontend communication
- ✅ Helmet security headers
- ✅ Rate limiting (300 requests per 15 minutes)

### 👥 Role-Based Access Control (RBAC)
- ✅ **USER role**: Can create, view, update, delete own tasks
- ✅ **ADMIN role**: Full access + user management capabilities
- ✅ Role verification middleware on all protected routes
- ✅ Granular permission checks per endpoint

### 📝 Task Management
- ✅ **Create tasks** with title, description, priority, status
- ✅ **Read/List tasks** with advanced filtering
- ✅ **Update tasks** (status, priority, description)
- ✅ **Delete tasks** with cascading cleanup
- ✅ **Filter by status** (PENDING, IN_PROGRESS, COMPLETED)
- ✅ **Filter by priority** (LOW, MEDIUM, HIGH)
- ✅ **Search functionality** by title/description
- ✅ **Pagination support** (configurable page size)
- ✅ **Task statistics** (total, completed, pending count)

### 📊 Admin Dashboard
- ✅ View all users in the system
- ✅ User information display (name, email, role)
- ✅ User account statistics
- ✅ Tab-based interface (Tasks / Users)
- ✅ Admin-only endpoints protection

### 🎨 Frontend UX
- ✅ Neomorphism design aesthetic
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Real-time search with debouncing
- ✅ Dynamic status & priority badge colors
- ✅ Loading states & error handling
- ✅ Toast notifications for user feedback
- ✅ Modal dialogs for task creation/editing
- ✅ Confirmation modals for destructive actions
- ✅ Protected routes with automatic redirects
- ✅ Context-based global auth state

### 📡 API Features
- ✅ RESTful architecture following HTTP conventions
- ✅ API versioning (`/api/v1/`)
- ✅ Comprehensive Swagger/OpenAPI documentation
- ✅ Consistent JSON response format
- ✅ Detailed error messages with status codes
- ✅ Input validation using Joi schema validation
- ✅ Request/response logging
- ✅ Graceful error handling with custom middleware

---

## 📁 Project Structure

```
task-manager/
├── backend/                          # Node.js + Express API
│   ├── src/
│   │   ├── app.ts                   # Express app configuration
│   │   ├── server.ts                # Server startup
│   │   ├── config/
│   │   │   ├── db.ts                # Database connection
│   │   │   ├── env.ts               # Environment variables
│   │   │   └── swagger.ts           # Swagger configuration
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts   # Authentication logic
│   │   │   └── task.controller.ts   # Task CRUD logic
│   │   ├── routes/
│   │   │   ├── auth.routes.ts       # Auth endpoints
│   │   │   └── task.routes.ts       # Task endpoints
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts   # JWT verification
│   │   │   ├── role.middleware.ts   # Role-based checks
│   │   │   └── error.middleware.ts  # Error handling
│   │   ├── models/
│   │   │   ├── user.model.ts        # User business logic
│   │   │   └── task.model.ts        # Task business logic
│   │   ├── validators/
│   │   │   ├── auth.validator.ts    # Auth validation schemas
│   │   │   └── task.validator.ts    # Task validation schemas
│   │   └── utils/
│   │       ├── logger.ts            # Logging utility
│   │       └── response.helper.ts   # Response formatting
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── seed.ts                  # Database seeding script
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                         # React + Vite UI
│   ├── src/
│   │   ├── main.tsx                 # Entry point
│   │   ├── App.tsx                  # Main routing
│   │   ├── context/
│   │   │   └── AuthContext.tsx      # Global auth state
│   │   ├── pages/
│   │   │   ├── Login.tsx            # Login page
│   │   │   ├── Register.tsx         # Registration page
│   │   │   ├── Dashboard.tsx        # Main dashboard
│   │   │   └── NotFound.tsx         # 404 page
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Navigation bar
│   │   │   ├── TaskCard.tsx         # Task display card
│   │   │   ├── TaskModal.tsx        # Task creation/edit modal
│   │   │   ├── DeleteConfirmModal.tsx # Delete confirmation
│   │   │   ├── ProtectedRoute.tsx   # Route protection
│   │   │   ├── Modal.tsx            # Reusable modal
│   │   │   └── Toast.tsx            # Notification system
│   │   ├── hooks/
│   │   │   ├── useAuth.ts           # Auth hook
│   │   │   └── useTasks.ts          # Task management hook
│   │   ├── api/
│   │   │   ├── auth.api.ts          # Auth API calls
│   │   │   └── task.api.ts          # Task API calls
│   │   ├── assets/
│   │   │   ├── hero.png             # Hero image
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── docker-compose.yml               # Container orchestration
├── package.json                     # Root package config
└── README.md                        # This file
```

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** or **yarn** package manager
- **PostgreSQL** 14+ database
- **Git** for version control

### Installation Steps

#### 1. **Clone & Install Dependencies**
```bash
# Clone the repository
git clone <repo-url>
cd new-folder-\(3\)

# Install root dependencies (if needed)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 2. **Configure Backend Environment**
```bash
cd backend

# Copy example environment file
cp .env.example .env

# Edit .env with your configuration:
# DATABASE_URL=postgresql://user:password@localhost:5432/taskmanager
# JWT_SECRET=your-super-secret-key-here
# FRONTEND_URL=http://localhost:5173
# PORT=5000
```

#### 3. **Setup Database**
```bash
cd backend

# Run Prisma migrations
npx prisma migrate dev

# Seed database with test data
npx prisma db seed

# (Optional) View database in Prisma Studio
npx prisma studio
```

#### 4. **Start Backend Server**
```bash
cd backend

# Development mode with auto-reload
npm run dev

# Server will run on http://localhost:5000
# Swagger docs available at http://localhost:5000/api-docs
```

#### 5. **Start Frontend Development Server**
```bash
cd frontend

# Start Vite dev server with HMR
npm run dev

# Frontend will run on http://localhost:5173
```

#### 6. **Access the Application**
- Open browser and navigate to **[http://localhost:5173](http://localhost:5173)**
- Login with test credentials (see below)

---

## 🔑 Test Credentials

| Type | Email | Password |
|---|---|---|
| **Admin User** | `admin@test.com` | `Admin@123` |
| **Regular User** | `user@test.com` | `User@123` |

---

## 📡 API Endpoints Documentation

### Authentication Endpoints

| **Method** | **Route** | **Access** | **Description** |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Public | Register a new user account |
| `POST` | `/api/v1/auth/login` | Public | Login and receive JWT token |
| `GET` | `/api/v1/auth/me` | USER, ADMIN | Get current user profile |

**Example Request (Login):**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Admin@123"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "name": "Admin",
      "email": "admin@test.com",
      "role": "ADMIN"
    }
  }
}
```

### Task Endpoints

| **Method** | **Route** | **Access** | **Description** |
|---|---|---|---|
| `POST` | `/api/v1/tasks` | USER, ADMIN | Create a new task |
| `GET` | `/api/v1/tasks` | USER, ADMIN | List tasks with filters & pagination |
| `GET` | `/api/v1/tasks/:id` | USER, ADMIN | Get specific task by ID |
| `PUT` | `/api/v1/tasks/:id` | USER, ADMIN | Update task details |
| `DELETE` | `/api/v1/tasks/:id` | USER, ADMIN | Delete a task |
| `GET` | `/api/v1/tasks/admin/users` | ADMIN | List all users (admin only) |

**Example Request (Create Task):**
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project setup",
    "description": "Setup database and deploy",
    "priority": "HIGH",
    "status": "PENDING"
  }'
```

**Example Request (List Tasks with Filters):**
```bash
curl -X GET "http://localhost:5000/api/v1/tasks?status=PENDING&priority=HIGH&search=setup&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Documentation
- **Swagger UI**: Available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- Try all endpoints directly from the interactive Swagger interface

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') DEFAULT 'PENDING',
  priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
  userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Relationships
- **One-to-Many**: One User → Many Tasks
- **Cascade Delete**: Deleting a user cascades to their tasks

---

## 🎨 Screenshots & UI Components

### Hero Image
The application uses a modern neomorphism design aesthetic with the following visual elements:

```
Frontend Asset: frontend/src/assets/hero.png
```

### Key UI Components

1. **Authentication Pages**
   - Clean login form with email & password fields
   - Registration form with validation feedback
   - Link navigation between login and register

2. **Dashboard**
   - Header with user info, role badge, and logout button
   - Statistics cards showing task counts (Total, Completed, Pending, In Progress)
   - Status filter tabs (ALL, PENDING, IN_PROGRESS, COMPLETED)
   - Priority dropdown filter
   - Search input for real-time filtering
   - Task cards with color-coded badges
   - Create task button with modal dialog

3. **Task Cards**
   - Title and description display
   - Status badge (color-coded by status)
   - Priority badge (color-coded by priority)
   - Action buttons (Edit, Delete)
   - Created/updated timestamps

4. **Admin Features**
   - Users tab showing all registered users
   - User details (Name, Email, Role)
   - Task management interface
   - Statistics and overview

5. **Modals**
   - Task creation/editing modal
   - Delete confirmation modal
   - Form validation with error messages

### Color Scheme
- **Background**: `#FAFAF5` (Off-white)
- **Text**: `#1A1A1A` (Dark gray)
- **Pending**: `#FFD84D` (Yellow)
- **In Progress**: `#2EC4B6` (Teal)
- **Completed**: `#C7F464` (Green)
- **High Priority**: `#FF6B6B` (Red)
- **Low Priority**: `#C7F464` (Green)

---

## 🔄 Workflow Example

### User Journey: Creating a Task

```mermaid
graph TD
    A[User Opens Dashboard] --> B[User Clicks Create Task]
    B --> C[Modal Opens]
    C --> D[User Fills Form]
    D --> E[User Submits]
    E --> F[Frontend Validates]
    F --> G{Valid?}
    G -->|No| H[Show Error Toast]
    H --> D
    G -->|Yes| I[API Call with Token]
    I --> J[Backend Auth Middleware]
    J --> K{Token Valid?}
    K -->|No| L[Return 401]
    K -->|Yes| M[Role Check]
    M --> N[Task Controller]
    N --> O[Validate Input with Joi]
    O --> P{Valid?}
    P -->|No| Q[Return 400]
    P -->|Yes| R[Create in DB via Prisma]
    R --> S[Return 201 with Task]
    S --> T[Frontend Updates List]
    T --> U[Show Success Toast]
    U --> V[Modal Closes]
```

---

## 🛡️ Security Features

- ✅ **JWT Authentication** with secure token verification
- ✅ **Password Hashing** using bcryptjs (10 salt rounds)
- ✅ **CORS Protection** - restricted to frontend domain
- ✅ **Helmet Security Headers** - prevents common attacks
- ✅ **Rate Limiting** - prevents brute force attacks (300/15min)
- ✅ **Input Validation** - Joi schema validation on all inputs
- ✅ **SQL Injection Prevention** - Prisma parameterized queries
- ✅ **XSS Protection** - React auto-escapes content
- ✅ **HTTPS Ready** - Can be deployed with SSL/TLS
- ✅ **Error Message Sanitization** - no sensitive info exposed

---

## 📈 Scalability Architecture

### For Production Deployment

```
┌─────────────────┐
│  Load Balancer  │ (NGINX + Health Checks)
└────────┬────────┘
         │
    ┌────┴────┬────────┬─────────┐
    ▼         ▼        ▼         ▼
┌────────┐┌────────┐┌────────┐┌────────┐
│API #1  ││API #2  ││API #3  ││API #N  │ (Horizontal Scale)
└────────┘└────────┘└────────┘└────────┘
         │
    ┌────▼────┐
    │  Redis  │ (Cache Layer)
    └────┬────┘
         │
    ┌────▼──────────────┐
    │ PostgreSQL Primary │ (Writes)
    └────┬──────────────┘
         │
    ┌────┴────────┐
    ▼             ▼
┌──────────┐ ┌──────────┐
│ Read Rep │ │ Read Rep │ (Read-Only Replicas)
└──────────┘ └──────────┘
```

### Recommended Improvements for Scale

1. **Microservices Architecture**
   - Auth Service (handles JWT, sessions, user management)
   - Task Service (CRUD, filtering, reporting)
   - Notification Service (email, webhooks)

2. **Caching Strategy**
   - Redis for session storage
   - Cache filtered task results with TTL
   - User role cache with invalidation

3. **Database Optimization**
   - Read replicas for expensive queries
   - Connection pooling (PgBouncer)
   - Index optimization on frequently filtered columns

4. **API Gateway**
   - Kong or AWS API Gateway
   - Request throttling & quota management
   - API versioning & blue-green deployment

5. **Monitoring & Logging**
   - Centralized logging (ELK stack)
   - Application performance monitoring (APM)
   - Error tracking (Sentry)
   - Database profiling

6. **CI/CD Pipeline**
   - GitHub Actions for automated testing
   - Docker containerization
   - Kubernetes orchestration
   - Automated deployments

---

## 🐳 Docker Support

The project includes `docker-compose.yml` for containerized local development:

```bash
# Start all services (API, Frontend, Database)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

---

## 📝 Environment Variables

### Backend (.env)
```bash
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/taskmanager
DIRECT_URL=postgresql://user:password@localhost:5432/taskmanager

# JWT
JWT_SECRET=your-secure-secret-key-minimum-32-chars
JWT_EXPIRE=7d

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=debug
```

### Frontend (.env or .env.local)
```bash
VITE_API_URL=http://localhost:5000
VITE_API_VERSION=v1
```

---

## 🧪 Testing

### Manual API Testing (Postman/Thunder Client)

1. **Register User**
   ```
   POST /api/v1/auth/register
   Body: { "name": "Test", "email": "test@test.com", "password": "Test@123" }
   ```

2. **Login**
   ```
   POST /api/v1/auth/login
   Body: { "email": "test@test.com", "password": "Test@123" }
   Response: { token: "JWT_TOKEN", user: {...} }
   ```

3. **Create Task**
   ```
   POST /api/v1/tasks
   Header: Authorization: Bearer JWT_TOKEN
   Body: { "title": "Task Name", "priority": "HIGH", "status": "PENDING" }
   ```

4. **List Tasks**
   ```
   GET /api/v1/tasks?status=PENDING&priority=HIGH&page=1&limit=10
   Header: Authorization: Bearer JWT_TOKEN
   ```

---

## 🐛 Troubleshooting

| Issue | Solution |
|---|---|
| **Port 5000 already in use** | Change `PORT` in `.env` or kill process with `lsof -i :5000` |
| **Database connection fails** | Verify PostgreSQL is running, check `DATABASE_URL` in `.env` |
| **Frontend can't reach API** | Ensure backend is running, check `FRONTEND_URL` in backend `.env` |
| **JWT token expired** | Login again to get a fresh token |
| **CORS errors** | Verify `FRONTEND_URL` matches actual frontend URL in `.env` |
| **Prisma migration fails** | Run `npx prisma db push --force-reset` only in development |

---

## 📚 Additional Resources

- **Express.js Docs**: [expressjs.com](https://expressjs.com)
- **Prisma Docs**: [prisma.io](https://prisma.io)
- **React Docs**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **JWT**: [jwt.io](https://jwt.io)
- **PostgreSQL**: [postgresql.org](https://postgresql.org)

---

## 📜 API Response Format

All API responses follow a consistent format:

**Success Response (2xx)**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* actual data */ }
}
```

**Error Response (4xx, 5xx)**
```json
{
  "success": false,
  "message": "Descriptive error message",
  "error": "Error code or details"
}
```

---

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make changes and test thoroughly
3. Commit: `git commit -m "Add feature description"`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request with description

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Created as a production-ready full-stack application demonstrating:
- Modern backend architecture with Express.js
- Type-safe development with TypeScript
- Database design with Prisma ORM
- Secure authentication & authorization
- Responsive frontend with React
- Best practices for scalability

---

**Last Updated**: April 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
# scalable-auth-api-system
