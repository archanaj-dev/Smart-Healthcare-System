from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from database.database import SessionLocal

router = APIRouter(
    prefix="/manage-doctor",
    tags=["Manage Doctor"]
)

class Doctor(BaseModel):
    name: str
    specialization: str
    experience: str
    phone: str


# -----------------------------------------
# Add Doctor
# -----------------------------------------
@router.post("/add")
def add_doctor(data: Doctor):

    db = SessionLocal()

    try:

        query = text("""
            INSERT INTO doctors
            (name, specialization, experience, phone)
            VALUES
            (:name, :specialization, :experience, :phone)
        """)

        db.execute(query, {
            "name": data.name,
            "specialization": data.specialization,
            "experience": data.experience,
            "phone": data.phone
        })

        db.commit()

        return {
            "message": "Doctor Added Successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


# -----------------------------------------
# Get All Doctors
# -----------------------------------------
@router.get("/list")
def get_doctors():

    db = SessionLocal()

    try:

        doctors = db.execute(
            text("""
                SELECT *
                FROM doctors
                ORDER BY id DESC
            """)
        ).mappings().all()

        return doctors

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


# -----------------------------------------
# Delete Doctor
# -----------------------------------------
@router.delete("/delete/{doctor_id}")
def delete_doctor(doctor_id: int):

    db = SessionLocal()

    try:

        db.execute(
            text("""
                DELETE FROM doctors
                WHERE id=:id
            """),
            {
                "id": doctor_id
            }
        )

        db.commit()

        return {
            "message": "Doctor Deleted Successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()