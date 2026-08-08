from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import text

from database.database import SessionLocal

router = APIRouter(
    prefix="/appointment",
    tags=["Appointment"]
)


class Appointment(BaseModel):
    patient_name: str
    doctor: str
    appointment_date: str
    appointment_time: str
    problem: str


# -----------------------------
# Book Appointment
# -----------------------------
@router.post("/book")
def book_appointment(data: Appointment):

    db = SessionLocal()

    try:

        query = text("""
            INSERT INTO appointments
            (patient_name, doctor, appointment_date, appointment_time, problem)
            VALUES
            (:patient_name, :doctor, :appointment_date, :appointment_time, :problem)
        """)

        db.execute(query, {
            "patient_name": data.patient_name,
            "doctor": data.doctor,
            "appointment_date": data.appointment_date,
            "appointment_time": data.appointment_time,
            "problem": data.problem
        })

        db.commit()

        return {
            "message": "Appointment Booked Successfully"
        }

    except Exception as e:

        db.rollback()
        print("BOOK APPOINTMENT ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


# -----------------------------
# View All Appointments
# -----------------------------
@router.get("/list")
def get_appointments():

    db = SessionLocal()

    try:

        query = text("""
            SELECT
                id,
                patient_name,
                doctor,
                appointment_date,
                appointment_time,
                problem
            FROM appointments
            ORDER BY id DESC
        """)

        appointments = db.execute(query).mappings().all()

        return appointments

    except Exception as e:

        print("GET APPOINTMENTS ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()