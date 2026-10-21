# UNSCRIPTED — AI-Powered Career Guidance & Discovery Platform 🎮🚀

> **"Your career has no script. Play the journey."**

[![Java](https://img.shields.io/badge/Backend-Java%2017%2B-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Framework-Spring%20Boot%204-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/UI-React%2019%20%7C%20Tailwind%20CSS%20v4-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![O*NET](https://img.shields.io/badge/Data-O*NET%2029.0%20%26%20BLS-0052CC)](https://www.onetcenter.org/)

---

## 🌟 Overview

**Unscripted** transforms career exploration from static surveys and corporate questionnaires into an **interactive, progression-based gamified journey** powered by real-world occupational data from the official **O\*NET 29.0 database** and the **U.S. Bureau of Labor Statistics (BLS)**.

- **Backend:** Built with **Java and Spring Boot**, following an MVC-style and OOP modular architecture with RESTful APIs for user profiling and AI recommendations.
- **Persistence Layer:** Designed with efficient **MongoDB schemas** (`user_profiles`, `user_journeys`, `career_results`) supporting full CRUD operations, index optimization, and session state tracking.
- **Frontend:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Framer Motion, and tactile 3D adventure maps.

---

## 🎮 Core Experience

1. **The Trial of Horizons (`/explore`)**:
   - Scenario-driven missions led by story mentors (**Aurelia**, **Rowan**, and **Theron**).
   - Dynamic Archetype Compass tracking instincts, Holland RIASEC codes, and learning superpowers.

2. **O\*NET Sourced Horizons (`/results`)**:
   - Real occupations with official **O\*NET-SOC codes** (e.g. `15-1252.00`).
   - Official BLS **Median Annual Wages** ($) and **Projected Job Outlook** percentages with Bright Outlook badges.

3. **Honest Workplace Reality Check (`/reality-check`)**:
   - Authentic day-to-day work tasks, beginner friction points, and daily workplace realities.
   - Live skills gap analysis with a one-click **"Lock Horizon & Play Stage Map"** action.

4. **15-Stage Progression Map (`/journey`)**:
   - Progression map across 5 themed chapter biomes with interactive crisis simulations.
   - Continuous XP, badges, persistent level unlocks, and stage evaluation.

5. **Player Guild & Command Deck (`/dashboard`)**:
   - Profile command deck, saved horizons archive, and MongoDB-backed player stats.

---

## 🛠️ Architecture & Tech Stack

```
unscripted/
├── src/main/java/com/unscripted/backend/
│   ├── controller/      # REST API Controllers (ApiController)
│   ├── model/           # MongoDB Schemas & Domain Entities (@Document, @Id, @Indexed)
│   ├── repository/     # Spring Data MongoDB Repositories (UserProfileRepository, UserJourneyRepository, CareerResultRepository)
│   └── service/        # Business logic, simulation algorithms, O*NET integration, and UserService
├── src/main/resources/
│   ├── application.properties # MongoDB & O*NET API configuration
│   └── static/          # Embedded fallback UI assets
└── frontend/            # Next.js 16 + React 19 + Tailwind CSS frontend application
```

---

## 📡 RESTful API Endpoints (CRUD)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user profile in MongoDB |
| `POST` | `/api/auth/login` | Authenticate user credentials |
| `GET` | `/api/users` | List all user profiles (Read All) |
| `GET` | `/api/user/{id}` | Retrieve profile by user ID (Read One) |
| `PUT` | `/api/user/{id}` | Update structured user profile (Update) |
| `DELETE` | `/api/user/{id}` | Remove user profile and journey data (Delete) |
| `POST` | `/api/simulate` | Personalized career recommendations & scoring |
| `GET` | `/api/careers` | Retrieve full career catalog |
| `GET` | `/api/user/{id}/saved-careers` | Retrieve user's bookmarked careers |
| `POST` | `/api/user/{id}/saved-careers` | Save career to user's MongoDB profile |
| `GET` | `/api/journey/{userId}` | Retrieve user journey progression |
| `POST` | `/api/journey/stage/complete` | Complete stage, award XP, update state |
| `GET` | `/api/onet/status` | O*NET API connectivity & embedded dataset health |
| `GET` | `/api/onet/occupations` | Search O*NET 29.0 occupational database |

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+** (JDK 17, 21, or 24)
- **Node.js 20+** & **npm**
- **MongoDB** running locally on port 27017 (or MongoDB Atlas connection string)

### 1. Run the Spring Boot Backend
```bash
# In the root unscripted directory:
./mvnw clean spring-boot:run
```
Backend runs at: `http://localhost:8081`

### 2. Run the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:3000`

### 3. Run Backend Test Suite
```bash
./mvnw test
```

---

## 🔑 Environment Variables (Optional)
Unscripted runs **out-of-the-box** using an authentic embedded O\*NET 29.0 database and local MongoDB.

```bash
# MongoDB (defaults to mongodb://localhost:27017/unscripted)
MONGODB_URI=mongodb://localhost:27017/unscripted

# Optional live O*NET Web Services Credentials
ONET_USERNAME=your_onet_username
ONET_PASSWORD=your_onet_password
```

---

## 👤 Author
**Gayatri Dushing**
- GitHub: [@GayatriDushing2345](https://github.com/GayatriDushing2345)
