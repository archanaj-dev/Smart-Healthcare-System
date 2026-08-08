from fastapi import APIRouter
from sqlalchemy import text
from database.database import SessionLocal

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

@router.get("/{email}")
def get_profile(email: str):

    db = SessionLocal()

    try:

        query = text("""
            SELECT
                name,
                email,
                phone,
                dob,
                gender,
                address,
                blood_group
            FROM users
            WHERE email = :email
        """)

        user = db.execute(
            query,
            {"email": email}
        ).mappings().first()

        if user:
            return user

        return {
            "message": "User Not Found"
        }

    finally:
        db.close()
