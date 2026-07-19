# CommissionEngine AI

AI-powered enterprise commission management platform for organizations managing 4000+ employees with complex commission plans.

Built by [Finmark.ai](https://finmark.ai)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | FastAPI + SQLAlchemy |
| Database | PostgreSQL |
| Cache | Redis |
| Containerization | Docker + Docker Compose |

## Features

- **Plan Builder** — Create and manage tiered, accelerator, SPIFF, and hybrid commission plans
- **Performance Intake** — Import data from CRM, attendance, call logs, and targets
- **Rule Engine** — Dynamic commission calculation with tiers, caps, floors, clawbacks
- **Commission Calculator** — Calculate commissions for 4000+ employees in minutes
- **AI Validation** — Anomaly detection, outlier identification, budget breach alerts
- **Approval Workflow** — Multi-level approval pipeline (Manager → Finance → HR → Payroll)
- **P&L Impact** — Real-time commission accrual and budget analysis
- **Rep Portal** — Employee self-service for earnings, targets, and disputes
- **Analytics** — Commission ROI, department analysis, forecasting
- **Audit Logs** — Complete activity trail with compliance tracking

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.12+
- Docker & Docker Compose (optional)

### Development (Without Docker)

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Production (With Docker)

```bash
docker compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Reusable UI components
│   │   │   ├── layout/      # Sidebar, Navbar, Layout
│   │   │   └── charts/      # Recharts components
│   │   ├── pages/           # All application pages
│   │   ├── data/            # Mock data
│   │   └── lib/             # Utilities
│   ├── Dockerfile
│   └── nginx.conf
├── backend/
│   ├── app/
│   │   ├── models/          # SQLAlchemy models
│   │   ├── routers/         # API route handlers
│   │   ├── main.py          # FastAPI application
│   │   ├── config.py        # Settings
│   │   └── database.py      # DB connection
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://postgres:postgres@localhost:5432/commission_engine |
| SECRET_KEY | JWT signing key | (change in production) |
| REDIS_URL | Redis connection string | redis://localhost:6379/0 |

## License

Proprietary — Finmark.ai
