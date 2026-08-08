from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from database.database import SessionLocal

router = APIRouter(
    prefix="/report",
    tags=["Reports"]
)


class Report(BaseModel):
    patient_name: str
    doctor_name: str
    diagnosis: str
    findings: str = ""
    treatment: str = ""
    medicines: str = ""
    notes: str = ""
    report_date: str


# ---------------------------------------
# Add Medical Report
# ---------------------------------------

@router.post("/add")
def add_report(data: Report):

    db = SessionLocal()

    try:

        query = text("""
            INSERT INTO reports
            (
                patient_name,
                doctor_name,
                diagnosis,
                findings,
                treatment,
                medicines,
                notes,
                report_date
            )
            VALUES
            (
                :patient_name,
                :doctor_name,
                :diagnosis,
                :findings,
                :treatment,
                :medicines,
                :notes,
                :report_date
            )
        """)

        db.execute(
            query,
            {
                "patient_name": data.patient_name,
                "doctor_name": data.doctor_name,
                "diagnosis": data.diagnosis,
                "findings": data.findings,
                "treatment": data.treatment,
                "medicines": data.medicines,
                "notes": data.notes,
                "report_date": data.report_date
            }
        )

        db.commit()

        return {
            "message": "Medical Report Added Successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


# ---------------------------------------
# Get All Reports
# ---------------------------------------

@router.get("/list")
def get_reports():

    db = SessionLocal()

    try:

        reports = db.execute(
            text("""
                SELECT *
                FROM reports
                ORDER BY id DESC
            """)
        ).mappings().all()

        return reports

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()


# ---------------------------------------
# Delete Report
# ---------------------------------------

@router.delete("/delete/{report_id}")
def delete_report(report_id: int):

    db = SessionLocal()

    try:

        db.execute(
            text("""
                DELETE FROM reports
                WHERE id = :id
            """),
            {
                "id": report_id
            }
        )

        db.commit()

        return {
            "message": "Medical Report Deleted Successfully"
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        db.close()