## Docker Hub Images
## Database Image
- **Repository:** https://hub.docker.com/r/nadineemad/lab6-db
- **Image:** nadineemad/lab6-db:latest
- **Pull Command:** docker pull nadineemad/lab6-db:latest

## Backend Image
- **Repository:** https://hub.docker.com/r/nadineemad/lab6-backend
- **Image:** nadineemad/lab6-backend:latest
- **Pull Command:** docker pull nadineemad/lab6-backend:latest

## Frontend Image
- **Repository:** https://hub.docker.com/r/nadineemad/lab6-frontend
- **Image:** nadineemad/lab6-frontend:latest
- **Pull Command:** docker pull nadineemad/lab6-frontend:latest

## Project Overview
Database: MySQL 8.0
Backend: Node.js with Express
Frontend: React with Vite

## Running Containers
1-Database Container (lab6-docker-lab-nadineemad1-db-1)

Port: 3306
Purpose: MySQL database for persistent data storage

2-Backend Container (lab6-docker-lab-nadineemad1-backend-1)

Port: 3000
Purpose: RESTful API server

3-Frontend Container (lab6-docker-lab-nadineemad1-frontend-1)

Port: 5173
Purpose: React user interface

## Docker Images
Total Images: 6

Project Images (3):
nadineemad/lab6-db:latest- MySQL database
nadineemad/lab6-backend:latest - Node.js backend
nadineemad/lab6-frontend:latest - React frontend

Base Images (3):
mysql:8.0 - Official MySQL image
node:18-alpine - Official Node.js image
react:latest - React library (installed via npm in Node.js container)

## Project Structure
lab6-docker-lab-nadineemad1/
├── docker-compose.yml       # Container orchestration
├── .env                     # Environment variables
├── REPORT.md               # This file
├── db/
│   ├── Dockerfile          # Database container config
│   └── init.sql            # Database initialization
├── backend/
│   ├── Dockerfile          # Backend container config
│   ├── package.json        # Node.js dependencies
│   └── server.js           # Express API server
└── frontend/
    ├── Dockerfile          # Frontend container config
    ├── package.json        # React dependencies
    └── src/
        ├── App.jsx         # Main React component
        └── main.jsx        # React entry point

## Running the Application
## Method 1: Using Docker Compose 

# Clone repository
git clone <repository-url>
cd lab6-docker-lab-nadineemad1
# Start all services
docker-compose up --build -d
# Check status
docker-compose ps
# Stop services
docker-compose down

## Method 2: Running Individually

# Database
docker run -d --name lab6-db -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=user_db \
  nadineemad/lab6-db:latest

# Backend
docker run -d --name lab6-backend -p 3000:3000 \
  -e DB_HOST=host.docker.internal \
  -e DB_USER=root \
  -e DB_PASSWORD=rootpassword \
  -e DB_NAME=user_db \
  nadineemad/lab6-backend:latest

# Frontend
docker run -d --name lab6-frontend -p 5173:5173 \
  -e VITE_API_URL=http://localhost:3000 \
  nadineemad/lab6-frontend:latest


## Access Points
Frontend: http://localhost:5173
Backend API: http://localhost:3000
Database: localhost:3306