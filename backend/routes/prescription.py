from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from database.database import SessionLocal

router = APIRouter(
    prefix="/prescription",
    tags=["Prescription"]
)

class Prescription(BaseModel):
    patient_name: str
    doctor_name: str
    medicine: str
    dosage: str
    duration: str
    notes: str


# -----------------------------------
# Add Prescription
# -----------------------------------
@router.post("/add")
def add_prescription(data: Prescription):

    db = SessionLocal()

    try:

        query = text("""
            INSERT INTO prescriptions
            (patient_name, doctor_name, medicine, dosage, duration, notes)
            VALUES
            (:patient_name, :doctor_name, :medicine,
             :dosage, :duration, :notes)
        """)

        db.execute(query, {
            "patient_name": data.patient_name,
            "doctor_name": data.doctor_name,
            "medicine": data.medicine,
            "dosage": data.dosage,
            "duration": data.duration,
            "notes": data.notes
        })

        db.commit()

        return {
            "message": "Prescription Added Successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


# -----------------------------------
# Get Prescription List
# -----------------------------------
@router.get("/list")
def get_prescriptions():

    db = SessionLocal()

    try:

        query = text("""
            SELECT *
            FROM prescriptions
            ORDER BY id DESC
        """)

        prescriptions = db.execute(query).mappings().all()

        return prescriptions

    finally:

        db.close()


# -----------------------------------
# Delete Prescription
# -----------------------------------
@router.delete("/delete/{prescription_id}")
def delete_prescription(prescription_id: int):

    db = SessionLocal()

    try:

        db.execute(
            text("""
                DELETE FROM prescriptions
                WHERE id=:id
            """),
            {"id": prescription_id}
        )

        db.commit()

        return {
            "message": "Prescription Deleted Successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()