from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import text

from database.database import SessionLocal

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ---------------- REGISTER ---------------- #

class RegisterUser(BaseModel):
    name: str
    email: str
    phone: str
    dob: str
    gender: str
    password: str


@router.post("/register")
def register(user: RegisterUser):
    db = SessionLocal()

    try:
        query = text("""
            INSERT INTO users (name, email, phone, dob, gender, password)
            VALUES (:name, :email, :phone, :dob, :gender, :password)
        """)

        db.execute(query, {
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "dob": user.dob,
            "gender": user.gender,
            "password": user.password
        })

        db.commit()

        return {
            "message": "Registered Successfully"
        }

    except Exception as e:
        db.rollback()
        print("REGISTER ERROR:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db.close()


# ---------------- LOGIN ---------------- #

class LoginUser(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(user: LoginUser):
    db = SessionLocal()

    try:
        query = text("""
            SELECT * FROM users
            WHERE email = :email
            AND password = :password
        """)

        result = db.execute(query, {
            "email": user.email,
            "password": user.password
        }).fetchone()

        if result:
            return {
                "message": "Login Successful"
            }

        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    except Exception as e:
        print("LOGIN ERROR:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db.close()


# ---------------- GET ALL USERS ---------------- #

@router.get("/users")
def get_users():

    db = SessionLocal()

    try:

        query = text("""
            SELECT *
            FROM users
            ORDER BY id DESC
        """)

        users = db.execute(query).mappings().all()

        return users

    except Exception as e:

        return {
            "error": str(e)
        }

    finally:

        db.close()