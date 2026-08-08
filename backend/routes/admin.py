from fastapi import APIRouter
from sqlalchemy import text
from database.database import SessionLocal

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.get("/stats")
def get_stats():

    db = SessionLocal()

    try:

        patients = db.execute(
            text("SELECT COUNT(*) FROM users")
        ).scalar()

        doctors = db.execute(
            text("SELECT COUNT(*) FROM doctors")
        ).scalar()

        appointments = db.execute(
            text("SELECT COUNT(*) FROM appointments")
        ).scalar()

        return {
            "patients": patients,
            "doctors": doctors,
            "appointments": appointments
        }

    finally:
        db.close()