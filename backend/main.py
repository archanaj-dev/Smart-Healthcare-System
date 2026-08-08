from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.appointment import router as appointment_router
from routes.doctor import router as doctor_router
from routes.manage_appointment import router as manage_appointment_router
from routes.prescription import router as prescription_router
from routes.report import router as report_router
from routes.manage_doctor import router as manage_doctor_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/report-test")
def report_test():
    return {
        "message": "REPORT ROUTE IS WORKING"
    }

app.include_router(auth_router)
app.include_router(appointment_router)
app.include_router(doctor_router)
app.include_router(manage_appointment_router)
app.include_router(prescription_router)
app.include_router(report_router)
app.include_router(manage_doctor_router)