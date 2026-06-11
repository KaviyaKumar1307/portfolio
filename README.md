# Kaviya V — Personal Portfolio

A full-stack personal portfolio website built with HTML/CSS/JS, Node.js/Express.js, and MongoDB.

## Project Structure
```
portfolio/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## Setup Instructions

### Backend
```bash
cd backend
npm install
# Edit .env and add your MongoDB Atlas URI
npm run dev
```

### Frontend
Open `frontend/index.html` with VS Code Live Server, or visit `http://localhost:5000` after starting the backend.

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/projects | Get all projects |
| POST | /api/projects | Add a project |
| POST | /api/contact | Save contact message |
| GET | /api/contacts | View all messages |

## Deployment
- Frontend → Vercel or Netlify
- Backend → Render.com
- Database → MongoDB Atlas (free tier)
