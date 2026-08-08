from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from database.database import SessionLocal


router = APIRouter(
    prefix="/manage-patient",
    tags=["Manage Patient"]
)


@router.get("/list")
def get_patients():

    db = SessionLocal()

    try:

        patients = db.execute(
            text("""
                SELECT id, name, email, phone, dob, gender
                FROM users
                ORDER BY id DESC
            """)
        ).mappings().all()

        return patients

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


@router.delete("/delete/{patient_id}")
def delete_patient(patient_id: int):

    db = SessionLocal()

    try:

        result = db.execute(
            text("""
                DELETE FROM users
                WHERE id = :id
            """),
            {
                "id": patient_id
            }
        )

        db.commit()

        if result.rowcount == 0:

            raise HTTPException(
                status_code=404,
                detail="Patient not found"
            )

        return {
            "message": "Patient Deleted Successfully"
        }

    except HTTPException:

        db.rollback()

        raise

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()