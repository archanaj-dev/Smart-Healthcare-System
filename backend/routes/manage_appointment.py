from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from database.database import SessionLocal

router = APIRouter(
    prefix="/manage-appointment",
    tags=["Manage Appointment"]
)

# -----------------------------
# Get All Appointments
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
                problem,
                status
            FROM appointments
            ORDER BY id DESC
        """)

        appointments = db.execute(query).mappings().all()

        return appointments

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


# -----------------------------
# Approve Appointment
# -----------------------------
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
            "message": "Appointment Approved Successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


# -----------------------------
# Reject Appointment
# -----------------------------
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
            "message": "Appointment Rejected Successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


# -----------------------------
# Delete Appointment
# -----------------------------
@router.delete("/delete/{appointment_id}")
def delete_appointment(appointment_id: int):

    db = SessionLocal()

    try:

        query = text("""
            DELETE FROM appointments
            WHERE id=:id
        """)

        db.execute(query, {"id": appointment_id})

        db.commit()

        return {
            "message": "Appointment Deleted Successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()