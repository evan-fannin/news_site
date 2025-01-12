# Economic News Site Infrastructure

---

## Core Components

### Frontend (Vite + React)

- News article grid with Tailwind styling
- Individual article pages with routing
- Simple fetch calls to backend API
- Loading and error states

### Backend (Express)

- News retrieval endpoints:
  - `GET /api/news` (list of articles)
  - `GET /api/news/:id` (single article)
- PostgreSQL database for articles
- Native fetch for API calls
- Basic error handling
- Rate limiting for API endpoints
- CORS configuration for frontend

---

## Data Flow

1. Frontend requests articles from backend
2. Backend checks database for recent articles
3. Backend makes two API calls:
   - To exa API for web search results
   - To OpenRouter API (Claude-3-Sonnet) for processing
4. Process flow:
   - exa searches recent economic news
   - Claude processes and formats the results
   - Each article structured with:
     * headline
     * caption
     * content
5. Store results in PostgreSQL
6. Return formatted articles to frontend

---

## API Structure

### Backend Endpoints

#### GET /api/news
```json
{
  "articles": [
    {
      "id": "string",
      "headline": "string",
      "caption": "string",
      "content": "string",
      "timestamp": "string"
    }
  ]
}
```

#### GET /api/news/:id
```json
{
  "article": {
    "id": "string",
    "headline": "string",
    "caption": "string",
    "content": "string",
    "timestamp": "string"
  }
}
```


### Database Schema

```sql
-- Articles table
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  headline VARCHAR(255) NOT NULL,
  caption TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for efficient timestamp-based queries
CREATE INDEX idx_articles_timestamp ON articles(timestamp DESC);
```

### API Integration

#### exa API
- Purpose: Web search for recent economic news
- Environment variable: `EXA_API_KEY`

#### OpenRouter API
- Model: `anthropic/claude-3-sonnet-20240229`
- Purpose: Process and format news data
- Environment variable: `OPENROUTER_API_KEY`

---

## Implementation Steps

### 1. Initial Setup
- Create backend directory
- Create frontend using Vite + React Router
- Setup .env with API keys
- Setup PostgreSQL database

### 2. Backend Development
- Install Express and pg
- Create database schema and indexes
- Implement news endpoints
- Add API integrations
- Add error handling and rate limiting
- Configure CORS

### 3. Frontend Development
- Setup Tailwind CSS
- Create components:
  * NewsGrid
  * ArticleView
  * LoadingState
  * ErrorState
- Implement routing

---

## Deployment

### Database
- Neon DB (PostgreSQL)
  - Single production database
  - Migrations run via GitHub Actions

### Backend
- EC2 with Docker Compose
  - Deployment via GitHub Actions
  - Auto-deploy on main branch push
  - Environment variables from GitHub Secrets
  - SSL/HTTPS via AWS Certificate Manager

### Frontend
- Netlify
  - Connected to GitHub repository
  - Auto-deploy on main branch push
  - Environment variables in Netlify dashboard
  - Automatic HTTPS/SSL

### CI/CD Flow
1. Push to main branch triggers:
   - GitHub Action for backend:
     * Run database migrations
     * Build Docker image
     * Deploy to EC2
   - Netlify auto-deployment for frontend

---

## Project Structure

```
news_site/
├── .env                     # API keys and config
├── .github/
│   └── workflows/
│       ├── deploy.yml       # EC2 deployment workflow
│       └── migrations.yml   # DB migration workflow
├── backend/
│   ├── src/
│   │   ├── index.js        # Express server
│   │   ├── db.js           # PostgreSQL configuration
│   │   ├── middleware/
│   │   │   ├── rateLimit.js
│   │   │   └── cors.js
│   │   └── api/
│   │       ├── news.js     # News endpoints
│   │       ├── exa.js      # exa API integration
│   │       └── claude.js   # OpenRouter API integration
│   ├── migrations/
│   │   ├── 001_init.sql    # Initial schema
│   │   └── 002_indexes.sql # Performance indexes
│   ├── Dockerfile
│   └── docker-compose.yml
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── NewsGrid.jsx
    │   │   ├── ArticleView.jsx
    │   │   ├── Loading.jsx
    │   │   └── Error.jsx
    │   └── styles/
    │       └── tailwind.css
    └── netlify.toml
