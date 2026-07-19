from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from app.routers import auth, dashboard, plans, employees, commissions, approvals, validation, disputes, audit, analytics, ai

app = FastAPI(title="CommissionEngine AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(plans.router)
app.include_router(employees.router)
app.include_router(commissions.router)
app.include_router(approvals.router)
app.include_router(validation.router)
app.include_router(disputes.router)
app.include_router(audit.router)
app.include_router(analytics.router)
app.include_router(ai.router)


@app.get("/")
def root():
    return RedirectResponse(url="/docs")


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "CommissionEngine AI API", "version": "1.0.0"}
