from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from database.database import SessionLocal

router = APIRouter(
    prefix="/doctor",
    tags=["Doctor"]
)

# ---------------------------------------
# Get All Appointments
# ---------------------------------------
@router.get("/appointments")
def get_all_appointments():

    db = SessionLocal()

    try:

        query = text("""
            SELECT *
            FROM appointments
            ORDER BY id DESC
        """)

        appointments = db.execute(query).mappings().all()

        return appointments

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))

    finally:

        db.close()


# ---------------------------------------
# Approve Appointment
# ---------------------------------------
@router.put("/approve/{appointment_id}")
def approve_appointment(appointment_id: int):

    db = SessionLocal()

    try:

        query = text("""
            UPDATE appointments
            SET status='Approved'
            WHERE id=:id
        """)

        db.execute(query, {"id": appointment_id})

        db.commit()

        return {
            "message": "Appointment Approved"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(status_code=500, detail=str(e))

    finally:

        db.close()


# ---------------------------------------
# Reject Appointment
# ---------------------------------------
@router.put("/reject/{appointment_id}")
def reject_appointment(appointment_id: int):

    db = SessionLocal()

    try:

        query = text("""
            UPDATE appointments
            SET status='Rejected'
            WHERE id=:id
        """)

        db.execute(query, {"id": appointment_id})

        db.commit()

        return {
            "message": "Appointment Rejected"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(status_code=500, detail=str(e))

    finally:

        db.close()
        # ---------------------------------------
# Get Doctor List
# ---------------------------------------
@router.get("/list")
def get_doctor_list():

    return [
        {
            "id": 1,
            "name": "Dr. John",
            "specialization": "Cardiologist"
        },
        {
            "id": 2,
            "name": "Dr. Smith",
            "specialization": "Neurologist"
        },
        {
            "id": 3,
            "name": "Dr. Priya",
            "specialization": "Dermatologist"
        },
        {
            "id": 4,
            "name": "Dr. Rahul",
            "specialization": "Orthopedic"
        },
        {
            "id": 5,
            "name": "Dr. Anitha",
            "specialization": "Pediatrician"
        }
    ]